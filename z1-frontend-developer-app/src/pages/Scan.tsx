import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Webcam from "react-webcam"
import { checkPhoto } from '../services/Api'
import './Scan.scss'
import backgroundImage from '../assets/andyone--WW8jBak7bo-unsplash.jpg'
import lightIcon from '../assets/Fontawesome-Regular.svg'
import okIcon from '../assets/Fontawesome-ok.svg'

let style: any = {
    backgroundImage: `url(${backgroundImage})`,
}

const videoConstraints = {
    width: 350,
    height: 200,
    facingMode: "user"
};

export default function Scan() {

    const [photos, setPhotos] = useState<string>('')
    const [response, setResponse] = useState<boolean>(false)
    const [finalPhoto, setFinalPhoto] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const linkToHomeCancel = {
        pathname: '/home',
        photos: photos,
        response: response,
        finalPhoto: finalPhoto
    }

    const linkToHomeOk = {
        pathname: '/home',
        photos: photos,
        response: true,
        finalPhoto: finalPhoto
    }

    const webcamRef: any = React.useRef(null);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setPhotos(imageSrc)

        },
        [webcamRef]
    );

    useEffect(() => {
        const intervalTakePhoto = setInterval(() => {
            capture()
        }, 3000)
        return () => clearInterval(intervalTakePhoto)
    })

    const history = useHistory()

    useEffect(() => {
        checkPhoto(photos)
            .then((response: any): any => {
                console.log(response.data.summary.outcome)
                setMessage(response.data.summary.outcome)
                if (response.data.summary.outcome === 'Approved' && photos) {
                    setResponse(true)
                    setFinalPhoto(photos)
                    setTimeout(() => {
                        history.push(
                            linkToHomeOk
                        )
                    }, 4000)
                }
            })
            .catch(err => console.log(err))
    }, [photos])

    return (
        <div className='container-scan' style={style}>
            <h3>Take picture</h3>
            <p>Fit your ID card inside the frame.<br />
               The picture will be taken automatically.</p>
            <div className='container-webcam' style={response ? { border: '2px solid #69CC8B' } : { border: '2px solid #C00000' }}>
                <Webcam
                    audio={false}
                    className='webcam'
                    height={'auto'}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={320}
                    videoConstraints={videoConstraints}
                />
            </div>
            { photos && message === 'Approved' && (
                <div className='container-message'>
                    <img src={okIcon} alt='ok icon' />
                    <p>Picture taken!</p>
                </div>
            )}
            {photos && message === 'Too Much Glare' && (
                <div className='container-message'>
                    <img src={lightIcon} alt='bulb light icon' />
                    <p>{message}</p>
                </div>
            )}
            <div className='cancel-button-container'>
                <Link to={linkToHomeCancel}>
                    <button className='button-cancel'>CANCEL</button>
                </Link>
            </div>
        </div>
    )
}
