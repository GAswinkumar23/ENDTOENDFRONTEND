import {BrowserRouter as Router, Route,Routes}from 'react-router-dom';
import './App.css';
import Login from './components/AuthenticationForms/login';
import Signup from './components/AuthenticationForms/signup'
import Dashboard from './components/pages/Dashboard';
import AddEvents from './components/AddEvents/AddEvents';
import ProfilePage from './components/DashboardComponents/ProfileSection';
function App() {
  const userId=localStorage.getItem('userid');
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard userid={userId}/>}/>
          <Route path='/events/add' element={<AddEvents userid={userId}/>}/>
          <Route path='/profilesection' element={<ProfilePage userid={userId}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
