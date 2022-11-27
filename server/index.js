// Server stuff
const express = require('express');
const { Add } = require('faunadb');
const app = express()
const port = 3030

const { createResource } = require('./DBFunctions')
const { createCategory } = require('./DBFunctions')
const { getAllCategories } = require('./DBFunctions')
const { allResourceByCategoryRef } = require('./DBFunctions')
const { deleteCategory } = require('./DBFunctions')
const { deleteResource } = require('./DBFunctions')

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/getAllCategories', async (req, res) => {
  const categoryData = await getAllCategories()
  console.log("good")
  res.json(categoryData)
})

app.post('/getAllResourceByCategoryRef', async (req, res) => {
  const allResources = await allResourceByCategoryRef(req.body)
  res.json(allResources)
})

app.post('/createCategories', (req, res) => {
  createCategory(req.body)
  res.json()
})

app.post('/createResource', (req, res) => {
  createResource(req.body)
  res.json()
})

app.post('/deleteCategory', (req, res) => {
  deleteCategory(req.body)
  res.json()
})

app.post('/deleteResource', (req, res) => {
  deleteResource(req.body)
  res.json()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})