import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home.js';
import BookMarks from './Components/BookMarks/BookMarks'
import Definition from './Components/Definition/Definition';


function App() {

  const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || {});

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (word, definitions) => setBookmarks(oldBookmarks => ({
    ...oldBookmarks,
    [word]: definitions
  }))

  const removeBookmark = word => setBookmarks(oldBookmarks => {
    const temp = { ...oldBookmarks };
    delete temp[word];
    return temp;
  })

  return (
<>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks" 
          // bookmarks={bookmarks} 
          element={<BookMarks  {...bookmarks} />} />
        <Route path="/search/:word" element={<Definition
          bookmarks={bookmarks}
          addBookmark={addBookmark}
          removeBookmark={removeBookmark}
        />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
