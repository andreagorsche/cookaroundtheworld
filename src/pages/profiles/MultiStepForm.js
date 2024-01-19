import React, { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router';


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

    const [formData, setFormData] = useState({
        bio: '',
        image: null,
        favoriteCuisine: '',
    });

    const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // If the input type is file (for image upload), update formData differently
    if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // sending the form data to the backend
    try {
        const response = await axiosReq.get(`/profiles/${id}`);
        console.log('Profile form submission successfully:', response.data);
        setFormData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const calculateProgress = () => {
        return (currentStep / 3) * 100;
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
              onChange={handleInputChange}
            />
            <button onClick={handleNext}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <label>Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleInputChange}
            />
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <label>Favorite Cuisine:</label>
            <select
              name="favoriteCuisine"
              value={formData.favoriteCuisine}
              onChange={handleInputChange}
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
            <button type="submit">Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <p>Step {currentStep} of 3</p>
        </div>
      <div>
        <form onSubmit={handleSubmit}>
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
