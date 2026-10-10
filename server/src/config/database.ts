import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export interface DBHealthState {
  connected: boolean;
  state: string;
  host?: string;
  name?: string;
}

let isConnected = false;

export const connectDatabase = async (): Promise<boolean> => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/deepika_portfolio';

  try {
    mongoose.set('strictQuery', true);

    mongoose.connection.on('connected', () => {
      isConnected = true;
      console.log('MongoDB connected successfully.');
    });

    mongoose.connection.on('error', (err) => {
      isConnected = false;
      console.error('MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('MongoDB disconnected.');
    });

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    return true;
  } catch (error: any) {
    isConnected = false;
    console.error('Failed to establish MongoDB connection:', error.message);
    return false;
  }
};

export const getDBState = (): DBHealthState => {
  const readyState = mongoose.connection.readyState;
  const states: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  return {
    connected: readyState === 1,
    state: states[readyState] || 'unknown',
    host: mongoose.connection.host || undefined,
    name: mongoose.connection.name || undefined,
  };
};
