const mongoose = require('mongoose');
const mongourl = "mongodb+srv://asifrizwana128:jx1TItmt5cBtkeIO@cluster0.vnb5qzr.mongodb.net/gofood?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // Fetch data from "food_items" collection
        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        const foodItemsData = await foodItemsCollection.find({}).toArray();
        global.food_items = foodItemsData;

        // Check if "categories" collection exists before fetching data
        const collections = await mongoose.connection.db.collections();
        const hasCategoriesCollection = collections.some(collection => collection.collectionName === "categories");

        if (hasCategoriesCollection) {
            // Fetch data from "categories" collection
            const foodCategoryCollection = mongoose.connection.db.collection("categories");
            const foodCategoryData = await foodCategoryCollection.find({}).toArray();
            global.foodCategory = foodCategoryData;
            console.log("Categories data fetched successfully");
        } else {
            console.log("Categories collection does not exist");
        }
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
};

// Do not close the connection here, let the connection be open for the server's lifetime

// Export the connectToMongoDB function
module.exports = connectToMongoDB;
