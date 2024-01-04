import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import NotFound from '../pages/NotFound'
import Onboard from '../pages/Onboard'
import Menu from '../pages/Menu'
import AllPlaces from '../pages/AllPlaces'
import AppRoute from '../layout/AppRoute'
import PlaceDetails from '../pages/PlaceDetails'
import CategoryPlaces from '../pages/CategoryPlaces'
import About from '../pages/About'


const Router = () => {
    // const { user } = useSelector((state) => state.user)

    return (
        <Routes>
            <Route path='/' element={<Onboard />}></Route>

            <Route element={<AppRoute />}>
                <Route path='/menu' element={<Menu />}></Route>
                <Route path="/all" element={<AllPlaces />} />
                {/* <Route path="/place-details" element={<PlaceDetails />} /> */}
                <Route path="/place/:id" element={<PlaceDetails />} />
                <Route path="/category-places/:id" element={<CategoryPlaces />} />
                <Route path="/about" element={<About />} />
            </Route>
            <Route path='*' element={<NotFound />}></Route>

        </Routes>
    )
}

export default Router