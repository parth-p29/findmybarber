import './App.css';
import './Components/Title/Title'
import LoginPage from './Pages/LoginPage/LoginPage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import MainPage from './Pages/MainPage/MainPage';

function App() {

  return (
    <Router>

      <Switch>
        <Route path="/" exact component={LoginPage}  />
        <Route path="/main" component={MainPage}  />
      </Switch>

    </Router>
  )
}

export default App;
