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
    const uniqueShips = {};
    for (const item of dataset) {
        if (!uniqueShips.hasOwnProperty(item.VesselName)) {
            uniqueShips[item.VesselName] = [];
            // console.log("Adding to uniqueShips:");
            // console.log(item.VesselName);
        }
        uniqueShips[item.VesselName].push({ VesselName: item.VesselName, CallSign: item.CallSign, Height: item.Height, Width: item.Width, MMSI: item.MMSI });
    }
    return uniqueShips;
}

const LocationLabelStyle = {
    position: 'absolute',
    border: '5px solid #000000',
    backgroundColor: '#ffffff',
    padding: 4,
};

class SideBarItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            VesselName: null,
            CallSign: null,
            Length: null,
            Width: null,
            Id: String(Math.floor(Math.random() * (100000 - 1 + 1)) + 1)
        };
    }

    render() {
        return (
            <Accordion.Item eventKey={this.props.Id}>
                <Accordion.Header>{this.props.VesselName}</Accordion.Header>
                <Accordion.Body>
                    <ul>
                        <li>Call Sign: {this.props.CallSign}</li>
                        <li>Length: {this.props.Length}</li>
                        <li>Width: {this.props.Width}</li>
                        <li>ID: {this.props.Id}</li>
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        )
    }
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
    // console.log(props.dataset);
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

    // console.log("ships vs sidebar");
    // console.log(props.ships);
    // console.log(props.sidebar);
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


    const sidebar = Object.keys(props.sidebar).map(item => {
        // console.log("Adding sidebar item");
        console.log("ID:");
        console.log(props.sidebar[item][0]._id);
        // return <div>"Hi"</div>
        return <SideBarItem
            CallSign={props.sidebar[item][0].CallSign}
            Length={props.sidebar[item][0].Height}
            Width={props.sidebar[item][0].Width}
            VesselName={props.sidebar[item][0].VesselName}
            Id = {props.sidebar[item][0]._id}
        />
    });

    // var sidebar = null;
    // for (const [key, value] of Object.entries(props.sidebar)) {
    //     console.log(key);
    //     console.log(value);
    //     sidebar += <SideBarItem
    //         CallSign={value[0]["CallSign"]}
    //         Length={value[0].Height}
    //         Width={value[0].Width}
    //     // MMSI={props.sidebar[item][0].MMSI}
    //     />
    // }

    console.log(sidebar);

    // const sidebar2 = <Structure></Structure>

    // function getUniqueShips(dataset) {
    // const uniqueShips = new Map();
    // for (const item of dataset) {
    //     if (!uniqueShips.has(item.VesselName)) {
    //         uniqueShips.set(item.VesselName, []);
    //         console.log("Adding to uniqueShips:");
    //         console.log(item.VesselName);
    //     }
    //     uniqueShips.get(item.VesselName).push({ VesselName: item.VesselName, CallSign: item.CallSign, Height: item.Height, Width: item.Width, MMSI: item.MMSI });
    // }
    // return uniqueShips;


    // var uniqShips = new Map();
    // const sideBarData = props.ships.map(item => {
    //     if (!uniqShips.has(item.VesselName)){
    //         uniqShips.set(item.VesselName, []);
    //     }
    //     uniqShips.get(item.VesselName).push({ VesselName: item.VesselName, CallSign: item.CallSign, Height: item.Height, Width: item.Width, MMSI: item.MMSI });
    // })

    // uniqShips.map(item => {

    // })

    const handleGoogleMapApi = (google) => {
        // console.log('api loaded')

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
                        {sidebar}
                        {/* {sidebar2} */}
                    </Accordion>
                </Col>
            </Row>
        </Container>
    )
}

(async () => {
    const ships = await showAllShips();
    const lines = getShipRoutes(ships);
    // console.log("LINES:");
    // console.log(lines);
    const sidebar = getUniqueShips(ships);

    const root = ReactDom.createRoot(document.getElementById("root"));
    root.render(<SimpleMap ships={ships} lines={lines} sidebar={sidebar} />)
})()
// processPoints(_test_data_set, 'ships');