import { Routes, Route } from "react-router";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  return ( 
    <Routes>
       <Route path='/' element={<Navigation />}>
           <Route index element={<Home />} />
           <Route path='shop/*' element={<Shop />} />  
           <Route path='auth' element={<Authentication />} />  
           <Route path="checkout" element={<Checkout />}></Route>
       </Route>
    </Routes>
  );
};


export default App;
