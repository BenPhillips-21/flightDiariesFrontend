import { useState, useEffect } from 'react'
import styles from './diaryStyles.module.css'

import { Entry, NewEntry } from './types'
import { getAllEntries, postEntry } from './entryService';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<Entry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newComment, setNewComment] = useState('')
  const [error, setError] = useState('')
  const [checked, setChecked] = useState('');
  const [visChecked, setVisChecked] = useState('')

  useEffect(() => {
    getAllEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  const makeEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newEntry: NewEntry = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    }
    try {
      const response = await postEntry(newEntry)

      if (response.status >= 200 && response.status < 300) {
        setDiaryEntries(diaryEntries.concat(response.data))
        setError('')
      } else {
        setError(response)
      }

    setNewDate('')
    setNewWeather('')
    setNewVisibility('')
    setNewComment('')
    setChecked('')
    setVisChecked('')
  } catch (err) {
    console.log(err)
  }
  };

  const handleChange = (value: string) => {
    setChecked(value)
    setNewWeather(value)
    console.log(checked)
  }

  const handleVisChange = (value: string) => {
    setVisChecked(value)
    setNewVisibility(value)
  }

  return (
    <div className={styles.diaryContainer}>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.diaryForm} onSubmit={makeEntry}>
        <label>Date</label>
        <input 
          type="date"
          value={newDate} 
          onChange={(event) => setNewDate(event.target.value)} 
          className={styles.inputField}
        />
        <label>Weather</label>
        <label>Rainy</label>
        <input 
          type="checkbox"
          checked={checked === "rainy"}
          onChange={() => handleChange("rainy")} 
          className={styles.inputField}
        />
        <label>Sunny</label>
        <input 
          type="checkbox"
          checked={checked==="sunny"}
          onChange={() => handleChange("sunny")} 
          className={styles.inputField}
        />
        <label>Cloudy</label>
        <input 
          type="checkbox"
          checked={checked==="cloudy"}
          onChange={() => handleChange("cloudy")} 
          className={styles.inputField}
        />
        <label>Stormy</label>
        <input 
          type="checkbox"
          checked={checked==="stormy"}
          onChange={() => handleChange("stormy")} 
          className={styles.inputField}
        />
        <label>Windy</label>
        <input 
          type="checkbox"
          value={newWeather} 
          checked={checked==="windy"}
          onChange={() => handleChange("windy")} 
          className={styles.inputField}
        />
        <label>Visibility</label>
        <label>Great</label>
        <input 
          type="checkbox"
          checked={visChecked==="great"}
          onChange={() => handleVisChange("great")}
          className={styles.inputField}
        />
        <label>Good</label>
        <input 
          type="checkbox"
          checked={visChecked==="good"}
          onChange={() => handleVisChange("good")}
          className={styles.inputField}
        />
        <label>Ok</label>
        <input 
          type="checkbox"
          checked={visChecked==="ok"}
          onChange={() => handleVisChange("ok")}
          className={styles.inputField}
        />
        <label>Poor</label>
        <input 
          type="checkbox"
          checked={visChecked==="poor"}
          onChange={() => handleVisChange("poor")}
          className={styles.inputField}
        />
        <label>Comment</label>
        <input 
          value={newComment} 
          onChange={(event) => setNewComment(event.target.value)} 
          className={styles.inputField}
        />
        <button type='submit' className={styles.submitButton}>Add</button>
      </form>
      <div className={styles.entriesContainer}>
        {diaryEntries.map((entry, index) => (
          <div key={index} className={styles.entry}>
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>Weather:</strong> {entry.weather}</p>
            <p><strong>Visibility:</strong> {entry.visibility}</p>
            {entry.comment && <p><strong>Comment:</strong> {entry.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
