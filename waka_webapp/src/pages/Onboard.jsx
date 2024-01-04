import React from 'react'
import { Link } from 'react-router-dom'

const Onboard = () => {
    return (
        <div>
            <div className="boarding-section">
                <div className="tf-container">
                    <div className="images">
                        {/* <img src="images/boarding/boarding1.png" alt="image" /> */}
                    </div>
                </div>
            </div>
            <div className="boarding-content mt-7">
                <div className="tf-container">
                    <div className="boarding-title">
                        <h1 className="tf-title">WAKA</h1>
                        <p>The app that makes integration easy for new immigrant in Nigeria</p>
                    </div>
                    <Link to={'/menu'} className="tf-btn accent large">Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Onboard