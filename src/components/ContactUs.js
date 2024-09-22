import React, { Component } from 'react';
import NavBarMenu from './NavBarMenu';
import Logo from '../assets/images/logo.png';

class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      BranchesList: []
    };
  }

  componentDidMount() {
    this.getBranchesData();
  }

  getBranchesData() {
    fetch('http://localhost:5000/BranchData', {
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
          this.setState({ BranchesList: responseData.data });
        } else {
          console.error('Expected an array but got:', responseData.data);
          this.setState({ BranchesList: [] });
        }
      })
      .catch(error => {
        console.error('Error fetching admission types:', error);
        this.setState({ BranchesList: [] }); // Set an empty array on error
      });
  }

  render() {
    const { BranchesList } = this.state;

    return (
      <div>
        <NavBarMenu />
        <div className='us-abt'>
          <p className='NameText'>Contact Us</p>
        </div>
        {BranchesList.map((branch, index) => (
          <div key={index} className='us'>
            <div className='us-left'>
              <img className="contact-img" src={Logo} alt="logo" /><br /><br />
            </div>
            <div className='us-right'>
              <p className='title'>
                {branch.city}
              </p>
              <p className='text'>
                {branch.address}
              </p>
              <p className='text'>
                {branch.city},{branch.state}
              </p>
              <p className='text'>
                Contact Person: {branch.contact_person}
              </p>
              <p className='text'>
                Telephone: {branch.telephone}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ContactUs;
