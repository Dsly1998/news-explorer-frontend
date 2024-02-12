import React, { useState } from 'react';
// Import styles

function SearchForm({ onSearchSubmit }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Enter search term" 
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
