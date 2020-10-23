const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose"); //use mongodb
const path = require("path");
const cors = require("cors");
// importing routes

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
//environment variables
env.config();

//mongodb connection
//mongodb+srv://admin:<password>@cluster0.v7wam.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.v7wam.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  });
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello from server",
  });
});
app.post("/data", (req, res, next) => {
  res.status(200).json({
    message: req.body,
  });
});

//middleware
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(express.json()); //pass the data
app.use("/api", authRoutes); //call API from the user routes
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running in port ${process.env.PORT}`);
});
