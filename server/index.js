import express from "express";
import cors from "cors";
import authRouter from  "./routes/jwtAuth.js";
import dashboardRouter from "./routes/dashboard.js";

const app=express();
const port=5000;


app.use(cors());
app.use(express.json());

app.use("/authentication", authRouter);

app.use("/dashboard", dashboardRouter); 



app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`);
});