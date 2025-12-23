const Address_Service = require('../Services/Address-Service');

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  try {
    await Address_Service.deleteAddressById(id);
    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAddress = async (req, res) => {
  const { id } = req.params;
  const addressData = req.body;
  try {
    const updatedAddress = await Address_Service.updateAddressById(id, addressData);
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAddressesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const addresses = await Address_Service.getAddressesByUserId(userId);
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  deleteAddress,
  updateAddress,
  getAddressesByUser,
};
