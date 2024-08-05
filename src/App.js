import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItem=()=>{
      this.setState({cartList:[]})
  }

  incrementCardItemQuantity=id=>{
    this.setState(prevstate=>({cartList:prevstate.cartList.map(eachCartItem=>{
      if (id===eachCartItem.id){
        const updatedQuantity=eachCartItem.quantity+1
        return{...eachCartItem,quantity:updatedQuantity}
      }
      return each
    })
    }))
  }
  decrementCardItemQuantity=id=>{
    const {cartList}=this.state
    const productObject=cartList.find(eachCartItem=>eachCartItem.id===id)
    if (productObject.Quantity>1){
    this.setState(prevstate=>({cartList:prevstate.cartList.map(eachCartItem=>{
      if (id===eachCartItem.id){
        const updatedQuantity=eachCardItem.quantity-1
        return{...each,quantity:updatedQuantity}
      }
      return each
    })
    }))}
    else{
      this.removeCartItem(id)
    }
  }

removeCartItem=()=>{
  const {cartList}=this.state
  const updatedList=cartList.filter(eachCartItem=>eachCartItem.id!==id)
  this.setState({cartList:updatedList})
}


  addCartItem = product => {
    const {cartList}=this.state
    const productObject=cartList.find(eachCartItem=>eachCartItem.id===product.id)
    if (productObject){
      this.setState(prevstate=>({
        cartList:prevstate.cartList.map(eachCartItem=>{
          if(productObject.id===eachCartItem.id){
            const updatedQuantity=eachCartItem.quantity+product.quantity
            return {...eachCartItem,quantity:updatedQuantity}
          }
          return eachCardItem
          
        })
      }))
    }
    else{
            const updatedCartList=[...cartList,product]
            this.setState({cartList:updatedCartList})
          }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCardItemQuantity:this.incrementCardItemQuantity,
          decrementCardItemQuantity:this.decrementCardItemQuantity,
          removeAllCartItems:this.removeAllCartItem
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
