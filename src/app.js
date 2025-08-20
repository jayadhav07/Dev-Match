const express = require("express");

const app = express();

app.use((req, res) => {
  res.send("hello from the server2");
});

app.listen(3000, () => {
  console.log("server is successfully running on PORT 3000");
});
