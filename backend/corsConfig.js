// corsConfig.js
import cors from 'cors';

const corsOptions = {
  origin: '*', // testing ke liye sab allow, production mein frontend URL daalna better hai
  credentials: true,
};

export default cors(corsOptions);
