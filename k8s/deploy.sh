#!/bin/bash

# Function to display usage
usage() {
  echo "Usage: $0 <environment> <DOCKER_TAG>"
  echo "Example: $0 preprod sha-abc123"
  exit 1
}

# Check if sufficient arguments are provided
if [ "$#" -ne 2 ]; then
  usage
fi

# Assign input parameters
ENVIRONMENT=$1
DOCKER_TAG=$2

# Paths to Helm chart and environment-specific values file
CURRENT_PATH="`dirname \"$0\"`"
VALUES_FILE="$CURRENT_PATH/environments/$ENVIRONMENT/values.yaml"
HELM_CHART_PATH="$CURRENT_PATH/helm"
SEALED_SECRET_FILE="$CURRENT_PATH/environments/$ENVIRONMENT/sealed-secret.yaml"

# Check if the environment is valid
if [ ! -f "$VALUES_FILE" ]; then
  echo "Error: Environment '$ENVIRONMENT' is not valid or values file '$VALUES_FILE' does not exist."
  exit 1
fi

# Extract the namespace from the values file
NAMESPACE=$(grep "namespace:" $VALUES_FILE | awk '{print $2}')

if [ -z "$NAMESPACE" ]; then
  echo "Error: Namespace not found in $VALUES_FILE."
  exit 1
fi

# Deploy the sealed secret
echo "Applying the sealed secret to namespace $NAMESPACE..."
kubectl apply -f $SEALED_SECRET_FILE --namespace $NAMESPACE

# Check if the sealed secret was applied successfully
if [ $? -ne 0 ]; then
  echo "Error: Failed to apply the sealed secret."
  exit 1
fi

# Deploy the Helm chart
echo "Deploying the Helm chart to namespace $NAMESPACE with image tag $DOCKER_TAG..."
helm upgrade --install -f $VALUES_FILE chaster-extensions $HELM_CHART_PATH \
  --namespace $NAMESPACE \
  --set image.tag=$DOCKER_TAG

# Check if the Helm upgrade was successful
if [ $? -ne 0 ]; then
  echo "Error: Failed to deploy the Helm chart."
  exit 1
fi

# Wait for the deployment to complete
echo "Waiting for rollout to complete..."
kubectl rollout status deployment/chaster-extensions-deployment --namespace $NAMESPACE

# Check if the rollout was successful
if [ $? -eq 0 ]; then
  echo "Deployment successfully rolled out in namespace $NAMESPACE."
else
  echo "Error: Rollout failed in namespace $NAMESPACE."
  exit 1
fi
