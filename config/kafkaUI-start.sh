# Uses repanda-kafka-ui
# Create a network for Kafka
NETWORK_NAME=kafka-network

KAFKA_IP=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' kafka)
echo "Kafka IP: $KAFKA_IP"

docker run -d -p 8083:8080 \
  --name kafka-ui \
  --network $NETWORK_NAME \
  -e KAFKA_BROKERS=kafka:29092 \
  docker.redpanda.com/vectorized/console:latest
