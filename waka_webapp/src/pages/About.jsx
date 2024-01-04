import React from 'react'

const About = () => {
    return (
        <>
            <div className="header mb-1 is-fixed">
                <div className="tf-container">
                    <div className="tf-statusbar d-flex justify-content-center align-items-center">
                        <a href="/menu" className="back-btn"> <i className="icon-left" /> </a>
                        <h3>About</h3>
                    </div>
                </div>
            </div>
            <div id="app-wrap">
                <ul className="mt-1">
                    <li>
                        <a href="#" className="list-profile outline" previewlistener="true">
                            <p>Developer Details</p>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="list-profile" previewlistener="true">
                            <p><strong>adeoyetemitayo99@gmail.com</strong></p>
                            <p><strong>afeexclusive@gmail.com</strong></p>
                        </a>
                    </li>
                </ul>
            </div>

        </>
    )
}

export default About