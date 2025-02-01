#!/bin/bash

# Create a network for Kafka
NETWORK_NAME=kafka-network
docker network create $NETWORK_NAME || true

# Start Zookeeper
docker run -d \
  --name zookeeper \
  --network $NETWORK_NAME \
  -p 2181:2181 \
  -e ZOOKEEPER_CLIENT_PORT=2181 \
  confluentinc/cp-zookeeper:latest

# Start Kafka
docker run -d \
  --name kafka \
  --network $NETWORK_NAME \
  -dp 9092:9092 \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092,PLAINTEXT_INTERNAL://0.0.0.0:29092 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092,PLAINTEXT_INTERNAL://kafka:29092 \
  -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=PLAINTEXT:PLAINTEXT,PLAINTEXT_INTERNAL:PLAINTEXT \
  -e KAFKA_INTER_BROKER_LISTENER_NAME=PLAINTEXT_INTERNAL \
  -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
  confluentinc/cp-kafka:latest

# Wait for Kafka to be ready
sleep 5
echo "Kafka is running on localhost:9092"

  
