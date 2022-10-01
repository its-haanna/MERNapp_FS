import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { router as workoutsRoutes } from "./routes/workouts.js";

const app = express();

// import { MONGO_URI_LOCAL } from './db/db.js'
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/workouts', workoutsRoutes)

mongoose.connect(MONGO_URI).then(() => {
      app.listen(PORT, () => {
      console.log('connected to db and listening on port 4000')
        })
    })
    .catch((error) => {
  console.log(error)
})