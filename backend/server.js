const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./db')
const noteRoutes = require('./routes/noteRoutes')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/notes', noteRoutes)

app.get('/', (req, res) => {
    res.send('Server is running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})