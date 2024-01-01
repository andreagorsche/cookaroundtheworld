import styles from "./App.module.css";
import NavMenu from "./components/NavMenu";
import Container from "react-bootstrap/Container";
import {Route, Switch} from 'react-router-dom'
import "./api/axiosDefaults";
import RegisterForm from "./pages/auth/RegisterForm";
import LoginForm from "./pages/auth/LoginForm";
import CreateRecipeForm from "./pages/posts/CreateRecipeForm";
import RecipePage from "./pages/posts/RecipePage"; 
import ProfilePage from "./pages/profiles/ProfilePage"; 
import RecipesResultsPage from "./pages/posts/RecipesResultsPage"; 
import WelcomePage from "./pages/WelcomePage"; 
import { useCurrentUser } from "./contexts/CurrentUserContext";
import Impressum from "./legal/Impressum";
import DataProtection from "./legal/DataProtection";
import Footer from "./components/Footer";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id

  return (
    <div className={styles.App}>
    <NavMenu/>
    <Container fluid className={styles.Main} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Switch>
          <Route exact path ="/" render = {() => <WelcomePage />}/>
          <Route exact path ="/feeding" render = {() => <RecipesResultsPage 
          message ="No recipes found for these search criteria. Please adjust your search or follow other chefs."
          filter={`owner__followed__owner__profile=${profile_id}&`}
          />}/>
          <Route exact path ="/favorites" render = {() => <RecipesResultsPage 
          message ="No recipes found for these search criteria. Please adjust your search or like more recipes."
          filter={`ratings__owner__profile=${profile_id}&ordering=-ratings_created_at&`}
          />}/>
          <Route exact path="/recipes/create" render={() => <CreateRecipeForm />} /> 
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/recipes/:id" render={() => <RecipePage />} />
          <Route exact path ="/register" render = {() => <RegisterForm />}/>
          <Route exact path ="/login" render = {() => <LoginForm />}/>
          <Route render = {()=><p>Page not found!</p>}/>
          <Route path="/dataprotection" element={<DataProtection />} />
          <Route path="/impressum" element={<Impressum />} />
        </Switch>
      </Container>
      <Footer />
      </div>

  );
}

export default App;