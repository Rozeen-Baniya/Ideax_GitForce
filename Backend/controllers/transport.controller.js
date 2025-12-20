const Transport = require("../models/transport.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerTransport = async (req, res) => {
  try {
    const {
      vehicleNumber,
      driverName,
      driverLicenseNumber,
      contactNumber,
      route,
      capacity,
      driverPermitProof,
      transportCompany,
    } = req.body;

    // Basic validation
    if (
      !vehicleNumber ||
      !driverName ||
      !driverLicenseNumber ||
      !contactNumber ||
      !route ||
      !capacity ||
      !driverPermitProof ||
      !transportCompany
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (capacity < 1 || capacity > 100) {
      return res
        .status(400)
        .json({ message: "Capacity must be between 1 and 100." });
    }
    // Check for existing transport with same vehicle number or login code
    const existingTransport = await Transport.findOne({
      $or: [{ vehicleNumber }],
    });
    if (existingTransport) {
      return res.status(400).json({
        message: "The transport exists. Use your login code to login.",
      });
    }

    const getLoginCode = () => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      return code;
    };

    const code = getLoginCode();

    const cryptedCode = await bcrypt.hash(code, 10);

    // Create new transport
    const newTransport = new Transport({
      vehicleNumber,
      driverName,
      driverLicenseNumber,
      contactNumber,
      route,
      capacity,
      driverPermitProof,
      transportCompany,
      loginCode: cryptedCode,
    });

    await newTransport.save();
    res.status(201).json({
      message: "Transport registered successfully.",
      transport: newTransport,
    });
  } catch (error) {
    console.error("Error registering transport:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.loginTransport = async (r, rs) => {
  try {
    const { loginCode, driverLicenseNumber } = r.body;
    console.log(r.body);

    if (!loginCode || !driverLicenseNumber) {
      return rs.status(400).json({
        message: "Login code and driver license number are required.",
      });
    }
    const transport = await Transport.findOne({
      driverLicenseNumber,
    });

    const isMatch = await bcrypt.compare(loginCode, transport.loginCode);
    if (!isMatch) {
      return rs
        .status(401)
        .json({ message: "Invalid login code or driver license number." });
    }
    const token = jwt.sign(
      { transportId: transport._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h",
      }
    );
    rs.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error logging in transport:", error);
    rs.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.verifyDriverLogin = async (r, rs) => {
  try {
    const token = r.body.token;
    var decoded;
    try {
      var decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return rs.status(401).json({ message: "Invalid access." });
    }
    const transport = await Transport.findById(decoded.transportId);
    if (!transport) {
      return rs.status(401).json({ message: "Invalid access." });
    }
    rs.status(200).json({
      message: "Login successful.",
      driverName: transport.driverName,
      vehicleNumber: transport.vehicleNumber,
    });
  } catch (error) {
    console.error("Error verifying driver login:", error);
    rs.status(500).json({ message: "Server error. Please try again later." });
  }
};
