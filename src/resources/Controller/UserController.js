const express = require("express");
const path = require("path");
const app = express();
const userService = require("../Service/UserService");
const User = require("../Model/User.js");

const page = url => path.join(__dirname, `../../../src/pages/account/${url}.html`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, `../src/pages/`));

app.get("/register", (req, res) => res.sendFile(`${page("register")}`));
app.get("/login", (req, res) => res.sendFile(`${page("login")}`));

app.get("/users", async (req, res) => res.send(await userService.selectAll()));
app.get("/:id", async (req, res) => res.send(await userService.select(req.params.id)));

app.post("/login", async (req, res) => {
    const { id, password } = req.body;

    const user = await userService.login(id, password);

    req.session.user = new User(...Object.values(user));
    req.session.save(() => res.redirect("/"));
});
app.post("/register", (req, res) => res.redirect("/user/login"));

module.exports = app;