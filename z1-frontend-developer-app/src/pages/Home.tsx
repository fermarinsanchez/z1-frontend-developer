import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import bgCard from '../assets/ID-bg.svg'
import rejectedIcon from '../assets/Fontawesome-rejected.svg'
import acceptedIcon from '../assets/Fontawesome-accepted.svg'
import './Home.scss'


export default function Home(props: any) {

    console.log(props.location)
    return (
        <div className='container-home'>
            <Header />
            <h3>Scan your ID</h3>
            <p>Take a picture. It may take time to validate your personal information.</p>
            {props.location.photos && props.location.response ?
                (<div>
                    <div className='container-card' style={{ border: '3px solid #69CC8B' }}>
                        <div className='card-fail'>
                            <img src={props.location.photos} alt='bad scaned ID card' className='photo-home' />
                        </div>
                    </div>
                    <div className='accepted-badge'>
                        <img src={acceptedIcon} alt='X icon'/>
                        <label>ACCEPTED</label>
                    </div>
                </div>)
                : props.location.photos && !props.location.response ?
                    (
                        <div>
                            <div className='container-card' style={{ border: '3px solid #C00000' }}>
                                <div className='card-fail'>
                                    <img src={props.location.photos} alt='bad scaned ID card' className='photo-home' />
                                    <Link to='/scan'>
                                        <button className='take-picture'>RETAKE PICTURE</button>
                                    </Link>
                                </div>
                            </div>
                            <div className='rejected-badge'>
                                <img src={rejectedIcon} alt='X icon'/>
                                <label>REJECTED</label>
                            </div>
                        </div>
                    )
                    : (<div className='container-card'>
                        <div className='card'>
                            <img src={bgCard} alt='id-card vector' />
                            <Link to='/scan'>
                                <button className='take-picture'>TAKE PICTURE</button>
                            </Link>
                        </div>
                    </div>)}

        </div>
    )
}
