import roots from './ServerRoots/root';
import { Fragment } from 'react';
import { Routes,Route } from "react-router-dom";
function App() {
  console.log(true);
  return (  
    <Fragment>
      <main className='scroll-smooth' >
       <roots.NavBarPage/> 
            <Routes>
                <Route path='/' element={<roots.FirstPage/>} ></Route>
                <Route path='/details' element={<roots.DescriptionPage/>}/>
            </Routes>
          <roots.Sliderpage/>
      </main>
    </Fragment>
  );
}

export default App;
