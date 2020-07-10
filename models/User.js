// const mongoose = require("mongoose");
// const Recipe = require('./Recipe')

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
//     },
//     password: { type: String, required: true, select: false },
//     recipes: [Recipe.schema],
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;