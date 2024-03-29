import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../Avatar';
import MarkAsInappropriateButton from '../Rating/MarkAsInappropriateButton';

const CommentDisplay = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const history = useHistory();

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

  const handleDeleteComment = async (commentId) => {
    try {
      if (window.confirm('Are you sure you want to delete this comment?')) {
        await axiosReq.delete(`/comments/${commentId}/`);
        // Update comments after deletion
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul className="list-unstyled">
        {comments.map((comment) => (
          <li key={comment.id}>
            <Avatar src={comment.profile_image} height={40} />
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
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
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
