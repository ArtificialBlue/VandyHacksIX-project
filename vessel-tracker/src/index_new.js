
function getShipRoutes(dataset) {
    const shipRoutes = new Map();
    for (const item of dataset) {
        if (!shipRoutes.has(item.VesselName)) {
            // set up all the ship IDs with empty arrays
            shipRoutes.set(item.VesselName, []);
        }
        shipRoutes.get(item.VesselName).push({ lat: item.LAT, lng: item.LON })
        // shipRoutes.get(item.VesselName).sort((a, b) => a.datetime - b.datetime)
    }
    return shipRoutes
}

async function showAllShips() {
    const data = await fetch("http://localhost:2000/", { cors: 'no-cors' });
    const json_data = await data.json();
    return json_data;
}

const defaultProps = {
    center: {
        lat: 36.143205,
        lng: -86.805609
    },
    zoom: 11
};

async function initMap() {
    const ships = await showAllShips();
    const lines = getShipRoutes(ships);

    const map = new google.maps.Map(document.getElementById("root"), defaultProps)

    for (const item of ships) {
        new google.maps.Marker({
            position: {
                lat: item.LAT,
                lng: item.LON,
                map,
                title: item.VesselName,
            }
        });
    }
}


(async () => {
    const handleGoogleMapApi = (google) => {
        console.log('api loaded')
        for (const [name, path] of props.lines.entries()) {
            console.log(path)
            const line = new google.maps.Polyline({
                path,
                geodesic: true,
                strokeColor: '#000',
                strokeOpacity: 1,
                strokeWidth: 5,
            })
            console.log('setting line', name)

            line.setMap(google.map);
        }
    }

    <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBn9678Reqir1kGGIKu-s4MPn40SaiEggs" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleGoogleMapApi.bind(this)}
        >
            {points}
        </GoogleMapReact>
    </div>

    window.initMap
});