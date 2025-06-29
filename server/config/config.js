import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/moviedb',
    nodeEnv: process.env.NODE_ENV || 'development'
};

export default config; 