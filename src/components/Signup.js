
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SpacexContext from '../context/spacexContext';
export default function SignUp(props) {
    const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
    const context = useContext(SpacexContext);
    const {getCapsules} = context;
    let navigate = useNavigate();

    const onChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }
    const onCamp = () => {

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hhh");
        const response = await fetch('http://localhost:8000/api/auth/createuser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData)
        });
        const json = await response.json(response);
        if (json.Success) {
            getCapsules();
            navigate("/capsule");
            props.showAlert('Accout Created Successfully', 'success');
        }
        else {
            props.showAlert("Invalid Details", 'danger');
        }

    }

    return (
        <div style={{ backgroundImage: "url('./space.jpeg')", backgroundRepeat: "no-repeat", marginLeft: "100px", backgroundSize: "500px 400px" }}>

            <div style={{ border: "2px solid grey", margin: "30px 30px 30px 700px", outline: "10px solid lightgrey", }}>
                <div className='container'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:
                                <input type="text" className="form-control" id="name" onChange={onChange} name="name" value={registerData.name} required minLength={5} /></label>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name="email" value={registerData.email} required />

                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={onChange} name="password" value={registerData.password} required minLength={8} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" onChange={onCamp} name="cpassword" required minLength={8} />
                        </div>
                        <button type="submit" className="btn btn-primary my-3">Submit</button>
                    </form>

                </div>

            </div>
            <div style={{ marginLeft: "700px", marginTop: "10px" }}>
                <h4>Already have an Account: <Link className="btn btn-outline-info mx-2" to="/login">Sign in</Link></h4>
            </div>

            <div style={{ textAlign: "center" }}>
                <p style={{ color: "white", textShadow: " 2px 2px 4px red", letterSpacing: "2px", fontSize: "30px", }}>
                    Here You will Get All Data about Recent Rocket Launched by SpaceX.
                </p>
            </div>
        </div>

    )
}
