'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GeoLocation } from '@/types/general.types';

mapboxgl.accessToken =
	'pk.eyJ1IjoiZGV2ZWxvb3BwZXIiLCJhIjoiY2t4aXpoNDJqMzdiaDJ1bzFpOXUzdnVuZCJ9.XHjgHN796_6zo7_NnN0rQw';

interface MapboxMapProps {
	lat: number;
	lng: number;
	onCoordinatesChange?: (geoLocation: GeoLocation) => void;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ onCoordinatesChange }) => {
	const mapContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!mapContainerRef.current) return;

		const casablancaCoords = { lat: 33.5731, lng: -7.5898 };

		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [casablancaCoords.lng, casablancaCoords.lat],
			zoom: 12,
		});

		const marker = new mapboxgl.Marker({
			draggable: true,
		})
			.setLngLat([casablancaCoords.lng, casablancaCoords.lat])
			.addTo(map);

		const handleMapClick = (event: any) => {
			const { lng, lat } = event.lngLat;
			marker.setLngLat([lng, lat]);
			onCoordinatesChange?.({ lat, lng });
		};

		map.on('click', handleMapClick);

		marker.on('dragend', () => {
			const { lat, lng } = marker.getLngLat();
			onCoordinatesChange?.({ lat, lng });
		});

		return () => {
			map.off('click', handleMapClick);
			map.remove();
		};
	}, [onCoordinatesChange]);

	return (
		<div ref={mapContainerRef} style={{ height: '400px', width: '100%' }} />
	);
};
export default MapboxMap;
