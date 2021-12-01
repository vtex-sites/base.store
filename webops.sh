#!/usr/bin/env bash
#
# This file is a temporary solution while we don't figure out a way of
# supporting SSR on WebOps. A solution is to generate all paths using this
# cli and remove this in a certain future
#

STATIC_PATHS=/tmp/staticPaths.json

if [[ ! -z $VTEX_WEBOPS ]]; then
    export GATSBY_STORE_ID=$(cat store.config.js | grep store: | sed -E "s/store:|(\/\/.*)|\'|,|[[:space:]]*//g");
    echo "Static renderig paths for account" $GATSBY_STORE_ID
    yarn run webops paths -a ${GATSBY_STORE_ID} -o $STATIC_PATHS;
    echo "Rendering" $(cat $STATIC_PATHS | sed -E 's/\[|\]//g' | sed 's/,/\n/g' | wc -l) "pages"
    yarn run webops render -s $STATIC_PATHS -o ./public;
fi
