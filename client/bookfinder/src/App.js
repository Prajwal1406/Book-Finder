import "./App.css";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [bookData, setBookData] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setBookData(event.target.value);
  };

  const handleClick = async () => {
    console.log(`Searching for book title: ${bookData}`); // Debugging statement
    try {
      const response = await axios.get(
        `https://book-finder-rt6v.onrender.com/search?title=${bookData}`
      );
      const data = response.data;
      console.log(data); // Debugging statement
      setResults(data.docs); // Assuming the API response has a 'docs' array
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container">
      <h1>Book Finder</h1>
      <div className="searcho">
        <input
          value={bookData}
          placeholder="Enter book name"
          onChange={handleInputChange}
          className="search-input"
        />
        <button onClick={handleClick} className="search-button">
          Search Books
        </button>
      </div>
      <div id="results" className="results">
        {results.map((book, index) => (
          <div key={index} className="book-card">
            <h2>{book.title}</h2>
            <p>
              Author: {book.author_name ? book.author_name.join(", ") : "N/A"}
            </p>
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
              alt="Book Cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
