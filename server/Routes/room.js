
const express = require('express')
const RoomController = require('../Controllers/room')
const { Auth } = require('../utils/middleware/auth')
const router = express.Router()


router.put('/',Auth,RoomController.UpdateRoom)

router.post('/',Auth,RoomController.CreateRoom)

router.delete('/',Auth,RoomController.DeleteRoom)

router.get('/',Auth,RoomController.GetUserRooms)

router.get('/rooms',Auth,RoomController.GetAllRooms)


module.exports = router