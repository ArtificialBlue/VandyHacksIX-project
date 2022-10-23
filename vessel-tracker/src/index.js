import React, { useEffect, useState } from "react";
import ReactDom from 'react-dom/client';
import GoogleMapReact from 'google-map-react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

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
    return shipRoutes;
}

function getUniqueShips(dataset) {
    const uniqueShips = new Map();
    for (const item of dataset){
        if (!uniqueShips.has(item.VesselName)) {
            uniqueShips.set(item.VesselName, []);
        }
        uniqueShips.get(item.Vessel).push({ VesselName: item.VesselName, CallSign: item.CallSign})
    }
    return uniqueShips;
}

const LocationLabelStyle = {
    position: 'absolute',
    border: '5px solid #000000',
    backgroundColor: '#ffffff',
    padding: 4,
};

class SideBar extends React.Component {

}

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
    console.log(props.dataset);
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

// async function 



export default function SimpleMap(props) {
    const defaultProps = {
        center: {
            lat: 33.76653,
            lng: -118.27393
        },
        zoom: 11
    };

    const points = props.ships.map(item => {
        console.log("Item's Info");
        console.log(item);
        // var point = _get_data_from_id(item._id);
        return <LocationLabel
            key={item._id + item.LAT}
            lat={item["LAT"]}
            lng={item["LON"]}
            text={item.VesselName}
        />
    });

    const sidebar = <Accordion> 
        {sidebar = getUniqueShips().map(item => {
            <Accordion.Header>item.VesselName</Accordion.Header>
            <Accordion.Body>
                <ul>
                    <li>item.</li>
                </ul>
            </Accordion.Body>
        })}
        </Accordion>

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