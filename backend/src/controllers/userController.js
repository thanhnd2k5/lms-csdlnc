const User = require('../models/userModel');
const path = require('path');
const fileHelper = require('../utils/fileHelper');
const bcrypt = require('bcrypt');

const getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Không tìm thấy thông tin người dùng' });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

const updateProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Không tìm thấy thông tin người dùng' });
    }

    const userId = req.user.id;
    const { full_name, bio } = req.body;
    
    if (full_name) {
      await User.updateFullName(userId, full_name);
    }

    if (bio !== undefined) {
      await User.updateBio(userId, bio);
    }

    res.json({
      message: 'Cập nhật thông tin thành công',
      user: { full_name, bio }
    });
  } catch (error) {
    console.error('Error in updateProfile:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Không tìm thấy thông tin người dùng' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Không có file được tải lên' });
    }

    const userId = req.user.id;

    // Kiểm tra và xóa avatar cũ nếu có
    const currentAvatar = await User.getCurrentAvatar(userId);
    if (currentAvatar) {
      await fileHelper.deleteFile(currentAvatar);
    }

    // Tạo đường dẫn cho avatar mới
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    
    // Cập nhật avatar trong database
    await User.updateAvatar(userId, avatarUrl);

    res.json({
      message: 'Cập nhật ảnh đại diện thành công',
      avatar: avatarUrl
    });
  } catch (error) {
    console.error('Error in uploadAvatar:', error);
    res.status(500).json({ message: 'Lỗi khi tải lên ảnh đại diện' });
  }
};

const changePassword = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Không tìm thấy thông tin người dùng' });
    }

    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ mật khẩu hiện tại và mật khẩu mới' });
    }

    // Lấy mật khẩu hiện tại từ database
    const userPassword = await User.getPasswordById(userId);
    if (!userPassword) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin người dùng' });
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(currentPassword, userPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mật khẩu hiện tại không chính xác' });
    }

    // Hash mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Cập nhật mật khẩu mới
    await User.updatePassword(userId, hashedNewPassword);

    res.json({ message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    console.error('Error in changePassword:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};


module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  changePassword,
}; 