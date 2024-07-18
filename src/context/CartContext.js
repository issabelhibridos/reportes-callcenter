import { createContext, useContext, useReducer } from "react"
import { cartReducer } from "../reducers"

const cartInitialState = {
    cartList: [],
    total: 0
}

const CartContext = createContext(cartInitialState);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    function addToCart(product) {
        const updatedList = state.cartList.concat(product);
        const updatedTotal = state.total + product.price;

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updatedList,
                total: updatedTotal,
            }
        })
    }

    function removeFromCart(product) {
        const updatedTotal = state.total - product.price*product.order_quantity;
        const updatedList = state.cartList.filter(item => item.id !== product.id);

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updatedList,
                total: updatedTotal
            }
        })
    }

    function increaseQuantity(product, number) {
        const actualAmount = product.price * product.order_quantity;
        const newAmount = product.price * number;

        const updatedTotal = () => {
            state.total = (state.total - actualAmount) + newAmount
            return state.total
        }

        const updatedList = state.cartList.map(item => {
            if (item.id === product.id) {
                item.order_quantity = number;
            }
            return item
        });

        console.log(state.cartList)

        dispatch({
            type: "INCREASE_QUANTITY",
            payload: {
                products: updatedList,
                total: updatedTotal()
            }
        })
    }

    function clearCart() {
        dispatch({
            type: "CLEAR_CART",
            payload: {
                products: [],
                total: 0
            }
        })
    }

    const value = {
        cartList: state.cartList,
        total: state.total,
        addToCart,
        removeFromCart,
        increaseQuantity,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}