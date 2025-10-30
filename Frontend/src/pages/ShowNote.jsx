import {
  FolderOpen,
  Calendar,
  MoreVertical,
  Pencil,
  Trash,
  Sparkles,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { updateNote, deleteNote, summarizeNote } from "../api/notes_api";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AiSummarizeModal from "../components/Dashboard/AiSummarizeModal";
import DeleteConfirmModal from "../components/Dashboard/DeleteConfirmModal";
import { toast } from "react-toastify";

const ShowNote = () => {
  const [editActive, setEditActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [markdown, setMarkdown] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      reset({
        category: state.category,
        title: state.title,
        description: state.content,
      });
    }
  }, [register]);

  const handleUpdateNote = async (data) => {
    try {
      const notes = await updateNote(id, data);
      toast.success("Note updated successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Note update failed");
      console.error(error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      await deleteNote(id, { isDeleted: true });
      toast.success("Note deleted successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Note delete failed");
      console.error(error);
    }
  };

  const showUpdateDate = () => {
    const date = new Date();
    const lastUpdated = new Date(state.updatedAt);

    const timeDiff = date.getTime() - lastUpdated.getTime();
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    const isSameDay =
      date.getDate() === lastUpdated.getDate() &&
      date.getMonth() === lastUpdated.getMonth() &&
      date.getFullYear() === lastUpdated.getFullYear();

    if (isSameDay) {
      if (minutesDiff < 1) return "Just now";
      if (minutesDiff < 60) return `${minutesDiff} min ago`;
      return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
    } else {
      return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
    }
  };
  const handleleSummarize = async () => {
    const res = await summarizeNote({ notes: state.content });
    setMarkdown(res.summary);
    setOpen(true);
    setLoading(false);
  };

  return (
    <div
      onClick={() => {
        if (showMenu) setShowMenu(false);
      }}
      className="h-screen w-full bg-black md:p-8 p-4"
    >
      <form
        onSubmit={handleSubmit(handleUpdateNote)}
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
              className="text-gray-400 cursor-pointer hover:text-white transition-colors"
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
                disabled={editActive ? false : true}
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
              <span>{state.date}</span>
            </div>
            <div className="relative flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu((prev) => !prev);
                }}
                type="button"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              {showMenu && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  id="Modal"
                  className="absolute top-5 right-0 bg-zinc-900/95 border border-zinc-800 shadow-lg rounded-xl p-3 w-32 backdrop-blur-md"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setEditActive(!editActive);
                    }}
                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm text-zinc-200 hover:bg-zinc-800 transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDeleteModal(true);
                    }}
                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm text-red-400 hover:bg-red-500/10 transition"
                  >
                    <Trash className="w-4 h-4 text-red-400" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <textarea
              placeholder="Untitled Note"
              disabled={editActive ? false : true}
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
              disabled={editActive ? false : true}
              placeholder="Start writing..."
              className="w-full bg-transparent text-gray-300 text-lg leading-relaxed placeholder-gray-700 focus:outline-none resize-none h-[50vh] overflow-hidden"
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
        <div className="fixed z-10 bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-900 px-8 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span>Last edited on {showUpdateDate()}</span>
            </div>
            <div className="flex items-center gap-3">
              {editActive ? (
                <>
                  <button
                    onClick={() => {
                      reset();
                      setEditActive(false);
                    }}
                    type="button"
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
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    handleleSummarize();
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg 
                 bg-linear-to-r from-indigo-600 to-violet-600 
                 text-white text-sm font-medium shadow-md 
                 hover:scale-105 active:scale-95 
                 transition-transform duration-200 ease-out"
                >
                  <Sparkles className="w-4 h-4" />
                  {
                    loading ? (
                      <span>Summarizing...</span>
                    ) : (
                      <span>AI Summarize</span>
                    )
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
      {/* Ai Summarize Modal */}
      <AiSummarizeModal markdown={markdown} open={open} setOpen={setOpen} />
      <DeleteConfirmModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onConfirm={handleDeleteNote}
      />
    </div>
  );
};

export default ShowNote;
