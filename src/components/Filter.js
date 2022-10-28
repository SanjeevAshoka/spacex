import React from 'react'
import styled from "styled-components";
function Filter(props) {
  return (
    <Container>
          
           
              <form onSubmit={props.handleSubmit}>
              <Content>
              <Wrap>
                  <label htmlFor="status" style={{color:'white'}}>Filter By Status</label>
                  <select name="status" id="status" style={{width:"30%"}}>
                      <option value="Retired">Retired</option>
                      <option value="Unknown">Unknown</option>
                      <option value="Active">Active</option>
                  </select>
                  </Wrap>
                  <Wrap>
                  <label htmlFor="type" placeholder='type' style={{color:'white'}}>Filter By Type</label>
                  <select name="type" id="type"  style={{width:"30%"}}>
                      <option value="Dragon 1.0">Dragon 1.0</option>
                      <option value="Dragon 1.1">Dragon 1.1</option>
                      <option value="Dragon 2.0">Dragon 2.0</option>
                  </select>
                  </Wrap>
                  <Wrap>
                  <label htmlFor="landings" style={{color:'white'}}>Filter By Landings</label>
                  <select name="landings" id="landings" style={{width:"30%"}}>
                      <option value="0">0</option>
                      <option value="1">Unknown</option>
                      <option value="2">Active</option>
                      <option value="3">Active</option>
                  </select>
                  </Wrap>
                  </Content>
                  <button type="submit" className="btn btn-primary my-3">Filter Out</button>
              </form>

          
    </Container>
  )
}

export default Filter
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
    font-size: 25px;
    padding-top:10%;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
                rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor:pointer;
    overflow: hidden;
    position: relative;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: 3px solid rgba(249, 249, 249, 0.1);
    &:hover {
        box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
                rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        transform: scale(1.05);
        border-color: rgba(249, 249, 249, 0.8);
    }
`;