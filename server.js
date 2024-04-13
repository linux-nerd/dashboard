const express = require("express")
const axios = require("axios")
const path = require('path');
const cors = require("cors")

const PORT = process.env.PORT || 3030

const app = express();
app.use(cors())

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get("/orders", (req, res) => {
  axios.get("https://interviews.staging.dema.ai/orders").then(response => {
    res.json(response.data)
  })
})

app.get("/sessions", (req, res) => {
  axios.get("https://interviews.staging.dema.ai/sessions").then(response => {
    res.json(response.data)
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
