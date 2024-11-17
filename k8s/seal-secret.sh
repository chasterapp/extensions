#!/bin/bash

CURRENT_PATH="`dirname \"$0\"`"
ENV_PATH=$CURRENT_PATH/environments/$ENV

kubeseal --controller-namespace kube-system --format yaml < $ENV_PATH/secret.yaml > $ENV_PATH/sealed-secret.yaml
