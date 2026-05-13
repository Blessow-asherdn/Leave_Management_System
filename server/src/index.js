import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");

    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    });
})
.catch((err)=>{
    console.error(err);
});
