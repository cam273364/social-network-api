const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
              return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
          },
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
        
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
})
userSchema.virtual("friendCount").get(() => this.friends.length)
const User = model('User', userSchema)
module.exports = User