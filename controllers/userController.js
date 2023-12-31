const User = require("../models/user");
const jwt = require('jsonwebtoken');


const createToken = (_id) => {

    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

// login user

const loginUser = async (req, res) => { 
    const {email, password} = req.body;

    try {

        const user = await User.login(email, password);

        // create token
        const token = createToken(user._id)

        res.status(200).json({email, token})

    } catch (error) {

        res.status(400).json({ error: error.message })
        console.log(error);
    }
}

// signup user

const signupUser = async (req, res) => { 

    const {email, password, name} = req.body;

    try {

        const user = await User.signup(email, password, name);

        // create token
        const token = createToken(user._id)

        res.status(200).json({email, token})

    } catch (error) {

        res.status(400).json({ error: error.message })
        console.log(error);
    }

}

module.exports = { signupUser, loginUser }