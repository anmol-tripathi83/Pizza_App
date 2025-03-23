import Pizzalogo from "../assets/Images/pizza-app_logo.png";
import Footer from "../Components/Footer";

// eslint-disable-next-line react/props-types
function Layout({children}){    // children props
    return (
        <div>
            {/** Navbar */}
            <nav className="flex items-center justify-around h-16 text-[#687280] font-mono border-none shadow-md">
                <div className="flex items-center justify-center">
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
            </nav>

            {children}

            {/** Footer */}
            <Footer/>
        </div>
    );
}

export default Layout;