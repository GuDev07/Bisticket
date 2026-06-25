import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import ticketRouter from './routes/ticket.routes';

const app = express();

app.use(cors())
app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/tickets', ticketRouter);

export default app;