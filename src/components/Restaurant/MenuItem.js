import { useState } from "react";
import "./restaurant.css";
const MenuItem = (props) => {
  let [add, setAdd] = useState(false);
  const {item} = props; 
  const {index} = props;
  let {updateSubtotal} = props;
  let {updateMenuItems} = props;
  let {menuitems} = props;
  console.log("props", menuitems, "index=", index);
  let [quantity, setQuantity] = useState(menuitems[index].qty);
  // if(item.qty<1){
  //   setAdd(false)
  // }
  let decreaseQuantity = () => {
    if (quantity>1){
    setQuantity(quantity-1)
    updateSubtotal(-item.price)}
    else{
      setAdd(false)
      updateSubtotal(-item.price)
    }
    updateQty(menuitems[index].qty-1);
  }

  let updateQty = (_qty)=>{
    let _menuitems = [...menuitems];
    _menuitems[index].qty = _qty;
    updateMenuItems([..._menuitems]);
    console.log("triggered")
  }
  return (
    <>
      <div className="py-4 d-flex justify-content-between">
        <div className="col-8">
          <div className="food_quality">
            <div className="food_quality_circle"></div>
          </div>
          <h6>{item.name}</h6>
          <h6>`{item.price}</h6>
          <p className="food_desc">
            {item.description}
          </p>
        </div>
        <div className="col-3 align-items-center justify-content-center border position-relative">
          <div className="image_box"></div>
          {add && item.qty>0 ? (
            <div className="mx-3 row food_quant position-absolute">
              <button className="inc col-4" onClick={()=>{decreaseQuantity()}}>-</button>
              <span className="inc col-4">{item.qty}</span>
              <button className="inc col-4" onClick={()=>{setQuantity(menuitems[index].qty+1); updateQty(menuitems[index].qty+1); updateSubtotal(item.price)}}>+</button>
            </div>
          ) : (
            <button className="mx-3 add-button" onClick={()=>{setAdd(true);  setQuantity(1); updateQty(1); updateSubtotal(item.price)}}>ADD</button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};
export default MenuItem;
