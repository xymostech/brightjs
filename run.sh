#!/bin/bash

if [ $# -eq 0 ]; then
    PORT=8000
else
    PORT=$1
fi

cd `dirname $0`
echo "Starting server at http://localhost:$PORT/"
python3 -m http.server $PORT > /dev/null
