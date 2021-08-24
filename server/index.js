import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import class_route from "./routes/class_route.js";

const app = express();
// app.use(cors());

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.options("*", cors());
app.use("/", cors(), class_route);

mongoose.connect(
	process.env.mongoURI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("Connected to MongoDB!");
	}
);

const server = app.listen(process.env.PORT || 5000, () => {
	const port = server.address().port;
	console.log(`Express is working on port ${port}`);
});
