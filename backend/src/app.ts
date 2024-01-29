// src/app.ts
import express from 'express';
import cors from 'cors';
import sequelize from './config/sequelize';
import authRoutes from './routes/authRoutes';


const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync models with the database
    await sequelize.sync();

    console.log('Models have been synchronized with the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Use loginRoutes for login-related routes
app.use(authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, this is the homepage!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
