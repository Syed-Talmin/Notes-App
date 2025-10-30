import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Edit2, Check, X, LogOut } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { logout, updateProfile } from "../../api/auth_api";
import { toast } from "react-toastify";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { useNavigate } from "react-router-dom";

export default function UserHeader() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser} = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (data) => {
    const response = await updateProfile(data.name, data.email);
    const {name,email} = response.user;
    setUser(prevUser => ({ ...prevUser, name, email }));
    reset({ name, email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset({ name: user.name, email: user.email });
    setIsEditing(false);
  };

  const handleLogout = async() => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
      await logout();
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      {/* Left Section — Avatar + Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-500/40">
          <User className="w-8 h-8 text-indigo-500" />
        </div>

        {/* Editable Info */}
        <div>
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
              {/* Name Field */}
              <input
                type="text"
                placeholder="Enter name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-2 py-1 text-lg md:text-xl font-semibold border border-gray-300 rounded-md bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-0.5">{errors.name.message}</p>
              )}

              {/* Email Field */}
              <input
                type="email"
                placeholder="Enter email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full px-2 py-1 text-xs md:text-sm border border-gray-300 rounded-md bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-0.5">{errors.email.message}</p>
              )}
            </form>
          ) : (
            <>
              <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
              <p className="text-xs md:text-sm opacity-80">{user.email}</p>
            </>
          )}
        </div>
      </div>

      {/* Right Section — Action Buttons */}
      <div className="flex gap-2 self-end sm:self-auto">
        {isEditing ? (
          <>
            <button
              onClick={handleSubmit(onSubmit)}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md transition"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-medium rounded-md transition"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md transition"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
            <button
            onClick={()=> setOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
          </button>
          </div>
        )}
        {

         open && <LogoutConfirmModal onClose={closeModal}onConfirm={handleLogout} />
        }
      </div>
    </div>
  );
}
