const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();

// CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Reemplaza con el origen de tu aplicación React
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type', // Permitir el encabezado Content-Type
  credentials: true, // Habilitar credenciales (si es necesario)
  optionsSuccessStatus: 200, // Configura el código de estado de éxito para OPTIONS
};

app.use(cors(corsOptions)); // Aplica las opciones CORS

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use(require("./routes/index"));

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000")});