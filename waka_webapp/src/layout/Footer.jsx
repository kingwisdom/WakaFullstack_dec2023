import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="bottom-navigation-bar">
            <div className="tf-container">
                <ul className="tf-navigation-bar">
                    <li><Link to={'/menu'} className="fw_4 d-flex justify-content-center align-items-center flex-column" previewlistener="true"><i className="icon-home" /> Home</Link> </li>
                    <li><a className="fw_4 d-flex justify-content-center align-items-center flex-column" href="#" previewlistener="true"><i className="icon-history" /> Traffic</a> </li>

                    <li><a className="fw_4 d-flex justify-content-center align-items-center flex-column" href="/about" previewlistener="true"><i className="icon-user-outline" /> About</a> </li>
                </ul>
                {/* <span class="line"></span> */}
            </div>
        </div>
    )
}

export default Footer