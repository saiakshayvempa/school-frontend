import React, { Component } from 'react'
import SideNav from './SideNav';
import { Table } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCake, faPhone, faBed, faBicycle } from '@fortawesome/free-solid-svg-icons'
// import Button from 'react-bootstrap/Button';

class StudentGrades extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            id: null,
            applicationId: '',
            show: false,
            grade: '',
            status: 1,
            gradesData: []
        };
    }

    componentDidMount() {
        // Fetch the admission types from the API using GET method
        this.getStudentScore()



    }

    getStudentScore() {

        // Retrieve and parse the login data from localStorage
        const loginData = JSON.parse(localStorage.getItem('login'));

        let studentId = null; // Declare studentId outside the if block
        let userTypeId = null; // Declare userTypeId outside the if block

        if (loginData) {
            // Access the student_id and user_type_id from the parsed object
            studentId = loginData['student_id'];
            userTypeId = loginData['user_type_id'];

            console.log("Student ID:", studentId);
            console.log("User Type ID:", userTypeId);
        } else {
            console.error("No login data found in localStorage");
        }

        // Proceed with the fetch only if studentId is available
        if (studentId) {
            fetch('http://localhost:5000/StudentGrades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: "default", student_id: studentId })
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
                        this.setState({ gradesData: responseData.data });
                    } else {
                        console.error('Expected an array but got:', responseData.data);
                        this.setState({ gradesData: [] });
                    }
                })
                .catch(error => {
                    console.error('Error fetching student grades:', error);
                    this.setState({ gradesData: [] }); // Set an empty array on error
                });
        } else {
            console.error("Student ID is not available. Cannot fetch student grades.");
        }
    }


    getStudentGrade() {

        // Retrieve and parse the login data from localStorage
        const loginData = JSON.parse(localStorage.getItem('login'));
      
        let studentId = null; // Declare studentId outside the if block
        let userTypeId = null; // Declare userTypeId outside the if block

        if (loginData) {
            // Access the student_id and user_type_id from the parsed object
            studentId = loginData['student_id'];
            userTypeId = loginData['user_type_id'];

            console.log("Student ID:", studentId);
            console.log("User Type ID:", userTypeId);
        } else {
            console.error("No login data found in localStorage");
        }


        fetch('http://localhost:5000/StudentGrades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: "grades", student_id: studentId, grade: parseInt(this.state.grade, 10) })

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
                    this.setState({ gradesData: responseData.data });
                } else {
                    console.error('Expected an array but got:', responseData.data);
                    this.setState({ gradesData: [] });
                }
            })
            .catch(error => {
                console.error('Error fetching branches types:', error);
                this.setState({ gradesData: [] }); // Set an empty array on error
            });

    }


    render() {
        const { gradesData,show } = this.state;
        return (
            
            <div>
                <div>
                    <SideNav />
                </div>
                <div className='ad-top'>
                    <p className='text'>
                        Choose your grade which you want to see your scores
                    </p>


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
                    </select> &nbsp;&nbsp;&nbsp;
                    <button onClick={() => this.getStudentGrade()} className="btn btn-primary">
                        Search
                    </button>
                    
                </div>
                <div className='ad-below'>
                    <div className='app-tbl'>
                        <Table stripped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Grade</th>
                                    <th>Exam</th>
                                    <th>Subject 1</th>
                                    <th>Subject 2 </th>
                                    <th>Subject 3</th>
                                    <th>Subject 4</th>
                                    <th>Subject 5</th>
                                    <th>Subject 6</th>
                                    <th>Result</th>

                                </tr>
                            </thead>
                            <tbody>
                                {gradesData?.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.grade} </td>
                                        <td>{item.exam_type} </td>
                                        <td>{item.sub_1} </td>
                                        <td>{item.sub_2}</td>
                                        <td>{item.sub_3}</td>
                                        <td>{item.sub_4}</td>
                                        <td>{item.sub_5}</td>
                                        <td>{item.sub_6}</td>
                                        <td>{item.result}</td>
                                       
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

export default StudentGrades;



