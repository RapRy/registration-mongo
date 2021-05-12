const { check, validationResult } = require('express-validator')
const Member = require('../models/members.js')

const home = (req, res) => {
    res.render('index')
}

const checkForm = [
    check('name')
        .not().isEmpty()
        .withMessage('Please provide your name')
        .not().matches(/\d/)
        .withMessage('Please provide a valid name'),
    check('age')
        .not().isEmpty()
        .withMessage('Please provide your age')
        .isNumeric()
        .withMessage('Please provide a valid age'),
    check('phone')
        .not().isEmpty()
        .withMessage('Please provide a phone number'),
    check('email')
        .not().isEmpty()
        .withMessage('Please provide a email'),
    check('message')
        .not().isEmpty()
        .withMessage('Please provide a message')
        .isLength({ max: 40 })
        .withMessage('Maximum of 40 characters only')
]

const submitForm = (req, res) => {
    const data = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.render('index', { data: data, errors: errors.array() })
    }else{
        const member = new Member({ name: data.name, age: data.age, phone: data.phone, email: data.email, message: data.message })

        member.save((err) => {
            if(err){
                return handleError(err);
            }else{
                res.json({ success: "success" })
            }
        })
    }
}

const getMembers = async (req, res) => {
    const members = await Member.find({})

    res.render('records', { members })
}

module.exports = { home, submitForm, checkForm, getMembers }