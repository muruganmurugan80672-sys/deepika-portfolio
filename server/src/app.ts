import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import healthRoutes from './routes/healthRoutes';
import projectRoutes from './routes/projectRoutes';
import skillRoutes from './routes/skillRoutes';
import educationRoutes from './routes/educationRoutes';
import certificationRoutes from './routes/certificationRoutes';
import contactRoutes from './routes/contactRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, postman) or matching allowedOrigin
      if (!origin || origin === allowedOrigin || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during dev flexibility
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Swagger UI Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api', healthRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/contact', contactRoutes);

// Root route redirect to docs or health
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to Deepika's Full-Stack Developer Portfolio API",
    documentation: '/api-docs',
    health: '/api/health',
  });
});

// Centralized error handling
app.use(errorHandler);

export default app;
