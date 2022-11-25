// Server stuff
const express = require('express');
const { Add } = require('faunadb');
const app = express()
const port = 3000

const { createResource } = require('./DBFunctions')
const { createCategory } = require('./DBFunctions')


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/adduser', (req, res) => {
    
})

app.post('/createCategory', (req, res) => {
  createCategory(req.body)
  res.json()
})

app.post('/createResource', (req, res) => {
  createResource(req.body)
  res.json()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})