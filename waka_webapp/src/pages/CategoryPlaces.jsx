import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetAllPlaces, GetCategoryPlaces } from '../service/app_service'

const CategoryPlaces = () => {
    const id = window.location.pathname.split('/')[2];
    const [loading, setLoading] = useState(false)
    const [places, setPlaces] = useState([])
    useEffect(() => {
        getPlace()
    }, [])

    const getPlace = () => {
        setLoading(true)
        GetCategoryPlaces(id).then((resp) => {
            setPlaces(resp.data.returnObj)
            // console.log(resp.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    if (loading) {
        return (<div style={{ textAlign: 'center', alignItems: 'center' }}>Loading...</div>)
    }

    return (
        <>
            <div className="header is-fixed">
                <div className="tf-container">
                    <div className="tf-statusbar d-flex justify-content-center align-items-center">
                        <Link to={'/menu'} className="back-btn"> <i className="icon-left" /> </Link>
                        <h3>All Places</h3>
                    </div>
                </div>
            </div>
            <div id="app-wrap">
                <div className="bill-content">
                    <div className="tf-container">
                        <div className="box-search mt-3">
                            <div className="input-field">
                                <span className="icon-search" />
                                <input required className="search-field value_input" placeholder="Search" type="text" />
                                <span className="icon-clear" />
                            </div>
                        </div>

                        {places?.map((item, index) => (
                            <div className="list-bill-view mb-4 mt-4" key={index}>
                                <img src={item?.imageUrl} style={{ height: 22, width: 22 }} />
                                <div className="content">
                                    <h4><Link to={`/place/${item?.id}`} className="fw_6" previewlistener="true">{item?.name}</Link></h4>
                                    <p><a href={`tel:${item?.phoneNumber}`}>{item?.phoneNumber}</a></p>
                                    <p><a href={`http://maps.google.com/maps?q=${item?.address}`} target='_blank'>{item?.address}</a></p>
                                </div>
                                <i className="icon-right" />
                            </div>
                        ))}


                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryPlaces