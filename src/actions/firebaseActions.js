import database from '../utility/firebase';

export const watchLoggedIn = dispatch => {
  dispatch({
    type: 'LOGGEDIN_INIT',
  });
};

export const watchShowMeta = dispatch => {};

const socketMiddleware = (function() {
  var socket = null;

  const onOpen = (ws, store, token) => evt => {
    //Send a handshake, or authenticate with remote end
    //Tell the store we're connected
    // store.dispatch(actions.connected());
  };

  const onClose = (ws, store) => evt => {
    //Tell the store we've disconnected
    // store.dispatch(actions.disconnected());
  };

  const onMessage = (ws, store) => evt => {
    //Parse the JSON message received on the websocket
    var msg = JSON.parse(evt.data);
    switch (msg.type) {
      case 'CHAT_MESSAGE':
        //Dispatch an action that adds the received message to our state
        store.dispatch(actions.messageReceived(msg));
        break;
      default:
        console.log("Received unknown message type: '" + msg.type + "'");
        break;
    }
  };

  return store => next => action => {
    switch (action.type) {
      //The user wants us to connect
      case 'CONNECT':
        // Start a new connection to the server
        const loggedInRef = database.ref('/isLoggedIn');
        const sessionRef = database.ref('/session');

        // Send connecting status
        // store.dispatch(actions.connecting());

        break;

      //The user wants us to disconnect
      case 'DISCONNECT':
        if (socket != null) {
          socket.close();
        }
        socket = null;

        //Set our state to disconnected
        // store.dispatch(actions.disconnected());
        break;
      default:
        return next(action);
    }
  };
})();

export default socketMiddleware;
