#!/bin/sh

set -e

# allow nginx to stay in the foreground
# so that docker can track the process properly
nginx -g 'daemon off;'
