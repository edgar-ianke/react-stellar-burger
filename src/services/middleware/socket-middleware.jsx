export const socketMiddleware = (wsUrl, wsActions, token = false) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsConnect, onOpen, onClose, onError, onMessage, wsDisconnect } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(wsUrl);
      }
      if (type === wsConnect && token) {
        socket = new WebSocket(`${wsUrl}?token=${token}`)
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: "Error" });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };


        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
