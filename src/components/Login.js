import SpacexContext from '../context/spacexContext';
import React, { useState, useContext } from 'react';
import { useNavigate, } from 'react-router-dom';

export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const context = useContext(SpacexContext);
    const {getCapsules} = context;
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const json = await response.json(response);
        // setCredentials({email:"", password:""});
        if (json.Success) {
            getCapsules();
            // Save the auth token and redirect
            localStorage.setItem('token', json.jwttocken);
            navigate("/capsule");
            props.showAlert('Login Successfully', 'success');
        }
        else {
            props.showAlert("Invalid Credentials", 'danger');
        }
    }
    return (
        <div >

            <div style={{ border: "2px solid grey", margin: "30px 300px ", outline: "10px solid lightgrey", }}>
                <div className='container'>
                    <form onSubmit={handleSubmit} >
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} value={credentials.email} />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} />
                        </div>
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </form>
                </div>

            </div>
            <div style={{ textAlign: "center", margin: "40px 40px", backgroundColor: "#4C4C4C", borderRadius: "5px" }}>
                <p style={{ color: "white", textShadow: " 2px 2px 4px red", letterSpacing: "2px", fontSize: "30px", }}>
                    Here You will Get All Data about Recent Rocket Launched by SpaceX.
                </p>
                <p style={{ color: "white", letterSpacing: "2px", fontSize: "20px", textAlign: "justify", margin: "40px 40px" }}>
                    Space Exploration Technologies Corp. (doing business as SpaceX) is an American spacecraft manufacturer, space launch provider, and a satellite
                    communications corporation headquartered in Hawthorne, California. It was founded in 2002 by Elon Musk, with the goal of reducing space transportation
                    costs to enable the colonization of Mars. It manufactures the Falcon 9 and Falcon Heavy launch vehicles, several rocket engines, Cargo Dragon,
                    crew spacecraft, and Starlink communications satellites.SpaceX is developing a satellite internet constellation named Starlink to provide
                    commercial internet service. In January 2020, the Starlink
                    constellation became the largest satellite constellation ever launched, and as of September 2022 comprises over 3,000 small satellites in orbit.
                    The company is also developing Starship, a privately funded, fully reusable, super heavy-lift launch system for interplanetary and orbital spaceflight.
                    It is intended to become SpaceX's primary orbital vehicle once operational, supplanting the existing Falcon 9,
                    Falcon Heavy, and Dragon fleet. It will have the highest payload capacity of any orbital rocket ever built on its debut, scheduled for 2022 pending launch license.
                </p>
            </div>
        </div>
    )
}

