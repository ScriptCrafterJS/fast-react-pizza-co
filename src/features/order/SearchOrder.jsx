import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SearchOrder() {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="placeholder: sm: w-28 rounded-full px-4 py-2 text-sm text-stone-400 transition-all focus:w-72 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 sm:w-64"
      />
    </form>
  );
}

export default SearchOrder;
