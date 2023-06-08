import React, { useState } from 'react';
import './MyForm.css';
function MyForm() {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Submitted value:', inputValue);
    try {
        const response = await fetch(`https://googledrivescraper-production.up.railway.app/?q=${inputValue}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000' // Replace * with your React app's domain
        }
        });
        console.log(response.url);
        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          setSearchResults(data);
          // Handle the API response data here
        } else {
          throw new Error('API request failed');
        }
      } catch (error) {
        console.error('API Error:', error);
        // Handle the API error here
      }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  
  return (
      <div className='component'>
        <div className='centered-div'>
      <div className='input-wrap'>
  <input
    type="text"
    value={inputValue}
    onChange={handleChange}
    placeholder="Search Files"
    name="product-search" 
    id="product-search" 
  />
  <button type="submit" onClick={handleSubmit}>Search</button>
  
  </div>
  <ul className="SearchResults">
  {searchResults.map((result, index) => (
    <li key={index}>
      <a href={result.extractedString} className="SearchResults-link">
        <h3 className="SearchResults-title">{result.title}</h3>
        <cite className="SearchResults-url">{result.extractedString}</cite>
        <p className="SearchResults-snippet">{result.snippet}</p>
      </a>
    </li>
  ))}
</ul>
</div>
</div>


  );
}

export default MyForm;
