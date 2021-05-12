const express = require('express')
const router = express.Router()
const { home, submitForm, checkForm, getMembers } = require('../controllers/controllers.js')

router.get('/', home)
router.get('/records', getMembers)

router.post('/', checkForm, submitForm)

module.exports = router