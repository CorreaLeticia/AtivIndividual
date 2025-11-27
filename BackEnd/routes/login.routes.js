const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (email !== "admin@gmail.com" || senha !== "1234") {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign(
        { email },
        process.env.SECRET_JWT,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

module.exports = router;
