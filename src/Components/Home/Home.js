import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import dictionary from '../image/dictionary.jpg'
import './home.css'

const Home = () => {
  const [word, setWord] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedWord = word.trim();
    if (!trimmedWord || trimmedWord.split(' ').length > 1) return
    navigate(`/search/${word}`);
  }

  return (
    <div className='container'>
      <div className='Wrapper'>
      <img src={dictionary} alt=''/>
      <h3>Dictionary</h3>
      <p>Find meanings and save for quick reference</p>
        <form onSubmit={handleSubmit}>
          <input
            className='inputField'
            value={word}
            onChange={event => setWord(event.target.value)}
            type="text" placeholder='Enter a word' />
        </form>
        <Link style={{textDecoration: 'none'}}  to="/bookmarks">
          <button>Your Bookmarks <i class="fa-regular fa-bookmark"></i></button>
        </Link>
      </div>
    </div>
  )
}

export default Home