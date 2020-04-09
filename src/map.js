import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


const MapComponent = () => {
    const position = [45.78, 4.85]
    return (
      <Map center={position} zoom={10}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }

  export default MapComponent
