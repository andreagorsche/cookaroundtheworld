import React, { useState, useRef, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';

const MultiStepForm = () => {
  const { id } = useParams();
  const CUISINE_CHOICES = [
    'AMERICAN',
    'AUSTRIAN',
    'CARIBBEAN',
    'CHINESE',
    'FRENCH',
    'GERMAN',
    'GREEK',
    'INDIAN',
    'ITALIAN',
    'MEDITERRANEAN',
    'MEXICAN',
    'SLOVAK',
    'SPANISH',
  ];

  const profileData = useProfileData();
  const setProfileData = useSetProfileData();

  const [formData, setFormData] = useState({
    bio: profileData.pageProfile.bio || '',
    image: profileData.pageProfile.image || '',
    favorite_cuisine: profileData.pageProfile.favorite_cuisine || '',
  });

  const [imageFile, setImageFile] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);
  const imageInput = useRef(null);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      URL.revokeObjectURL(formData.image);
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
      });
      setImageFile(file);
    }
  };


  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
  
    formDataToSend.append('bio', formData.bio);
    // Check if an image is selected before appending to FormData
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }
    formDataToSend.append('favorite_cuisine', formData.favorite_cuisine);
  
  
    try {
      // Make the axios request to update the data
      await axiosReq.put(`/profiles/${id}/`, formDataToSend);
  
      // Update the profile data after successful submission
      const { data } = await axiosReq.get(`/profiles/${id}`);
      // Update the profile data context after successful submission
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: { results: [data] },
      }));
    } catch (error) {
      console.error('Error submitting profile data:', error);
  
      if (error.response) {
        console.error('Server response data:', error.response.data);
        console.error('Server response status:', error.response.status);
        console.error('Server response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
  
      // Handle error and set appropriate error messages
      setErrors({ image: ['Error uploading the image.'] });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
            <button onClick={handleNext}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <label>Favorite Cuisine:</label>
            <select
              name="favorite_cuisine"
              value={formData.favorite_cuisine}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select a Cuisine
              </option>
              {CUISINE_CHOICES.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChangeImage}
              ref={imageInput}
            />
            <button onClick={handlePrev}>Previous</button>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <h1>Welcome to the Chef's World!</h1>
        <p>
          We don't know much about you yet. Please take the time to give us
          some more information about you. It only takes 5 minutes!
        </p>
        <div style={{ marginBottom: '20px' }}>
          <p>Step {currentStep} of 3</p>
        </div>
        <form
          className="col-lg-12 d-flex flex-column align-items-center"
          onSubmit={handleSubmit}
        >
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
