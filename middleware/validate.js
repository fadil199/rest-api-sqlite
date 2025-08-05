const Schema = require("./schema");


module.exports = () => {
    return (req, res, next) => {
        const { error } = Schema.schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
    }
}