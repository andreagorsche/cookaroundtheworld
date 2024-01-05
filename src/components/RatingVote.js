import { response } from 'msw'
import React from 'react'
import RatingSelect from './RatingSelect'

const RatingVote = () => {
    const [rating, setRating] = useState(0);
    const [ratingEdit, setRatingEdit] = useState({ rating: 0, edit: false });

        rating: {}
        edit: false,
    
    const addRating = async (newRating) => {
        const response = await axios.post("/ratings/");
    }
    const data = await response.json()
    setRating([data, ...rating])

    const updateRating = async (id,upRating) => {
        const response = await axiosReq.get(`/ratings/?${id}`);
    }
    const data = await response.json()
    
    setRating (rating.map((rating)) => (rating.id === id ? data : rating)))

    //add a rating after editing
    setRatingEdit({
        item: {},
        edit: false,
    })

    //Set item to be updated
    const editRating = (rating) => {
        setRatingEdit({
            rating,
            edit: true,
        })
    }

    useEffect (() => {
        if (ratingEdit === true) {
            setRating(ratingEdit.rating)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newRating = {
            rating
        }
    }

    if (ratingEdit.edit === true) {
        updateRating (ratingEdit.id, newRating)
    } else {
        addRating(newRating)
    }
  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How did you like this recipe?</h2>
            <RatingSelect select={setRating} selected{rating} />
            <Button type = 'submit'>
                Send
            </Button>
        </form>
    </Card>
  )
}

export default RatingVote