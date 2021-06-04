const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

const User = require("./src/resources/Model/User");

const userRouter = require("./src/resources/Controller/UserController");
const contentRouter = require("./src/resources/Controller/ContentController");

app.use(session({
    secret: "cat",
    resave: false,
    saveUninitialized: true,
}));
app.use("/user", userRouter);
app.use("/content", contentRouter);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, `src/pages/`));

app.get("/", ({ session: { user }}, res) => {
    if(user?._id === undefined) return res.render("index");

    const parsedUser = user;
    parsedUser.__proto__ = User.prototype;
    
    res.render("index", {user: parsedUser});
});
app.get("/image/:directory/:id/:file", (req, res) => {
    res.set('Content-Type', 'image/jpeg');
    res.sendFile(`${__dirname}/src/resources/images/${req.params.directory}/${req.params.id}/${req.params.file}`)
});

app.listen(3000);