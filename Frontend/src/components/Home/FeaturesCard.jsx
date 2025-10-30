import { LuBrain } from "react-icons/lu";

const FeaturesCard = ({ icon, title, description }) => {
  return (
    <div className="relative group max-w-sm">
      <div className="relative bg-zinc-950 rounded-xl p-8 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-500 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="mb-6">
          <div className="w-14 h-14 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700 group-hover:border-indigo-500/30 transition-all duration-500">
           {icon}
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-3 text-white">
          {title}
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex gap-1">
          <div className="h-0.5 w-12 bg-indigo-500 rounded-full"></div>
          <div className="h-0.5 w-6 bg-pink-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesCard;
