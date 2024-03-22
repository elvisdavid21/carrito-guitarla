
function Guitar({guitarra, addToCart}) {

    const { id, name, description, price, image } = guitarra

    //funcion para agregar al carrito, una forma de hacer la funcionalidad 
    // const handleClick = (guitarra) => {
    //     //toma la copia de cart y agrega un nuevo elemento al carrito
    //     setCart([...cart, guitarra])
    // }

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
            <img className="img-fluid" src={`/img/${image}.jpg`} alt={`imagen ${name}`} />
        </div>
        <div className="col-8">
            <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
            <p>{description}</p>
            <p className="fw-black text-primary fs-3">${price}</p>
            <button 
                type="button"
                className="btn btn-dark w-100"
                onClick={() => addToCart(guitarra)}
            >Agregar al Carrito</button>
        </div>
    </div>
  )
}

export default Guitar