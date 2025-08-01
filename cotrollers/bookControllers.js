const Books = require("../models/book")

module.exports = {
    registerBook: async (req, res, next) => {
        try {
            const {
                title,
                author,
                ISBN,
                genre,
                pubYear
            } = req.body;

            const exist = await Books.findOne({ where: {title} });
            if (exist)
            {
                return res.status(400).json({
                    status: false,
                    message: "Buku sudah ada!"
                })
            }

            const book = await Books.create({
                title,
                author,
                ISBN,
                genre,
                pubYear
            })

            return res.status(200).json({
                status: true,
                message: "Buku berhasil diinput!",
                data: {
                    title: book.title,
                    author: book.author,
                    ISBN: book.ISBN,
                    genre: book.genre,
                    pubyear: book.pubYear
                }
            })
        } catch (err) {
            next(err)
        }
    }
}