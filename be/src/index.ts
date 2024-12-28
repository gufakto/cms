import express, { NextFunction, Request, Response } from 'express';
import { createApp } from './createApp';


const app = createApp();

const PORT = 3000;

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("ERROR HANDLER: ", err.stack); // Log the error
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error'); // Gracefully handle errors
    }
  });
app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
})