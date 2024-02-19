// CommentDisplay.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../Avatar';
import MarkAsInappropriateButton from '../Rating/MarkAsInappropriateButton'

const CommentDisplay = () => {
  const [comments, setComments] = useState([]);
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
  }, []);


  const handleMarkedAsInappropriate = (commentId) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId ? { ...comment, is_inappropriate: true } : comment
      )
    );
  };

  // Filter out comments marked as inappropriate
  const visibleComments = comments.filter(comment => !comment.is_inappropriate);


  
  return (
    <div>
      <h3>Comments</h3>
      <ul className="list-unstyled">
        {visibleComments.map((comment) => (
          <li key={comment.id}>
            <Avatar src={currentUser.profile_image} height={40} />
            {comment.content}
            {!currentUser.is_owner && !comment.is_owner && (
              <MarkAsInappropriateButton
                commentId={comment.id}
                onMarkedAsInappropriate={handleMarkedAsInappropriate}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentDisplay;