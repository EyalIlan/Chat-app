const Message = require('../models/message')

//
const GetRoomMessages = async (req, res) => {
    
   
    try {
        
        const roomMessages = await Message.find({ room: req.query.room })
       
        res.status(200).json(roomMessages)

    }
    catch (e) {
        res.status(500).json('Unable to get messages')
    }
}

const GetSpecificMessage = async (req, res) => {



}

const SaveMessage = async (req, res) => {

    const { message, room,name,time } = req.body

    try {
        const NewMessage = new Message(
            {
                message,
                room,
                name,
                time,
                owner: req.user._id
            })

        await NewMessage.save()
        res.status(201).json('Message saved')
    }
    catch (e) {
        res.status(500).json('Unable to save message')
    }
}

const UpdateMessage = async (req, res) => {

    try {

        const message = await Message.findByIdAndUpdate(req.query.messageId, { message: req.body.message })

    }
    catch(e){
        res.status(500).json('message updated')
    }

}

const DeleteMessages = async (req, res) => {


    try {
        const message = Message.findByIdAndDelete(req.query.messageId)
        res.status(200).json('Message deleted')

    }
    catch (e) {
        res.status(500).json('Problem deleting message')
    }
}

module.exports = {
    GetRoomMessages,
    GetSpecificMessage,
    SaveMessage,
    UpdateMessage,
    DeleteMessages
}