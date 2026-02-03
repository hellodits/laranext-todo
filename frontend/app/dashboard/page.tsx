'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';

interface Todo {
  id: number;
  title: string;
  descriptions: string | null;
  is_done: boolean;
  created_at: string;
}

interface User {
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    descriptions: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchTodos();
  }, [router]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/todos');
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    try {
      await axios.post('/todos', formData);
      setFormData({ title: '', descriptions: '' });
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (id: number, currentStatus: boolean) => {
    try {
      await axios.put(`/todos/${id}`, { is_done: !currentStatus });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    try {
      await axios.delete(`/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navbar */}
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Todo App</h1>
              {user && (
                <span className="ml-4 text-slate-400">Welcome, {user.name}</span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Todo Section */}
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Add New Todo</h2>
          <form onSubmit={handleAddTodo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter todo title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={formData.descriptions}
                onChange={(e) =>
                  setFormData({ ...formData, descriptions: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter todo description"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Add Todo
            </button>
          </form>
        </div>

        {/* Todo List Section */}
        <div className="bg-slate-800 rounded-lg shadow-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">
            Your Todos ({todos.length})
          </h2>

          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No todos yet. Create your first one!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="bg-slate-700 border border-slate-600 rounded-lg p-4 hover:border-slate-500 transition duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="checkbox"
                          checked={todo.is_done}
                          onChange={() => handleToggleTodo(todo.id, todo.is_done)}
                          className="w-5 h-5 rounded border-slate-500 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        />
                        <h3
                          className={`text-lg font-medium ${
                            todo.is_done
                              ? 'text-slate-400 line-through'
                              : 'text-white'
                          }`}
                        >
                          {todo.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            todo.is_done
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {todo.is_done ? 'Done' : 'Pending'}
                        </span>
                      </div>
                      {todo.descriptions && (
                        <p className="text-slate-400 ml-8">{todo.descriptions}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="ml-4 text-red-400 hover:text-red-300 transition duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
