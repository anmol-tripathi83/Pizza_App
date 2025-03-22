// file name is start with capital letter because of react recommend to name the file in such a way for the jsx componenets(Ui in reusable element)
import CircleArrowRight from "../Components/Icons/CircleArrowRight";
import PizzaImage from "../assets/Images/pizza2.png";

function Home(){
    return (
        <div>
            {/** hero section */}
            <section className="flex flex-col-reverse items-center justify-center py-5 md:flex-row md:gap-7 bg-gradient-to-r from-amber-50 to-orange-300">     {/** We start to style considering in mind that ui for phone as well therefore md is used */}
                <div className="w-4/6 ml-4 text-center md:w-2/6 md:text-left">
                    {/* Heading */}
                    <div className="flex justify-center text-4xl md:justify-normal">
                        <h1 className="pb-5 font-bold text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text">
                            Enjoy the Slice {' '}
                        </h1>
                        <h1>
                            😋
                        </h1>
                    </div>

                    <p className="pb-4 text-[#687280]">
                        The Pizz App lets you order your favourite pizza from the comfort of your home.
                        Enjoy the best pizza in town with just a few clicks.
                    </p>

                    <button className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 group">
                        Order Now
                        {/* https://reactsvgicons.com/search?q=arrow  => react comaptible icons */}
                        <span className="inline-block ml-2 transition-transform ease-in-out group-hover:translate-x-2"> 
                            <CircleArrowRight/>
                        </span>
                    </button>
                </div>
                <div>
                    <img 
                        src={PizzaImage} 
                        alt="Pizza" 
                        width={550}
                        height={550}
                    />
                </div>
            </section>
        </div>
    )
}

export default Home;