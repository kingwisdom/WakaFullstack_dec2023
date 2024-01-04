import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { GetAllPlace } from '../service/app_service';

const PlaceDetails = () => {
    const id = window.location.pathname.split('/')[2];
    const [loading, setLoading] = useState(false)
    const [place, setPlace] = useState({})
    useEffect(() => {
        const getPlace = () => {
            setLoading(true)
            GetAllPlace(id).then((resp) => {
                setPlace(resp.data.returnObj)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        }
        getPlace()
    }, [])

    if (loading) {
        return (<div style={{ textAlign: 'center', alignItems: 'center' }}>Loading...</div>)
    }

    return (
        <>
            <div className="header is-fixed">
                <div className="tf-container">
                    <div className="tf-statusbar d-flex justify-content-center align-items-center">
                        <Link to={'/menu'} className="back-btn"> <i className="icon-left" /> </Link>
                        <h3>{place?.name}</h3>
                    </div>
                </div>
            </div>

            <div id="app-wrap">
                <div className="bill-payment-content">
                    <div className="tf-container">

                        <div className="wrapper-bill">
                            <div className="archive-top">
                                <span className="circle-box lg bg-blue">
                                    <img src={place?.imageUrl} />
                                </span>
                                <h2 className="mt-5 fw_6">{place?.name}</h2>
                                <p className="fw_4 mt-1">{place?.phoneNumber}</p>
                            </div>
                            <div className="dashed-line" />
                            <div className="archive-bottom">
                                <h2 className="text-center">Place Information</h2>
                                <p className="fw_4 mt-1">{place?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceDetails