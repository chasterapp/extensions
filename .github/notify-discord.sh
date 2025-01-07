#!/bin/bash

# Extract job status
BUILD_STATUS=$1
UNIT_TEST_STATUS=$2
E2E_TEST_STATUS=$3
DEPLOY_STATUS=$4
COMMIT_HASH=$5
RUN_ID=$6

# Construct message
TITLE=""
MESSAGE=""

# Build status
if [ "$BUILD_STATUS" == "success" ]; then
  TITLE="✅ [extensions] Build succeeded on main"
else
  TITLE="❌ [extensions] Build failed on main"
fi
MESSAGE="$MESSAGE\nCommit $COMMIT_HASH\n\n$HEAD_COMMIT_MESSAGE\n"

# Unit test status
if [ "$UNIT_TEST_STATUS" == "success" ]; then
  MESSAGE="$MESSAGE\n- ✅ Unit tests"
else
  MESSAGE="$MESSAGE\n- ❌ Unit tests"
fi

# E2E test status
if [ "$E2E_TEST_STATUS" == "success" ]; then
  MESSAGE="$MESSAGE\n- ✅ E2E Tests"
else
  MESSAGE="$MESSAGE\n- ❌ E2E Tests"
fi

# Deploy status
if [ "$DEPLOY_STATUS" == "success" ]; then
  MESSAGE="$MESSAGE\n- ✅ Deploy on preprod"
else
  MESSAGE="$MESSAGE\n- ❌ Deploy on preprod"
fi

printf "$MESSAGE"

JSON_FMT=$(jq -n \
  --arg title "$TITLE" \
  --rawfile message <(echo -e "$MESSAGE") \
  --arg run_id "$RUN_ID" \
  '{
    embeds: [{
      title: $title,
      description: $message,
      fields: [{
        name: "🖥️ Build",
        value: "**[Build summary](https://github.com/chasterapp/extensions/actions/runs/\($run_id))**"
      }]
    }]
  }')

echo $JSON_FMT

# Send to Discord
curl -X POST -H "Content-Type: application/json" \
  -d "$JSON_FMT" \
  $DISCORD_WEBHOOK_URL