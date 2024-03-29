import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../src/global.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from "./contexts/CurrentUserContext";
import { ProfileDataProvider } from "./contexts/ProfileDataContext";
import { RecipeDataProvider } from "./contexts/RecipeDataContext";
import { RatingProvider } from './contexts/RatingDataContext';


ReactDOM.render(
  <React.StrictMode>
    <Router>
        <CurrentUserProvider>
          <ProfileDataProvider>
            <RecipeDataProvider>
              <RatingProvider>
            <App />
              </RatingProvider>
            </RecipeDataProvider>
          </ProfileDataProvider>
        </CurrentUserProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
