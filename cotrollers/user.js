const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const roles = require("../utils/roles");

const { secret_key } = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            const {
                username,
                email,
                password,
                confirmPassword
            } = req.body;

            const existUsername = await User.findOne({ where: { username }});

            if (existUsername)
            {
                return res.status(400).json({
                    status: false,
                    message: `Username ${username} sudah digunakan!`
                })
            }

            const existEmail = await User.findOne({ where: { email }});

            if (existEmail)
            {
                return res.status(400).json({
                    status: false,
                    message: `Email ${email} sudah digunakan!`
                })
            }

            if(!validator.isEmail(email))
            {
                return res.status(400).json({
                    status: false,
                    message: `Email ${email} tidak valid!`
                })
            }

            let enc = new RegExp(
                "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
            )

            let check = enc.test(enc);
            if (!check)
            {
                return res.status(400).json({
                    status: false,
                    message: "Kata sandi min 6 karakter, termasuk minimal 1 huruf kecil [a-z], minimal 1 huruf besar [A-Z], dan minimal 1 karakter numerik [0-9]"
                })
            }

            if (password != confirmPassword)
            {
                return res.status(400).json({
                    status: false,
                    message: "Kata sandi dan konfirmasi kata sandi tidak sama!"
                })
            }

            const passHash = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email,
                role: roles.user,
                password: passHash
            })

            return res.status(200).json({
                status: true,
                message: "Akun berhasil dibuat",
                data: {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                }
            })

        } catch (err) {
            next(err)
        }
    },
    login: async (req, res, next) => {
        try {
            const {
                email,
                password
            } = req.body;

            const check = await User.findOne({ where: { email }});
            if (!check)
            {
                return res.status(400).json({
                    status: false,
                    message: `Akun dengan email ${email} tidak ditemukan!`
                })
            }

            const pass = await bcrypt.compare(password, check.password);

            if (!pass)
            {
                return res.status(400).json({
                    status: false,
                    message: "Kata sandi salah!"
                })
            }

            const payload = {
                id: check.id,
                username: check.username,
                email: check.email,
                role: check.role
            }

            const token = jwt.sign(payload, secret_key);

            return res.status(200).json({
                status: true,
                message: "Akun berhasil ditemukan",
                data: {
                    username: check.username,
                    email: check.email,
                    role: check.role,
                    token: token
                }
            })
        } catch (err) {
            next(err)
        }
    },
    me: async (req, res, next) => {
        try {
            const user = req.user;

            return res.status(200).json({
                status: true,
                message: "Autentifikasi berhasil",
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            })
            
        } catch (err) {
            next(err)
        }
    }
}