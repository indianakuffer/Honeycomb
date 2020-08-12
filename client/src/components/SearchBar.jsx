import React, { useState } from 'react'
import styled from 'styled-components'
import SearchCircle from './SearchCircle'

const SearchBarContainer = styled.div`
  display: flex;
  background-color: white;
  input {
    background: transparent;
    border: none;
    &:focus {
      outline: none;
    }
  }
`


export default function SearchBar(props) {
  const [formData, setFormData] = useState('')
  const [colorList, setColorList] = useState(['e64c3c', 'f0c419', '086788', 'fbffe2', '2a9d8f'])
  const [selectedColors, setSelectedColors] = useState([])

  const handleChange = (e) => {
    setFormData(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let formArray = formData.split(' ')
      if (!formData) { formArray = [] }
      if (!formData && selectedColors.length <= 0) {
        props.fetchThoughts()
      } else {
        props.filterThoughts(selectedColors, formArray)
      }
    } catch (error) {
      alert(error)
    }
  }

  const toggleColor = (hex) => {
    if (selectedColors.includes(hex)) {
      setSelectedColors(selectedColors.filter(color => color !== hex))
    } else {
      setSelectedColors([...selectedColors, hex])
    }
  }

  return (
    <SearchBarContainer>
      <form onSubmit={handleSubmit}>
        <label htmlFor='search'>
          <input type='text' name='search' value={formData} onChange={handleChange} placeholder='search...' />
        </label>
      </form>
      {colorList.map(color => (
        <SearchCircle color={color} toggleColor={toggleColor} key={`searchCircle${color}`} />
      ))}
    </SearchBarContainer>
  )
}
