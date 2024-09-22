import React, { Component } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import NavBarMenu from './NavBarMenu';
import Logo from '../assets/images/logo.png';

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

class Admissions extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            branch: '',
            admissionType: '',
            mobile: '',
            city: '',
            dob: '',
            grade: '',
            status: 1,
            acadamicYear: '',
            admissionTypes: [], // To store the fetched admission types
            Branches: [] // To store the fetched admission types
        };
    }

    componentDidMount() {
        // Fetch the admission types from the API using GET method
        this.getAdmissionTypes()
        this.getBranches()

    }

    getBranches() {
        fetch('http://localhost:5000/Branchs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                console.warn('responseData', responseData); // Log the full response data
                if (Array.isArray(responseData.data)) {
                    this.setState({ Branches: responseData.data });
                } else {
                    console.error('Expected an array but got:', responseData.data);
                    this.setState({ Branches: [] });
                }
            })
            .catch(error => {
                console.error('Error fetching branches types:', error);
                this.setState({ Branches: [] }); // Set an empty array on error
            });

    }

    getAdmissionTypes() {
        fetch('http://localhost:5000/admissionTypes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                console.warn('responseData', responseData); // Log the full response data
                if (Array.isArray(responseData.data)) {
                    this.setState({ admissionTypes: responseData.data });
                } else {
                    console.error('Expected an array but got:', responseData.data);
                    this.setState({ admissionTypes: [] });
                }
            })
            .catch(error => {
                console.error('Error fetching admission types:', error);
                this.setState({ admissionTypes: [] }); // Set an empty array on error
            });

    }


    AdmissionsEnroll() {
        const { name, branch, admissionType, mobile, dob, grade, status, acadamicYear } = this.state;

        const payload = {
            name,
            branch,
            admissionType: parseInt(admissionType, 10), // Convert age to an integer
            mobile,
            dob,
            grade,
            status,
            acadamicYear
        };

        fetch('http://localhost:5000/Admissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(result => result.json())
            .then(resp => {
                console.warn(resp);
                alert('Your registration is completed');
                this.props.router.navigate('/'); // Navigate to home
            })
            .catch(error => {
                console.error('Error during registration:', error);
            });
    }

    render() {
        return (
            <div>
                <NavBarMenu />
                <div className="admbk">
                    <div className="card-bar">
                        <div className="card-body">
                            <h5 className="card-title">By Sydney J. Harris</h5>
                            <p className="card-text">The whole purpose of education is to turn mirrors into windows...</p>
                        </div>
                    </div>
                    <div className="admft">
                        <br />
                        <p className="NameText">Get your kid enrolled for the next Academic year...</p><br />
                        <img className="small-logo" src={Logo} alt="logo" /><br /><br />
                        <input
                            type="text"
                            placeholder="Enter the Name"
                            name="name"
                            onChange={(event) => this.setState({ name: event.target.value })}
                        /><br /><br />
                        <select
                            name="grade"
                            onChange={(event) => this.setState({ grade: event.target.value })}
                        >
                            <option value="">Select Grade</option>
                            <option value="LKG">LKG</option>
                            <option value="UKG">UKG</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        &nbsp;&nbsp;&nbsp; {/* Adds space between elements */}
                        <input
                            type="date"
                            placeholder="Enter the Date of Birth of the Applicant"
                            name="dob"
                            onChange={(event) => this.setState({ dob: event.target.value })}
                        /> <br /><br />

                        <select
                            name="Branches"
                            onChange={(event) => this.setState({ branch: event.target.options[event.target.selectedIndex].text })}
                        >
                            <option value="">Select Branch</option>
                            {this.state.Branches.map((branch) => {
                                const { id, city } = branch;  // Destructure the branch object to get id and city
                                return (
                                    <option key={id} value={id}>
                                        {city}
                                    </option>
                                );
                            })}
                        </select>


                        &nbsp;&nbsp;&nbsp; {/* Adds space between elements */}
                        <select
                            name="admissionType"
                            onChange={(event) => this.setState({ admissionType: event.target.value })}
                        >
                            <option value="">Select Admission Type</option>
                            {this.state.admissionTypes.map((type, index) => {
                                const id = `${index}-${Object.keys(type)[0]}`;
                                const name = type[Object.keys(type)[0]];
                                return (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                );
                            })}
                        </select><br /><br />
                        <input
                            type="text"
                            placeholder="Enter your telephone number"
                            name="mobile"
                            onChange={(event) => this.setState({ mobile: event.target.value })}
                        /><br /><br />


                        <button onClick={() => this.AdmissionsEnroll()} className="btn btn-primary">
                            Enroll for Admissions
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(Admissions);
