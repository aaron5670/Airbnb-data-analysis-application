import {Popup} from "react-map-gl";
import React from "react";

const CustomPopup = ({marker, closePopup, stays, loading}) => {
    const ProfitAndStays = ({stays, loading}) => {
        if (loading) return <p className="mb-1"><b>Loading...</b></p>
        if (stays) {
            return (
                <>
                    <p className="mb-1">
                        <b>Stays: </b>{stays}
                    </p>
                    <p className="mb-1">
                        <b>Profit: </b>${stays * marker.price},-
                    </p>
                </>
            )
        } else {
            return <p className="mb-1"><b>No data</b></p>
        }
    }

    return (
        <Popup
            latitude={marker.latitude}
            longitude={marker.longitude}
            onClose={closePopup}
            closeButton={true}
            closeOnClick={false}
            offsetTop={-30}
        >
            <div className="card shadow-xl image-full">
                <figure>
                    <img src="https://fintax.it/wp-content/uploads/2018/04/airbnb-logo-belo.png" alt="Airbnb logo"/>
                </figure>
                <div className="justify-end card-body">
                    <h2 className="card-title">{marker.name}</h2>
                    <p className="mb-1">
                        <b>Price: </b>${marker.price},-
                    </p>
                    <ProfitAndStays loading={loading} stays={stays}/>
                    <div className="card-actions">
                        <button onClick={closePopup} className="btn btn-primary">Popup sluiten</button>
                    </div>
                </div>
            </div>
        </Popup>
    )
};

export default CustomPopup;