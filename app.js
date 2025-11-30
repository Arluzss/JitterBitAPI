import express from 'express';
import orderRouter from './routes/OrderRoute.js';
import { generateToken } from './utils/jwt.js';

const app = express();

app.use(express.json());

app.use("/order", orderRouter);

app.use("/genToken/:id", (req, res) => {
  const token = generateToken({genID: req.params.id});
  res.json({ token });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});