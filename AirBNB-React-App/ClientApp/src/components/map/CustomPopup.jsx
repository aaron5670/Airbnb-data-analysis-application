import {Popup} from "react-map-gl";
import React from "react";

const CustomPopup = ({index, marker, closePopup, remove}) => {
    return (
        <Popup
            latitude={marker.latitude}
            longitude={marker.longitude}
            onClose={closePopup}
            closeButton={true}
            closeOnClick={false}
            offsetTop={-30}
        >
            <div>
                <h1 className="text-lg mb-1">{marker.name}</h1>
                <p className="mb-1">
                    <b>Price: </b>${marker.price},-
                </p>
                <p>
                    <b>Description:</b><br/>
                    <div>
                        Lorem ipsum dolor sit amet.
                    </div>
                </p>
            </div>
        </Popup>
    )
};

export default CustomPopup;