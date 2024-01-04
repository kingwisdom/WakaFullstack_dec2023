import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import NotFound from '../pages/NotFound'
import Onboard from '../pages/Onboard'
import Menu from '../pages/Menu'
import AllPlaces from '../pages/AllPlaces'
import AppRoute from '../layout/AppRoute'


const Router = () => {
    // const { user } = useSelector((state) => state.user)

    return (
        <Routes>
            <Route path='/' element={<Onboard />}></Route>

            <Route element={<AppRoute />}>
                <Route path='/menu' element={<Menu />}></Route>
                <Route path="/all" element={<AllPlaces />} />
            </Route>
            <Route path='*' element={<NotFound />}></Route>

        </Routes>
    )
}

export default Router