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
import WelcomePage from "./pages/WelcomePage"; 
import Footer from "./components/Footer";
import FoodFeed from "./pages/posts/FoodFeed";
import ConfirmationPage from "./pages/auth/ConfirmationPage";
import InactiveAccount from "./pages/auth/InactiveAccount";
import VerifyEmail from "./pages/auth/VerifyEmail";
import PageNotFound from "./pages/PageNotFound";

function App() {

  return (
    <div className={styles.App}>
    <NavMenu/>
    <Container fluid className={styles.Main.Container} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Switch>
          <Route exact path ="/" render = {() => <WelcomePage />}/>
          <Route exact path ="/foodfeed" render = {() => <FoodFeed 
          message ="No recipes found for these search criteria. Please adjust your search."
          />}/>
          <Route exact path="/recipes/create" render={() => <CreateRecipeForm />} /> 
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/recipes/:id" render={() => <RecipePage />} />
          <Route exact path ="/register" render = {() => <RegisterForm />}/>
          <Route path="/success" render={() => <ConfirmationPage />}/>
          <Route path="/verify-email/:key" render={() => <VerifyEmail />}/>
          <Route path="/inactive-account" render={() => <InactiveAccount />}/>
          <Route exact path ="/login" render = {() => <LoginForm />}/>
          <Route render={() => <PageNotFound />} />
        </Switch>
      </Container>
      <Footer />
      </div>

  );
}

export default App;