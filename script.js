function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.7749, lng: -122.4194},
        zoom: 5,
        mapId: '[MAP ID REQUIRED]'
    });

    //Needs to be a list of lists of lat and long pairs.
    const flightPlans = [
        [
            { lat: 47.61584051414438, lng: -122.35392631739289},
            { lat: 48.33072314550442, lng: -122.91109886128251},
            { lat: 48.496454312274196, lng: -124.89863035739351},
            { lat: 29.27155074657263, lng: 130.59112467154907},
            { lat: 30.675427797007472, lng: 122.07679183077951}

        ],
        [
            { lat: 29.27155074657263,lng: 130.59112467154907},
            { lat: 29.943446596845597, lng: 121.84172529889723}

        ],
        [
            { lat: 29.27155074657263,lng: 130.59112467154907},
            { lat: 36.04399071858902, lng: 120.20158807250108}
            
        ],
        [
            { lat: 29.27155074657263,lng: 130.59112467154907},
            { lat: 35.104124087581894, lng: 129.04251533106773}

        ],
        [
            {lat: 33.73013828799805, lng: -118.22232437794135},
            {lat: 21.601648087927714, lng: 120.26067206265658},
            {lat: 22.599154014843602, lng: 120.28844560068963}
        ],
        [
            {lat: 21.601648087927714, lng: 120.26067206265658},
            {lat: 22.300499897312285, lng: 114.16510183946153}
        ],
        [
            {lat: 22.300499897312285, lng: 114.16510183946153},
            {lat: 22.697746225476738, lng: 113.68168960422503,}

        ],
        [
            {lat: 21.601648087927714, lng: 120.26067206265658},
            {lat: 22.569260140815032, lng: 114.24413143834681}
        ],
        [
            {lat: 21.601648087927714, lng: 120.26067206265658},
            {lat: 1.2488878142858508, lng: 103.61243220080966}
        ],
        [
            {lat: 1.2488878142858508, lng: 103.61243220080966},
            {lat: 3.0443721843631923, lng: 101.35758797850117}

        ],
        [
            {lat: 3.0443721843631923, lng: 101.35758797850117},
            {lat: 9.940305439601705, lng: 90.20394613069983},
            {lat: 1.9520506773858544, lng: 80.96865725132876},
            {lat: 23.886005927091585, lng: 64.26850089334802},
            {lat: 25.026170325190687, lng: 55.04029292548918}
        ],
        [
            {lat: 32.12509694723107, lng: -81.13991726022934},
            {lat: 50.6180523335015, lng: 1.0698548246851785},
            {lat: 51.55727797516682, lng: 1.8579391670288534},
            {lat: 51.2419094769909, lng: 4.4080803773946755}
            
        ],
        [
            {lat: 51.55727797516682, lng: 1.8579391670288534},
            {lat: 51.95412760085948, lng: 4.146001790285227}
        ],
        [
            {lat: 40.677317321752994, lng: -74.02300525856772},
            {lat: 50.6180523335015, lng: 1.0698548246851785}
        ]

        


    ];
    //For loop for creating the flight paths

    for (let i = 0; i < flightPlans.length; i++) {
        const currentPlan = flightPlans[i];

        const flightPath = new google.maps.Polyline({
            path: currentPlan,
            geodesic: false,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        
        flightPath.setMap(map);


    }



    //Busiest Ports/Straits
    //Name
    //Latitude, Longitude
    //City
    //Country
    var portMarkers = [
        {
            'name': 'Port of Los Angeles',
            'latitude': 33.73013828799805,
            'longitude': -118.22232437794135,
            'city': 'Los Angeles',
            'country': 'United States'
        },
        {
            'name': 'Port of Long Beach',
            'latitude':33.75546777266434, 
            'longitude': -118.21645816320653,
            'city': 'Long Beach',
            'country': 'United States'

        },
        {
            'name': 'Port of New York and New Jersey',
            'latitude':40.677317321752994,
            'longitude': -74.02300525856772,
            'city': 'New York',
            'country': 'United States'
        },
        {
            'name':'Port of Savannah',
            'latitude': 32.12509694723107,
            'longitude': -81.13991726022934,
            'city': 'Savannah',
            'country': 'United States'
        },
        {
            'name': 'Port of Seattle',
            'latitude': 47.61584051414438,
            'longitude': -122.35392631739289,
            'city': 'Seattle',
            'country': 'United States'

        },
        {
            'name': 'Port of Shanghai',
            'latitude': 30.675427797007472,
            'longitude': 122.07679183077951,
            'city': 'Shanghai',
            'country': 'China'
        },
        { 
            'name': 'Port of Singapore',
            'latitude': 1.2488878142858508,
            'longitude': 103.61243220080966,
            'city': 'Tuas',
            'country': 'Singapore'
        },
        {
            'name': 'Port of Ningbo-Zhoushan',
            'latitude': 29.943446596845597,
            'longitude': 121.84172529889723,
            'city': 'Ningbo',
            'country': 'China'
        },
        {
            'name': 'Port of Shenzhen',
            'latitude': 22.569260140815032,
            'longitude': 114.24413143834681,
            'city': 'Shenzhen',
            'country': 'China'
        },
        {
            'name': 'Port of Gauangzhou',
            'latitude': 22.697746225476738,
            'longitude': 113.68168960422503,
            'city': 'Guangzhou',
            'country': 'China'
        },
        {
            'name': 'Port of Qingdao',
            'latitude': 36.04399071858902, 
            'longitude': 120.20158807250108,
            'city': 'Qingdao',
            'country': 'China'
        },
        {
            'name': 'Port of Busan',
            'latitude': 35.104124087581894, 
            'longitude': 129.04251533106773,
            'city': 'Busan',
            'country': 'South Korea'

        },
        {
            'name': 'Port of Hong Kong',
            'latitude': 22.300499897312285, 
            'longitude': 114.16510183946153,
            'city': 'Hong Kong',
            'country': 'China'
        },
        {
            'name': 'Port of Rotterdam',
            'latitude': 51.95412760085948, 
            'longitude': 4.146001790285227,
            'city': 'Rotterdam',
            'country': 'Netherlands'
        },
        {
            'name': 'Port of Jebel Ali',
            'latitude': 25.026170325190687,
            'longitude': 55.04029292548918,
            'city': 'Dubai',
            'country': 'United Arab Emirates'
        },
        {
            'name': 'Port Klang',
            'latitude': 3.0443721843631923,
            'longitude': 101.35758797850117,
            'city': 'Klang',
            'country': 'Malaysia'
         },
        {
            'name': 'Port of Antwerp',
            'latitude': 51.2419094769909,
            'longitude': 4.4080803773946755,
            'city': 'Antwerp',
            'country': 'Belgium'

        },
        {
            'name': 'Port of Kaohsiung',
            'latitude': 22.599154014843602,
            'longitude': 120.28844560068963,
            'city': 'Kaohsiung',
            'country': 'Taiwan'
        }
    ];

    for (let i = 0; i < portMarkers.length; i++) {
        const currentMarker = portMarkers[i];

        const marker = new google.maps.Marker({
            position: {lat: currentMarker.latitude, lng: currentMarker.longitude}, 
            map,
            title: currentMarker.name,
            icon: {
                url: "Port.png",
                scaledSize: new google.maps.Size(50, 50)
            }
      });

        const infowindow = new google.maps.InfoWindow({
            content: currentMarker.name
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
    });

    }

    //Name
    //Latitude, Longitude
    const markers = [
        {
            'name': 'SHIP A',
            'latitude': 33.534250605800565,
            'longitude': -118.86033793087695
        },
        {
            'name': 'SHIP B',
            'latitude': 33.2858568482651,
            'longitude': -117.75798874849713
        }
    ];
    for (let i = 0; i < markers.length; i++) {
        const currentMarker = markers[i];

        const marker = new google.maps.Marker({
            position: {lat: currentMarker.latitude, lng: currentMarker.longitude}, 
            map,
            title: currentMarker.name,
            icon: {
                url: "Ship.png",
                scaledSize: new google.maps.Size(25, 25)
            }
      });

        const infowindow = new google.maps.InfoWindow({
            content: currentMarker.name
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
    });

    }
    
}
