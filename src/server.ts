import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

const port = 5000;

let server:Server;

const startServer = async() => {
    
  try {
      await mongoose.connect('mongodb+srv://library-management:library-management@cluster0.xek05.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0')

    server = app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})

    
  } catch (error) {
    console.log(error)
  }

}

startServer();