import React, { useEffect } from 'react'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProductData } from '../redux/slice/productSlice'
import { addToWishlist } from '../redux/slice/wishListSlice'
import { addToCart } from '../redux/slice/cartSlice'
import { toast } from 'react-toastify'


function Home() {

  const dispatch = useDispatch()
  const {loading,products,error} = useSelector((state)=> state.productReducer)
  // console.log(products);
// console.log(loading);
// console.log(error);
const{wishlist}=useSelector((state)=>state.wishlistReducer)

const{cart}=useSelector(state=>state.cartReducer)
  
  useEffect(()=>{

      dispatch(fetchProductData())
    
  },[])

  
  const handleWishlist=(product)=>{
     
    const existingProduct= wishlist.find(item=> item.id == product.id)

    if(existingProduct){
      toast.info(" already exists in whislist ")
    }else{
      dispatch(addToWishlist(product))
     
    }
     
  }

  // console.log(wishlist);
  

const handleCart=(product)=>{
    const existingProduct= cart?.find(item=>item.id== product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      toast.info("item adedd (quantity increased)")
    }else{
      dispatch(addToCart(product))
      toast.info("item adedd ")
    }
}

  return (

    
    <div style={{marginTop:"70px",marginBottom:"250px"}} className='d-flex justify-content-center'>
        {
          loading?<div className='mt-5 text-center fw-bolder'>
              <Spinner animation='border' variant='primary'/> Loading....
          </div>: <Row className='mt-5 container'>
  
       { 
        products?.length>0?products.map((product,index)=>(
          <Col key={index} className='mb-3 mt-3' sm={12} md={6} lg={4} xl={3} >
          <Card style={{ width: '18rem' }} className='shadow'>
   <Link to={`/view/${product.id}`}><Card.Img variant="top" style={{width:"100%"}} src={product.thumbnail} />
   </Link>
         <Card.Body className='bg-success'>
           <Card.Title style={{color:"black"}} className='text-center'>{product.title.slice(0,12)}</Card.Title>
           <Card.Text className='text-white text-center'>
             {product.description.slice(0,20)}...
           </Card.Text>
           <div className="d-flex justify-content-between">
               <Button className='btn btn-light' onClick={(e)=>handleWishlist(product)} ><i className='fa-solid fa-heart text-danger'></i></Button>
               <Button className='btn btn-light' onClick={(e)=>handleCart(product)} ><i className='fa-solid fa-cart-shopping text-warning'></i></Button>
           </div>
           
         </Card.Body>
       </Card>
          </Col>
        )): <p>Nothing To Display</p>
        
       }
    
    
    </Row>}
    </div>
  )
}

export default Home
