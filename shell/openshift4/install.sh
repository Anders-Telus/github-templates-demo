#!/bin/sh
set -o nounset -o errexit
cd ```dirname $0```

# Installs the build pipeline for a given branch (default: master) in your currently selected OpenShift project
# See: README.md

BRANCH=${1:-master}

# Synchronize OpenShift project with shippy
oc project casa-training

# Apply and execute the OpenShift template
oc apply -f openshift-template.yml
oc process casa-mfe-container-pipeline BRANCH=${BRANCH} | oc apply -f -
oc start-build casa-mfe-container-pipeline
