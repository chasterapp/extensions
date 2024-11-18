#!/bin/bash

# Extract job status
BUILD_STATUS=$1
UNIT_TEST_STATUS=$2
E2E_TEST_STATUS=$3
DEPLOY_STATUS=$4
COMMIT_HASH=$5
RUN_ID=$7

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

JSON_FMT="{\"embeds\":[{\"title\": \"$TITLE\", \"description\": \"$MESSAGE\", \"fields\": [{\"name\": \"🖥️ Build\", \"value\": \"**[Build summary](https://github.com/chasterapp/extensions/actions/runs/$RUN_ID)**\"}]}]}"

echo $JSON_FMT

# Send to Discord
curl -X POST -H "Content-Type: application/json" \
  -d "$JSON_FMT" \
  $DISCORD_WEBHOOK_URL