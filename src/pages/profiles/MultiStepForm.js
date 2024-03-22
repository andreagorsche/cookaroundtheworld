import React, { useState, useRef, useEffect } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";

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
  const { setProfileData } = useSetProfileData();

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
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
    
      console.log('Selected file:', file); // Log the selected file
    
      // Check if the image height is larger than 1024px
      if (file.type.startsWith('image/') && file.size > 0) {
        const img = new Image();
    
        img.onload = function () {
          console.log('Image height:', img.height); // Log the image height
    
          if (img.height > 1024) {
            setErrors({ image: ['Image height larger than 1024px!'] });
          } else {
            // Image is within the desired size, proceed with setting it
            setImageFile(file);
            // Clear any previous image-related errors
            setErrors({});
          }
        };
        img.src = URL.createObjectURL(file); // Load image to get height
      } else {
        // File is not an image or has no size, you can handle this case accordingly
        console.error('Invalid file or file size is zero.');
      }
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
    if (currentStep >= 4) {
      const formDataToSend = new FormData();
      formDataToSend.append('bio', formData.bio);
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      formDataToSend.append('favorite_cuisine', String(formData.favorite_cuisine));

      try {
        const response = await axiosReq.put(`/profiles/${id}/`, formDataToSend);

        if (response.status === 200) {
          const { data } = await axiosReq.get(`/profiles/${id}`);
          setProfileData((prevState) => ({
            ...prevState,
            pageProfile: { results: [data] },
          }));
          setSuccessMessage('Profile successfully updated!');
        } else {
          console.error('Unexpected response status:', response.status);
          setErrors({ image: ['Unexpected response status'] });
        }
      } catch (error) {
        console.error('Error submitting profile data:', error);
        setErrors({ image: ['Error uploading the image.'] });
      }
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
            {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        );
        case 4: // Fourth step for form submission
          return (
            <div>
              <p>Review your data:</p>
              <p>Bio: {formData.bio}</p>
              <p>Favorite Cuisine: {formData.favorite_cuisine}</p>
              {/* Display the uploaded image if available */}
              {imageFile && (
                <div>
                  <p>Uploaded Image:</p>
                  <img src={URL.createObjectURL(imageFile)} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </div>
              )}
              <button onClick={handleSubmit}>Submit</button>
            </div>
          );
      default:
        return null;
    }
  };
  

  return (
    <div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div>
        <h1>Welcome to the Chef's World!</h1>
        <p>
          We don't know much about you yet. Please take the time to give us
          some more information about you. It only takes 5 minutes!
        </p>
        <div style={{ marginBottom: '20px' }}>
          <p>Step {currentStep} of 4</p>
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
