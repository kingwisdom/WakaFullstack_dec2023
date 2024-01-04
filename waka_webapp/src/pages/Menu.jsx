import React, { useEffect, useState } from 'react'
import { GetCategory } from '../service/app_service'
import { Link } from 'react-router-dom'

const Menu = () => {
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getMenus()
    }, [])

    const getMenus = () => {
        setLoading(true)
        GetCategory().then((resp) => {
            setCategories(resp.data.returnObj)
            // console.log(resp.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    if (loading) {
        return (<div>Loading...</div>)
    }
    return (
        <>
            <div className="header is-fixed">
                <div className="tf-container">
                    <div className="tf-statusbar d-flex justify-content-center align-items-center">
                        <h3>Menu</h3>
                    </div>
                </div>
            </div>
            <div id="app-wrap" className="style1">
                <div className="tf-container">
                    <div className="tf-tab">
                        <div className="content-tab mb-5">
                            <div className="tab-gift-item" style={{ display: 'grid' }}>
                                <div className="food-box">
                                    <Link to={'/all'}> <div className="img-box">
                                        <img src="https://hips.hearstapps.com/hmg-prod/images/red-hot-air-balloons-over-jungle-nyaung-u-mandalay-royalty-free-image-1693419727.jpg?crop=0.681xw:1.00xh;0.272xw,0&resize=640:*" alt="images" />
                                    </div>
                                    </Link>
                                    <div className="content">
                                        <h4><Link to={'/all'} href="#" previewlistener="true">All Places</Link></h4>
                                    </div>
                                </div>
                                {categories?.map((item, index) => (
                                    <div className="food-box" key={index}>
                                        <Link to={`/category-places/${item?.id}`}>
                                            <div className="img-box">
                                                <img src={item?.image} alt="images" />
                                            </div></Link>
                                        <div className="content">
                                            <h4><Link to={`/category-places/${item?.id}`} previewlistener="true">{item?.name}</Link></h4>
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu