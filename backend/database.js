import mongoose, { Mongoose } from 'mongoose'
mongoose.connect("mongodb://localhost:27017/taskDB")
const connection = mongoose.connection;

connection.on("open", () =>{
    console.log("MongoDB conectado")
})

connection.on("disconnected", () =>{
    console.log("MongoDB desconectado")
})

connection.on("error", (error) =>{
    console.log("MongoDB internal server error", error)
})
