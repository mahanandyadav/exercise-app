const express = require('express');
let User = require('../models/user.model')
const router = new express.Router()
router.get('/', async (req, res, next) => {
    await User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/add',async(req,res,next)=>{
    const username=req.body.username
    const newUser=new User({username})

    await newUser.save()
        .then(()=>res.json('User added !'))
        .catch(err=>res.status(400).json('Error: '+err))
})
module.exports = router