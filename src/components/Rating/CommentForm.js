import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentForm(props) {
  const { recipeId, setRecipe, setComments, profileImage, profileId } = props;
  
  const [content, setContent] = useState("");
console.log(props)
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosRes.post("/comments/", {
        content,
        recipe: recipeId,
      });
      
      if (response.data) {
        setComments((prevComments) => ({
          ...prevComments,
          results: [response.data, ...prevComments.results],
        }));
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          results: [
            {
              ...prevRecipe.results,
              comments_count: prevRecipe.comments_count + 1,
            },
          ],
        }));
        setContent("");
        updateComments();
        console.log('Sending data:', {
          content,
          recipeId,
        });
      } else {
        console.error('No data found in the response:', response);
      }
    } catch (err) {
      console.log("Error in handleSubmit:", err);
      console.log("Error response data:", err.response?.data);
      console.log("Error response status:", err.response?.status);
      console.log("Error response headers:", err.response?.headers);
    }
  };
  

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profileId}`}>
            <Avatar src={profileImage} />
          </Link>
          <Form.Control
            placeholder="my comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentForm;