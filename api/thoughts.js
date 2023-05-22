
const router = require('express').Router()
const Thought = require("../models/thought")
const User = require("../models/user")

router.post("/:userId", async (req, res) => {
    const thought = new Thought(req.body)
    thought.save().then((data) => { 
        console.log(data)
        return User.findOneAndUpdate({ _id : req.params.userId }, {$push: { thoughts: data._id }})
        // res.send('successful') 
        }).then(() => res.send('successful'))
        .catch(err =>

        {
            console.log(err)
            res.send('error')
        } )
    console.log(req.body)
    
})

router.get("/", async (req, res) => {
    await Thought.find({}).then((thoughts) => {
        res.json(thoughts)
    }).catch((err) => {
        res.status(500).send(err.message)
    })
})

router.get("/:id", async (req, res) => {
    console.log(req.params.id)
    await Thought.findById(req.params.id)
        // .populate({ path: "friends" })
            .then((thought) => {
                res.json(thought)
    })
})

router.put("/:id", async (req, res) => {
    await Thought.findByIdAndUpdate(req.params.id, req.body).then((thought) => {
        res.json(thought)
    })
})

router.delete("/:id", async (req, res) => {
    await Thought.findByIdAndDelete(req.params.id).then((thought) => {
        res.json(thought)
    })
})

router.post("/:thoughtId/reactions", async (req, res) => {
    await Thought.findByIdAndUpdate(req.params.thoughtId, {
        $push: { reactions: req.body }
    }).then((thought) => {
        res.json(thought)
    })
})

router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
    await Thought.findByIdAndUpdate(req.params.thoughtId, {
        $pull: { reactions: { reactionId: req.params.reactionId }}
    }).then(() => {
        res.send('reaction deleted successfully')
    })
})
module.exports = router