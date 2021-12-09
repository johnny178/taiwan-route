import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Image, Item, ItemCont, MapWrapper, Text, Wrapper } from './styles';
import './map.css';
import StationIcon from '../../images/站牌icon@2x.png';
import GoBusIcon from '../../images/去程公車icon@2x.png';
import BackBusIcon from '../../images/回程公車icon@2x.png';
import Location from '../../images/您的位置icon@2x.png';

const station = new Icon({
  iconUrl: StationIcon,
  iconSize: [21, 28]
});

const goBus = new Icon({
  iconUrl: GoBusIcon,
  iconSize: [56, 30]
});

const backBus = new Icon({
  iconUrl: BackBusIcon,
  iconSize: [56, 30]
});

const nowPlace = new Icon({
  iconUrl: Location,
  iconSize: [30, 30]
});

const pathColor = { color: '#5D4F6E' };

const Map = ({ direction, busStopOrder, geometry, busDynamicPostionData, setMap }) => {
  const [currentLocation, setCurrentLocation] = useState([]);

  /**
   * 取得公車路線中心點
   */
  let centerLat = 0, centerLon = 0;

  busStopOrder[direction]?.Stops.forEach(item => {
    centerLat += item.StopPosition.PositionLat;
    centerLon += item.StopPosition.PositionLon;
  });
  centerLat /= busStopOrder[direction]?.Stops.length;
  centerLon /= busStopOrder[direction]?.Stops.length;

  const [mapPosition, setMapPosition] = useState([centerLat, centerLon]);

  useEffect(() => {
    getCurrentLocation();
    setMapPosition([centerLat, centerLon]);
  }, [centerLat, centerLon]);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      }
    );
  };

  const renderMap = () => {
    if (!mapPosition[0]) return null;

    return (
      <MapWrapper>
        <MapContainer center={[mapPosition[0], mapPosition[1]]} zoom={14} scrollWheelZoom={false} whenCreated={setMap}>
          <Polyline pathOptions={pathColor} positions={geometry} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            //公車站牌位置
            busStopOrder[direction]?.Stops.map((item, index) => (
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
            //公車位置
            busDynamicPostionData[direction].map(item => (
              <Marker key={item.PlateNumb} position={[item.BusPosition.PositionLat, item.BusPosition.PositionLon]} icon={direction ? backBus : goBus}>
              </Marker>
            ))
          }
          {
            //目前位置
            currentLocation.length > 0 && <Marker position={[currentLocation[0], currentLocation[1]]} icon={nowPlace} />
          }
        </MapContainer>
      </MapWrapper>
    );
  };

  return (
    <Wrapper>
      {renderMap()}
      <ItemCont>
        <Item>
          <Image src={BackBusIcon} width={'45px'} />
          <Text>公車位置</Text>
        </Item>
        <Item>
          <Image src={Location} width={'20px'} />
          <Text>您的位置</Text>
        </Item>
        <Item>
          <Image src={StationIcon} width={'15px'} />
          <Text>公車車牌</Text>
        </Item>
      </ItemCont>
    </Wrapper>
  );
};

export default Map;