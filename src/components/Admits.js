import React, { Component } from 'react'
import SideNav from './SideNav';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCake, faPhone, faBed, faBicycle } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Admits extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            id:null,
            applicationId: '',
            show: false,
            grade: '',
            status: 1,
            ApplicantData: []
        };
    }

    componentDidMount() {
        // Fetch the admission types from the API using GET method
        this.getAcceptedList()



    }

    getAcceptedList() {
        fetch('http://localhost:5000/Admits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: "default" })

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
                    this.setState({ ApplicantData: responseData.data });
                } else {
                    console.error('Expected an array but got:', responseData.data);
                    this.setState({ ApplicantData: [] });
                }
            })
            .catch(error => {
                console.error('Error fetching branches types:', error);
                this.setState({ ApplicantData: [] }); // Set an empty array on error
            });

    }



    getFilterList() {
        fetch('http://localhost:5000/Admits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: "filter",
                name: this.state.name,
                id: this.state.applicationId,
                grade: this.state.grade
            })
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
                    this.setState({ ApplicantData: responseData.data });
                } else {
                    console.error('Expected an array but got:', responseData.data);
                    this.setState({ ApplicantData: [] });
                }
            })
            .catch(error => {
                console.error('Error fetching branches types:', error);
                this.setState({ ApplicantData: [] }); // Set an empty array on error
            });

    }

    enrollStudent (name,grade,id){
        this.state.name = name
        this.state.grade = grade
        this.state.id = id
        this.handleShow()
    }

    handleShow = () => {
        console.warn("handle show")
        this.setState({ show: true })
        // this.state.show=true

    }
    handleClose = () => {
        console.warn("handle close")
        this.setState({ show: false })
        this.getAcceptedList()

       
    }

    generateAdmission() {
        fetch('http://localhost:5000/Admits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: "admit",
                name: this.state.name,
                father_name:this.state.father,
                mother_name:this.state.mother,
                student_email:this.state.student_email,
                father_email:this.state.father_email,
                mother_email:this.state.mother_email,
                father_telephone:this.state.father_telephone,
                mother_telephone:this.state.mother_telephone,
                application_id: this.state.id,
                address: this.state.address,
                
            })
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
                    this.setState({ ApplicantData: responseData.data });
                    this.handleClose()
                } else {
                    console.error('Expected an array but got:', responseData.data);
                    this.setState({ ApplicantData: [] });
                }
            })
            .catch(error => {
                console.error('Error fetching branches types:', error);
                this.setState({ ApplicantData: [] }); // Set an empty array on error
            });
    }

    render() {
        const { ApplicantData,show } = this.state;
        return (
            <div>
                <div>
                    <SideNav />
                </div>
                <div>
                    <Modal show={show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                           
                            <p>Final details to Admit the Details {this.state.name}, {this.state.grade} Grade</p>
                            <p>Father's Name</p> 
                            <input onChange={(event) => { this.setState({ father: event.target.value }) }} placeholder='Enter Father Name' value={this.state.father} />
                            <p>Mother's Name</p>
                            <input onChange={(event) => { this.setState({ mother: event.target.value }) }} placeholder='ENter Mother Name' value={this.state.mother} />
                            <p>Students's Email</p>
                            <input onChange={(event) => { this.setState({ student_email: event.target.value }) }} placeholder='Student Email' value={this.state.student_email} />
                            <p>Father's Email&nbsp;&nbsp;&nbsp;Father's Telephone</p>
                            <input onChange={(event) => { this.setState({ father_email: event.target.value }) }} placeholder='Father Email' value={this.state.father_email} />
                            &nbsp;&nbsp;
                            <input onChange={(event) => { this.setState({ father_telephone: event.target.value }) }} placeholder='Father Telephone' value={this.state.father_telephone} />
                            <p>Mother's Email&nbsp;&nbsp;&nbsp;Mothers's Telephone</p>
                            <input onChange={(event) => { this.setState({ mother_email: event.target.value }) }} placeholder='Mother Email' value={this.state.mother_email} />
                            &nbsp;&nbsp;
                            <input onChange={(event) => { this.setState({ mother_telephone: event.target.value }) }} placeholder='Mother Telephone' value={this.state.mother_telephone} />
                            <p>Address Name</p> 
                            <input onChange={(event) => { this.setState({ address: event.target.value }) }} placeholder='Address' value={this.state.address} /><br/><br/>
                            <Button onClick={() => this.generateAdmission(this.state.id, this.state.grade, this.state.fee)}>Admission Fix</Button>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
                <div className='ad-top'>
                    <p className='text'>
                        Choose from options to filter
                    </p>
                    <input
                        type="text"
                        placeholder="Application Id"
                        name="name"
                        onChange={(event) => this.setState({ applicationId: event.target.value })}
                    /> <br /><br />
                    <input
                        type="text"
                        placeholder="Enter the Name"
                        name="name"
                        onChange={(event) => this.setState({ name: event.target.value })}
                    /> &nbsp;&nbsp;&nbsp;
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
                    </select> <br /><br />
                    <button onClick={() => this.getFilterList()} className="btn btn-primary">
                        Search
                    </button>
                </div>
                <div className='ad-below'>
                    <div className='app-tbl'>
                        <Table stripped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Student Details</th>
                                    <th>Grade </th>
                                    <th>Branch</th>
                                    <th>Admission Type</th>
                                    <th>Status</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {ApplicantData?.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.name} <br /><FontAwesomeIcon icon={faCake} color="Green" /> {item.dob}  <br /><FontAwesomeIcon icon={faPhone} color="Green" /> {item.mobile}</td>
                                        <td>{item.grade}</td>
                                        <td>{item.branch}</td>
                                        <td>
                                            {item.type === 'Hostel' ? (
                                                <FontAwesomeIcon icon={faBed} color="skyblue" />
                                            ) : item.type === 'Day Scholar' ? (
                                                <FontAwesomeIcon icon={faBicycle} color="orange" />
                                            ) : (
                                                item.type
                                            )}
                                            {item.type}

                                        </td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button onClick={() => this.enrollStudent(item.name,item.grade,item.id)} className="btn btn-primary">
                                                Enroll
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admits;


