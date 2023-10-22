[![CodeQL](https://github.com/helios2003/Word-Rush/actions/workflows/main.yml/badge.svg)](https://github.com/helios2003/Word-Rush/actions/workflows/main.yml)
[![ESLint](https://github.com/Devaansh-Kumar/Word-Rush/actions/workflows/eslint.yml/badge.svg)](https://github.com/Devaansh-Kumar/Word-Rush/actions/workflows/eslint.yml)

# Word-Rush
Word-Rush is a multiplayer real-time Wordle game where users can register themselves on the platform and join in to play simultaneously with other participants. Players can generate invite links to share with others and compete to guess the generated word. The game ensures that all participants in a group are presented with the exact same word to guess. 

## Instructions for Setting up the repository
* Clone the repository using the command
```
git clone https://github.com/Devaansh-Kumar/Word-Rush.git
```
* Or alternatively create a fork of the repository and clone it with the command
```
git clone https://github.com/<your-username>/Word-Rush.git
```
* Navigate to the project directory

### Set Up Env
1. Navigate to the server directory.
2. Touch a file `.env`.
3. Duplicate the `.env.example` file and rename it to `.env`.
4. Fill in the necessary environment variables in the `.env` file.

### Using npm to run the project

#### Client
1. Navigate to the client directory.
2. Run the ``npm install`` to install the dependencies.
3. Run ``npm run dev`` to start the client.
4. The client will be running on ``localhost:8080``.

#### Server
1. Navigate to the server directory.
2. Run the ``npm install`` to install the dependencies.
3. Run ``npm run devStart`` to start the server.
4. The server will be running on ``localhost:3000``.

### Using Docker to run the project
1. Install Docker and Docker Compose from the given links.
    * [Docker](https://docs.docker.com/engine/install/)
    * [Docker Compose](https://docs.docker.com/compose/install/)
2. Run the following command to build the project.
```
docker-compose build
```
3. Run the following command to run the project.
```
docker-compose up
```
4. Press ``Ctrl+C`` to bring down the containers.

## Tech Stack
1. MERN Stack (MongoDB, Express.js, React.js, Node.js)
2. Tailwind CSS
3. Socket.io
4. Docker

## References
* [React Documenetation](https://react.dev/learn)
* [Tailwind CSS Documentation](https://v2.tailwindcss.com/docs)
* [Socket.io Documentation](https://socket.io/docs/v4/)
* [APIs vs. WebSockets vs. WebHooks](https://blog.bitsrc.io/apis-vs-websockets-vs-webhooks-what-to-choose-5942b73aeb9b)
* [Basics of Socket.io by making a Multiplayer Game](https://dev.to/nitdgplug/learn-the-basics-of-socket-io-by-making-a-multiplayer-game-394g)
* [Setting up ESLint in React](https://medium.com/@RossWhitehouse/setting-up-eslint-in-react-c20015ef35f7)