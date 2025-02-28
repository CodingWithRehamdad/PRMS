const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const createAdmin = async (req, res) => {
  const { username, email, phone, address, password, role, gender, age} = req.body;

  try {
    const admin = new User({ username, email, phone, address, password, role, gender, age});
    await admin.save();
    const token = generateToken(admin)
    res.status(201).json({ message: 'Admin created successfully!', admin, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAdmin = async(req, res) => {
  const { id } = req.params
  try {
    const admin = await Admin.findByIdAndUpdate({_id: id}, req.body, {new: true})
    if (!admin) {
      return res.status(404).json({message: "Admin not found"})
    }
    res.status(200).json({message: "Admin updated successfully"})
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message})
  }
};

const login = async(req, res) =>{
  const { email, password } = req.body
  try {
    const user = await User.findOne({email})
    if (!user) {
      return res.status(401).json({message: "Invalid Credentials"})
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch) {
      return res.status(401).json({message: "Invalid Credentials"})
    }

    const token = generateToken({userId: user._id, role: user.role})
    res.status(200).json({message: `Welcome ${user.role}`, user, token})
  } catch (error) {
    res.status(500).json({message: "Server errror", error: error.message})
  }
};

const logout = async (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
};

const getProfile = async (req, res) => {
  try {
      res.status(200).json(req.user);
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { 
  createAdmin,
  updateAdmin,
  login,
  logout,
  getProfile
};