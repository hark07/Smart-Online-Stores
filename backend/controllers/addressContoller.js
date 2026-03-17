import Address from "../models/Address.js";

// Add Address : /api/address/add
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    const newAddress = await Address.create({ ...address, userId: req.userId });

    res.json({ success: true, message: "Address added successfully", newAddress });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// Get Address : /api/address/get
export const getAddress = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Not Authorized" });
    }

    const addresses = await Address.find({ userId: req.userId });
    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};
