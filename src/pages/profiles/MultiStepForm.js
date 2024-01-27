import React, { useState, useRef, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';

const MultiStepForm = () => {
  const { id } = useParams();
  const CUISINE_CHOICES = [
    'american',
    'austrian',
    'caribean',
    'chinese',
    'french',
    'german',
    'greek',
    'indian',
    'italian',
    'mediterranean',
    'mexican',
    'slovak',
    'spanish',
  ];

  const profileData = useProfileData();
  const setProfileData = useSetProfileData();

  const [formData, setFormData] = useState({
    bio: profileData.pageProfile.results[0]?.bio || '',
    image: profileData.pageProfile.results[0]?.image || '',
    favorite_cuisine: profileData.pageProfile.results[0]?.favorite_cuisine || '',
  });
  
  console.log('Bio from profileData:', formData.bio);
  console.log('Cuisine from profileData:', formData.favorite_cuisine);


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
  
      // Check if the image height is larger than 1024px
      if (file.type.startsWith('image/') && file.size > 0) {
        const img = new Image();
  
        img.onload = function () {
          if (img.height > 1024) {
            setErrors({ image: ['Image height larger than 1024px!'] });
            // Optionally, you can clear the selected file and reset the input
            event.target.value = null;
          } else {
            // Image is within the desired size, proceed with setting it
            URL.revokeObjectURL(formData.image);
            setFormData({
              ...formData,
              image: URL.createObjectURL(file),
            });
            setImageFile(file);
          }
        };
  
        // Load the image source for checking dimensions
        img.src = URL.createObjectURL(file);
      } else {
        // File is not an image or has no size, you can handle this case accordingly
        console.error('Invalid file or file size is zero.');
      }
    }
  };
  

  const handleNext = () => {
    // Check if the required fields are filled before moving to the next step
    if (currentStep === 1 && formData.bio.trim() === '') {
      setErrors({ bio: ['Bio is required.'] });
    } else if (currentStep === 2 && formData.favorite_cuisine === '') {
      setErrors({ favorite_cuisine: ['Favorite cuisine is required.'] });
    } else {
      // No errors, proceed to the next step
      setCurrentStep((prevStep) => prevStep + 1);
    }
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
    formDataToSend.append('favorite_cuisine', String(formData.favorite_cuisine));
  
  
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
    if (profileData.loading) {
      return <p>Loading...</p>;
    }
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
