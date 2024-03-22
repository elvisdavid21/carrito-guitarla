import {useState, useEffect} from 'react'
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import {db} from './data/db'

function App() {

  //recuperar los datos de local storage
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  //state para el carrito
  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  //guardar datos en local Storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  //funcionalidad para evitar objetos reperidos en el carrito
  function addToCart(item) {
    const itemExist = cart.findIndex(guitarra => guitarra.id === item.id) 

    if(itemExist >= 0) {//cuando un item existe
      if(cart[itemExist].quantity >= MAX_ITEMS) return
      console.log('agregando cantidad de un producto...')
      const copyCart = [...cart]
      copyCart[itemExist].quantity++
      setCart(copyCart)
    }else{
      console.log('agregando...')
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  //eliminar productos del carrito
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitarra => guitarra.id != id))
    console.log('eliminando...')
  }

  //incrementar cantidad de producto en el carrito
  function increaseQuantity(id) {
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
    console.log('Incrementando, ', id)
  }

  //eliminar cantidad de producto
  function decreasedQuantit(id) {
    const uptadeCartQuantity = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS) {
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(uptadeCartQuantity)
    console.log('Quitando cantidad: ', id)
  }

  //Limpiar el carrito
  function clearCart() {
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreasedQuantit={decreasedQuantit}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {
              (data.length > 0 ? (
                data.map(guitarra => (
                  <Guitar
                    key={guitarra.id} 
                    guitarra={guitarra}
                    setCart={setCart}
                    addToCart={addToCart}
                  />
                ))
               ) : 'No hay Productos')
            }
          </div>
      </main>
      <Footer/>
    </>
  )
}

export default App
