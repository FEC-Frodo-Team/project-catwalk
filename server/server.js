const path = require("path")
const express = require("express"); // npm installed

const app = express();
const myPath = path.join(__dirname, "/client/dist");

app.use(express.static(myPath));
// other configuration...

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`listening on port: ${PORT}`)
  }
});


