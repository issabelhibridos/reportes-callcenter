import { Link } from "react-router-dom"

export const Hero = () => {
    return (
        <section className="flex flex-col lg:flex-row dark:text-slate-100 items-center">
            <div className="text my-5">
                <h1 className="text-5xl font-bold">Beercat Liquor Store</h1>
                <p className="text-2xl my-7 px-1 dark:text-slate-300">#Beercat is the world's most popular and authoritative store for drinking. Find ratings and access to the newest cocktails and liquors.</p>
                <Link to="/products" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Explore Our Services</Link>
            </div>
            <div className="visual my-5 lg:max-w-xl">
                <img className="rounded-lg max-h-full" src="https://images.unsplash.com/photo-1704049838087-00cd16208715?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxhcmdlJTIwZm9ybWF0JTIwbGlxdW9yfGVufDB8MHwwfHx8MA%3D%3D" alt="Beercat Hero Section" />
            </div>
        </section>
    )
}
