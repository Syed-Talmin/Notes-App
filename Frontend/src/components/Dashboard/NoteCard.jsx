import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NoteCard = ({id, title, content, category, date, time, updatedAt }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/notes/${id}` , { state: { id, title, content, category, date, time, updatedAt }});
  };
  return (
    <div onClick={handleClick} className="border border-zinc-800 rounded-xl transition-all duration-300 hover:border-indigo-500/50 cursor-pointer group">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-500 transition-colors">
          {title}
        </h3>
        <p className="opacity-70 mb-4 line-clamp-3">{content}</p>
        <div className="flex items-center gap-4 text-sm opacity-70">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;