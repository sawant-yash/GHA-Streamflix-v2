# StreamFlix V2 - Docker Commands

## Build the Docker Image
```bash
docker build -t streamflix:v2 .
```

## Tag the Image for DockerHub
```bash
docker tag streamflix:v2 kastrov/streamflix:v2
```

## Push the Image to DockerHub
```bash
docker push kastrov/streamflix:v2
```

## Run the Container Locally
```bash
docker run -d -p 5000:5000 --name streamflix-v2 kastrov/streamflix:v2
```

## Stop and Remove Container
```bash
docker stop streamflix-v2
docker rm streamflix-v2
```

## View Container Logs
```bash
docker logs streamflix-v2
```

## All-in-One Command (Build, Tag, Push)
```bash
docker build -t streamflix:v2 . && \
docker tag streamflix:v2 kastrov/streamflix:v2 && \
docker push kastrov/streamflix:v2
```
