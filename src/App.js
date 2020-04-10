import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import MapComponent from './map'
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import ProjectContext from "./context/ProjectContext"
import axios from "axios"
import velovIcon from "./icon_velov.png"

const backend = axios.create({
  /* baseURL: "http://192.168.68.251:8082", */
  baseURL: "http://localhost:8080",
  timeout: 10000,
  validateStatus: false
})

const App = () => {
  //const { state, dispatch } = useContext(ProjectContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const [markers, setMarkers] = useState([])
  const [text, setText] = useState('teeeeeeeeext')
  console.log(ProjectContext)
  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    backend.get("/stations")
      .then(res => {
        setMarkers(res.data.map(d => {
          return {position: [d.geometry[1], d.geometry[0]], name: d.name, desc: d.procedure}
        }))
      })

    L.Icon.Default.mergeOptions({
      iconUrl: velovIcon
    });
    setMarkers([{position: [45.75, 4.85], name: 'Bonjour', desc: "Description"}])
    setLoading(false)
    setText('tix')
  }, []);

  React.useEffect(() => {
  }, [markers]);

  console.log(markers)
  return (
    <div>
      {loading ? <div> Chargement </div>
      : <Map center={[45.75, 4.85]} zoom={13} style={{ height: "100vh" }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          markers.map(marker => 
            <Marker key={Math.random()} position={marker.position}>
              <Popup>
                fidhfkjsdhfk
              </Popup>
            </Marker>
          )
        }
        
      </Map>}
    </div>
  );
}

export default App;
