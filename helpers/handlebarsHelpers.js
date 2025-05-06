const Handlebars = require('handlebars');

Handlebars.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});