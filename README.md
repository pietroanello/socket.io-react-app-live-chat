# Socket.io React App for live chat [in progress]

A simple app that stores form data in neDB database and return it in a component with a fetch request.

## How it works

In the project directory, you can run `npm start`, that execute `npm run build && (cd ../ && node index.js)`.

Then, when someone goes to http://localhost:5000, the socket data, initialized in App.js with `const socket = io()`, will be received from the server and register a new connection.

Sumbitting the form will `emit` a sendData event that logs the name in the server.

### Dependencies

`express ^4.17.1` `socket.io ^2.3.0` `socket.io-client ^2.3.1`
