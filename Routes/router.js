const express = require('express');
const {person,post} = require('../Models/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authentication = require('../Middleware/authentication');

const router = express.Router();
const secret_code = 'shantanubose';
router.post('/users/register' , async(req,res)=>{
    try{
        let {name,email,gender,password} = req.body;

        let user = await person.findOne({email});
        if(user){
            res.status(400).send({error : "user already exists"});
        }
        else{
            password = bcrypt.hashSync(password);
            await person.create({name,email,gender,password});
            res.status(200).send({message : 'Registered Succesfully'});
        }
    }
    catch(err){
        res.status(400).send({error: err.message});
    }
    
})

router.post('/users/login' , async (req,res)=>{
    try{
        let {email,password} = req.body ;
        const user = await person.findOne({email});
        if(!user){
            res.status(504).send({error : 'no account found'});
        }
        if(!bcrypt.compareSync(password,user.password)){
            res.status(504).send({error : 'wrong password'});
        }

        const token = jwt.sign({email,password},secret_code);

        res.status(200).send({message: 'loggedin succesfully',
     data : {
        userid : user._id ,
        name : user.name ,
        email : user.email,
        gender : user.gender,
        token : token
     }
    })



    }
    catch(err){
       res.status(400).send({error : err.message})
    }
})

router.get('/posts' ,authentication, async(req,res)=>{
   try{
    const data = await post.find();
    let device = req.query.device ;
    let device1 = req.query.device1 ;
    let device2 = req.query.device2 ;
    console.log(device);
    if(device && data.length!=0){
        data = data.filter(ele=>{
         return ele.device === device ;
        })
    }
    else if(device1 && device2 &&  data.length!=0){
        data = data.filter(ele=>{
            return ele.device === device1 || ele.device === device2 ;
           })
    }
    
    res.status(200).send({data : data})
   }
   catch(err){
    res.status(400).send({error : err.message})
   }

})

router.patch('/posts/update/:id',authentication, async(req,res)=>{
    try{
        const id = req.params.id ;
        await post.findByIdAndUpdate(id,req.body);
        res.status(200).send({message : 'update succesfull'});
    }
    catch(err){
        res.status(400).send({error : err.message}) ;
    }
})
router.delete('/posts/delete/:id',authentication, async(req,res)=>{
    try{
        const id = req.params.id ;
        await post.findByIdAndUpdate(id);
        res.status(200).send({message : 'delete succesfull'});
    }
    catch(err){
        res.status(400).send({error : err.message}) ;
    }
})

module.exports = router ;