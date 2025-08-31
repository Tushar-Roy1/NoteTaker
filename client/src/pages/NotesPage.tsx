import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Note {
  _id: string;
  content: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
     const res = await axios.get('https://notetaker-backend-fuho.onrender.com/notes', {
    headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    } catch {
      setError('Failed to fetch notes');
    }
  };
const API_BASE = 'https://notetaker-backend-fuho.onrender.com';

const handleCreate = async () => {
  if (!content) return;
  try {
    const res = await axios.post(
      `${API_BASE}/notes`,
      { content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNotes([...notes, res.data]);
    setContent('');
  } catch {
    setError('Failed to create note');
  }
};

const handleDelete = async (id: string) => {
  try {
    await axios.delete(`${API_BASE}/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(notes.filter(note => note._id !== id));
  } catch {
    setError('Failed to delete note');
  }
};


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-yellow-700">📝 My Notes</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Write a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCreate}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Add
          </button>
        </div>

        {notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes yet.</p>
        ) : (
          <ul className="space-y-4">
            {notes.map(note => (
              <li
                key={note._id}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
              >
                <span>{note.content}</span>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
