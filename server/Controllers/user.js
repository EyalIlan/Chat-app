const User = require('../models/user')



const GetAllUsers = async(req,res) =>{

    try{
        const users = await User.find({})
        res.status(200).json(users)
    }
    catch(e){
        res.status(500).json(e)
    }
}

const GetUser = async(req,res) =>{



}


const SaveNewUser = async(req,res) =>{
    
    console.log('in save user');

    let user = new User(
        req.body
    )
    try{
        await user.save()
        res.status(201).json('User has been Created')
    }
    catch(e){
        console.log(e);
        res.status(500).json(e)
    }
}

const UpdateUser = async(req,res) =>{
    
    try{
    const user = req.user

    Object.keys(req.body).forEach(update =>{
        user[update] = req.body[update]
    })
    await user.save()

    res.status(200).json('User updated')

    }
    catch(e){
        console.log(e);
        res.status(500).json(e)
    }
}

const DeleteUser = async(req,res) =>{
    try{

        const deleteUser = await User.deleteOne({_id:req.user._id})
        res.status(200).json('User deleted')

    }
    catch(e){
        res.status(500).json({error:e})
    }
}


module.exports = {
    GetUser,
    SaveNewUser,
    UpdateUser,
    DeleteUser,
    GetAllUsers
}