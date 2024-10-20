import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Orders() {
  const { orders } = useSelector(state => state.cartReducer);

  // Flatten the orders array
  const flattenedOrders = orders.flat(); // Flattens the array by one level

  useEffect(() => {
    console.log("Orders updated:", flattenedOrders);
  }, [flattenedOrders]); // This will run every time the flattened orders change

  return (
    <>
      {
        flattenedOrders && flattenedOrders.length > 0 ? (
          <div className="container " style={{marginLeft:"300px"}}>
            <div className="row mt-5">
              <div className="col-lg-8">
                <table className='table shadow'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Thumbnail</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {
                      flattenedOrders.map((item, index) => (
                        <tr key={item.id}> {/* Use a unique key here */}
                          <td>{index + 1}</td>
                          <td>{item.title}</td> {/* Assuming item has a title property */}
                          <td>
                            <img 
                              style={{ width: "200px", height: "200px" }} 
                              src={item.thumbnail} // Use the item's thumbnail
                              alt={item.title} 
                            />
                          </td>
                          
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className='d-flex justify-content-center'> 
            <img 
              src="https://organickle.com/images/no-order.svg" 
              style={{ marginBottom: "100px" }} 
              alt="No Orders" 
            />
          </div>
        )
      }
    </>
  );
}

export default Orders;
