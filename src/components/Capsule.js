import React,{useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import SpacexContext from '../context/spacexContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import CapsuleItem from './CapsuleItem';
import Filter from './Filter';
import Spinner from './Spinner';

 const  Capsule = (props)=> {
    const context = useContext(SpacexContext);
    const [loading, setloading] =useState(true);
    const [limitVal, setLimit]=useState(0);
    const [spacex,setSpacex]=useState([]);
    console.log(context);
    const {capsules} = context;
    const dataUpdate =  async (props)=> {
      setLimit(prev=>prev+4);
      const url = `https://api.spacexdata.com/v3/capsules?limit=${limitVal}`;
      setloading( true );
      let data = await fetch(url);
      let parseData = await data.json(data);
      setSpacex(spacex.concat(parseData));
      setloading(false);
      console.log("spacex=", spacex)
  
    }
    useEffect(()=>{dataUpdate() }, [] );
    const fetchMoreData = async () => {
      // setTimeout(()=>{ fetchMoreData()}, 5000)
      await  dataUpdate();
         
     };
  return (
    <div style={{backgroundColor:"#3a3d3c"}}>
        <div style={{ textAlign: "center" }}>
                <p style={{ color: "white", textShadow: " 2px 2px 4px red", letterSpacing: "2px", fontSize: "30px", }}>
                     All Data about Recent Rocket Launched by SpaceX.
                </p>
            </div>
            <div>
                <Filter/>
            </div>
            {loading && <Spinner />}
      {<InfiniteScroll
        dataLength={spacex.length}
        next={()=>setTimeout(()=>{ fetchMoreData()}, 5000)}
        hasMore={spacex.length !== capsules.length}
        loader={<Spinner />}
        >
                          <Container> 
                            <Content>
                          {
                            // capsules.length>0 ? (capsules.map((item, key )=>
                            spacex.length>0 ? (spacex.map((item, key )=>{
                              return  (
                             
                                 <Wrap key ={key}>
                                         <img src="./space.jpeg" />
                                         <div style={{backgroundColor:'white', height:"50%", marginTop:"7px", display:"block" }}>
                                         <p style={{backgroundColor:"white", textTransform:"capitalize"}}>{item?.capsule_id}</p>
                                         <p style={{backgroundColor:"white", textTransform:"capitalize",}}>{item?.capsule_serial}</p>
                                         {item.details ? <p style={{backgroundColor:"white", textTransform:"capitalize", }}><b>{item.details.slice(0,20)}</b></p>: null}
                                         </div>
                                 </Wrap>
                             )
                             
                            })) :null
                          }
                          </Content>
                          </Container>
                          </InfiniteScroll>
            }

      <h1>Hi</h1>
    </div>
  )
}
export default Capsule;

const Container = styled.div`
    padding: 0 0 26px;
`;
const Content = styled.div`
    
    display: grid; 
    grid-gap: 25px;
    gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }  
`
const Wrap= styled.div`
    padding-top:56.25%;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
                rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor:pointer;
    overflow: hidden;
    position: relative;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: 3px solid rgba(249, 249, 249, 0.1);
    img{
        inset: 0px;
        display: block;
        height: 50%;
        object-fit:cover;
        opacity:1;
        position: absolute;
        transition: opacity 500ms ease-in-out 0s;
        width:100%;
        z-index:1;
        top:0; 
    }
    &:hover {
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
                rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        transform: scale(1.05);
        border-color: rgba(249, 249, 249, 0.8);
    }
    p {
     
      display: block;
      height: 30%;
    }
`;
