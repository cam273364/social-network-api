const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    userName: {
        type: String,
        required: true
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleString
    }
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (date) => date.toLocaleString()

    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
})

thoughtSchema.virtual("reactionCount").get(() => this.reactions.length)
const Thought = model('Thought', thoughtSchema)
module.exports = Thought