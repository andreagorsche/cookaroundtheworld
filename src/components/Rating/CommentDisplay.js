// CommentDisplay.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const CommentDisplay = () => {
  const [comments, setComments] = useState([]);
  const { recipeId } = useParams();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosReq.get(`/comments/?recipe_id=${recipeId}`);
        setComments(response.data.results);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [recipeId]);

  const markAsInappropriate = async (commentId) => {
    try {
      await axiosReq.patch(`/comments/${commentId}/mark_inappropriate/`);
      // Refresh the comments after marking as inappropriate
      const response = await axiosReq.get(`/comments/?recipe_id=${recipeId}`);
      setComments(response.data.results);
    } catch (error) {
      console.error('Error marking comment as inappropriate:', error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul className="list-unstyled">
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.content}
            {!currentUser.is_owner && !comment.is_owner && !comment.is_inappropriate && (
              <button onClick={() => markAsInappropriate(comment.id)}>
                Mark as Inappropriate
              </button>
            )}
            {comment.is_inappropriate && <p>This comment has been marked as inappropriate.</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentDisplay;