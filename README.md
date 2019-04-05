# evento_chatbotservice_api
This is the code for Evento Chatbot Service API.

## 1. Usage

### (Server only)

#### With npm
Run the following commands: 

```1. npm install```

```2. npm start```

#### With Docker
Run the following commands: 

```1. docker build -f Dockerfile.dev```

```2. Copy the Container ID```

```3. docker run -it <Container-ID>```

### (Full stack)

Clone the front-end web app repository from https://github.com/mayankshah1607/evento_chatbotservice_web and place it in the same directory as ./evento_chatbotservice_api

Then, run (in the current dir ./evento_chatbotservice_api) : ```docker-compose up --build```
