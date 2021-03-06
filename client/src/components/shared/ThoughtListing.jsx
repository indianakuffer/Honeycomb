import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { likeThought, destroyThought } from '../../services/thoughts'
import Popup from '../shared/Popup'

const ListingContainer = styled.div`
  position: relative;
  width: fit-content;
  background-color: #${props => props.color};
  color: #${props => props.darkText ? '086788' : 'fbffe2'};
  border-radius: 10px;
  padding: 5px 8px;
  word-break: break-word;
`
const TopRow = styled.div`
  margin-bottom: 3px;
  font-size: 24px;
  padding-right: 20px;
  transform: translateY(-3px);
`
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`
const Likes = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  user-select: none;
  cursor: pointer;
  .like-heart {
    margin-right: 2px;
    height: 12px;
    width: 12px;
    background-image: url('${props => props.liked ? require('../../images/like-full.svg') : require('../../images/like-empty.svg')}');
    background-size: contain;
    background-repeat: no-repeat;
    filter: ${props => {
    if (props.liked) {
      return 'unset'
    } else {
      return props.darkText ? 'unset' : 'saturate(0) brightness(10)'
    }
  }}
}
`
const TagContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 85%;
`
const Tag = styled.div`
  margin-right: 10px;
  min-width: fit-content;
`
const More = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  z-index: 1;
  font-size: 14px;
  color: inherit;
  padding: 5px;
`
const Options = styled.div`
  position: absolute;
  font-size: 14px;
  right: 5px;
  background: white;
  color: #086788;
  z-index: 1;
  border-radius: 6px;
  overflow: hidden;
  div {
    padding: 2px 5px;
    cursor: pointer;
    :hover {
      background: #086788;
      color: white;
    }
  }
`
const HideOptions = styled.div`
  text-align: right;
`
const Time = styled.div`
  margin-left: 10px;
`

export default function ThoughtListing(props) {
  const [darkText, setDarkText] = useState(false)
  const [timestamp, setTimestamp] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [liked, setLiked] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const darkList = ['f0c419', 'fbffe2']
  // alterby helps simulate the like count increasing/decreasing
  const [alterBy, setAlterBy] = useState(0)

  useEffect(() => {
    // format timestamp
    const date = new Date(props.thoughtData.created_at)
    const year = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(date)
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
    const weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date)
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date)
    setTimestamp(`${weekday}, ${month} ${day}.${year}`)
    // if color is in darklist, set font-color as dark
    if (darkList.includes(props.thoughtData.color)) { setDarkText(true) }
    // if thought is already liked by user, set liked state true
    props.thoughtData.likes.forEach(like => {
      if (!liked && like.user_id === props.currentUser.id) {
        setLiked(true)
        setAlterBy(-1)
      }
    })
  }, [])

  const toggleLike = async () => {
    try {
      await likeThought(props.thoughtData.id)
      setLiked(!liked)
    } catch (error) {
      alert(error)
    }
  }

  const confirmDelete = () => {
    if (!deleteConfirmation) {
      setDeleteConfirmation(!deleteConfirmation)
    } else { deleteThought() }
  }

  const deleteThought = async () => {
    try {
      await destroyThought(props.thoughtData.id)
      props.setSource(props.source.filter(thought => thought.id !== props.thoughtData.id))
    } catch (error) {
      alert(error)
    }
  }

  return (
    <ListingContainer color={props.thoughtData.color} darkText={darkText} liked={liked}>
      {props.currentUser &&
        <More onClick={() => setShowOptions(!showOptions)}>&or;</More>
      }
      {showOptions &&
        <Options>
          <HideOptions onClick={() => setShowOptions(false)}>&and;</HideOptions>
          {props.thoughtData.user_id === props.currentUser.id &&
            <div onClick={confirmDelete}>{deleteConfirmation ? 'really?' : 'delete'}</div>
          }
          <div onClick={() => setShowOptions(false)}>flag</div>
        </Options>
      }
      <TopRow>{props.thoughtData.content}</TopRow>
      <BottomRow>
        <Likes onClick={toggleLike} liked={liked} darkText={darkText}>
          <div className='like-heart' />
          {props.thoughtData.likes.length + alterBy + liked}
        </Likes>
        <TagContainer>
          {props.showTags && props.thoughtData.tags.map((tag) => (
            <Tag key={`${props.thoughtData.id}-${tag.name}${Math.random(999)}`}>#{tag.name}</Tag>
          ))}
        </TagContainer>
        <Time>{timestamp}</Time>
      </BottomRow>
    </ListingContainer>
  )
}
