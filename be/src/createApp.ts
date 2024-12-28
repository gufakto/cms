import express, { Request, Response } from 'express';
import userRouter from "./routes/users"
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import { json } from 'body-parser';
import { errorHandler } from './middlewares/errors';
import { AppDataSource } from './data-source';
import authRoutes from "./routes/auth"
import cors from "cors";

export const createApp = () =>{
    AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
    const app = express();

    app.use(cors({
        origin: "*"
    }))

    app.use(json())
    app.use("/api", userRouter);
    app.use('/api/auth', authRoutes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput, {explorer: true}));
    // Error handling
    app.use(errorHandler);
    return app;
}