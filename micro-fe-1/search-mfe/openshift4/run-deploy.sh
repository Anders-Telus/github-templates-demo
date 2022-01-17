#!/bin/sh
set -o nounset -o errexit

APP_NAME=$1
ENVIRONMENT=${2:-staging}
VERSION=${3:-latest}
NUM_REPLICAS=${4:-1}
INBOUND_PROXY_IPS=$5
MAX_REPLICAS=${6:-5}

oc process ${APP_NAME} \
  -p VERSION=${VERSION} \
  -p ENVIRONMENT=${ENVIRONMENT} \
  -p NUM_REPLICAS=${NUM_REPLICAS} \
  -p INBOUND_PROXY_IPS="${INBOUND_PROXY_IPS}" \
  -p MAX_REPLICAS=${MAX_REPLICAS} \
  -o yaml | oc apply -f -

sleep 5

oc rollout status deployment ${APP_NAME}-${ENVIRONMENT} --watch
