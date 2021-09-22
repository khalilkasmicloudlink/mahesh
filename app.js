const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet")
const compression = require("compression")
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
const path = require("path");
require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const courseRoutes = require("./routes/course");
const videoRoutes = require("./routes/video");



// app
const app = express();



  

  
  
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
// middlewares
app.use(helmet());



app.use(compression())

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//   res.setHeader(
//     'Content-Security-Policy',
//     "default-src 'self'; font-src 'self';  script-src 'self'; style-src 'self'; frame-src 'self'"
//   );

//   next();
// });

app.use(express.static(path.join(__dirname, "hapus-aws-front/build")))



// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", courseRoutes);
app.use("/api", videoRoutes);


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "hapus-aws-front/build", "index.html"));
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// db
mongoose.connect(
  "mongodb+srv://mahi:0aQ8zcAuz4GhYVFf@cluster0.omqaw.mongodb.net/mvp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("DB Connected"));