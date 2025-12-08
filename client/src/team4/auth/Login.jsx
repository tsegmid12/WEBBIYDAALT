'use client';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/InputField';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { load } from '../../utils/UserService';

export const Login = () => {
  const { login, user } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password) {
      setError('Имэйл болон нууц үгээ оруулна уу');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await login(email.trim(), password);

      if (!success) {
        setError('Имэйл эсвэл нууц үг буруу байна');
        setLoading(false);
        return;
      }

      let currentUser = user;

      if (!currentUser) {
        const loadedUser = await load();
        currentUser = loadedUser;
      }

      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          role: currentUser.username,
        })
      );
      console.log('Current user name', currentUser?.username);

      const roleRoutes = {
        admin: '/team4/admin/dashboard',
        schooladmin: '/team4/schooladmin',
        schoolteacher: '/team4/teacher',
        schoolstudent: '/team4/student',
      };

      const userRole = currentUser?.username || 'schoolstudent';
      const redirectPath = roleRoutes[userRole] || '/team4/student';

      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error('Login алдаа:', err);
      setError('Сервертэй холбогдох боломжгүй');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/team4/forgot-password");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="h-full w-full flex items-center justify-between p-8 gap-4">
        {/* LEFT IMAGE */}
        <div className="relative w-1/2 h-full rounded-2xl overflow-hidden">
          <img
            src="/team4/hero.png"
            alt="hero img"
            className="w-full h-full object-cover"
          />
          <div className="flex flex-col justify-start items-start gap-2 absolute left-[50px] bottom-[50px] z-10">
            <p className="text-white text-2xl font-bold">Let's grow together</p>
            <p className="text-white text-lg">Таны хөгжих орон зай</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex flex-col justify-center items-center w-1/2">
          <div className="flex flex-col justify-center items-center w-[380px]">
            <p className="text-2xl mb-12">Тавтай морилно уу</p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <InputField
                labelname="Нэвтрэх нэр"
                type="email"
                placeholder="Нэвтрэх мэйлээ оруулна уу"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />

              <InputField
                labelname="Нууц үг"
                type="password"
                placeholder="Нууц үгээ оруулна уу"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />

              <div className="flex justify-between">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" disabled={loading} />
                  <span className="text-[12px]">Сануулах</span>
                </label>
                <p
                  onClick={handleForgotPassword}
                  className='text-[12px] underline cursor-pointer hover:text-blue-600'>
                  Нууц үг сэргээх
                </p>
              </div>

              {error && (
                <p className='text-red-500 text-sm text-center'>{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className='rounded-full mt-6 bg-[#49BBBD] text-white p-3 font-medium disabled:opacity-70 hover:bg-[#3aa3a5] transition'>
                {loading ? 'Нэвтэрч байна...' : 'Нэвтрэх'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
