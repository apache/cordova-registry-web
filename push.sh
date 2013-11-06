CREDS="admin:adobe"
HOST="localhost:5984"

if [ $# -ne 2 ] && [ $# -ne 0 ]
then
    echo 'Usage: drop_registry username:password http://registry_host'
    exit 1
fi

if [[ -n $1 ]]
then
  CREDS=$1
fi

if [[ -n $2 ]]
then
  HOST=$2
fi

echo $CREDS $HOST

SURL="http://$HOST"
URL="http://$CREDS@$HOST"

echo $URL

#curl -u $CREDS -X DELETE $SURL/registry && \
#curl -u $CREDS -X PUT $SURL/registry && \

# pushing new registry
couchapp push app.js "$URL/registry"
