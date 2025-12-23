
const User_Service = require('../Services/User-Service')


const getUserProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];

        if (!jwt) {
            return res.status(401).send({ message: 'Token Not Found' });
        }

        const user = await User_Service.getUserProfileByToken(jwt);


        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getAllUser = async (req, res) => {
    try {

        const users = await User_Service.getAllUsers();

        return res.status(200).send(users)

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = { ...req.body };

    if (req.file) {

      updateData.photo = req.file.path || req.file.filename; 
    }

    for (let key in updateData) {
      if (updateData[key] === '') {
        updateData[key] = undefined;
      }
    }

    const updatedUser = await User_Service.updateUserProfile(userId, updateData);

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getUserProfile, getAllUser,updateProfile };