import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../BookMarks/BookMarks.css'
const BookMarks = (bookmarks) => {
  const navigate = useNavigate();


  return (
    <div className='bookmarkWrapper'>
      <div className='container'>
        <div className='head'>
        <i onClick={() => navigate(-1)} class="fa-solid fa-arrow-left"></i> <span>Bookmarks</span>
        </div>
      {
        !!Object.keys(bookmarks).length ?
          Object.keys(bookmarks).map(b => {
            return (
              <Link to={`/search/${b}`}>
                <div className='bookmarkWrap' key={b}>
                  <h3>{b}</h3>
                </div>
              </Link>

            )
          }
          )
          : <div className='notFound'>
          <h3>No Bookmarks</h3>
          <p>You don't have any bookmarks</p>
          <button onClick={() => navigate(-1)} >Search Word</button>
        </div>
      }
      </div>
    </div>

  )
}

export default BookMarks