import styles from "./App.module.css";
import NavMenu from "./components/NavMenu";
import Container from "react-bootstrap/Container";
import {Route, Switch} from 'react-router-dom'
import "./api/axiosDefaults";
import RegisterForm from "./assets/pages/auth/RegisterForm";
import LoginForm from "./assets/pages/auth/LoginForm";


function App() {
  return (
    <div className={styles.App}>
      <NavMenu/>
      <Container className={styles.Main}>
        <Switch>
          <Route exact path ="/" render = {() => <h1>Recipes</h1>}/>
          <Route exact path ="/login" render = {() => <LoginForm/>}/>
          <Route exact path ="/register" render = {() => <RegisterForm/>}/>
          <Route render = {()=><p>Page not found!</p>}/>
        </Switch>
      </Container>
      </div>
  );
}

export default App;