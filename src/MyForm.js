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
  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  };
  
  const inputStyles = {
    padding: '10px',
    marginBottom: '10px',
    width: '300px',
  };
  
  const buttonStyles = {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };
  
  const listStyles = {
    listStyleType: 'none',
    padding: '0',
  };
  
  const listItemStyles = {
    marginBottom: '10px',
  };
  
  const linkStyles = {
    textDecoration: 'none',
    color: 'blue',
  };
  
  return (
    <form onSubmit={handleSubmit} style={formStyles}>
  <input
    type="text"
    value={inputValue}
    onChange={handleChange}
    placeholder="Enter a value"
    style={inputStyles}
  />
  <button type="submit" style={buttonStyles}>Submit</button>
  <ul style={listStyles}>
    {searchResults.map((result, index) => (
      <li key={index} style={listItemStyles}>
        <a href={result.extractedString} style={linkStyles}>{result.title}</a>
      </li>
    ))}
  </ul>
</form>

  );
}

export default MyForm;
