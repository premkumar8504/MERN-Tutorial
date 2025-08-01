// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const DB_PATH = "mongodb+srv://premkumar:prem1234@backend.njhh4gs.mongodb.net/airbnb?retryWrites=true&w=majority";

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');

const app = express();

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'session'
})

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(session({
  secret: "Prem Kumar learned Backend Development",
  resave: false,
  saveuninitialized: true,
  store
}))


app.use ((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
})
app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if(req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
})
app.use("/host", hostRouter)

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home',
    currentPage: 'index',
    isLoggedIn: req.isLoggedIn
  });
});

const PORT = 3000;


mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});