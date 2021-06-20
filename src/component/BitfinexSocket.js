import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ToastsContainer, ToastsStore } from "react-toasts";
//action
import { updateWidget } from "../redux/action";

//using core websockets with bitfinex socket api
const socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
function BitfinexSocket(props) {
  //connection -> true or false (to on and off the socket)
  const [connection, setConnection] = useState(true);
  //wheneven the connection get updated this code will be triggered
  useEffect(() => {
    connectSocket();
  }, [connection]);

  function connectSocket() {
    //if disconnected closing the socket and returing
    if (!connection) {
      socket.close();
      return "";
    }
    //details for fetching the crypto needed from bitfinex socket
    let msg = JSON.stringify({
      event: "subscribe",
      channel: "ticker",
      symbol: "tBTCUSD",
    });
    //checking whether the socket is closed or not
    //if closed connect else reload the page(reloading because socket is taking log time to close)
    if (socket.readyState !== WebSocket.CLOSED) {
      socket.onopen = () => {
        socket.send(msg);
        console.log("connected");
        socket.onmessage = async (evt) => {
          // listen to data sent from the websocket server
          const message = JSON.parse(evt.data);
          if (message[1]) {
            if (message[1].length === 10) {
              console.log("sending message", message[1]);
              await props.updateWidget(message[1]);
            }
          }
        };
        //notify is connected
        ToastsStore.success("Connected!");
      };
    } else {
      //reload when this in "closing"
      window.location.reload();
    }

    socket.onclose = () => {
      ToastsStore.error("Disconnected!");
      // automatically try to reconnect on connection loss
    };
  }
  //triggered when clicking play or pause button in ui
  const handleSocket = () => {
    setConnection(!connection);
  };
  //play and pause button
  const statusButtons = () => {
    return (
      <div>
        {connection ? (
          <img
            src="https://img.icons8.com/metro/52/ffffff/pause.png"
            alt="pause"
            height="15"
            style={{ cursor: "pointer" }}
          />
        ) : (
          <img
            src="https://img.icons8.com/ios-glyphs/60/ffffff/play--v1.png"
            alt="play"
            height="15"
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div onClick={handleSocket}>{statusButtons()}</div>
      {/* enabeling toastr for notification for this component */}
      <ToastsContainer store={ToastsStore} />
    </div>
  );
}

export default connect(null, {
  updateWidget,
})(BitfinexSocket);
