const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config()

mongoose.set('strictQuery', true);
const path = require("path"); 
const app = express();

const advertRoutes = require('./routes/advert-routes');
const userRoutes = require("./routes/user");
const stagesRoutes = require("./routes/stages-routes");
const etudiantsRoutes = require("./routes/etudiants-routes");
const employeursRoutes = require("./routes/employeurs-routes");
const authRoutes = require("./routes/auth-routes");
const HttpErreur = require("./models/http-erreur");

app.use(bodyParser.json());

app.use((requete, reponse, next) =>{
  reponse.setHeader("Access-Control-Allow-Origin", "*");
  reponse.setHeader("Access-Control-Allow-Headers", "*");
  reponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// Place authentication routes before the generic 404 handler and static file serving middleware
app.use("/api/stages", stagesRoutes);
app.use("/api/etudiants", etudiantsRoutes);
app.use("/api/employeurs", employeursRoutes);
app.use("/api/user", userRoutes);
app.use("/api/advert", advertRoutes);



app.use(express.static(path.join(__dirname, "client/build")));

app.use((requete, reponse, next) => {
  return next(new HttpErreur("Route non trouvée", 404));
});

app.get("*", (requete, reponse) => {
  reponse.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.use((error, requete, reponse, next) => {
  if (reponse.headerSent) {
    
    return next(error);
  }
  reponse.status(error.code === 'ENOENT' ? 500 : error.code || 500);

  reponse.json({
    message: error.message || "Une erreur inconnue est survenue",
  });
  console.log(error)
  
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT);
    console.log('connected to db & listening on port', process.env.PORT);
  })
  .catch(erreur => {
    console.log(erreur);
  });
