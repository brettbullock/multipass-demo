const config = require("config");
const mongoose = require("mongoose");
const usersRoute = require("./routes/users.route");
const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();


//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

//connect to mongodb
mongoose
  .connect("mongodb://localhost/nodejsauth", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..." + err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
//use users route for api/user
app.use("/api/users", usersRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));