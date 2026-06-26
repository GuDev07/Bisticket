import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import ticketRouter from './routes/ticket.routes';
import 'dotenv/config'

const app = express();

const front = process.env.SERVER_FRONTEND;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}))

app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/tickets', ticketRouter);

export default app;