import React, { Component } from 'react'
import SideNav from './SideNav';
import { Table } from 'react-bootstrap';

class PayFees extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      id: null,
      applicationId: '',
      show: false,
      grade: '',
      status: 1,
      FeesData: [],
      StudentData: null,
      FeeInfo: null,
      emi: null
    };
  }

  componentDidMount() {
    // Fetch the admission types from the API using GET method
    // this.getStudentFeeData()
    this.getStudentData()
    this.getStudentDue()



  }

  getStudentData() {

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
      fetch('http://localhost:5000/FeeData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: "info", student_id: studentId })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(responseData => {
          console.warn('65 responseData', responseData); // Log the full response data
          this.setState({ StudentData: responseData.data });

        })
        .catch(error => {
          console.error('Error fetching student data:', error);
          this.setState({ StudentData: {} }); // Set an empty array on error
        });
    } else {
      console.error("Student ID is not available. Cannot fetch student grades.");
    }
  }

  getStudentFeeData() {

    // Retrieve and parse the login data from localStorage
    const loginData = JSON.parse(localStorage.getItem('login'));

    let studentId = null; // Declare studentId outside the if block

    if (loginData) {
      // Access the student_id and user_type_id from the parsed object
      studentId = loginData['student_id'];


      console.log("Student ID:", studentId);

    } else {
      console.error("No login data found in localStorage");
    }

    // Proceed with the fetch only if studentId is available
    if (studentId) {
      fetch('http://localhost:5000/FeeData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: "show", student_id: studentId })
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
            this.setState({ FeesData: responseData.data });
          } else {
            console.error('Expected an array but got:', responseData.data);
            this.setState({ FeesData: [] });
          }
        })
        .catch(error => {
          console.error('Error fetching student grades:', error);
          this.setState({ FeesData: [] }); // Set an empty array on error
        });
    } else {
      console.error("Student ID is not available. Cannot fetch student grades.");
    }
  }

  getStudentDue() {

    // Retrieve and parse the login data from localStorage
    const loginData = JSON.parse(localStorage.getItem('login'));

    let studentId = null; // Declare studentId outside the if block


    if (loginData) {
      // Access the student_id and user_type_id from the parsed object
      studentId = loginData['student_id'];


      console.log("Student ID:", studentId);

    } else {
      console.error("No login data found in localStorage");
    }

    // Proceed with the fetch only if studentId is available
    if (studentId) {
      fetch('http://localhost:5000/FeeData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: "current", student_id: studentId })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(responseData => {
          console.warn('65 responseData', responseData); // Log the full response data
          this.setState({ FeeInfo: responseData.data });

        })
        .catch(error => {
          console.error('Error fetching student data:', error);
          this.setState({ FeeInfo: {} }); // Set an empty array on error
        });
    } else {
      console.error("Student ID is not available. Cannot fetch student grades.");
    }
  }

  render() {
    const { FeesData, StudentData, FeeInfo } = this.state;
    // let student_info = StudentData[0]
    console.warn("136 student data", StudentData)
    return (
      <div>
        <SideNav />
   
        <div>

          <div className='fee-top'>
           
            <p className='text'>Student ID : {StudentData ? StudentData.id : "Loading...."} Student Name : {StudentData ? StudentData.student_name : "Loading...."}</p>
            <p className='text'>Father's Name : {StudentData ? StudentData.father_name : "Loading...."} Mother's Name : {StudentData ? StudentData.mother_name : "Loading...."}</p>
            <p className='text'>Current Grade : {FeeInfo ? FeeInfo.grade : "Loading...."} Current Year Fee : {FeeInfo ? FeeInfo.fee : "Loading...."}</p>
            <p className='text'>Current Year Paid : {FeeInfo ? FeeInfo.paid : "Loading...."} Current Year Due : {FeeInfo ? FeeInfo.balance : "Loading...."}</p>
            <p className='text'> </p>
           
            <input
              type="text"
              placeholder="Enter the fee amount you want to pay now"
              name="name"
              onChange={(event) => this.setState({ emi: event.target.value })}
            /> 
            

            <button onClick={() => this.getFilterList()} className="btn btn-primary">
              Pay Fees
            </button><br /><br />

            <button onClick={() => this.getStudentFeeData()} className="btn btn-primary">
              Show Prevois fee Data
            </button>
          </div>
        </div>
        <div className='ad-below'>
          <div className='app-tbl'>
            <Table stripped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Grade</th>
                  <th>Acadamic Year</th>
                  <th>Fee</th>
                  <th>Paid </th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {FeesData?.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.grade} </td>
                    <td>{item.acadamic_year} </td>
                    <td>{item.fee} </td>
                    <td>{item.paid}</td>
                    <td>{item.balance}</td>
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

export default PayFees