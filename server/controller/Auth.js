const User = require("../model/User");
const bcrypt = require("bcrypt");

// Signup
exports.signup = async (req, res) => {
    try{
        const {name, email, password, confirmPassword} = req.body;
        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({
                success: false,
                message: "All Fields are Required"
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password must be Same"
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success: false,
                message: "User Already Exists, Please try Login"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userDetails = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        })

        return res.status(200).json({
            success: true,
            message: "User registered Successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Login
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body; 

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All Fields are Required"
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User doesn't Exists, please try signup"
            })
        }

        if(await bcrypt.compare(password, user.password)){
            return res.status(200).json({
                success: true,
                message: "Logged in Successfully",
                user
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Invalid Email id or Password"
            })
        }
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// getUser
exports.getUser = async (req, res) => {
    try{
        const {email} = req.body;

        if(!email){
            return res.status(400).json({
                success: false,
                message: "All Fields are Required"
            })
        }

        const user = await User.findOne({email});
        return res.status(200).json({
            success: true,
            message: "User Details Fetched",
            user
        })
        
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}