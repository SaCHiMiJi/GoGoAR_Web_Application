const otpGenerator = require('otp-generator');
const OTP = require('../models/otpModel.js');
const User = require('../models/Creator.js')

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log(email);
    // Check if user is already present
    const checkUserPresent = await User.findOne({ creator_email: email });
    
    // The OTP should be used with existing account.
    if (!checkUserPresent) {
      return res.status(401).json({
        message: 'User is not exist.',
      });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    
    // send the otp.
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
