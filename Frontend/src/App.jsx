import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import NoteCreate from "./pages/NoteCreate"
import ShowNote from "./pages/ShowNote"
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  return (
    <div className="flex items-center justify-center bg-black">

    <ToastContainer 
    theme="dark"
    />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<NoteCreate />} />
          <Route path="/notes/:id" element={<ShowNote />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App