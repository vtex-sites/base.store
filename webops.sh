#!/usr/bin/env bash
#
# This file is a temporary solution while we don't figure out a way of
# supporting SSR on WebOps. A solution is to generate all paths using this
# cli and remove this in a certain future
#

STATIC_PATHS=/tmp/staticPaths.json

if [[ ! -z $VTEX_WEBOPS ]]; then
    export ACCOUNT=$(cat store.config.js | grep account: | sed -E "s/account:|(\/\/.*)|\'|,|[[:space:]]*//g");
    echo "Static renderig paths for account" $ACCOUNT
    yarn run webops paths -a ${ACCOUNT} -o $STATIC_PATHS;
    echo "Rendering" $(cat $STATIC_PATHS | sed -E 's/\[|\]//g' | sed 's/,/\n/g' | wc -l) "pages"
    yarn run webops render -s $STATIC_PATHS -o ./public;
fi
