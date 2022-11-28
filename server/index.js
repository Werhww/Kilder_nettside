// Server stuff
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3030

const { 
  createResource,
  createCategory, 
  getAllCategories, 
  allResourceByCategoryRef, 
  deleteCategory, 
  deleteResource 
} = require('./DBFunctions')

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/getAllCategories', async (req, res) => {
  const categoryData = await getAllCategories()
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