import React,{useState} from "react";
import SpacexContext from "./spacexContext";
const GetAllCapsule = (props)=>{
    const allCapsules = [];
    const [capsules, setCapsules] = useState([]);
    // Fetching all capsules
    const getCapsules =async ()=>{ console.log("ppp")
        const response=  await fetch('https://api.spacexdata.com/v3/capsules',{
        method: 'GET',
    });
    const capsulesData = await response.json();
    // console.log("ff",capsulesData);
    setCapsules(capsulesData);
}

return (
    <SpacexContext.Provider value= {{capsules, getCapsules}}>
        {props.children}
    </SpacexContext.Provider>
)
}
export default GetAllCapsule;