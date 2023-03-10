mapboxgl.accessToken = 'pk.eyJ1IjoiYnJldHRib3ZhbCIsImEiOiJjbGNma2I0MHE0b2hsM3dwNzVyamo2aWU0In0.7DWVTaZWWr8dw6_fOuY39w';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-113.994, 46.87215], // starting position [lng, lat]
    zoom: 12, // starting zoom
});


map.on('load', () => {
    map.addSource('places', {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<h3>A Skatepark Sonnet</h3><p>Take a selfie in the bowl while reading this computer generated sonnet.</p>',
                        'icon': 'theatre'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-114.00208953748961, 46.871496301435286] 
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<h3>Greasiest of Spoon</h3><p>Order (and eat) the most expensive item on the menu while pretending to be extremely Irish.</p>',
                        'icon': 'bar'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-114.017650, 46.849798]
                    }
                },
            ]
        }
    });
    // Add a layer showing the places.
    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-image': ['get', 'icon'],
            'icon-size': 3,
            'icon-allow-overlap': true
        }
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'places', (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
    });
});