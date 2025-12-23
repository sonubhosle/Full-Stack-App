const Address = require('../Models/Address');

const deleteAddressById = async (id) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(id);
    if (!deletedAddress) {
      throw new Error('Address not found');
    }
    return deletedAddress;
  } catch (error) {
    throw error;
  }
};

const updateAddressById = async (id, addressData) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(id, addressData, { new: true });
    if (!updatedAddress) {
      throw new Error('Address not found');
    }
    return updatedAddress;
  } catch (error) {
    throw error;
  }
};


const getAddressesByUserId = async (userId) => {
  try {
    const addresses = await Address.find({ user: userId }); 
    return addresses;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  deleteAddressById,
  getAddressesByUserId,
  updateAddressById,
};
