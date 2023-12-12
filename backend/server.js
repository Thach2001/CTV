const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./Services/ConnectDBService");
const contactRoute = require("./Routes/ContactRoute");

require("dotenv").config();

// middleware apply cors add all request
app.use(cors());
// middleware get info from by req.body
app.use(express.json());

// connect database
connectDB();

app.use("/api/contacts", contactRoute);

app.listen(process.env.PORT, function () {
   console.log(`Server listen on port ${process.env.PORT}`);
});
