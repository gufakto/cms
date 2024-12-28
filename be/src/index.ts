import express from 'express';
import { createApp } from './createApp';


const app = createApp();

const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
})