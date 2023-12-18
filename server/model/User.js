const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        required: true,
        default: "User"
    },
    age: {
        type: Number,
        trim: true
    },
    // payment: [
    //     {
    //         amount: {
    //             type: Number,
    //             required: true
    //         },
    //         paymentStatus: {
    //             type: Boolean,
    //             required: true
    //         },
    //         date: {
    //             type: String
    //         }
    //     }
    // ],
    date: {
        month: {
            type: String,
        },
        year: {
            type: Number
        }
    },
    batch: {
        type: String,
    }
})

module.exports = mongoose.model("User", userSchema);