import express from 'express';
import orderRouter from './routes/OrderRoute.js';

const app = express();

app.use(express.json());

app.use("/order", orderRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});