const path = require("path")
const axios = require("axios");
const express = require("express"); // npm installed
const {API_URL, API_KEY} = require("./config")

const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname,'..','..','dist')))

app.use('/api/*', async (req, res) => {
  const payload = await axios({
    method:req.method.toLowerCase(),
    url: API_URL + req.originalURL.slice(4),
    headers: {Authorization: API_KEY},
    data: req.body
  });
  res.send(payload.data);
});

app.get('*', function (req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, '../../dist')
  });
});



// const myPath = path.join(__dirname, "/client/dist");
// app.use(express.static(myPath));
// // other configuration...

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`listening on port: ${PORT}`)
  }
});


