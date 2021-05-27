import React from 'react';
import Nav from "../components/dashboard/Nav";
import VerticalBar from "../components/dashboard/charts/VerticalBar";

export const Account = () => {
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
            <VerticalBar/>
        </>
    );
}
