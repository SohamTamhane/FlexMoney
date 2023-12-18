const User = require("../model/User");

exports.admission = async (req, res) => {
    try{
        const {name, email, age, mobile, month, year, batch} = req.body;
        console.log(name, email, age, mobile, month, year, batch);
        if(!name || !email || !age || !mobile || !month || !year || !batch){
            return res.status(400).json({
                success: false,
                message: "All Fields are Required"
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User Doesn't Exists, Please try register first to confirm your Admission"
            })
        }
        if(user.batch){
            return res.status(400).json({
                success: false,
                message: "You can Change your Batch next Month"
            })
        }

        const d1 = new Date();
        // const updatedPayment = [...user.payment, {amount: payment.amount, paymentStatus: payment.paymentStatus, date: payment.date}]
        const response = await User.findOneAndUpdate({email}, {
            name: name,
            age: age,
            mobile: mobile,
            date: {month: month, year: year},
            batch: batch,
            // payment: updatedPayment, 
        })

        return res.status(200).json({
            success: false,
            message: "Payment Successful and Admission Done Successfully"
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