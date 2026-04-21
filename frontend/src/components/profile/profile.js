import React, { useState, useEffect } from 'react';
import { message, Spin } from 'antd';
import { 
  User, 
  Mail, 
  Camera, 
  Key, 
  Lock, 
  Shield, 
  Save, 
  Info,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';
import { getAssetUrl } from '../../utils/urlUtils';
import './profile.css';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    full_name: '',
    role: '',
    bio: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const data = response.data;
      setUserData({
        username: data.username,
        email: data.email,
        full_name: data.full_name,
        role: data.role,
        bio: data.bio || ''
      });
      setAvatar(data.avatar);
    } catch (error) {
      message.error('Không thể tải thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/profile`,
        { 
          full_name: userData.full_name,
          bio: userData.bio 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        const updatedUser = { ...user, full_name: userData.full_name, bio: userData.bio };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      message.success('Cập nhật thông tin thành công');
    } catch (error) {
      message.error('Không thể cập nhật thông tin');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAvatarClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/upload-avatar`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        setAvatar(response.data.avatar);
        message.success('Tải lên ảnh đại diện thành công');

        const userString = localStorage.getItem('user');
        if (userString) {
          const user = JSON.parse(userString);
          const updatedUser = { ...user, avatar: response.data.avatar };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } catch (error) {
        message.error('Tải lên ảnh thất bại');
      }
    };

    fileInput.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <Spin size="large" tip="Đang tải thông tin..." />
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] text-slate-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="md:w-80 w-full shrink-0">
          <div className="bg-[#1e293b]/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 shadow-2xl flex flex-col items-center">
            {/* Avatar Section */}
            <div className="relative group">
              <div 
                onClick={handleAvatarClick}
                className="w-32 h-32 rounded-full ring-4 ring-indigo-500/30 ring-offset-4 ring-offset-[#1e293b] overflow-hidden cursor-pointer relative"
              >
                {avatar ? (
                  <img 
                    src={getAssetUrl(avatar)} 
                    alt="Avatar" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-4xl font-bold">
                    {userData.full_name?.[0]?.toUpperCase() || <User size={48} />}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
            </div>

            <h2 className="mt-6 text-xl font-bold text-white text-center">{userData.full_name || 'Chưa cập nhật tên'}</h2>
            <p className="mt-1 text-indigo-400 text-sm font-medium tracking-wider uppercase">{userData.role || 'Người dùng'}</p>

            {/* Navigation Menu */}
            <nav className="mt-10 w-full space-y-2">
              <button
                onClick={() => setActiveTab('info')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === 'info' 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Info size={18} />
                <span className="font-medium">Thông tin cá nhân</span>
                {activeTab === 'info' && <ChevronRight size={16} className="ml-auto" />}
              </button>
              
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === 'password' 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Key size={18} />
                <span className="font-medium">Đổi mật khẩu</span>
                {activeTab === 'password' && <ChevronRight size={16} className="ml-auto" />}
              </button>
            </nav>

            <div className="mt-auto pt-10 w-full">
               <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 flex items-center gap-3">
                  <Shield size={18} className="text-indigo-400" />
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Bảo mật tài khoản</p>
                    <p className="text-xs text-slate-300 font-medium">Đã xác thực</p>
                  </div>
               </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-[#1e293b]/50 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-800 shadow-2xl h-full">
            
            {activeTab === 'info' ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="mb-10">
                  <h1 className="text-3xl font-bold text-white">Hồ sơ của tôi</h1>
                  <p className="text-slate-400 mt-2">Quản lý và cập nhật thông tin cá nhân của bạn để mọi người biết về bạn nhiều hơn.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Read only section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-bottom border-slate-800/30">
                    <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                          <User size={14} /> Tên đăng nhập
                       </label>
                       <div className="bg-slate-800/80 border border-slate-700 px-4 py-3 rounded-xl text-slate-400 select-none cursor-not-allowed flex items-center">
                          {userData.username || 'N/A'}
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                          <Mail size={14} /> Địa chỉ Email
                       </label>
                       <div className="bg-slate-800/80 border border-slate-700 px-4 py-3 rounded-xl text-slate-400 select-none cursor-not-allowed flex items-center">
                          {userData.email || 'N/A'}
                       </div>
                    </div>
                  </div>

                  {/* Editable section */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="full_name" className="text-sm font-medium text-slate-300">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={userData.full_name}
                        onChange={handleInputChange}
                        placeholder="Nhập họ và tên của bạn"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="bio" className="text-sm font-medium text-slate-300">
                        Tiểu sử / Giới thiệu
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={5}
                        value={userData.bio}
                        onChange={handleInputChange}
                        placeholder="Hãy chia sẻ một chút về bản thân, kỹ năng hoặc sở thích của bạn..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none custom-scrollbar"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? <Spin size="small" /> : <Save size={20} />}
                      {submitting ? 'Đang cập nhật...' : 'Lưu thay đổi'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-indigo-400">
                  <Lock size={48} className="opacity-20 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-white">Đổi mật khẩu</h2>
                <p className="text-slate-400 mt-3 max-w-md">
                  Tính năng bảo mật này hiện đang được bảo trì và sẽ sớm quay trở lại. Vui lòng quay lại sau!
                </p>
                <button 
                  onClick={() => setActiveTab('info')}
                  className="mt-8 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  Quay lại Thông tin cá nhân
                </button>
              </div>
            )}

          </div>
        </main>

      </div>
    </div>
  );
};

export default Profile;