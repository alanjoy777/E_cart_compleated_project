import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist } from '../redux/slice/wishListSlice'
import { addToCart } from '../redux/slice/cartSlice'

function Wishlist() {

  const{wishlist}=useSelector((state)=>state.wishlistReducer)
   
  const dispatch=useDispatch()
  const{cart}=useSelector(state=>state.cartReducer)

  const handleCart=(product)=>{
   dispatch(addToCart(product))
   dispatch(removeFromWishlist(product.id))
  }


  return (
    <div className='d-flex justify-content-center'>
     { wishlist?.length>0?<Row className='mt-5 container'>
  
  { 
  wishlist.map(product=>(
    <Col className='mb-3 mt-3' sm={12} md={8} lg={4} xl={3} >
    <Card style={{ width: '18rem' }} className='shadow'>
  <Link to={`/view/${product.id}`}><Card.Img variant="top" style={{width:"100%"}} src={product.thumbnail}/>
  </Link>
   <Card.Body className='bg-success'>
     <Card.Title style={{color:"black"}} className='text-center'>{product.title.slice(0,12)}...</Card.Title>
     <div className="d-flex justify-content-between">
         <Button className='btn btn-light' onClick={(e)=>dispatch(removeFromWishlist(product.id))} ><i className='fa-solid fa-trash text-danger'></i></Button>
         <Button className='btn btn-light'onClick={(e)=>handleCart(product)}  ><i className='fa-solid fa-cart-shopping text-warning'></i></Button>
     </div>
     
   </Card.Body>
  </Card>
    </Col>
  ))
    }


</Row>:<div className='d-flex justify-content-center'> 
  <img src="https://i.pinimg.com/originals/f6/e4/64/f6e464230662e7fa4c6a4afb92631aed.png" style={{marginBottom:"100px"}} alt="" />
</div>
}
    </div>
  )
}

export default Wishlist
