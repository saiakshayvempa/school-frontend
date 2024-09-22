import React, { Component } from 'react';
import NavBarMenu from "./NavBarMenu";
import videoFile from '../assets/home/video.mp4';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faBus,faFlag,faChalkboardUser, faPeopleRoof,faPercent } from '@fortawesome/free-solid-svg-icons';
class Home extends Component {
  render() {
    return (
      <div>
        <NavBarMenu />
        <div className='home-container'>
          <div className='left-home'>
            <video
              width="100%"
              height="100%"
              controls
              autoPlay
              loop
              muted
            >
              <source src={videoFile} type="video/mp4" /> {/* Use the imported video */}
              Your browser does not support the video tag.
            </video>
          </div>
          <div className='right-home'>
            <p>
              Get your student excited for school with personalized school gear like notebooks,
              water bottles, journals, keychains, and more that showcase their personality.
              Personalized school supplies make back-to-school essentials more fun, colorful, and special.
            </p>
            <p>
              A school is a place where students are taught the fundamentals of life,
              as well as how to grow and survive in life.
            </p>
          </div>
        </div>
        <div className='box-container'>
          <div className='box1-home'>
            <FontAwesomeIcon icon={faPeopleRoof} color="white" className='icon-large' />
            <p className='count'>300+</p>
            <p className='label'>Students</p>
          </div>
          <div className='box1-home'>
            <FontAwesomeIcon icon={faBus} color="white" className='icon-large' />
            <p className='count'>15+</p>
            <p className='label'>Buses</p>
          </div>
          <div className='box1-home'>
            <FontAwesomeIcon icon={faFlag} color="white" className='icon-large' />
            <p className='count'>10+</p>
            <p className='label'>Nationalities</p>
          </div>
          <div className='box1-home'>
            <FontAwesomeIcon icon={faChalkboardUser} color="white" className='icon-large' />
            <p className='count'>20+</p>
            <p className='label'>Finish Educators</p>
          </div>
          <div className='box1-home'>
            <FontAwesomeIcon icon={faPercent} color="white" className='icon-large' />
            <p className='count'>1:12</p>
            <p className='label'>Ratio of Educators per Students</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
