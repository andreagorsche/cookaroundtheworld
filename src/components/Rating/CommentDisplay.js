// CommentDisplay.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../Avatar';

const CommentDisplay = () => {
  const [comments, setComments] = useState([]);
  const [markedAsInappropriate, setMarkedAsInappropriate] = useState([]);
  const { id } = useParams();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosReq.get(`/comments/?recipe=${id}`);
        const filteredComments = response.data.results.filter(comment => comment.recipe === parseInt(id));
        setComments(filteredComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [id, comments]);

  useEffect(() => {
    console.log('Comments:', comments);
  }, [comments]);


  const handleMarkedAsInappropriate = (commentId) => {
    setMarkedAsInappropriate(prevState => [...prevState, commentId]);
  };

  // Filter out comments marked as inappropriate
  const visibleComments = comments.filter(comment => !markedAsInappropriate.includes(comment.id));


  
  return (
    <div>
      <h3>Comments</h3>
      <ul className="list-unstyled">
        {comments.map((comment) => (
          <li key={comment.id}>
            <Avatar src={currentUser.profile_image} height={40} />
            {visibleComments.content}
            {!currentUser.is_owner && !comment.is_owner && (
              <MarkAsInappropriateButton
                commentId={comment.id}
                onMarkedAsInappropriate={handleMarkedAsInappropriate}
              />
            )}
      </ul>
    </div>
  );
};

export default CommentDisplay;