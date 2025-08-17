import 'dotenv/config';
import { connectDB } from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGO_URL || '';

await connectDB(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
