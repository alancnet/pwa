#!/bin/bash

set -e

docker build .
docker run --rm -it -p 4000:4000 $(docker build -q .)
