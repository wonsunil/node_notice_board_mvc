module.exports = class Content{
    constructor(title, writer, content) {
        this._title = title;
        this._writer = writer;
        this._content = content;
    };

    get title() { return this._title; };
    get writer() { return this._writer; };
    get content() { return this._content; };
};