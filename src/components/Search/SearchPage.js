import React from "react";
import Header from "../Header";
import SearchPageResult from "./SearchPageResult";
import "./home.css";
// import "../../css/Search.css"
function SearchPage()
{
    return(
        <div class="container-fluid">
            <Header/>
            <SearchPageResult/>  
        </div>
    )
}
export default SearchPage;