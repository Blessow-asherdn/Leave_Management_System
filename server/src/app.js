import express from 'express';
import cors from 'cors';

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import leaveBalanceRoutes from "./routes/leaveBalanceRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/leave-balances', leaveBalanceRoutes);

app.get('/',(req,res)=>{
    res.send("api running");
});

app.use(
  "/api/notifications",
  notificationRoutes
);
export default app;
