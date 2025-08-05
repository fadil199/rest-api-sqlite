const { rateLimit } = require("express-rate-limit");

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 menit
//     max: 5, // Batas setiap IP adalah 100 permintaan dalam 15 menit
//     message: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti',
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   });

//   module.exports = limiter;

module.exports = {
        rl : rateLimit({
            windowMs: 15 * 60 * 1000, // 15 menit
            max: 5, // Batas setiap IP adalah 100 permintaan dalam 15 menit
            message: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti',
            standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        })
}