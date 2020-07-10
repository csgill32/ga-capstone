const mongoose = require("mongoose");
const Ingredient = require('./Ingredient');

const recipeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        directions: { type: String },
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        // },
        ingredients: [Ingredient.schema],
    },
    { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;