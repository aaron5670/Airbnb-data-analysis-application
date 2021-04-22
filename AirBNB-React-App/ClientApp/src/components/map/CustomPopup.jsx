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
            <p>{marker.name}</p>
            <div>
                <button color="secondary" onClick={() => remove(index)}>Remove</button>
            </div>
        </Popup>
    )
};

export default CustomPopup;