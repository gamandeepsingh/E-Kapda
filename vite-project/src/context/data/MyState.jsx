import React, { useState } from 'react'
import myContext from "./MyContext";

const MyState = (props) => {
    const [mode, setMode] = useState("light");
    const [loading, setLoading] = useState(false)

    const toggleMode = () => {
        setMode(mode === "light" ? "dark" : "light");
        if(mode === "light"){
          document.body.style.backgroundColor = "rgb(17,24,39)";
          document.body.style.color = "white";
        }
        else{
          document.body.style.backgroundColor = "white";
          document.body.style.color = "black";
        }
    }
    
  return (
    <myContext.Provider value={{mode,setMode,toggleMode,loading,setLoading}}>
      {props?.children}
    </myContext.Provider>
  )
}

export default MyState




