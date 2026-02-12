import express from 'express'
import adminApi from './admin-api/admin-api'

const app = express()
app.use(express.json())
app.use(adminApi)

export default app
