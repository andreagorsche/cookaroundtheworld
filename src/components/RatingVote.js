import { response } from 'msw'
import React from 'react'

const RatingVote = () => {
    const [rating, setRating] = useState([])
        rating: {}
        edit: false,
    
    const addRating = async (newRating) => {
        const response = await axios.post("/ratings/");
    }
    const data = await response.json()
    setRating([data, ...rating])
  return (
    <div>RatingVote</div>
  )
}

export default RatingVote