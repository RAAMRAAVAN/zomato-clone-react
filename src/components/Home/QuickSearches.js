import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
function QuickSearches()
{
    const [mealTypes,setMealTypes]=useState([]);
    let Navigate=useNavigate();
    let getMealTypes=async()=>{
        try{
            let result= await axios.get("https://zomato-clone-backend5.onrender.com/api/get-meal-types");
            let data=result.data;
            console.log("data",data);
            if(data.status===true)
            {
                setMealTypes([...data.result]);
            }
            else
            {
                setMealTypes([]); 
            }
        }
        catch(error){
            console.log("server error");
        }
    };
    useEffect(()=>{
        getMealTypes();
    },[]);

    let getQuickSearchPage=(meal_ID)=>{
        console.log("clicked");
        Navigate("/filter/"+meal_ID);
    }
    return(
                
        <div className="container-lg my-5">
            {/* <!-- ************************************ Quick Searches heading *************************************** --> */}
            <p className="fw-bold fa-2x QS" >Quick Searches</p>
            {/* <!-- ************************************ Quick Searches text *************************************** --> */}
            <p className=" fw-bold QS-text">Discover restaurants by type of meal</p>
            {/* <!-- ************************************ Quick Searches Items *************************************** --> */}
            <div className="row">
                {
                    mealTypes.map((value,index)=>{
                        return(
                                <div onClick={()=>getQuickSearchPage(value.meal_type)}  key={index} className="col-lg-4 col-md-6 col-sm-6 col-12 pe-3 m-0 mb-3">
                                    <div className="card p-0 m-0 row list-group-flush flex-row border-0 shadow">
                                        <div className="col-5 p-0 m-0">
                                            <img   src={value.image} className="img-fluid" alt="loading"/>
                                        </div>
                                        <div className="col-7 body px-3   py-2 ">
                                            <p className="card-title breakfast-title h5">{value.name}</p>
                                            <p className="card-text breakfast-text">{value.content}</p>
                                        </div>
                                    </div>
    
                                </div>
                                )
                    })
                }
            </div>
        </div>
        )  
}
export default QuickSearches;