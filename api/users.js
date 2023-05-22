
const router = require('express').Router()
const User = require("../models/user")


router.post("/", async (req, res) => {
    const user = new User(req.body)
    user.save().then(() => res.send('successful')).catch(err =>
        {
            console.log(err)
            res.send('error')
        } )
    console.log(req.body)
    
})

router.get("/", async (req, res) => {
    await User.find({}).then((users) => {
        res.json(users)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})

router.get("/:id", async (req, res) => {
    console.log(req.params.id)
    await User.findById(req.params.id)
        .populate({ path: "friends" })
        .populate({ path: "thoughts" })
            .then((user) => {
                res.json(user)
    })
})

router.put("/:id", async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body).then((user) => {
        res.json(user)
    })
})

router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id).then((user) => {
        res.json(user)
    })
})

router.post("/:userId/friends/:friendId", async (req, res) => {
    console.log(req.params.userId, req.params.friendId)
    await User.findByIdAndUpdate(req.params.userId, {
        $push: { friends: req.params.friendId }
    }).then((user) => {
        res.json(user)
    })
})

router.delete("/:userId/friends/:friendId", async (req, res) => {
    await User.findByIdAndUpdate(req.params.userId, {
        $pull: { friends: req.params.friendId }
    }).then((user) => {
        res.json(user)
    })
})
//goal next time is to get not just id in friends array but get all users info



module.exports = router