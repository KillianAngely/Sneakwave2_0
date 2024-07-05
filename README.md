# Documentation sneakers Wave MonoRepo

### requirements

install dependencies
`yarn`
download ollama
`https://ollama.com/download/Ollama-darwin.zip`

install
`ollama pull llama3`

## run backend

### run project local mode

for more faster developpement 🏎️💨

`OLLAMA_HOST=0.0.0.0 ollama serve`

`ifconfig en0 | grep inet`

change your host in [gateways](./api/gateways/Ollama.gateways.ts) to your terminal port

`docker build -t api ./api`

`docker run -p 3000:3000 -v ./api:/usr/src/app api`

### run fully containered

change your host in [gateways](./api/gateways/Ollama.gateways.ts) to localhost

- `docker-compose up --build`

## run frontend

- `cd app`
- `yarn start `
