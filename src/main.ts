import "reflect-metadata";
import "dotenv/config";
import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import passport from "./config/passport";
import knex from "./db/knex";
import loggerMiddleware from "./middlewares/logger.middleware";

const app = express();

app.use(express.json());

knex
  .raw("SELECT 1")
  .then(() => console.log("Database connection established"))
  .catch((err) => {
    console.error("Failed to establish database connection:", err);
    process.exit(1);
  });

app.use(loggerMiddleware);
app.use("/api/auth", authRoutes);
app.use(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  userRoutes
);

app.listen(process.env.PORT || 3000, () => console.log("Server is running!"));
