import './App.css';
import {useEffect, useState, useRef} from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import {SearchContext} from './context/SearchContext'


const App = () => {
 
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState([])
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='


  const handleSearch = (e, term) => {
      e.preventDefault()
      const fetchData = async () => {
        document.title = `${term} music`
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        if (resData.results.length > 0) {
            return setData(resData.results)
        } else {
            return setMessage('Not Found.')
        }
    }
    fetchData()
  }

  return (
      <div>
        <SearchContext.Provider value={{
            term: searchInput,
            handleSearch: handleSearch
        }}>
          <SearchBar  />
          </SearchContext.Provider>
          {message}
          <DataContext.Provider value={data} >
          <Gallery />
          </DataContext.Provider>
         
      </div>
  )
}

export default App

