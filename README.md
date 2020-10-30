# Socket.io React App for live chat

A simple live chat app that use Socket.io for live communication between a NodeJS server and all the opened clients.

Run `npm install`, then `npm start`.

## How it works

In the main directory, you can run `npm install`, that install npm in main directory, and then runs a postinstall script that execute `cd react-app && npm install`.

Then, you can run `npm start`, that execute `(cd react-app && npm run build) && node server.js`.

You can now go to http://localhost:5000, open it in different browsers and chat with all peoples that are connected.

### Next steps

-   [x] Add CSS for styling
-   [ ] Make private rooms

### Dependencies

`express ^4.17.1` `socket.io ^2.3.0` `socket.io-client ^2.3.1`
