import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../redux/slice/wishListSlice'
import { addToCart } from '../redux/slice/cartSlice'
import { toast } from 'react-toastify'

function View() {

  const dispatch=useDispatch()
const{id}=useParams()
// console.log(id);

const[product,setProduct]=useState({})
const{cart}=useSelector(state=>state.cartReducer)
  useEffect(()=>{
    const products= JSON.parse(localStorage.getItem("products"))

    setProduct(products?.find(item=>item.id==id))
     
  },[])


// console.log(product);
const{wishlist}=useSelector((state)=>state.wishlistReducer)

const handleWishlist=(product)=>{
     
  const existingProduct=wishlist.find(item=> item.id == product.id)

  if(existingProduct){
    toast(" already exists in wishist ")
  }else{
    dispatch(addToWishlist(product))
   
  }
   
}


const handleCart=(product)=>{
  const existingProduct= cart?.find(item=>item.id== product.id)
  if(existingProduct){
    dispatch(addToCart(product))
    alert("item adedd (quantity increased)")
  }else{
    dispatch(addToCart(product))
    toast("item adedd ")
  }
}

  return (
    <div className='container row' style={{marginTop:"80px"}}>

      
           
        <div className="col-lg-4">
            <img style={{width:"100%",height:"400px"}} src={product.thumbnail} alt="" />
       </div>
       <div className="col-lg-2">

       </div>
       <div className="col-lg-6">
          <p>Pid:019182</p>
          <h1>{product.title}</h1>
          <h5 className='fw-bolder'>Price: <span style={{color:"red"}}>${product.price}</span></h5>
          <p>{product.description}</p>
           <div className="d-flex justify-content-between mt-4">
           <Button className='btn btn-light'onClick={(e)=>handleWishlist(product)}  ><i className='fa-solid fa-heart text-danger'></i></Button>
           <Button className='btn btn-light'onClick={(e)=>handleCart(product)} ><i className='fa-solid fa-cart-shopping text-warning'></i></Button>
           </div>
       </div>

    </div>
  )
}

export default View
