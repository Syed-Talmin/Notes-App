import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUser = await userModel.findOne({ email });

    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
    })

    user.password = undefined;
    user.__v = undefined;

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const {email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
      return res.status(400).json({
        success: false,
        message: "invalid credentials"
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn:"1d"
    })

    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
    })

    user.password = undefined;
    user.__v = undefined;

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
      token
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
}

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
}

export const userProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password -__v");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    return res.status(200).json({
      success: true,
      message: "User profile",
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
}