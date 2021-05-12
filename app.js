const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')

const routes = require('./routes/routes.js')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const DBURI = process.env.DBURI

mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => app.listen(PORT, () => console.log(`Listening to port ${PORT}`)))
    .catch((err) => console.log(err))

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that")
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Something broke!')
})