import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { GeoJsonObject, Feature } from 'geojson';
import { Layer, LatLngExpression } from 'leaflet';

// Dynamically import without SSR (Leaflet requires the DOM)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import('react-leaflet').then(mod => mod.GeoJSON), { ssr: false });

interface IrelandMapProps {
  geojsonData: GeoJsonObject;
  onCountyClick: (county: string) => void;
}

const center: LatLngExpression = [53.4, -7.6];

const IrelandMap = ({ geojsonData, onCountyClick }: IrelandMapProps) => {
  const geoJsonOptions = {
    onEachFeature: (feature: Feature, layer: Layer) => {
      layer.on({
        click: () => onCountyClick(feature.properties?.name),
      });
      layer.bindPopup(feature.properties?.name);
    }
  };

  return (
    <MapContainer center={center} zoom={7} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON data={geojsonData} {...geoJsonOptions} />
    </MapContainer>
  );
};

export default IrelandMap;
