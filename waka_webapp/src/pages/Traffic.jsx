import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Traffic = () => {
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState();
    let [response, setResponse] = useState();
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [DATA, setDATA] = useState([])

    const handleSearch = (e) => {
        e.preventDefault();
        if (!from || !to) {
            return window.alert("Please fill your location")
        }
        setIsLoading(true)
        fetch(
            `https://dev.virtualearth.net/REST/V1/Routes/Driving?o=json&wp.0=${from + " Lagos, Nigeria"}&wp.1=${to + " Lagos, Nigeria"}&maxSolns=3&optmz=timeWithTraffic&key=AjFc0im6uSRCTMsEeyIcgHnTlc-E1O42J0G0mIVeU65vDw1cmc_eHB-8z8xh7tRo#`,
        )
            .then(res => res.json())
            .then(result => {
                setIsLoading(false);
                console.log(result)
                const returnObj = trafficAnalysis(result)
                console.log(returnObj)
                setDATA(returnObj);
                // setTo('');
                // setFrom('');
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
                console.log(error);

                setTo("");
                setFrom("");
            });

    }

    const formatTime = timeString => {
        let timeArr = timeString.split(':');
        if (timeArr[0].charAt(0) == '0') {
            timeArr[0] = timeArr[0].charAt(1);
        }
        let timeres =
            timeArr[0] == '00' || timeArr[0] == '0'
                ? `${timeArr[1]}mn ${timeArr[2]}s`
                : `${timeArr[0]}hr ${timeArr[1]}mn ${timeArr[2]}s`;
        return timeres;
    };

    const getTrafficColor = trafficStatus => {
        let colour = '';
        switch (trafficStatus) {
            case 'None':
                colour = '#00FF00';
                break;
            case 'Mild':
                colour = '#e2f567';
                break;
            case 'Medium':
                colour = '#FFBF00';
                break;
            case 'Heavy':
                colour = '#FF0000';
                break;

            default:
                colour = '#282929';
                break;
        }
        return colour;
    };
    const getContent = () => {
        if (isLoading) {
            // return <ActivityIndicator size={"large"} />
        }
    };

    const trafficAnalysis = respObj => {
        let returnedRouteData = [];
        let majorRoutes = respObj.resourceSets[0].resources;
        for (let i = 0; i < majorRoutes.length; i++) {
            let routeData = {
                trafficStatus: majorRoutes[i].trafficCongestion,
                trafficColor: getTrafficColor(majorRoutes[i].trafficCongestion),
                normalTime: formatTime(
                    new Date(majorRoutes[i].travelDuration * 1000)
                        .toISOString()
                        .substring(11, 19),
                ),
                trafficTime: formatTime(
                    new Date(majorRoutes[i].travelDurationTraffic * 1000)
                        .toISOString()
                        .substring(11, 19),
                ),
                distance: `${Math.round(majorRoutes[i].travelDistance)}km`,
                via: majorRoutes[i].routeLegs[0].description,
                startLocation: majorRoutes[i].routeLegs[0].startLocation?.address.formattedAddress,
                endLocation: majorRoutes[i].routeLegs[0].endLocation?.address.formattedAddress
            };

            returnedRouteData.push(routeData);
        }
        return returnedRouteData;
    };


    return (
        <div style={{ backgroundColor: '#eee', height: '100%' }}>
            <div className="header is-fixed">
                <div className="tf-container">
                    <div className="tf-statusbar d-flex justify-content-center align-items-center">
                        <h3>Get Your Destination Traffic</h3>
                    </div>
                </div>
            </div>
            <div style={{ height: 30 }}></div>
            <div id="" className="style1" style={{ marginBottom: 30 }}>
                <div className="tf-container">
                    <form onSubmit={handleSearch}>
                        <div className="form-group">
                            <label htmlFor="">Current Location*</label>
                            <input type="text" onChange={(e) => setFrom(e.target.value)} className="form-control" placeholder='Current Location' />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="">Destination *</label>
                            <input type="text" onChange={(e) => setTo(e.target.value)} className="form-control" placeholder='Destination' />
                        </div>
                        <button type='submit' className='btn btn-warning btn-border-round mt-3'>{isLoading ? 'Getting Details...' : 'Locate'}</button>
                    </form>

                    <hr />

                    <h4 className='text-center mb-5'>Real Time Traffic</h4>
                    <div className="food-box">
                        {DATA.map((item, i) => (

                            <a href={`https://www.google.com/maps/dir/${item?.startLocation},+Nigeria/${item?.endLocation},+Lagos,+Nigeria`}>
                                <div className='card card-body mb-2'>
                                    <div className="row" key={i}>
                                        <div className="col-3">
                                            <div className="img-box">
                                                <img src={'https://previews.123rf.com/images/scusi/scusi1803/scusi180300003/96678344-road-traffic-in-the-city-illustration.jpg'} alt="images" />
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="p-3">
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <i className="fa fa-circle" style={{ color: item?.trafficColor, fontSize: 18 }} ></i>
                                                    {/* color= /> */}
                                                    <p
                                                        style={{
                                                            fontSize: 18,
                                                            fontWeight: '600',
                                                            color: '#000',
                                                            marginLeft: 20,
                                                        }}>
                                                        {item?.trafficStatus}
                                                    </p>
                                                </div>
                                                <p>
                                                    {item?.via}
                                                </p>
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <i className="fa fa-car" style={{ color: 'red', fontSize: 24 }} ></i>
                                                    <div>
                                                        <div className="d-flex">
                                                            <p>Normal Time:</p>&nbsp;&nbsp;<strong style={{ color: '#000' }}>
                                                                {item?.normalTime}
                                                            </strong>
                                                        </div>
                                                        <div className="d-flex">
                                                            <p>Traffic Time:</p> &nbsp; &nbsp;<strong style={{ color: '#000' }}>
                                                                {item?.trafficTime}
                                                            </strong>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />

                                                <div className="d-flex justify-content-between">
                                                    <p>Distance:</p>
                                                    <p style={{ color: '#000' }}> {item?.trafficTime}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Traffic