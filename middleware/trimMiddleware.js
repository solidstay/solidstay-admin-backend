const trimMiddleware = (req, res, next) => {
    const trimStrings = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].trim();
            } else if (Array.isArray(obj[key])) {
                obj[key] = obj[key].map(item =>
                    typeof item === 'string' ? item.trim() : item
                );
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                trimStrings(obj[key]);
            }
        }
    };

    trimStrings(req.body);
    trimStrings(req.query);
    trimStrings(req.params);

    next();
};

module.exports = trimMiddleware;