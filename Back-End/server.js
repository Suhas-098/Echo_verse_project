import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/messages.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/auth",authroutes);
app.use("/api/messages",messagesRoutes);




// app.get('/', (req, res) => {
//   res.send('🚀 Server is up and running!');
// });

app.listen(PORT,()=>{
console.log(` The Server is Running on Port ${PORT}.`)
});
 