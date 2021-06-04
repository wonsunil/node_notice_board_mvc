const contentRepository = require("../Repository/ContentRepository");

class ContentService{
    write = content => contentRepository.write(content);
    select = async id => await contentRepository.findById(id);
    selectNextId = async () => JSON.parse(JSON.stringify(await contentRepository.findNextId())).id + 1;
    selectPrevContent = async id => await contentRepository.findPrevContent(id);
    selectNextContent = async id => await contentRepository.findNextContent(id);
    selectAll = async () => await contentRepository.findAll();
};

module.exports = new ContentService();