# OBJECT-STORAGE

## Overview

This project is a microservice-based architecture that leverages Kafka for asynchronous messaging and an API Gateway for managing and routing requests.

## Architecture

- **API Gateway**: Acts as the entry point for client requests, providing routing, load balancing, and security features.
- **Microservices**: Independent services that handle specific business functions. Each service communicates with others asynchronously via Kafka.
- **Kafka**: A distributed streaming platform used for building real-time data pipelines and streaming applications.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Kafka](https://kafka.apache.org/downloads)
- [Node.js](https://nodejs.org/en/download/)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```
2. **Start Kafka using Docker Compose**:

   ```bash
   cd config
   sh kafka-start.sh
   ```
3. **Build and start the API Gateway**:

   ```bash
   cd api-gateway
   npm install
   npm start
   ```
4. **Build and start microservices**:

   ```bash
   cd ../microservices/consumer-img
   npm run start 
   ```

   Repeat for each microservice.

## Configuration

### API Gateway


### Microservices


### Kafka


## Usage

1. **Send requests via the API Gateway**:

   The API Gateway routes the requests to the appropriate microservice. Use tools like Postman or CURL to test endpoints.

   ```bash

   ```
2. **Monitor Kafka topics**:

   Use Kafka tools like `kafka-console-consumer` to view messages on a topic.

   ```bash
   kafka-console-consumer --bootstrap-server localhost:9092 --topic your-topic --from-beginning
   ```

## Logging


## Testing

To run tests for each microservice:

```bash

```
