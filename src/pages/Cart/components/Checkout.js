import { useRef, useEffect, useState } from "react";
import { useCart } from "../../../context";
import { useNavigate } from "react-router-dom";
import { createOrder, getUser } from "../../../services";
import { toast } from "react-toastify";
import emailjs from '@emailjs/browser';


export const Checkout = ({ setCheckout }) => {
    const { cartList, total, clearCart } = useCart();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const dirname = useRef();
    const comment = useRef();
    let payment = "";


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getUser();
                setUser(data);
            } catch (error) {
                toast.error(error.message,)
            }
        }
        fetchData();
    }, [])

    async function handleOrderSubmit(event) {
        event.preventDefault();
        try {
            const data = await createOrder(cartList, total, user);
            const subjectValue = JSON.stringify(cartList, ["name","order_quantity"], "\t")
                + "\nDATOS: " + dirname.current.value
                + "\nPAGO: " + payment
                + "\nTOTAL: " + total
                + "\nCOMENTARIOS: " + comment.current.value;
            const emailValue = user.name + " " + user.email;
            const content = { emailValue, subjectValue };
            clearCart();
            emailjs.send('service_rdjcxe4', 'template_jgihwgx', content, 'ItJ59TEtqG97poDhb')
                .then((result) => {
                    toast(`The order has been sent`)
                }, (error) => {
                    toast.error(error);
                });

            navigate("/order-summary", { state: { data: data, status: true } })
        } catch (error) {
            navigate("/order-summary", { state: { status: false } })
        }
    }

    return (
        <section>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
            <div id="authentication-modal" tabIndex="-1" className="mt-5 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog" >
                <div className="relative p-4 w-full max-w-md h-full md:h-auto overflow-y-auto">
                    <div className="relative bg-defaultbg rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setCheckout(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal" >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="py-6 px-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                <i className="bi bi-credit-card mr-2"></i>CARD PAYMENT
                            </h3>
                            <form onSubmit={handleOrderSubmit} className="space-y-6" >
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name:</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" defaultValue={user.name || ""} required="" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email:</label>
                                    <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" defaultValue={user.email || ""} disabled required="" />
                                </div>
                                <div>
                                    <label htmlFor="dirname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Direccion, Nombre y Numero de Contacto:</label>
                                    <input ref={dirname} type="text" id="dirname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medio de pago:</label>

                                    <input onChange={() => payment = "Datafono"} id="datafono" type="radio" value="" name="price-sort" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" required/>
                                    <label htmlFor="datafono" className="ml-2 mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">Datafono</label>

                                    <input onChange={() => payment = "Efectivo"} id="efectivo" type="radio" value="" name="price-sort" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" required/>
                                    <label htmlFor="efectivo" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Efectivo</label>

                                </div>
                                <div>
                                    <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Comentarios:</label>
                                    <input ref={comment} type="text" id="comment" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <p className="mb-4 text-2xl font-semibold text-lime-500 text-center">
                                    ${total}
                                </p>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700" >
                                    <i className="mr-2 bi bi-lock-fill"></i>PAY NOW
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}