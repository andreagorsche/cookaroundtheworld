import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import MarkAsInappropriateButton from './MarkAsInappropriateButton';

const CommentDisplay = () => {
  const [comments, setComments] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
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
  }, [id]);

  const handleMarkedAsInappropriate = (commentId) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId ? { ...comment, is_inappropriate: true } : comment
      )
    );
  };

  const handleDeleteComment = async (commentId) => {
    try {
      if (window.confirm('Are you sure you want to delete this comment?')) {
        await axiosReq.delete(`/comments/${commentId}/`);
        // Update comments after deletion
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        setSuccessMessage('Comment deleted successfully.');
      }
      // Clear success message after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {successMessage && <p style={{ color: 'red' }}>{successMessage}</p>}
      <ul className="list-unstyled">
        {comments.map((comment) => (
          <li key={comment.id}>
            <Avatar src={comment.profile_image} height={40} />
            <span style={{ marginLeft: '1rem', marginRight:'1rem' }}>{comment.owner}</span>
            {comment.is_inappropriate ? (
              <p>This comment has been marked as inappropriate</p>
            ) : (
              <>
                {comment.content}
                {!currentUser.is_owner && !comment.is_owner && (
                  <MarkAsInappropriateButton
                    commentId={comment.id}
                    onMarkedAsInappropriate={handleMarkedAsInappropriate}
                  />
                )}
                {!currentUser.is_owner && comment.is_owner && (
                  <button style={{ marginLeft: '1rem', marginRight:'1rem' }} onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentDisplay;
