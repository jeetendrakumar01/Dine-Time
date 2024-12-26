import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.FRONTEND_URI, {
      dbName: "RESTAURANT",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log(`Some error occured while connecing to database: ${err}`);
    });
};
