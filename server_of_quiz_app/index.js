const express=require('express');
const dotenv=require('dotenv');

const connectDB=require('./config/db')

const testRouter=require('./routes/testRoutes');
const quesRouter=require('./routes/quesRoute');
const userRouter=require('./routes/userRoutes');
const reportRouter=require('./routes/reportRoute');

dotenv.config();

const app=express();
connectDB()

app.use(express.json());

const PORTS=process.env.PORT;

app.use('/api/user',userRouter)
app.use('/api/test',testRouter);
app.use('/api/ques',quesRouter);
app.use('/api/report',reportRouter);

app.listen(PORTS,()=>console.log(`server started at port ${PORTS}`))