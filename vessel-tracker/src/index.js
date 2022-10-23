import React, { useEffect, useState } from "react";
import ReactDom from 'react-dom/client';
import GoogleMapReact from 'google-map-react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

const _test_data_set = {
    "ships": [
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
    "6353d22628f789753bffb2e1": {
        LAT: 0.0,
        LON: 0.0
    },
    "6353d22628f789753bffb2e2": {
        LAT: 1.0,
        LON: 1.0
    },
    "6353d22628f789753bffb2e7": {
        LAT: 2.0,
        LON: 2.0
    },
    "6353d22628f789753bffb2e8": {
        LAT: 3.0,
        LON: 3.0
    },
    "6353d22628f789753bffb2e9": {
        LAT: 4.0,
        LON: 4.0
    },
    "6353d22628f789753bffb2ea": {
        LAT: 5.0,
        LON: 5.0
    }
}

function _get_data_from_id(_id) { // This will later be replaced with an actual database call
    // console.log("getting data from Id");
    // console.log(_test_loc_points[String(_id)]);
    return _test_loc_points[_id];
}

// function processPoints(dataset, key) { // Sorts a database query containing 
//     var processedJson = {};
//     // dataset = JSON.parse(dataset);
//     console.log(JSON.stringify(dataset));

//     for (var item in dataset[key]) {
//         if (Object.hasOwnProperty(item)) {
//             console.log(dataset[key][item].VesselName);
//             if (processedJson.hasOwnProperty(dataset[key][item].VesselName)) {
//                 processedJson[dataset[key][item].VesselName].push(dataset[key][item]._id);
//                 console.log("Added the following:");
//                 console.log(dataset[key][item].VesselName);
//                 console.log(dataset[key][item]._id);
//             } else {
//                 processedJson[dataset[key][item].VesselName] = [];
//                 processedJson[dataset[key][item].VesselName].push(dataset[key][item]._id);
//                 console.log("Added the following:");
//                 console.log(dataset[key][item].VesselName);
//                 console.log(dataset[key][item]._id);
//             }
//         }
//     }

//     console.log(JSON.stringify(processedJson));
//     return processedJson;
// }

function getPointsFromDataset(dataset) { // Requires a dataset that has already had processPoints() called on it
    var HTMLObject = null;
    for (var item in dataset) {
        // console.log("getPointsFromDataset()");
        // console.log(dataset[item]);
        for (var item2 in dataset[item]) {
            var point = _get_data_from_id(item2);
            // console.log("point:");
            // console.log(point);
            if (HTMLObject == null) {
                HTMLObject = <LocationLabel
                    lat={point["LAT"]}
                    lng={point["LON"]}
                />
            } else {
                HTMLObject = <LocationLabel
                    lat={point["LAT"]}
                    lng={point["LON"]}
                />
            }
        }
    }
    // console.log(HTMLObject);
    return (<div dangerouslySetInnerHTML={{ __html: HTMLObject }} />);
}

function getShipRoutes(dataset) {
    const shipRoutes = new Map();
    for (const item of dataset) {
        if (!shipRoutes.has(item.VesselName)) {
            // set up all the ship IDs with empty arrays
            shipRoutes.set(item.VesselName, []);
        }
        shipRoutes.get(item.VesselName).push({ lat: Number(item.LAT), lng: Number(item.LON) })
        // shipRoutes.get(item.VesselName).sort((a, b) => a.datetime - b.datetime)
    }
    return shipRoutes
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
        // console.log("Rendering a LocationLabel");
        return (
            <div style={LocationLabelStyle}>{this.props.text}</div>
        )
    }
}

function PointCollection(props) {
    // return getPointsFromDataset(this.props.dataset, 'ships');
    var dataset = props.dataset;
    // console.log("Assembling the point collection:");
    // console.log(dataset);
    // // dataset = getPointsFromDataset(dataset);
    // console.log("Assembled Data:");
    // console.log(dataset);


    return (<>
        {}

    </>)
}

async function showAllShips() {
    const data = await fetch("http://localhost:2000/", { cors: 'no-cors' });
    const json_data = await data.json();
    return json_data;
}




export default function SimpleMap(props) {
    const defaultProps = {
        center: {
            lat: 33.76653,
            lng: -118.27393
        },
        zoom: 11
    };

    const points = props.ships.map(item => {
        // console.log("Item's Info");
        // console.log(item);
        // var point = _get_data_from_id(item._id);
        return <LocationLabel
            key={item._id + item.LAT}
            lat={item["LAT"]}
            lng={item["LON"]}
            text={item.VesselName}
        />
    });

    const handleGoogleMapApi = (google) => {
        console.log('api loaded')

        for (const [name, path] of props.lines.entries()) {
            // console.log(path)
            const line = new google.maps.Polyline({
                path,
                geodesic: true,
                strokeColor: '#000',
                strokeOpacity: 1,
                strokeWidth: 5,
            })
            // console.log('setting line', name)

            line.setMap(google.map);
        }
    }



    return (
        // Important! Always set the container height explicitly
        <Container>
            <Row>
                <Col xs={8}>
                    <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDtEllmmu44uUXVjuEjrNmrJzS-Ea5hDKc" }}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={handleGoogleMapApi.bind(this)}
                        >
                            {points}
                        </GoogleMapReact>
                    </div>
                </Col>
                <Col xs={4}>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Item #1</Accordion.Header>
                            <Accordion.Body>This will have data eventually</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Item #2</Accordion.Header>
                            <Accordion.Body>I promise...</Accordion.Body>
                        </Accordion.Item>
                    </Accordion>  
                </Col>
            </Row>
        </Container>
    );
}

(async () => {
    const ships = await showAllShips();
    const lines = getShipRoutes(ships);

    const root = ReactDom.createRoot(document.getElementById("root"));
    root.render(<SimpleMap ships={ships} lines={lines} />)
})()
// processPoints(_test_data_set, 'ships');