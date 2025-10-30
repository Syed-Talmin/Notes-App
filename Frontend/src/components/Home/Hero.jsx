import { RiBardLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="w-full pt-30 flex flex-col justify-end items-center px-5 md:px-10 lg:px-20 py-5">
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/40 rounded-2xl px-3 py-2  shadow-2xl animate-float">
        <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
          <div className="p-1 rounded-full shadow-lg text-violet-500">
            <RiBardLine className="text-sm md:text-lg" />
          </div>

          <h1 className="text-xs md:text-sm font-semibold  text-white drop-shadow-xl text-center">
            AI Powered Note Taking
          </h1>
        </div>
      </div>
      <div className="flex flex-col relative z-5 items-center justify-center gap-4 mt-4">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center uppercase">
          Your Notes, Supercharged by AI
        </h1>
        <p className="w-full max-w-xl text-sm font-semibold text-center opacity-60">
          Experience the future of note-taking with intelligent summarization,
          automatic categorization, and smart title generation—all powered by
          cutting-edge AI.
        </p>
        <Link to={'/dashboard'} className='w-full hover:scale-102 transition-all duration-300 text-center py-2 rounded-lg max-w-45 bg-linear-to-bl from-indigo-700 to-pink-700 font-semibold'>Get Started</Link>

      </div>
    </div>
  )
}

export default Hero