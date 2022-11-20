const Room = require('../models/room')
const Message = require('../models/message')



const GetAllRooms = async(req,res) =>{
    try{
     const rooms = await  Room.find({}) 
     res.status(200).json(rooms) 
    }
    catch(e){
        res.json(e)
    }
}




const CreateRoom = async (req, res) => {

    try{
        const createRoom = new Room({
           ...req.body,
           owner:req.user._id
        })
        await createRoom.save()
        res.status(200).json('room created')
    }
    catch(e){
        console.log(e);
        res.status(500).json('Unable to create room')
    }

}
//
const UpdateRoom = async (req, res) => {
//TODO NEED to Update the Task name as well
    try{

        const room = await Room.findOne({owner:req.user._id})
        if(!room){
           res.status(400).json('Room not found')
        }
        
        Object.keys(req.body).forEach(update =>{
            room[update] = req.body[update]
        })

        room.save()
        res.status(201).json('Room Updated')
    }
    catch(e){
        res.status(500)
    }

}

const DeleteRoom = async (req, res) => {


    try{

        const room = await Room.findOne({owner:req.user._id})
        const roomDelete = await Room.deleteOne({owner:req.user._id})
        const deleteMessages = await Message.deleteMany({room:room.name})

        res.status(200).json('Room Deleted')

    }
    catch(e){
        res.status(500).json('Cant delete Room')
    }

}


const GetUserRooms = async(req,res)=>{

    try{

        await req.user.populate({
            path:'rooms'
        })
        res.status(200).json(req.user.rooms)
    }
    catch(e){
        console.log(e);
        res.status(500).json(e)
    }
}


const SaveRoomAvatarPicture = async(req,res) =>{

    const {name} = req.params


    const avatar = req.file.buffer

    try{
        const responce = await Room.findOneAndUpdate({name,avatar})
        res.status(200).json('avatar saved')
    }
    catch(e){
        res.status(500).json('Unable to avatar')
    }
} 


const GetRoomAvatarPicture = async(req,res) =>{

    const {name} = req.params
  ;
    try{

            const room = await Room.findOne({name})
            res.set('Content-Type','image/jpg')
            res.send(room.avatar)

    }
    catch(e){
        console.log(e);
        res.status(500).json('Unable to get avatar')
    }
}

module.exports = {
    CreateRoom,
    UpdateRoom,
    DeleteRoom,
    GetUserRooms,
    GetAllRooms,
    SaveRoomAvatarPicture,
    GetRoomAvatarPicture
}