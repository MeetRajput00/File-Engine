import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} placeholder="Enter a value" />
      <button type="submit">Submit</button>
      <ul>
        {searchResults.map((result, index) => (
            <li key={index}>
            <a href={result.extractedString}>{result.title}</a>
            </li>
        ))}
        </ul>

    </form>
  );
}

export default MyForm;
