import { Trash2, X } from "lucide-react";

export default function DeleteConfirmModal({ open, setOpen, onConfirm }) {
  const handleBackdropClick = (e) => {

    if (e.target.closest("#delete-modal")) return;
    setOpen(false);
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        id="delete-modal"
        className={`bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-[90%] max-w-sm shadow-xl relative transform transition-all duration-300 ease-out ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* ❌ Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-zinc-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-red-500/10 rounded-full">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>

          <h3 className="text-white text-lg font-semibold">
            Delete this item?
          </h3>
          <p className="text-zinc-400 text-sm">
            Are you sure you want to delete this? This action cannot be undone.
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm?.();
                setOpen(false);
              }}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
