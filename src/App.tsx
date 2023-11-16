import Cart from "./Cart";
import Shop from "./Shop";
import Welcomebar from "./Welcomebar";
import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, set, ref, child, get } from 'firebase/database';


const STRIPE_KEY = import.meta.env.VITE_STRIPE_API_KEY

const getUser = () => {
  const foundUser = localStorage.getItem('shop_user')
  if (foundUser) {
    return JSON.parse(foundUser)
  }
  else return null
}

export default function App() {
  const [user, setUser] = useState(getUser);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const createPopup = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  const user = result.user
  console.log(user)
  setUser(user)
  getCartFromDB(user)
  localStorage.setItem('shop_user', JSON.stringify(user))
};

const logout = () => {
  setUser(null)
  localStorage.removeItem('shop_user')
  setCart({})
};

  const getProducts =async () => {
    const url = 'https://api.stripe.com/v1/products'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${STRIPE_KEY}`

      }
    }
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data)
    setProducts(data.data)

  };

  const updateCartDB = async (cart) => {
    const db = getDatabase();
    set(ref(db, `/cart/${user?.uid}`), cart)
  }

  const addToCart = (item) => {
    const copy = {... cart}
    if (item.id in copy){
      copy[item.id].qty ++
    }
    else {
      copy[item.id] = item
      copy[item.id].qty = 1
    }
    setCart(copy)
    if (user){
      updateCartDB(copy)
    }
  };

  const removeFromCart = (item_id) => {
    const copy = {...cart}
    copy[item_id].qty --
    if (copy[item_id].qty === 0) {
      delete copy[item_id]
    }
    setCart(copy)
    if (user){
      updateCartDB(copy)
    }
  };

  const deleteCart = () => {
    const copy = {}
    setCart(copy)
  }

  const getCartFromDB = async (user) => {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `/cart/${user?.uid}`))
    if (snapshot.exists()){
      setCart(snapshot.val())
    }
  };

  useEffect(()=>{
    getProducts()
  }, [])

  useEffect(()=>{
    if (user){
      getCartFromDB(user)
    }
  }, [user])


  return (
    <div>
      <Welcomebar createPopup={createPopup} user={user} logout={logout}/>

      <Shop products={products} addToCart={addToCart}/>

      <Cart cart={cart} removeFromCart={removeFromCart} deleteCart={deleteCart}/>
    </div>
  )
}
