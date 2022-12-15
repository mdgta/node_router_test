import express from "express";
import {router as charactersRouter} from "./routes/characters.js";

const server = express();

server.use("/characters", charactersRouter);

const PORT = 5000;

server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});