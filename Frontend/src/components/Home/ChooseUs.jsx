import { Link } from 'react-router-dom'

const ChooseUs = () => {
  return (
    <div className='w-full py-20 flex justify-center'>
    <div className='w-full max-w-300 bg-zinc-950 border border-zinc-800 flex flex-col gap-5 md:p-20 py-10 px-5 items-center'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center uppercase'>Ready to Transform Your Notes?</h1>
        <p className='w-full text-sm font-semibold opacity-60 text-center max-w-2xl'>Join today and revolutionize your note-taking with AI. Unlock the power of intelligent note organization and enhance your productivity like never before.</p>
        <Link to={'/dashboard'} className='w-full hover:scale-102 transition-all text-center py-2 rounded-lg max-w-45 bg-linear-to-bl from-indigo-700 to-pink-700 font-semibold'>Get Started</Link>
    </div>
    </div>
  )
}

export default ChooseUs