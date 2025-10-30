import { useContext, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from '../api/auth_api';
import  AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
    const { setToken, setUser } = useContext(AuthContext);
   const {
    register,       
    handleSubmit,    
    formState: { errors },  
  } = useForm();

  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
        const response = await userRegister(data.name, data.email, data.password);
        setToken(response.token);
        setUser(response.user);
        toast.success('Registration successful');
        navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed');
        console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 relative overflow-hidden">

      {/* Register Card */}
      <div className="relative w-full max-w-sm">
        <div 
          className="bg-zinc-950 rounded-2xl shadow-2xl p-8 border border-zinc-800 relative overflow-hidden transition-all duration-300 hover:border-zinc-700"
        >
          
          <div className="relative z-10">
           
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl mb-4 shadow-lg shadow-purple-500/20">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-zinc-400 text-sm">Sign in to continue to your account</p>
            </div>

            
            <div className="space-y-5">

                <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type="text"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-11 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="John Doe"
                    {...register('name', { required: true , minLength: 3 })}
                  />
                </div>
                  {errors.name && errors.name.type === 'required' && (
                    <p className="text-red-700 text-xs mt-1">Name is required</p>
                  )}
                  {errors.name && errors.name.type === 'minLength' && (
                    <p className="text-red-700 text-xs mt-1">Name must be at least 3 characters</p>
                  )}
              </div>
             
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type="email"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-11 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="you@example.com"
                    {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                  />
                </div>
                  {errors.email && errors.email.type === 'required' && (
                    <p className="text-red-700 text-xs mt-1">Email is required</p>
                  )}
                  {errors.email && errors.email.type === 'pattern' && (
                    <p className="text-red-700 text-xs mt-1">Invalid email format</p>
                  )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-purple-500 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-11 pr-12 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="••••••••"
                    {...register('password', { required: true ,minLength: 6})}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                  {errors.password && errors.password.type === 'required' && (
                    <p className="text-red-700 text-xs mt-1">Password is required</p>
                  )}
                  {errors.password && errors.password.type === 'minLength' && (
                    <p className="text-red-700 text-xs mt-1">Password must be at least 6 characters</p>
                  )}
              </div>

              
              <button
                onClick={handleSubmit(handleRegister)}
                className="w-full bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200"
              >
                Sign Up
              </button>
            </div>


           
            <p className="text-center text-zinc-400 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-500 hover:text-purple-400 transition-colors font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Register