import Home from "./components/Home/Home";
import SearchPage from "./components/Search/SearchPage"; 
import {Routes, Route} from "react-router-dom"
import RestaurantPage from "./components/Restaurant/RestaurantPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/filter/:meal_ID" element={<SearchPage/>}/>
      <Route path="/restaurant/:restaurant_ID" element={<RestaurantPage/>}/>
    </Routes>
  );
}

export default App;
