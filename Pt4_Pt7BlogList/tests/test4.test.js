const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('blog is being posted',async()=>{
  await api.post('/api/blogs').send({title:'title2'})
  const response = await api.get('api/blogs')
})

afterAll(async () => {
  await mongoose.connection.close()
})
