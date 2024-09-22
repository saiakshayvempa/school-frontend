import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCake, faPhone, faThumbsUp, faThumbsDown, faBed, faBicycle } from '@fortawesome/free-solid-svg-icons'
import SideNav from './SideNav';
class Applicants extends Component {

  constructor() {
    super();
    this.state = {
      applicants: []

    };
  }

  componentDidMount() {
    // Fetch the admission types from the API using GET method

    this.getApplicantData()

  }

  getApplicantData() {
    fetch('http://localhost:5000/ApplicationData', {
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
          this.setState({ applicants: responseData.data });
        } else {
          console.error('Expected an array but got:', responseData.data);
          this.setState({ applicants: [] });
        }
      })
      .catch(error => {
        console.error('Error fetching admission types:', error);
        this.setState({ applicants: [] }); // Set an empty array on error
      });

  }

  ApplicationUpdate(id,statusId) {
   

  
    fetch('http://localhost:5000/ApplicationUpdate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({app_id:id,status_id:statusId})
    })
        .then(result => result.json())
        .then(resp => {
            console.warn(resp);
            alert('The Applicant status is updated');
            // this.props.router.navigate('/'); // Navigate to home
            this.getApplicantData()
        })
        .catch(error => {
            console.error('Error during registration:', error);
        });
}


  render() {
    const { applicants } = this.state;
    return (
      <div>
        <SideNav />
        <div className="card-bar">
          <div className="card-body">
            <h5 className="card-title">By Adithi Anand </h5>
            <p className="card-text">Be Honest and always duty comes first ...</p>
          </div>
        </div>
        <p>
          Applicants
        </p>
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
              {applicants?.map((item, i) => (
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
                    <span onClick={() => this.ApplicationUpdate(item.id,2)}><FontAwesomeIcon icon={faThumbsUp} color="Green" /></span>
                    &nbsp;
                    <span onClick={() => this.ApplicationUpdate(item.id,3)}><FontAwesomeIcon icon={faThumbsDown} color="red" /></span>
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

export default Applicants;