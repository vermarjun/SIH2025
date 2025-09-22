import express, {Request, Response} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./util/database.util";

// Import Routes
import userRoutes from "./router/user.router"

// Config
import { API_PREFIX, PORT } from "./config";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Health check endpoint
app.get(`${API_PREFIX}/health`, (req: Request, res: Response): Response => {
    return res.status(200).json({
        message: "I eat apple everyday :)",
        success: true
    });
});

// API Routes
app.use(`${API_PREFIX}/users`, userRoutes);

app.listen(PORT, async ()=>{
    try {
        await connectDB();
        console.log(`Server running on port ${PORT}`);
        console.log(`Socket.IO server is ready for connections`);
    } catch (error) {
        console.error('Failed to connect to database:', error);
    }
})


