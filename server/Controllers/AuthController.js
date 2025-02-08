const User = require("../Models/UserModel.js");
const { createSecretToken } = require("../util/SecretToken.js");
const bcrypt = require("bcrypt");


// Signup Controller
module.exports.Signup = async (req, res,next) => {
    try {
        const { email, username, password, createdAt } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({ message: "User Already Exists" })
        }

        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(200)
            .json({ message: "User signed in successfully", success: true, user });
        next();
    } catch (error) {
        console.log(error);
    }
}

// Login Controller

module.exports.Login = async (req, res,next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "Incorrect Email or password" });
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: "Incorrect Email or password" });
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        res
            .status(200)
            .json({ message: "User signed in successfully", success: true, user });
    } catch (error) {
        console.log(error);
    }
}