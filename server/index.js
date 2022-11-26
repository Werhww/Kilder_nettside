// Server stuff
const express = require('express');
const { Add } = require('faunadb');
const app = express()
const port = 3030

const { createResource } = require('./DBFunctions')
const { createCategory } = require('./DBFunctions')
const { getAllCategories } = require('./DBFunctions')


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/getAllCategories', async (req, res) => {
  const categoryData = await getAllCategories()
  res.json(categoryData)
})

app.post('/createCategories', (req, res) => {
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