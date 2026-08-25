import express from "express";
import taskRouter from "./routes/taskRoute.js";
export const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/",taskRouter)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})


