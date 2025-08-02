const jwt = require("jsonwebtoken");
const { secret_key } = process.env;

module.exports = (roles = []) => {
    if (typeof roles === "string")
    {
        roles = [roles];
    }

    return (req, res, next) => {
        const token = req.headers["authorization"];
        if (!token || token.length < 209 || token.length > 209)
        {
            return res.status(400).json({
                status: false,
                message: "Tidak terotorisasi atau token salah!"
            })
        }

        const payload = jwt.verify(token, secret_key);
        req.user = payload;

        if (roles.length > 0 && !roles.includes(payload.role))
        {
            return res.status(400).json({
                status: false,
                message: "Tidak terotorisasi"
            })
        }
        next();
    }
}