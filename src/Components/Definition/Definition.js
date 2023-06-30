import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../Definition/Definition.css'



const synth = window.speechSynthesis;

const Definition = ({ bookmarks, removeBookmark, addBookmark }) => {

  const voices = useMemo(() => synth.getVoices(), [])
  const [voiceselected, setVoiceselected] = useState('English India')
  const [text, setText] = useState('')
  const [definitions, setDefinitions] = useState([])
  const [exist, setExist] = useState(true)
  const navigate = useNavigate();


  const { word } = useParams()
  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        setDefinitions(resp.data)

      }
      catch (err) {
        setExist(false)
      }
    }

    fetchDefinition();
  }, [word])

  const isBookmarked = Object.keys(bookmarks).includes(word)


  const startSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = voices.find(voice => voice.name === voiceselected)
    utterance.voice = voice
    synth.speak(utterance)
    setText(word)

  }

  const handleSpeech = () => {
    // if(!text.trim()) return
    startSpeech(text)

  }

  if (!exist) return (
    <div className='notFound'>
      <h3>Word Not Found</h3>
      <p>Please try again with another word</p>
      <button onClick={() => navigate(-1)} >Search Again</button>
    </div>
  )

 

  return (
    <div className='container'>
       <div className='headWrapper'>
        <div className='containerr head'>
          <i onClick={() => navigate(-1)} class="fa-solid fa-arrow-left"></i>
          <button onClick={() => isBookmarked ? removeBookmark(word) : addBookmark(word, definitions)}>
            {isBookmarked ? <i class="fa-solid fa-bookmark"></i> : <i class="fa-regular fa-bookmark"></i>}
          </button>
        </div>
        <form className='WordWrapper'>
          <div class="ui-field-contain">
            <p>{word}</p>
            <div className='select'>
              <select value={voiceselected}
                onChange={e => setVoiceselected(e.target.value)}>
                {
                  voices.map(v => (
                    <option key={v.name} value={v.name}>{v.name}</option>
                  ))
                }
              </select>
              <i onClick={handleSpeech} class="ri-volume-up-fill"></i>
            </div>
          </div>
        </form>

      </div>
      {
        definitions.map((def, index) => (
          
          
          <div className='content' key={index}>
            {def.meanings.map(meaning =>
              <>
                <div key={meaning.partpartOfSpeech} className='partOfSpeech'>
                  <b className='partOfSpeech-b'>{meaning.partOfSpeech}</b>
                  <div className='meanings'>
                    <b>Meaning </b>
                    {meaning.definitions.map((definition, index) =>
                      <>
                        <p className='meaning' key={definition}> {meaning.definitions.length > 1 && `${index + 1}. `} {definition.definition}</p>

                      </>
                    )
                    }
                  </div>
                </div>
              </>
            )}

          </div>
        ))
      }
    </div>

  )
}

export default Definition