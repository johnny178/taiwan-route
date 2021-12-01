/* eslint-disable no-unused-vars */
import React from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';
// import { Wrapper } from './styles';
import './map.css';
import StationIconMedium from '../../images/站牌icon@2x.png';
import GoBusIconMedium from '../../images/去程公車icon@2x.png';
import BackBusIconMedium from '../../images/回程公車icon@2x.png';

const Map = ({ direction, busStopOrder, geometry, busDynamicPostionData }) => {
  const station = new Icon({
    iconUrl: StationIconMedium,
    iconSize: [21, 28]
  });

  const goBus = new Icon({
    iconUrl: GoBusIconMedium,
    iconSize: [56, 30]
  });

  const backBus = new Icon({
    iconUrl: BackBusIconMedium,
    iconSize: [56, 30]
  });

  const pathColor = { color: '#5D4F6E' };

  const setCenterPostion = React.useMemo(() => {
    let centerLat = 0, centerLon = 0;

    busStopOrder[direction].Stops.forEach(item => {
      centerLat += item.StopPosition.PositionLat;
      centerLon += item.StopPosition.PositionLon;
    });
    centerLat /= busStopOrder[direction].Stops.length;
    centerLon /= busStopOrder[direction].Stops.length;
    return ([centerLat, centerLon]);
  }, [busStopOrder, direction]);

  return (
    <MapContainer center={[setCenterPostion[0], setCenterPostion[1]]} zoom={14} scrollWheelZoom={false}>
      <Polyline pathOptions={pathColor} positions={geometry} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        busStopOrder[direction].Stops.map((item, index) => (
          <Marker key={item.StopUID} position={[item.StopPosition.PositionLat, item.StopPosition.PositionLon]} icon={station}>
            <Tooltip offset={[0, 0]} direction="center" opacity={1} permanent>
              {index + 1}
            </Tooltip>
            <Popup>
              {item.StopName.Zh_tw}
            </Popup>
          </Marker>
        ))
      }
      {
        busDynamicPostionData[direction].map(item => (
          <Marker key={item.PlateNumb} position={[item.BusPosition.PositionLat, item.BusPosition.PositionLon]} icon={direction ? backBus : goBus}>
          </Marker>
        ))
      }
    </MapContainer>
  );
};

export default Map;