
export default function Shop({products, addToCart}) {

    const showProducts = () => {
        return products.map(p=><div key={p.id}>{p.name}<button onClick={()=>{addToCart(p)}}>+</button></div>)
    }
  return (
    <div>
      <h1>Products</h1>
      <div className="container">
        {showProducts()}
      </div>
    </div>
  )
}
