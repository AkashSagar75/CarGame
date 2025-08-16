 import React from 'react'  
  import {BrowserRouter,Routes, Route} from 'react-router-dom'
  import Home from './Componeent/Home'
   import Game from './Componeent/Game'
 export default function App() {
   return (
     <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Game' element ={<Game/>}/>
        </Routes>
      </BrowserRouter>
    
     </>
   )
 }
 