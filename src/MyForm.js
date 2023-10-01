import React, { useState } from 'react';
import './MyForm.css';
import ReactLoading from 'react-loading';
function MyForm() {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Handle form submission logic here
    console.log('Submitted value:', inputValue);
    var fileType = document.getElementById("file-type").value;

    var req=`https://filescraper.onrender.com/googleDrive?q=${inputValue}`;
    switch (fileType) {
      case "google-drive":
        req=`https://filescraper.onrender.com/googleDrive?q=${inputValue}`;
        break;
      case "media":
        req=`https://filescraper.onrender.com/media?q=${inputValue}`;
        break;
      case "pdf":
      case "html":
      case "ppt":
      case "doc":
      case "pyn":
      case "js":
      case "java":
      case "cpp":
      case "shell":
      case "json":
      case "sql":
      case "md":
        req=`https://filescraper.onrender.com/files?q=${inputValue}&type=${fileType}`;
        break;
      default:
        // Handle default case
        break;
    }
    try {
        const response = await fetch(req, {
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
        } else {
          throw new Error('API request failed');
        }
      } catch (error) {
        console.error('API Error:', error);
      }
      setTimeout(()=>{
        setIsLoading(false);
      },3000)
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
  <button type="submit" className="submitButton" onClick={handleSubmit}>Search</button>

  <select id="file-type" className="file-type-dropdown">
    <option value="google-drive">Google Drive</option>
    <option value="media">Media</option>
    <option value="pdf">PDF</option>
    <option value="html">HTML</option>
    <option value="ppt">Microsoft PowerPoint</option>
    <option value="doc">Microsoft Word</option>
    <option value="py">Python source code</option>
    <option value="js">JavaScript source code</option>
    <option value="java">Java source code</option>
    <option value="cpp">C/C++ source code</option>
    <option value="shell">Shell script</option>
    <option value="json">JSON</option>
    <option value="sql">SQL script</option>
    <option value="md">Markdown</option>
</select>

  </div>
  {
    isLoading? <ReactLoading type="spin" color="#0000FF"
    height={100} width={50} className='LoadingScreen' />:<ul className="SearchResults">
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
  }
  
</div>
</div>


  );
}

export default MyForm;
