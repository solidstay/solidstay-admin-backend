const fs = require('fs');
const handlebars = require('handlebars');

const generateHTML = async (data, templatePath) => {
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateContent);
    const html = template({ data });
    return html;
}

module.exports = {
    generateHTML
}
