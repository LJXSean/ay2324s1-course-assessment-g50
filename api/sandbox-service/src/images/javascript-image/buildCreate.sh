#!/bin/bash

# Check if at least one argument was provided
if [ $# -lt 1 ]; then
  echo "Usage: $0 <version>"
  exit 1
fi

# Save the first argument (the version) to a variable named "version"
version="$1"

SHARED_FOLDER="/usr/src/app/src/shared"
DOCKERFILE="../images/javascript-image/Dockerfile"

echo "building"
cd $SHARED_FOLDER
docker build -t js_box -f $DOCKERFILE .
docker run -d --name js_box${version} -p 850${version}:8500 --network peerprep-network js_box

# Check if the container is running
if [ $? -ne 0 ]; then
  echo "Failed to run the Docker container"
  exit 1
fi

echo "Successfully running js_box${version} accessible at port 850${version}"