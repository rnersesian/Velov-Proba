import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import 'rc-time-picker/assets/index.css';

import MapComponent from './map'
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import ProjectContext from "./context/ProjectContext"
import axios from "axios"
import velovIcon from "./icon_velov.png"
import MarkerClusterGroup from "react-leaflet-markercluster";
import TimePicker from 'rc-time-picker';
import moment from 'moment';

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
  const [velosPlacesCheckbox, setVelosPlacesCheckbox]  = useState(false)
  const [day, setDay]  = useState(0)
  const [hour, setHour] = useState(moment())

  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    backend.get("/stations")
      .then(res => {
        console.log('res data', res.data)
        setMarkers(res.data.map(d => {
          return {position: [d.geometry[1], d.geometry[0]], name: d.name, id: d.procedure}
        }))
      })

    
    L.Icon.Default.mergeOptions({
      iconUrl: velovIcon,
      iconSize: [30,30],
      iconAnchor: [15,15]
    });
    setLoading(false)
  }, []);

  useEffect(() => {
    console.log(velosPlacesCheckbox, day, hour.hour(), hour.minute())
  }, [velosPlacesCheckbox, day, hour]);

  
  const clickOnMarker = (marker) => {
    const {position, id, name} = marker
    console.log(marker)
    
    backend.get("/stations/"+id)
      .then(station => {
        console.log('station', station.data)
      })
  }
  
  
  return (
    <div>
      {loading ? <div> Chargement </div>
      : <div>
          <div style={{ float:"left", width:"20%" }}>
            <div style={{padding:"10px"}}>
              <div style={{float:"left", width:"33%"}}>
                Vélos disponibles
              </div>
              <div style={{float:"left", width:"20%" }}>
                <label class="switch">
                  <input type="checkbox" checked={velosPlacesCheckbox} onChange={() => setVelosPlacesCheckbox(!velosPlacesCheckbox)}/>
                  <span class="slider round"></span>
                </label>
              </div>
              <div style={{float:"right", width:"40%"}}>
                Places disponibles
              </div>
            </div>
            <div>
              <label>
                Jour de la semaine :
                <select value={day} onChange={(e) => setDay(e.target.value)}>
                  <option value="0">Lundi</option>
                  <option value="1">Mardi</option>
                  <option value="2">Mercredi</option>
                  <option value="3">Jeudi</option>
                  <option value="4">Vendredi</option>
                  <option value="5">Samedi</option>
                  <option value="6">Dimanche</option>
                </select>
              </label>
            </div>
            <div>
              <TimePicker
                style={{ width: 100 }}
                showSecond={false}
                defaultValue={moment()}
                value={hour}
                className="xxx"
                onChange={(e) => setHour(e)}
              />
            </div>
          </div>
          <Map center={[45.75, 4.85]} zoom={13} style={{ height: "100vh" }}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup>
            {
              markers.map(marker => 
                <Marker key={Math.random()} position={marker.position} onClick={() => clickOnMarker(marker)}>
                  <Popup>
                    {marker.name}
                  </Popup>
                </Marker>
              )
            }
          </MarkerClusterGroup>
        </Map>
      </div>}
    </div>
  );
}

export default App;
