import React from 'react';
import logo from './logo.svg';
import MapComponent from './map'
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';




function App() {
  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'C:\\Users\\yohan\\Documents\\Projets\\Velov-Proba\\src',
      iconUrl: 'C:\\Users\\yohan\\Documents\\Projets\\Velov-Proba\\src',
      shadowUrl: 'C:\\Users\\yohan\\Documents\\Projets\\Velov-Proba\\src'
    });
  }, []);

  return (
    <Map center={[45.75, 4.85]} zoom={13} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[45.75, 4.85]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  );
}

export default App;
