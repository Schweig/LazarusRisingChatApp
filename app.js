const fs = require("fs");
const express = require("express");
const http = require("http");
var cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const https = require("https")
var server = http.createServer(app);
var io = require("socket.io")(server);
var httpsServer = null;
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/lazarus.wschweigert.com/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/lazarus.wschweigert.com/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/lazarus.wschweigert.com/chain.pem",
    "utf8"
  );
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
  httpsServer = https.createServer(credentials, app);

  
}
app.use(express.static(__dirname + "/build"));
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
  });
app.set("port", process.env.PORT || 4001);

let connections = {};
let messages = {};
let timeOnline = {};

io.on("connection", function (socket) {
  socket.on("join-call", (path) => {
    if (connections[path] === undefined) {
      connections[path] = [];
    }
    connections[path].push(socket.id);

    timeOnline[socket.id] = new Date();

    for (let a = 0; a < connections[path].length; ++a) {
      io.to(connections[path][a]).emit(
        "user-joined",
        socket.id,
        connections[path]
      );
    }

    if (messages[path] !== undefined) {
      for (let a = 0; a < messages[path].length; ++a) {
        io.to(socket.id).emit(
          "chat-message",
          messages[path][a]["data"],
          messages[path][a]["sender"]
        );
      }
    }

    console.log(path, connections[path]);
  });

  socket.on("signal", (toId, message) => {
    io.to(toId).emit("signal", socket.id, message);
  });

  // socket.on("message", function(data){
  // 	io.sockets.emit("broadcast-message", socket.id, data);
  // })

  socket.on("chat-message", function (data) {
    var key;
    var ok = false;
    for (const [k, v] of Object.entries(connections)) {
      for (let a = 0; a < v.length; ++a) {
        if (v[a] === socket.id) {
          key = k;
          ok = true;
        }
      }
    }

    if (ok === true) {
      if (messages[key] === undefined) {
        messages[key] = [];
      }
      messages[key].push({ sender: socket.id, data: data });
      console.log("message", key, data);

      for (let a = 0; a < connections[key].length; ++a) {
        io.to(connections[key][a]).emit("chat-message", data, socket.id);
      }
    }
  });

  socket.on("disconnect", function () {
    var diffTime = Math.abs(timeOnline[socket.id] - new Date());
    var key;
    for (const [k, v] of JSON.parse(
      JSON.stringify(Object.entries(connections))
    )) {
      for (let a = 0; a < v.length; ++a) {
        if (v[a] === socket.id) {
          key = k;

          for (let a = 0; a < connections[key].length; ++a) {
            io.to(connections[key][a]).emit("user-left", socket.id);
          }

          var index = connections[key].indexOf(socket.id);
          connections[key].splice(index, 1);

          console.log(key, socket.id, Math.ceil(diffTime / 1000));

          if (connections[key].length === 0) {
            delete connections[key];
          }
        }
      }
    }
  });
});

server.listen(app.get("port"), () => {
  console.log("listening on", app.get("port"));
});
if (process.env.NODE_ENV == "production") {
  httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
}
