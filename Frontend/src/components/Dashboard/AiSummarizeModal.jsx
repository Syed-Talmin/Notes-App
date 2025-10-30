import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { X } from "lucide-react";
import remarkGfm from "remark-gfm";

export default function AiSummarizeModal({ markdown ,open , setOpen}) {
  const modalRef = useRef(null);

  // ✅ Handle outside click using React bubbling
  const handleBackdropClick = (e) => {
    // Agar click modal ke andar hua → ignore
    if (modalRef.current && modalRef.current.contains(e.target)) return;
    // Otherwise close the modal
    setOpen(false); 
  };



  return (
        <div
          onClick={handleBackdropClick}
          className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full ${open ? "h-screen" : "h-0"} transition-all duration-300 all-ease overflow-hidden flex items-end justify-center z-5 px-5 pb-5 pt-10`}
        >
          <div
            ref={modalRef}
            className="relative h-full overflow-hidden bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-5xl w-full shadow-xl"
          >
            {/* ❌ Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-zinc-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-white mb-4 bg-zinc-950 px-5 py-3 rounded-xl">
              AI Summary
            </h2>

            <div className="prose text-white text-2xl prose-invert max-h-[60vh] overflow-y-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown || "_No summary available yet._"}
              </ReactMarkdown>
            </div>
          </div>
        </div>

  );
}
