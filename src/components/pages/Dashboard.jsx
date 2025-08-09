import NavBar from '../DashboardComponents/NavBar';
import SideBarDetails from '../DashboardComponents/SideBarDetails';
import Events from '../DashboardComponents/Events';
import '../../styles/Pages/Dashboard.css'
const Dashboard=({userid})=>{
    return(
    <>
        <NavBar/>
        <div className='dashboard-parent'>
            <div className="side">
           <SideBarDetails userid={userid}/>
        </div>
        <div className='event'>
            <Events userid={userid}/>
        </div>
        </div>
    </>);
}
export default Dashboard;