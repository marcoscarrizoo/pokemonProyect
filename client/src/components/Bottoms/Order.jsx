import React from 'react'
import { useDispatch} from 'react-redux';
import './order.css'
import {order} from '../../actions/index'


function Order() {
    const dispatch = useDispatch()
    
function handleChange(e) {
       dispatch(order(e.target.value))
   }
   
return (
    <button className='button'>
        <label>Order</label> <br></br>
        
        <button onClick={e => {
          handleChange(e)  
        }}> 
         A-Z
        </button>
    </button>
)
}
       
                
        
                
            

export default Order; 
