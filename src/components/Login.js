import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Logo from "../assets/images/logo.png";
import backgroundImage from "../assets/images/login2.jpg";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const initialNavigation = {
    1: "/StudentGrades",
    2: "/classGrades",
    3: "/StudentGrades",
    4: "/admits",
    5: "/admits",
}

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
                    this.props.router.navigate(initialNavigation[resp.user.user_type_id]);

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

                        <div class="mb-3 d-flex justify-content-center">
                            <input
                                type="text"
                                placeholder="Enter the email"
                                name="email"
                                style={{ height: "40px", width: "300px" }}
                                onChange={(event) => this.setState({ email: event.target.value })}
                            />
                        </div><br />
                        <div class="mb-3 d-flex justify-content-center">
                            <input
                                type={this.state.showPassword ? "text" : "password"}
                                placeholder="Enter the Password"
                                name="password"
                                style={{ height: "40px", width: "260px" }}
                                onChange={(event) => this.setState({ password: event.target.value })}
                            />
                            <span
                                type="button"
                                className="btn btn-secondary"
                                onClick={this.togglePasswordVisibility}
                                style={{
                                    cursor: 'pointer'
                                }}
                            >
                                {this.state.showPassword ? (
                                    <FontAwesomeIcon icon={faEyeSlash} color="black" />
                                ) : (
                                    <FontAwesomeIcon icon={faEye} color="black" />
                                )}
                            </span>
                        </div>
                        <br /><br />

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
