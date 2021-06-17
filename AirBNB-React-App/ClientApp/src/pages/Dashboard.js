import React, {useEffect, useState} from 'react';
import Nav from "../components/dashboard/Nav";
import VerticalBar from "../components/dashboard/charts/VerticalBar";
import DoughnutChart from "../components/dashboard/charts/Doughnut";
import {adalConfig, authContext} from "../adalConfig";
import config from "../config";

const Dashboard = () => {
    const [averagePriceNeighbourhoods, setAveragePriceNeighbourhoods] = useState();
    const [typeAccommodations, setTypeAccommodations] = useState();
    const [typeRooms, setTypeRooms] = useState();
    const [typeBeds, setTypeBeds] = useState();
    const getToken = () => authContext.getCachedToken(adalConfig.clientId);

    /**
     * Average price neighbourhoods
     */
    useEffect(() => {
        if (!averagePriceNeighbourhoods) {
            fetch(`${config.API_URL}/api/charts/average-price`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setAveragePriceNeighbourhoods({
                        labels: data.map(a => a.neighbourhood),
                        count: data.map(a => a.averagePrice)
                    })
                })
        }
    }, []);


    /**
     * Type accommodations
     */
    useEffect(() => {
        if (!typeAccommodations) {
            fetch(`${config.API_URL}/api/charts/type-accommodations`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setTypeAccommodations({
                        labels: data.map(a => a.type),
                        count: data.map(a => a.count)
                    })
                })
        }
    }, []);

    /**
     * Type rooms
     */
    useEffect(() => {
        if (!typeRooms) {
            fetch(`${config.API_URL}/api/charts/type-rooms`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setTypeRooms({
                        labels: data.map(a => a.type),
                        count: data.map(a => a.count)
                    })
                })
        }
    }, []);

    /**
     * Type beds
     */
    useEffect(() => {
        if (!typeBeds) {
            fetch(`${config.API_URL}/api/charts/type-beds`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setTypeBeds({
                        labels: data.map(a => a.type),
                        count: data.map(a => a.count)
                    })
                })
        }
    }, []);

    const Hero = () => {
        return (
            <div className="bg-deep-purple-accent-700">
                <div
                    className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                    <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                        <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
                            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-black-50 sm:text-4xl md:mx-auto">
                                    Inside Airbnb statistieken
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Nav/>
            <Hero/>
            <VerticalBar labels={averagePriceNeighbourhoods?.labels} data={averagePriceNeighbourhoods?.count}/>

            <div className="relative py-4 pt- w-full">
                <div className="w-1/3 float-left">
                    <h2 className="max-w-lg text-center mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-black-50 sm:text-4xl md:mx-auto">
                        Type accommodations
                    </h2>
                    <DoughnutChart labels={typeAccommodations?.labels} data={typeAccommodations?.count}/>
                </div>

                <div className="w-1/3 float-left">
                    <h2 className="max-w-lg text-center mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-black-50 sm:text-4xl md:mx-auto">
                        Type Rooms
                    </h2>
                    <DoughnutChart labels={typeRooms?.labels} data={typeRooms?.count}/>
                </div>

                <div className="w-1/3 float-left">
                    <h2 className="max-w-lg text-center mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-black-50 sm:text-4xl md:mx-auto">
                        Type beds
                    </h2>
                    <DoughnutChart labels={typeBeds?.labels} data={typeBeds?.count}/>
                </div>
            </div>
        </>
    );
}

export default Dashboard