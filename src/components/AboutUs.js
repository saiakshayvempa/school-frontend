import React, { Component } from 'react'

import NavBarMenu from './NavBarMenu';
import Founder from '../assets/images/founder.jpg';
import Story from '../assets/images/story.jpg';

class AboutUs extends Component {
    render() {
        return (
            <div>
                <NavBarMenu />
                <div className='us-abt'>
                    <p className='NameText'>About us</p>
                </div>
                <div className='us'>
                    <div className='us-left'>
                        <img className="us-img" src={Founder} alt="logo" /><br /><br />
                    </div>
                    <div className='us-right'>
                        <p className='title'>
                            Hyderabad
                        </p>
                        <p className='text'>
                            The man, Shri. S.R.N Mudiraj with over four decades of experience in education turned his track record into making tracks in a field that moulds the mind, and makes a man the master of his destiny.
                        </p>
                        <p className='text'>
                            Late Shri S R N Mudiraj started his career as a teacher in a government school and retired as a Headmaster. He established The Sumitra Upper Primary school in 1964.
                        </p>
                        <p className='text'>
                            With his vision and an endeavor  provide quality education to Johnson Grammar School, Warasiguda was established in the 1979 and within a span of 4 years, JGS Habsiguda was established in 1983.
                        </p>
                    </div>
                </div>
                <div className='us'>
                    <div className='us-right'>
                        <img className="us-img" src={Story} alt="logo" /><br /><br />
                    </div>
                    <div className='us-left'>
                        <p className='title'>
                            Our Story
                        </p>
                        <p className='text'>
                            The man, Shri. S.R.N Mudiraj with over four decades of experience in education turned his track record into making tracks in a field that moulds the mind, and makes a man the master of his destiny.
                        </p>
                        <p className='text'>
                            Late Shri S R N Mudiraj started his career as a teacher in a government school and retired as a Headmaster. He established The Sumitra Upper Primary school in 1964.
                        </p>
                        <p className='text'>
                            With his vision and an endeavor  provide quality education to Johnson Grammar School, Warasiguda was established in the 1979 and within a span of 4 years, JGS Habsiguda was established in 1983.
                        </p>
                    </div>
                </div>
                <div className='us'>
                    <div className='us-left'>
                        <img className="us-img" src={Story} alt="logo" /><br /><br />
                    </div>
                    <div className='us-right'>
                        <p className='title'>
                            Our Mission
                        </p>
                        <p className='text'>
                            The man, Shri. S.R.N Mudiraj with over four decades of experience in education turned his track record into making tracks in a field that moulds the mind, and makes a man the master of his destiny.
                        </p>
                        <p className='text'>
                            Late Shri S R N Mudiraj started his career as a teacher in a government school and retired as a Headmaster. He established The Sumitra Upper Primary school in 1964.
                        </p>
                        <p className='text'>
                            With his vision and an endeavor  provide quality education to Johnson Grammar School, Warasiguda was established in the 1979 and within a span of 4 years, JGS Habsiguda was established in 1983.
                        </p>
                    </div>
                </div>

            </div>
        )
    }
}

export default AboutUs;



