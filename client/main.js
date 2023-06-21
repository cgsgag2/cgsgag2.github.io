import { io } from "socket.io-client";

async function main() {
  const socket = io();

  // client-side
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.on("MessageFromServer", function (msg) {
      // let OldText = document.getElementById("Ag2").value;
      // document.getElementById("Ag2").value = msg;
      console.log(msg);
      // console.log(msg);
    });
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });

  document.getElementById("id1").onkeyup = (ev) => {
    if (ev.code === "Enter") {
      const value = document.getElementById("id1").value;
      // console.log(value);
      document.getElementById("id1").value = "";
      document.getElementById("Ag2").value +=
        "\n" + document.getElementById("login").value + ": " + value;
      socket.emit("MessageToServer", value);
    }
  };
}

window.addEventListener("load", (event) => {
  main();
});
