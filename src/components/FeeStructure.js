import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Table } from 'react-bootstrap';
import { faGear, faFilePen } from '@fortawesome/free-solid-svg-icons'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import SideNav from './SideNav';

class FeeStructure extends Component {

    constructor() {
        super();
        this.state = {
            FeesList: [],
            show: false,
            grade: null,
            id: null
        };
    }

    componentDidMount() {
        this.getFeesData();
    }

    getFeesData() {
        fetch('http://localhost:5000/Feestructure', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'show' })
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
                    this.setState({ FeesList: responseData.data });
                } else {
                    console.error('Expected an array but got:', responseData.data);
                    this.setState({ FeesList: [] });
                }
            })
            .catch(error => {
                console.error('Error fetching admission types:', error);
                this.setState({ FeesList: [] }); // Set an empty array on error
            });
    }

    updadeFee(id,grade,fee) {
        fetch('http://localhost:5000/Feestructure', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'update',
                id: id,
                grade: grade,
                fee: fee
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
                    this.setState({ FeesList: responseData.data });
                } else {
                    console.error('Expected an array but got:', responseData.data);
                    this.setState({ FeesList: [] });
                }
            })
            .catch(error => {
                console.error('Error fetching admission types:', error);
                this.setState({ FeesList: [] }); // Set an empty array on error
            });
    }

    ChangeFee(id, grade) {
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
        this.getFeesData();
    }
    render() {
        const { FeesList, show } = this.state;





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
                            <p>DB ID {this.state.id} Grade</p>
                            <p>Do you wish to change the fee for {this.state.grade} Grade</p>
                            <input onChange={(event) => { this.setState({ fee: event.target.value }) }} placeholder='New fee amount' value={this.state.fee} />
                            <Button  onClick={() => this.updadeFee(this.state.id, this.state.grade,this.state.fee)}>Update Fee</Button>
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleClose}>
                                Close
                            </Button>
                            
                        </Modal.Footer>
                    </Modal>
                </div>


                <div className='app-tbl'>
                    <Table stripped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>

                                <th>Grade </th>
                                <th>Fee</th>
                                <th><FontAwesomeIcon icon={faGear} color="Green" /></th>

                            </tr>
                        </thead>
                        <tbody>
                            {FeesList?.map((item, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.grade}</td>
                                    <td>{item.fee}</td>
                                    {/* <td>
                                        <Button variant="primary" onClick={this.handleShow}>
                                            Launch demo modal
                                        </Button>
                                    </td> */}
                                    <td>
                                        <span onClick={() => this.ChangeFee(item.id, item.grade)}><FontAwesomeIcon icon={faFilePen} color="Green" /></span>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default FeeStructure;

