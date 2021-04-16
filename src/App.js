import './App.css';
import './Components/Title/Title'
import LoginPage from './Pages/LoginPage/LoginPage'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {

  return (
    <Router>

      <LoginPage />

    </Router>
  )
}

export default App;
