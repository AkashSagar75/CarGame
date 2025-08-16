import React, { useState } from 'react'
 import { useNavigate } from 'react-router-dom'
import '../CSS/home.css'

import Sagar from '../images/SA2.jpeg'

export default function Home() {
   
   const [fromData , setFromData] = useState(false)
    const [from , setfrominfo] = useState({
      name : "",
      username: ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
    const { name, value } = e.target;
    setfrominfo((prev) => ({
      ...prev,  
      [name]: value 
    }));
  };
   const handleData = ()=>{
     
    sessionStorage.setItem("form Data", JSON.stringify(from))
   }
  return (
    <>
      <div className="home-container">
        <header className="home-header">
          <h1>🚗 Car Racing Challenge</h1>
          <p>Test your reflexes. Avoid enemy cars. Score as much as you can!</p>
        </header>

       

        <footer className="home-footer">
          <div className="home-image-container">
            <img src={Sagar} alt="sagara image" />
          </div>

          <p>Developed by <strong>Er Akash Sagar</strong></p>
        </footer>
         <main className="home-main">
           
          <button  type ="submit" onClick={()=>setFromData(true)}>
            Continue
          </button>
        </main>
      </div>
      {fromData && (
        <>
      
         <div className="form-overlay">
          <div className="form-container animate-popup">
             
            <form  onSubmit ={handleData} className="form-box">
             <label>Name</label>
              <input
                 type="text"
        name="name"
        value={from.name}
        onChange={handleChange}
        placeholder="Enter your name"
                
              />

              <label>Username</label>
              <input
                type="text"
        name="username"
        value={from.username}
        onChange={handleChange}
        placeholder="Enter your username"
              
              />

              

              <button type='submit'> <p  onClick={()=>navigate('/Game')}>Next</p></button>
              <button
                type="button"
                className="close-btn"
                onClick={() => setFromData(false)}
              >
                ×
              </button>
            </form>
          </div>
        </div>
      
  
        </>
      )}
    </>
  )
}
