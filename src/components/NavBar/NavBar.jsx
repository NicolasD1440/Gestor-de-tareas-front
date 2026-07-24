import "./NavBar.css";
import useSession from "../../hooks/useSesions";
function NavBar() {
  const timeLeft = useSession();
  return (
    <div className="Nav-main">
      <div className="search">
        <div className="search-container">
          <svg 
            className="search-icon" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            width="20" 
            height="20"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>

      <div className="options">
        <div className="timmer">
        <i className="fa-regular fa-clock"><span>{" "+timeLeft}</span></i> 
        </div>
        
        <i className="fa-regular fa-bell"></i>
        <i className="fa-regular fa-circle-question"></i>
        <i className="fa-regular fa-circle-user"></i>
      </div>
    </div>
  );
}

export default NavBar;