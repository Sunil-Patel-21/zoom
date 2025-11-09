import dotenv from "dotenv/config";
import express from "express"
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT || 6000;

app.set("port", (process.env.PORT || 5000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);


const server = createServer(app);
const io = connectToSocket(server);

app.get("/", (req, res) => {
    return res.json({
        message: "hello",
        status: 200
    })
})

const start = async () => {
    try {
        const connectionDB = await mongoose.connect(process.env.MONGOBD_URI);
        console.log(`MONGO Connected DB host : ${connectionDB.connection.host} `);
    } catch (error) {
        console.log("Error in db connection... ",error);
        
    }
    server.listen(app.get("port"), () => {
        console.log(`server is running on port ${app.get("port")}`);
    })
}

start();