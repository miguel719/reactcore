#!/usr/bin/env bash
docker run --rm -it -p 3000:3000 -v $(pwd):/src:rw cdata/react:latest npm "$@"