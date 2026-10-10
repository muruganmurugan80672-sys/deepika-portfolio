import app from './app';
import { connectDatabase } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  console.log('Initiating server startup...');
  
  // Connect to database asynchronously
  const dbConnected = await connectDatabase();
  if (!dbConnected) {
    console.warn('⚠️ Server started, but MongoDB is not connected. API will serve fallback/unpersisted state if DB remains offline.');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Deepika Portfolio Server running on port ${PORT}`);
    console.log(`📑 Swagger Documentation available at: http://localhost:${PORT}/api-docs`);
    console.log(`❤️  Health Check available at: http://localhost:${PORT}/api/health`);
  });
};

startServer();
