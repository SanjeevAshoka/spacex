const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
const Path = require('path');
const app = express()
var cors = require('cors');
const port = 8000

app.use(cors());
app.use(express.json());
// Available Routes
app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook Backend listening on http://localhost:${port}`)
})