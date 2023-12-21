#!/usr/bin/env bash

set -u -e -o pipefail

rm -rf dist

TEST=false
for ARG in "$@"; do
  case "$ARG" in
    -t)
      TEST=true
      ;;
  esac
done

npx tsc -d --project tsconfig.build.json

cp LICENSE dist/LICENSE
cp package.json dist/package.json
cp src/collection.json dist/collection.json
cp src/ng-add/schema.json dist/ng-add/schema.json
cp README.md dist/README.md

if [[ ${TEST} == true ]]; then
  echo "TEST"
  cp -fr dist/* ../ng-alain/node_modules/ng-less-javascript-enabled-patch
fi
