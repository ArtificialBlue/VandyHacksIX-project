function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.7749, lng: -122.4194},
        zoom: 5,
        mapId: '92cb37b5095a990e'
    });

    //Name
    //Latitude, Longitude
    //Image URL
    //scaledSize width, height
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
                scaledSize: new google.maps.Size(50, 50)
            }
      });

    }
    const infowindow = new google.maps.InfoWindow({
        content: "Test"
      });

    marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });
    
    
    
    
    
}