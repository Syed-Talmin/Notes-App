import { PlusIcon } from "lucide-react";
import NoteCard from "../components/Dashboard/NoteCard";
import { useContext } from "react";
import NotesContext from "../context/NotesContext";

import { Link } from "react-router-dom";
import { getCategories, getNotes } from "../api/notes_api";
import { useEffect, useState } from "react";
import UserHeader from "../components/Dashboard/UserHeader";

const Dashboard = () => {
  const { notes, setNotes } = useContext(NotesContext);


  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "oldest" | "a-z"
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

 function formatCreatedAt(isoString) {
  const date = new Date(isoString);
  const hours = date.getHours(); 
  const minutes = date.getMinutes();
  
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  
  return `${hours12}:${String(minutes).padStart(2, "0")} ${ampm}`;
}


  const fetchedNotes = async () => {
    const data = await getNotes();
    setNotes(data.notes);
  };

  useEffect(() => {
    fetchedNotes();
  }, []);

  useEffect(() => {
    let result = [...notes];

    // Search filter
    if (search.trim() !== "") {
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category !== "all") {
      result = result.filter((note) => note.category === category);
    }

    // Sorting
    result = result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (sortOrder === "newest") {
        return dateB - dateA;
      }
      if (sortOrder === "oldest") {
        return dateA - dateB;
      }
      if (sortOrder === "a-z") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    setFilteredNotes(result);
  }, [search, category, sortOrder, notes]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategoryList(data.categories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [notes]);


  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
        <UserHeader />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Left Section — Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-gray-300">
              Your Notes
            </h2>
            <p className="text-sm text-gray-500">
              {notes.length} {notes.length === 1 ? "note" : "notes"} total
            </p>
          </div>

          {/* Middle Section — Search & Filters */}

          <div className="flex flex-col md:flex-row sm:items-center gap-3 w-full sm:w-auto justify-center">
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-48 md:w-64 px-3 py-2 text-sm border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />

            <div className="flex items-center justify-center gap-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 grow bg-gray-950 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              >
                <option value="all">All</option>
                {categoryList.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 grow bg-gray-950 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="a-z">A → Z</option>
              </select>
            </div>
          </div>

          {/* Right Section — Create Button */}
          <Link
            to="/create"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-semibold rounded-lg px-4 py-2 transition"
          >
            <PlusIcon className="w-5 h-5" strokeWidth={2} />
            <span className="hidden sm:inline">Create New Note</span>
            <span className="sm:hidden">New</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.description}
              category={note.category}
              date={note.createdAt.split("T")[0]}
              time={formatCreatedAt(note.createdAt)}
              updatedAt={note.updatedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
