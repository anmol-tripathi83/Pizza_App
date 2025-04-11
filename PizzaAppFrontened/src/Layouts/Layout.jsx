import { useDispatch, useSelector } from "react-redux";
import Pizzalogo from "../assets/Images/pizza-app_logo.png";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";

// eslint-disable-next-line react/props-types
function Layout({children}){    // children props
    // Reading the Logged in condn of user using state which we have maintained 
    // => if user is loggined the  we will show logout buttun in tha navbatr (accessing state value using useSelector hook)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout(e){
        e.preventDefault;
        // dispatch the logout action
        dispatch(logout());
    }

    return (
        <div>
            {/** Navbar */}
            <nav className="flex items-center justify-around h-16 text-[#687280] font-mono border-none shadow-md">
                <div className="flex items-center justify-center"
                    onClick={() => navigate('/')}
                >
                    <p>Pizza App</p>
                    <img src={Pizzalogo} alt="Pizza logo" width={70} height={70} />
                </div>
                <div className="hidden md:block">
                    <ul className="flex gap-4">
                        <li className="hover:text-[#FF9110]">
                            { ' ' }
                            <p>Menu {' '}</p>
                        </li>
                        <li className="hover:text-[#FF9110]">
                            { ' ' }
                            <p>Services {' '}</p>
                        </li>
                        <li className="hover:text-[#FF9110]">
                            { ' ' }
                            <p>About {' '}</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="flex gap-4">
                        <li className="hover:text-[#FF9110]">
                            {isLoggedIn ? (   
                                <Link onClick={handleLogout}>Logout</Link>
                            ) : (
                                <Link to={'/auth/login'} >Login</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>

            {children}

            {/** Footer */}
            <Footer/>
        </div>
    );
}

export default Layout;