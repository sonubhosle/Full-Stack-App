const User_Service = require('../Services/User-Service');
const JWT_PROVIDER = require('../Config/JWT');
const bcrypt = require('bcrypt');
const Cart_Services = require('../Services/Cart-Services');
const { sendEmail } = require('../Config/email');

// REGISTER
const register = async (req, res) => {
  try {
    // Photo URL from Cloudinary
    const photoUrl = req.file ? req.file.path : '';

    // Convert req.body to plain object (important for multipart/form-data)
    const body = Object.assign({}, req.body);
    const { name, surname, mobile, email, password, confirmPassword } = body;

    // Check required fields
    if (!name || !surname || !mobile || !email || !password || !confirmPassword) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).send({
        message: "Password must be at least 8 characters, include uppercase, number, and symbol"
      });
    }

    // Password match check
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).send({ message: "Mobile number must be 10 digits" });
    }

    // Prepare user data
    const userData = { name, surname, mobile, email, password, confirmPassword, photo: photoUrl };

    // Create user in DB
    const user = await User_Service.createUser(userData);

    // Generate JWT
    const jwt = JWT_PROVIDER.generateToken(user._id);

    // Create empty cart for user
    await Cart_Services.createCart(user);

    return res.status(200).send({
      jwt,
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { password, email } = req.body;
  
  try {
    let user;
if (email) user = await User_Service.findUserByEmail(email);
if (!user) return res.status(404).send({ message: 'User not found.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send({ message: 'Invalid Password' });

    const jwt = JWT_PROVIDER.generateToken(user._id);

    return res.status(200).send({
      jwt,
      message: 'Login Success',
      userName: user.userName,
      photo: user.photo,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).send({ message: "Email is required" });

    const resetToken = await User_Service.setResetPasswordToken(email);

    // Send email with reset link
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const html = `<p>You requested a password reset.</p>
                  <p>Click this link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`;

    await sendEmail(email, 'Reset Your Password', html);

    return res.status(200).send({ message: "Reset password link sent to email" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  try {
    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).send({ message: "Token and passwords are required" });
    }

    const user = await User_Service.resetPassword(token, newPassword, confirmPassword);

    return res.status(200).send({ message: "Password reset successfully", user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { register, login, forgotPassword, resetPassword };
