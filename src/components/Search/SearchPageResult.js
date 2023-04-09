import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
function SearchPageResult()
{
  const pageNumbers=[1,2,3,4,5];
    let params=useParams();
    let navigate = useNavigate();
    let {meal_ID}=params;
    const [restaurants,setRestaurants]=useState([]);
    const [locationList,setLocationList]=useState([]);
    const [filter,setFilter]=useState({mealtype_id:meal_ID, page:1})

console.log("res", restaurants)
    let filterOperation=async(filter)=>{
        try{
            let response=await axios.post("http://localhost:5000/api/filter",filter);
            console.log(response)
            if(response.data.status===true)
                setRestaurants([...response.data.result]);
        }
        catch(error){
            console.log("error:",error);
        }
    }

    let getLocationList=async()=>{
        try{
            let result= await axios.get("http://localhost:5000/api/get-location");
            let data=result.data;
            console.log(data);
            if(data.status===true)
            {
                setLocationList([...data.result]);
            }
            else
            {
                setLocationList([]); 
            }
        }
        catch(error){

        }
        
    }

    let makeFilteration=(event,type)=>{
        let value=event.target.value;
        let _filter={...filter};
        console.log("filteration working",value);
        switch(type)
        {
            case "location":
                if(value>0)
                    _filter["location"]=Number(value);
                else
                    delete _filter["location"]    
                break;
            case "sort":
                _filter["sort"]=Number(value);
                break; 
            case "cost-for-two":
              let HandL=value.split("-")
              console.log("HandL",HandL)
              _filter["lcost"]=Number(HandL[0]);
              _filter["hcost"]=Number(HandL[1]);
              break;
            case "page":
              _filter["page"]=Number(value);
              break;
            case 'cuisine':
              console.log("cusine=",value)
              _filter["cuisine"]=value;
            break;
            default:
              break;   
        }
        console.log("filter by",_filter)
        setFilter({..._filter});
        filterOperation(_filter);
    }
    useEffect(()=>{
        let filter={
          mealtype_id:meal_ID,
          page:1
        }
        filterOperation(filter);
        getLocationList();
    },[]);

    if(restaurants!==undefined)
        {
            console.log(meal_ID);
            console.log("restaurants=",restaurants)
        }

    return(
        <section className="row">
      <div className="col-12  mt-2">
        <div className="container-lg">
          <p className="text-capitalize fw-bold h4 h my-3">best breakfast place in India</p>
          <div className="row">
            <div
              className="col-12 col-lg-3 col-mb-3 mt-2 me-4 border border-1  p-3 border border-3  shadow-sm bg-body rounded">
              <p className="fw-bold"> Filter</p>
              <label htmlFor="" className="m-0 mb-2">Select location</label>
              <select name="" id="select-location" className="form-select" onChange={(event)=>makeFilteration(event,"location")}>
                <option value="-1">--Select Location--</option>
                                {
                                    locationList.map((value,index)=>{
                                        return(
                                            <option value={value.location_id} key={index}>{value.name}, {value.city}</option>
                                        )
                                    })
                                }
              </select>
              {/* <!--cuisins--> */}
              <p className="mt-3 fw-bold">cuisins</p>
              <div className="form-check mb-1">
                <input type="checkbox" className="form-check-input" value="North Indian" onChange={(event)=>makeFilteration(event,"cuisine")}/>
                <label htmlFor="" className="form-check-label">North Indian</label>
              </div>
              <div className="form-check mb-1">
                <input type="checkbox" className="form-check-input" value="South Indian" onChange={(event)=>makeFilteration(event,"cuisine")}/>
                <label htmlFor="" className="form-check-label">South Indian</label>
              </div>
              <div className="form-check mb-1">
                <input type="checkbox" className="form-check-input" value="Chinese" onChange={(event)=>makeFilteration(event,"cuisine")}/>
                <label htmlFor="" className="form-check-label">Chinese</label>
              </div>
              <div className="form-check mb-1">
                <input type="checkbox" className="form-check-input" value="Fast Food" onChange={(event)=>makeFilteration(event,"cuisine")}/>
                <label htmlFor="" className="form-check-label">Fast Food</label>
              </div>
              <div className="form-check mb-1">
                <input type="checkbox" className="form-check-input" value="Street Food" onChange={(event)=>makeFilteration(event,"cuisine")}/>
                <label htmlFor="" className="form-check-label">Street Food</label>
              </div>
              {/* <!--cost for two--> */}
              <p className="mt-3 fw-bold">Cost for two</p>
              <div className="form-check mb-1">
                <input type="radio" name="cost-for-two" className="form-check-input" value="0-500" onChange={(event)=>makeFilteration(event,"cost-for-two")}/>
                <label htmlFor="" className="form-check-label">less than 500</label>
              </div>
              <div className="form-check mb-1">
                <input type="radio" name="cost-for-two" className="form-check-input" value="500-1000" onChange={(event)=>makeFilteration(event,"cost-for-two")}/>
                <label htmlFor="" className="form-check-label">500-1000</label>
              </div>
              <div className="form-check mb-1">
                <input type="radio" name="cost-for-two" className="form-check-input" value="1000-1500" onChange={(event)=>makeFilteration(event,"cost-for-two")}/>
                <label htmlFor="" className="form-check-label">1000-1500</label>
              </div>
              <div className="form-check mb-1">
                <input type="radio" name="cost-for-two" className="form-check-input" value="1500-2000" onChange={(event)=>makeFilteration(event,"cost-for-two")}/>
                <label htmlFor="" className="form-check-label">1500-2000</label>
              </div>
              <div className="form-check mb-1">
                <input type="radio" name="cost-for-two" className="form-check-input" value="2000-999999" onChange={(event)=>makeFilteration(event,"cost-for-two")}/>
                <label htmlFor="" className="form-check-label">2000+</label>
              </div>
              {/* <!--sort--> */}
              <p className="mt-3 fw-bold">Sort</p>
              <div className="form-check mb-1">
                <input type="radio" name="sort" id="lowTOhigh" className="form-check-input" value="1" onChange={(event)=>makeFilteration(event,"sort")}/>
                <label htmlFor="lowTOhigh" className="form-check-label">low to high</label>
              </div>
              <div className="form-check mb-1">
                <input type="radio" name="sort" id="highTOlow" className="form-check-input" value="-1" onChange={(event)=>makeFilteration(event,"sort")}/>
                <label htmlFor="highTOlow" className="form-check-label">high to low</label>
              </div>
            </div>


            <div className="col-12 col-lg-7 col-mb-7 my-lg-2 my-lg-1">
              <div className="row">
                {
                  restaurants.map((value)=>{
                      return(
                <div key={value._id} onClick={()=>{navigate('/restaurant/'+ value._id)}} className="col-lg-10 col-md-7 col-sm-4 border border-2 py-3 px-5 border border-3  shadow-sm p-3 mb-4 bg-body rounded">
                  <div className="d-flex  align-items-center">
                    <img src={value.image} alt="" className="image"/>
                    <div className="ms-3 ">
                      <p className="m-0 fw-bold h5">{value.name}</p>
                      <p className="m-0 fw-bold text-uppercase">fort</p>
                      <p className="m-0 text-muted"><i className="fa fa-map-marker me-2" aria-hidden="true"></i>{value.locality}, {value.city}</p>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-lg-4 col-md-5 col-6">
                      <p className="m-0">CUISINES:</p>
                      <p className="m-0">COST FOR TWO:</p>
                    </div>
                    <div className="col-lg-8 col-md-5 col-6">
                      <p className="fw-bold m-0">
                        {
                          value.cuisine.reduce((pVal,cVal)=>{
                              return(pVal.name+", "+cVal.name)
                          })
                        }
                      </p>
                      <p className="fw-bold m-o">{value.min_price}</p>
                    </div>
                  </div>
                </div>)
              })
        }
                

              </div>
              <div className="row">
                <div className=" col-12 my-3">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination d-flex justify-content-center">
                      <li className="page-link m-1  shadow-sm  bg-body rounded">&lt;</li>
                      {pageNumbers.map((value, index)=>{
                        return(
                          <li key={index} className="page-link m-1  shadow-sm  bg-body rounded" onClick={(event)=>makeFilteration(event,"page")} value={value}>{value}</li>
                        )
                      })}
                      <li className="page-link m-1  shadow-sm  bg-body rounded">&gt;</li>
                    </ul>
                  </nav>
                </div>
              </div>

            </div>

          </div>


        </div>
      </div>
    </section>
    )
}
export default SearchPageResult;