import NavBar from '../DashboardComponents/NavBar';
import SideBarDetails from '../DashboardComponents/SideBarDetails';
import Events from '../DashboardComponents/Events';
import '../../styles/Pages/Dashboard.css'
const Dashboard=()=>{
    return(
    <>
        <NavBar/>
        <div className='dashboard-parent'>
            <div className="side">
           <SideBarDetails/>
        </div>
        <div className='event'>
            <Events />
        </div>
        </div>
    </>);
}
export default Dashboard;