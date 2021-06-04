const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");

const fs = require("fs");

const contentService = require("../Service/ContentService")

const User = require("../Model/User");
const Content = require("../Model/content");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, `../src/pages/content`));

app.get("/write", ({ session: { user } }, res) => {
    if (user === null) {
        alert("로그인한 유저만 이용가능합니다");
        res.redirect("/user/login");
    };

    const parsedUser = user;
    parsedUser.__proto__ = User.prototype;

    res.render("write", { user: user });
});

app.get("/:id", async (req, res) => {
    const prevContent = await contentService.selectPrevContent(req.params.id);
    const nextContent = await contentService.selectNextContent(req.params.id);

    const prevId = Object.values(prevContent ?? {})[0] ?? null;
    const nextId = Object.values(nextContent ?? {})[0] ?? null;

    const renderData = {
        content: await contentService.select(req.params.id),
        prev: prevId,
        next: nextId,
        images: []
    };

    if(fs.existsSync(`src/resources/images/contents/${req.params.id}`)) {
        fs.readdir(`src/resources/images/contents/${req.params.id}`, (err, files) => {
            files.forEach(file => {
                renderData.images.push(file);
            });

            res.render("detail", renderData);
        });
    }else {
        res.render("detail", renderData);
    };
});

app.post("/write", async (req, res) => {
    if (req.session.user === null) {
        alert("로그인한 유저만 게시글을 등록할 수 있습니다");

        return res.redirect("/user/login");
    };

    const nextId = await contentService.selectNextId();
    const isDirectory = fs.existsSync(`src/resources/images/contents/${nextId}`);

    if(!isDirectory) fs.mkdir(`src/resources/images/contents/${nextId}`, () => {});

    multer({
        storage: multer.diskStorage({
            destination(req, file, cb) {
                cb(null, `src/resources/images/contents/${nextId}`);
            },
            filename(req, file, cb) {
                cb(null, `${Date.now()}_${file.originalname}`);
            },
        })
    }).single("file")(req, res, () => {
        const isUploaded = fs.existsSync(req.file.path);

        if(isUploaded) {
            contentService.write(new Content(...Object.values(req.body)));

            res.redirect("/");
        };
    });
});

module.exports = app;