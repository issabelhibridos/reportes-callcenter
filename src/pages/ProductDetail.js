import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Rating } from "../components/Elements/Rating";
import { useTitle } from "../hooks/useTitle";
import { useCart } from "../context"
import { getProduct } from "../services";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const ProductDetail = () => {
    const { cartList, addToCart, removeFromCart } = useCart();
    const [inCart, setInCart] = useState(false);
    const [product, setProduct] = useState({});
    const { id } = useParams();

    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();

    function onChangeHandler(value) {
        setDateStart(value[0]);
        setDateEnd(value[1]);
    }

    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await getProduct(id);
                setProduct(data);
            } catch (error) {
                toast.error(error.message,)
            }
        }
        fetchProduct();
    }, [id])

    useEffect(() => {
        const productInCart = cartList.find(item => item.id === product.id);

        if (productInCart) {
            setInCart(true)
        } else {
            setInCart(false);
        }
    }, [cartList, product.id])

    function handleRemoved(product) {
        removeFromCart(product);
    }

    useTitle(product.name);

    return (
        <main>
            <section>
                <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{product.name}</h1>
                <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">{product.overview}</p>
                <div className="flex flex-wrap justify-around">
                    <div className="max-w-xl my-3">
                        <img className="rounded" src={product.poster} alt="poster" />
                    </div>
                    <div className="max-w-xl my-3">
                        <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                            <span className="mr-1">$</span>
                            <span className="">{product.price}</span>
                        </p>
                        <p className="my-3">
                            <span>
                                <Rating rating={product.rating} />
                            </span>
                        </p>
                        <p className="my-4 select-none">
                            {product.best_seller && <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">BEST SELLER</span>}
                            {product.in_stock && <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">INSTOCK</span>}
                            {!product.in_stock && <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span>}

                            <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">{product.size} MB</span>
                        </p>

                        <DatePicker
                            id="dateStartEnd"
                            selectsRange={true}
                            startDate={dateStart}
                            endDate={dateEnd}
                            onChange={onChangeHandler}
                            dateFormat="dd MMM yyyy"
                            className={'form-control form-control-sm font-semibold text-black-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2'}
                            showDisabledMonthNavigation
                        />

                        <p className="my-3">
                            {!inCart && <button onClick={() => addToCart(product)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800`} disabled={product.in_stock ? "" : "disabled"}>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button>}
                            {inCart && <button onClick={() => handleRemoved(product)} className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}>Remove Item <i className="ml-1 bi bi-trash3"></i></button>}
                            <Link to={`/range/${dateStart}/${dateEnd}`}>
                                <button className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}>Report <i className="ml-1 bi bi-trash3"></i></button>
                            </Link>
                        </p>
                        <p className="text-lg text-gray-900 dark:text-slate-200">
                            {product.long_description}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
