import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Logo from "../assets/images/logo.png";
import backgroundImage from "../assets/images/login2.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            showPassword: false
        };
    }

    login() {
        console.warn(this.state);
    
        // Prepare the login payload
        const payload = {
            email: this.state.email,
            password: this.state.password
        };
    
        // Make the POST request to the login endpoint
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) // Send the login credentials
        })
        .then((data) => data.json())
        .then((resp) => {
            console.warn("resp", resp);
    
            // Assuming the response includes a success flag or the user data
            if (resp.res_status) {
                console.warn("Storing user data in local storage:", resp.user); // Log user data
                localStorage.setItem("login", JSON.stringify(resp.user));
                this.props.router.navigate('/Applicants');
            
            } else {
                alert("Please check credentials");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("An error occurred during login");
        });
    }
    
    togglePasswordVisibility = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }
    

    render() {
        return (
            <div>
                <NavBarMenu />

                <div>
                    <div className='left-login'>
                        <br /><br />
                        <p className='NameText'>SignIn to Stay connected with everyone</p><br /><br />
                        <img
                            className="small-logo"
                            src={Logo}
                            alt="logo"
                        />
                        <br /><br /><br /><br />

                        <input
                            type="text"
                            placeholder="Enter the email"
                            name="email"
                            onChange={(event) => this.setState({ email: event.target.value })}
                        /><br /><br />

                        <div className="password-wrapper" style={{ position: 'relative' }}>
                            <input
                                type={this.state.showPassword ? "text" : "password"}
                                placeholder="Enter the Password"
                                name="password"
                                onChange={(event) => this.setState({ password: event.target.value })}
                                style={{ paddingRight: '2.5rem' }}
                            />
                            <span
                                type="button"
                                className="btn btn-secondary"
                                onClick={this.togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '0.5rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer'
                                }}
                            >
                                {this.state.showPassword ? (
                                    <FontAwesomeIcon icon={faEyeSlash} color="black" />
                                ) : (
                                    <FontAwesomeIcon icon={faEye} color="black" />
                                )}
                            </span>
                        </div><br /><br />

                        <button onClick={() => { this.login() }} className="btn btn-primary">Login</button><br /><br />

                       
                    </div>
                    <div className='right-login' style={{ backgroundImage: `url(${backgroundImage})` }}>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
