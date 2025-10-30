import { FolderOpen, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { createNote } from "../api/notes_api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
export default function NotesForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleCreateNote = async (data) => {
    try {
      setLoading(true);
      await createNote(data);
      toast.success("Note created successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Note creation failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="w-full h-screen bg-black">
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
        </div>
      </div>
    );

  return (
    <div className="h-screen w-full bg-black md:p-8 p-4">
      <form
        onSubmit={handleSubmit(handleCreateNote)}
        className="max-w-5xl mx-auto h-[85vh] bg-zinc-950 border border-zinc-800 rounded-lg md:p-8 p-4"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                navigate("/dashboard");
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg group">
              <FolderOpen className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Add category (optional)"
                className="bg-transparent text-gray-300 text-sm focus:outline-none placeholder-gray-600 md:w-40 w-20"
                list="categories"
                {...register("category", { required: false, maxLength: 10 })}
              />
              <datalist id="categories">
                <option value="Personal" />
                <option value="Work" />
                <option value="Ideas" />
                <option value="Projects" />
                <option value="Meetings" />
                <option value="Research" />
              </datalist>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <textarea
              placeholder="Untitled Note"
              className="w-full bg-transparent text-4xl font-bold text-white placeholder-gray-700 focus:outline-none resize-none overflow-hidden"
              rows="1"
              {...register("title", { maxLength: 30 })}
            ></textarea>
            {errors.title && (
              <span className="text-red-700 text-sm">
                Title must be less than 30 characters long
              </span>
            )}
          </div>

          <div className="border-t border-zinc-900"></div>

          {/* Content */}
          <div>
            <textarea
              placeholder="Start writing..."
              className="w-full bg-transparent text-gray-300 text-lg leading-relaxed placeholder-gray-700 focus:outline-none resize-none min-h-[250px]"
              {...register("description", { maxLength: 1000 })}
            ></textarea>
            {errors.content && (
              <span className="text-red-700 text-sm">
                Content must be less than 1000 characters long
              </span>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-900 px-8 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-end">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
