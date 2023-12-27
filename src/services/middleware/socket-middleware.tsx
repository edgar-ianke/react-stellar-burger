import { Middleware } from "redux";

interface IWebSocketActions {
  wsConnect: string;
  wsDisconnect: string;
  onOpen: string;
  onClose: string;
  onMessage: string;
  onError: string;
}

export const socketMiddleware = (wsUrl: string, wsActions: IWebSocketActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsConnect, onOpen, onClose, onError, onMessage, wsDisconnect } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(wsUrl);
      }
      if (type === wsConnect && payload) {
        socket = new WebSocket(`${wsUrl}?token=${payload}`)
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
