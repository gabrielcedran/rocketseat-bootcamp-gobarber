import express from "express";
import cors from "cors";
import uploadConfig from "@config/upload";
import "@shared/infra/typeorm";
import routes from "./routes";
import "reflect-metadata";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.destinationPath));
app.use(routes);

app.listen(3333, () => {
  console.log("Server started!");
});