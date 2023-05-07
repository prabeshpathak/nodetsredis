# nodetsredis

A miniature Redis like in-memory database made using NodeJS with TS.
To run the project locally:
`npm i` in the root directory.
`npm run dev` in the root directory
It will start the db server

## Connecting from client

Since the server is already started, now we can connect it from different terminal (client)

### Linux / Mac

You can simply run `nc {address}:{port}` (nc is netcat command that is installed default in unix system) in this case **address** is `localhost` and **port** is `9000` by default

### Windows

It is slightly different for windows as it cannot have SSH and telnet client connection by default. But as a viable solution I have used the program called [**Putty**](https://www.putty.org/). Its easy to install and run. After successful installation, in the "session" section, type address and port `localhost:9000` and select the 'raw' option from dropdown and open a connection. And you are good to go.
