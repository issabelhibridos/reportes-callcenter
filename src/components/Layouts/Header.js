import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Search } from "../Sections/Search";
import { DropdownLoggedOut, DropdownLoggedIn } from "../../components"
import { useCart } from "../../context";

export const Header = () => {
    const [darkMode, setDarkMode] = useState((JSON.parse(localStorage.getItem("darkMode"))) || false);
    const [searchSection, setSearchSection] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const token = JSON.parse(sessionStorage.getItem("token"));
    const { cartList } = useCart();

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode))
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode]);

    return (
        <header>
            <nav className="bg-defaultbg border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">

                    <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-clipboard2-data-fill cursor-pointer text-xl text-gray-950 dark:text-white mr-2" viewBox="0 0 16 16">
                            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                            <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1" />
                        </svg>
                        <span className="ml-0 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">#ReportCenter</span>
                    </Link>

                    <div className="flex items-center relative">
                        <span onClick={() => setDarkMode(!darkMode)} className="bi bi-gear-wide-connected cursor-pointer text-xl text-gray-950 dark:text-white mr-5"></span>
                        <span onClick={() => setSearchSection(!searchSection)} className="bi bi-search cursor-pointer text-xl text-gray-950 dark:text-white mr-5"></span>

                        <Link to="/cart" className="text-gray-950 dark:text-white mr-5">
                            <span className="text-xl bi bi-bar-chart-line relative">
                                {/* <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">{cartList.length}</span> */}
                            </span>

                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-line relative" viewBox="0 0 16 16">
                                <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">{cartList.length}</span>
                                <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1zm1 12h2V2h-2zm-3 0V7H7v7zm-5 0v-3H2v3z" />
                            </svg> */}
                        </Link>

                        <span onClick={() => setDropdown(!dropdown)} className="bi bi-person-circle cursor-pointer text-xl text-gray-950 dark:text-white mr-5"></span>
                        {dropdown && (token ? <DropdownLoggedIn setDropdown={setDropdown} /> : <DropdownLoggedOut setDropdown={setDropdown} />)}
                    </div>
                </div>
            </nav>
            {searchSection && <Search setSearchSection={setSearchSection} />}
        </header>
    )
}
