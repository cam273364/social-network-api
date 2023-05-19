const userRoutes = require("./api/users")
const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const dburl = process.env.mongoURL
const mongoose = require('mongoose')
mongoose.connect(dburl)

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/users", userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})