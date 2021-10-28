#!/bin/bash

set -e

docker build .
docker history $(docker build -q .)
docker run --rm -it -v "$PWD/data:/app/data" -p 4000:4000 $(docker build -q .)
