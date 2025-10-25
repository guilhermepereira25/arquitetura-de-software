import express from 'express';
import filmeRoutes from './routes/filmeRoutes.js';
import atorRoutes from './routes/atorRoutes.js';
import generoRoutes from './routes/generoRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', filmeRoutes);
app.use('/', atorRoutes);
app.use('/', generoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});