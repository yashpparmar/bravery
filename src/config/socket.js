import {io} from "socket.io-client";

export const getSocket = (_id = "") => {
  console.log(_id);
  if (_id) {
    try {
      const socket = io(`${process.env.REACT_APP_BACKEND_API_URL}/socket`, {
        query: {_id},
      });
      return socket;
    } catch (error) {
      console.log("socket error:", error);
    }
  }
};
