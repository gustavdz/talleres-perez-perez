const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const http = require("http");
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const customerRoutes = require("./routes/customerRoutes");
const repairRoutes = require("./routes/repairRoutes");

dotenv.config();

connectDB();
const app = express();
const server = http.createServer(app);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//CORS
//permitir el acceso o llamadas ajax al api desde cualquier frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //cualquier frente puede hacer peticiones ajax
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Allow", "*");
  next();
});

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/repairs", repairRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
