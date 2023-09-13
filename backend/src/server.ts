import express from 'express';
import cors from 'cors';
import mainRoutes from './routes';
import { sequelize } from './models';

const PORT: number = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(mainRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});