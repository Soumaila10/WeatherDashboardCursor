import { Search } from 'lucide-react';
import { useState } from 'react';

export function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel flex items-center gap-3 px-4 py-2 w-full max-w-xl mx-auto"
    >
      <Search className="w-5 h-5 text-slate-200" />
      <input
        type="text"
        placeholder="Rechercher une ville (ex : Paris, Tokyo, New York...)"
        className="flex-1 bg-transparent outline-none text-sm md:text-base placeholder:text-slate-400 text-slate-100"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="hidden md:inline-flex px-3 py-1.5 text-xs font-medium rounded-full bg-indigo-500/80 hover:bg-indigo-400 text-white transition-colors"
      >
        Rechercher
      </button>
    </form>
  );
}


