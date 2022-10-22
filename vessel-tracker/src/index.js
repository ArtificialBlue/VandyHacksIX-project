import React from "react";
import ReactDom from 'react-dom/client';
import GoogleMapReact from 'google-map-react';

const _test_data_set = {
    'ships': [
        {
            _id: "6353d22628f789753bffb2e1",
            VesselName: "ASIAN VISION",
        },
        {
            _id: "6353d22628f789753bffb2e2",
            VesselName: "CLOVER ACE"
        },
        {
            _id: "6353d22628f789753bffb2e7",
            VesselName: "HAMBURG BRIDGE"
        },
        {
            _id: "6353d22628f789753bffb2e8",
            VesselName: "ASIAN VISION"
        },
        {
            _id: "6353d22628f789753bffb2e9",
            VesselName: "ASIAN VISION"
        },
        {
            _id: "6353d22628f789753bffb2ea",
            VesselName: "CLOVER ACE"
        }
    ]
};

const _test_loc_points = {
    "6353d22628f789753bffb2e1" : {
        LAT: 34.0,
        LON: 35.6
    }
}

function _get_data_from_id(_id){ // This will later be replaced with an actual database call
    return _test_loc_points[_id];
}

function processPoints(dataset, key) { // Sorts a database query containing 
    var processedJson = {};

    Object.entries(dataset[key]).forEach(([key, value]) => {
        if (processedJson.hasOwnProperty(value.VesselName)){
            processedJson[value.VesselName].push(value._id);
            console.log("Added the following:");
            console.log(value.VesselName);
            console.log(value._id);
        } else {
            processedJson[value.VesselName] = [];
            processedJson[value.VesselName].push(value._id);
            console.log("Added the following:");
            console.log(value.VesselName);
            console.log(value._id);
        }
    });

    console.log(JSON.stringify(processedJson));
    return processedJson;
}

function getPointsFromDataset(dataset) { // Requires a dataset that has already had processPoints() called on it
    HTMLObject = null;
    Object.Entries.forEach(([key, value]) => {
        value.forEach(([key, value]) => {
            var point = _get_data_from_id(value);
            if (HTMLObject == null) {
                HTMLObject = <LocationLabel
                    lat = {point["LAT"]}
                    lng = {point["LON"]}
                    />
            }
        })
    })
}

const LocationLabelStyle = {
    position: 'absolute',
    border: '5px solid #000000',
    backgroundColor: '#ffffff',
    padding: 4,
};

class LocationLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
        };
    }

    render() {
        return (
            <div style={LocationLabelStyle}>{this.props.text}</div>
        )
    }
}

class PointCollection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataset: null,
        }
    }
}


export default function SimpleMap() {
    const defaultProps = {
        center: {
            lat: 36.143205,
            lng: -86.805609
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBn9678Reqir1kGGIKu-s4MPn40SaiEggs" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <LocationLabel
                    lat={36.143205}
                    lng={-86.805609}
                    text="Vanderbilt!"
                />
                <LocationLabel
                    lat={35.143205}
                    lng={-86.805609}
                    text="Not Vanderbilt :("
                />
            </GoogleMapReact>
        </div>
    );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<SimpleMap />)
processPoints(_test_data_set, 'ships');