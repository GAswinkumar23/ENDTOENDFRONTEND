import {BrowserRouter as Router, Route,Routes}from 'react-router-dom';
import './App.css';
import Login from './components/AuthenticationForms/login';
import Signup from './components/AuthenticationForms/signup'
import Dashboard from './components/pages/Dashboard';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
