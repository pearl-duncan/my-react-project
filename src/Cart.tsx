const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function Cart({cart, removeFromCart, deleteCart}) {

    const showCart = () => {
        return Object.keys(cart).map((pId, index)=><p key={index}>
            {cart[pId].name} x{cart[pId].qty}<button onClick={()=>{removeFromCart(pId)}}>-</button>
        </p>)
    }

    const createInputTags = () => {
      return Object.keys(cart).map((pId, index) => (
        <input hidden key={`input${index}`} name={cart[pId].default_price} value={cart[pId].qty}/>
      ));
    }

  return (
    <div>
      <h2>My Cart:</h2>
      <div className='container'>
        {showCart()}
      </div>
      {Object.keys(cart).length!==0
      ?

      <form action={BACKEND_URL + "/api/checkout"} method="POST">
        {createInputTags()}
        <button type="submit">Check Out</button>
      </form>
    
    :
    <></>
    }
    </div>
  )
}
