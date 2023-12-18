// isUser
exports.isUser = async (req, res, next) => {
    try{
        if(req.body.role !== "User"){
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Users Only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        if(req.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a Protected Route for Admin Only"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}