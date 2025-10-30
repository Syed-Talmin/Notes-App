import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
     <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Glassmorphism background */}
        <div className="backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Brand Name - Clean and modern */}
              <div className="relative">
                <h1 className="text-2xl font-bold text-white tracking-wide">
                  NEXUS
                </h1>
              </div>

              {/* Login Button - Minimal modern style */}
              <Link  to={'/login'} className="px-6 py-2 text-sm text-center font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar