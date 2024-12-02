'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GeoLocation } from '@/types/geo.types';
import * as turf from '@turf/turf';

mapboxgl.accessToken =
	'pk.eyJ1IjoiZGV2ZWxvb3BwZXIiLCJhIjoiY2t4aXpoNDJqMzdiaDJ1bzFpOXUzdnVuZCJ9.XHjgHN796_6zo7_NnN0rQw';

interface MapboxMapProps {
	lat?: number;
	lng?: number;
	radius?: number;
	onCoordinatesChange?: (geoLocation: GeoLocation) => void;
}

const MapboxMap: React.FC<MapboxMapProps> = ({
	lat = 33.5731,
	lng = -7.5898,
	radius = 0,
	onCoordinatesChange,
}) => {
	const [isMapLoaded, setIsMapLoaded] = useState(false);
	const mapContainerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<mapboxgl.Map | null>(null);
	const markerRef = useRef<mapboxgl.Marker | null>(null);
	const [centerCoords, setCenterCoords] = useState({ lat, lng });

	// Helper function to update the circle
	const updateCircle = (map: mapboxgl.Map, center: [number, number], radius: number) => {
		const circle = turf.circle(center, radius, {
			steps: 64,
			units: 'kilometers',
		});

		if (map.getSource('circle')) {
			const source = map.getSource('circle') as mapboxgl.GeoJSONSource;
			source.setData(circle);
		} else {
			map.addSource('circle', {
				type: 'geojson',
				data: circle,
			});

			map.addLayer({
				id: 'circle-layer',
				type: 'fill',
				source: 'circle',
				paint: {
					'fill-color': '#3A5E8C',
					'fill-opacity': 0.4,
				},
			});
		}
	};

	// Initialize the map only once
	useEffect(() => {
		if (!mapContainerRef.current || mapRef.current) return;

		const initialCoords = { lat, lng };

		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [initialCoords.lng, initialCoords.lat],
			zoom: 12,
		});

		mapRef.current = map;

		map.on('load', () => {
			setIsMapLoaded(true);
		});

		map.on('style.load', () => {
			setIsMapLoaded(true);
		});

		// Add a marker when the radius is 0
		if (radius === 0) {
			const marker = new mapboxgl.Marker({
				draggable: true,
			})
				.setLngLat([initialCoords.lng, initialCoords.lat])
				.addTo(map);

			markerRef.current = marker;

			// Handle map click to update marker and circle
			const handleMapClick = (event: any) => {
				if (!onCoordinatesChange) return;
				const { lng, lat } = event.lngLat;
				marker.setLngLat([lng, lat]); // Move the marker
				setCenterCoords({ lat, lng });
				onCoordinatesChange({ lat, lng });
			};

			map.on('click', handleMapClick);

			// Handle marker drag to update coordinates
			marker.on('dragend', () => {
				if (!onCoordinatesChange) return;
				const { lat, lng } = marker.getLngLat();
				setCenterCoords({ lat, lng });
				onCoordinatesChange({ lat, lng });
			});
		}
	}, [lat, lng, radius, onCoordinatesChange]);

	// Update the circle layer and remove marker when radius changes
	useEffect(() => {
		const map = mapRef.current;

		if (!isMapLoaded || !map) return;

		if (radius > 0) {
			// Remove the marker if it exists when radius is greater than 0
			if (markerRef.current) {
				markerRef.current.remove();
				markerRef.current = null;
			}

			// Update or add the circle
			updateCircle(map, [centerCoords.lng, centerCoords.lat], radius);

			// Handle map click to move the circle
			const handleMapClick = (event: any) => {
				const { lng, lat } = event.lngLat;
				setCenterCoords({ lat, lng });
				if (onCoordinatesChange) {
					onCoordinatesChange({ lat, lng });
				}
			};

			map.on('click', handleMapClick);
		} else {
			// If the radius is 0, add the marker back
			if (!markerRef.current) {
				const marker = new mapboxgl.Marker({
					draggable: true,
				})
					.setLngLat([lng, lat])
					.addTo(map);

				markerRef.current = marker;

				marker.on('dragend', () => {
					if (!onCoordinatesChange) return;
					const { lat, lng } = marker.getLngLat();
					setCenterCoords({ lat, lng });
					onCoordinatesChange({ lat, lng });
				});
			}
		}

		// Cleanup on unmount
		return () => {
			if (map.getSource('circle')) {
				map.removeLayer('circle-layer');
				map.removeSource('circle');
			}
		};
	}, [radius, centerCoords, isMapLoaded, onCoordinatesChange]);

	return <div ref={mapContainerRef} className='h-72 w-full rounded-md' />;
};

export default MapboxMap;
