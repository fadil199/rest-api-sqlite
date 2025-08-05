const Joi = require("joi");

module.exports = {
           schema : Joi.object({
             username: Joi.string().min(6).message("Username minimmal 6 huruf!!!").required(),
             email: Joi.string().email().required(),
             password: Joi.string().pattern(new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})")).message("Kata sandi min 6 karakter, termasuk minimal 1 huruf kecil [a-z], minimal 1 huruf besar [A-Z], dan minimal 1 karakter numerik [0-9]").required(),
             confirmPassword: Joi.string().required()
         })

         //schema.validate(req.body);

        //  const { error } = schema.validate(req.body);
        //  if (error) {
        // return res.status(400).json({ error: error.details[0].message });
        // }
        // next();
}