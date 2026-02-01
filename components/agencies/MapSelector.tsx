'use client';

import { Loader2, MapPin, Search, Smartphone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../common/ui/button';

interface MapSelectorProps {
    latitude: number;
    longitude: number;
    placeName?: string;
    onLocationChange: (lat: number, lng: number, placeName?: string) => void;
}

interface SearchResult {
    lat: string;
    lon: string;
    display_name: string;
}

export default function MapSelector({
    latitude,
    longitude,
    placeName,
    onLocationChange,
}: MapSelectorProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPlace, setSelectedPlace] = useState<string>(placeName || '');
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showMapPicker, setShowMapPicker] = useState<boolean>(false);
    const [latInput, setLatInput] = useState<string>(latitude ? String(latitude) : '');
    const [lngInput, setLngInput] = useState<string>(longitude ? String(longitude) : '');
    const [latError, setLatError] = useState<string>('');
    const [lngError, setLngError] = useState<string>('');
    const [isGeolocationAvailable, setIsGeolocationAvailable] = useState<boolean>(true);
    const [isGeolocating, setIsGeolocating] = useState<boolean>(false);
    const [isFetchingPlace, setIsFetchingPlace] = useState<boolean>(false);

    const fetchPlaceName = async (lat: number, lng: number) => {
        setIsFetchingPlace(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            const place = data.address?.city || data.address?.town || data.address?.village ||
                data.address?.county || data.display_name?.split(',')[0] || 'Unknown Location';
            setSelectedPlace(place);
            return place;
        } catch (error) {
            console.error('Error fetching place name:', error);
            return '';
        } finally {
            setIsFetchingPlace(false);
        }
    };

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
            );
            const data = await response.json();
            setSearchResults(data);
            setShowResults(true);
        } catch (error) {
            console.error('Error searching places:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearchResultSelect = async (result: SearchResult) => {
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);

        if (mapRef.current && markerRef.current) {
            mapRef.current.setView([lat, lon], 15);
            markerRef.current.setLatLng([lat, lon]);

            const place = await fetchPlaceName(lat, lon);
            markerRef.current.setPopupContent(
                `<strong>${place}</strong><br><strong>Lat:</strong> ${lat.toFixed(6)}<br><strong>Lng:</strong> ${lon.toFixed(6)}`
            );
            markerRef.current.openPopup();
            onLocationChange(lat, lon, place);
        }

        setSearchQuery('');
        setShowResults(false);
    };

    const getUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude: lat, longitude: lng } = position.coords;
                    setUserLocation({ lat, lng });
                    // Center map to user location if not already set
                    if ((!latitude || latitude === 0) && (!longitude || longitude === 0)) {
                        if (mapRef.current) {
                            mapRef.current.setView([lat, lng], 13);
                        }
                    }
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        }
    };

    useEffect(() => {
        // Check geolocation availability
        setIsGeolocationAvailable('geolocation' in navigator);

        // keep inputs in sync when props change
        if (typeof latitude === 'number' && !isNaN(latitude)) setLatInput(String(latitude));
        if (typeof longitude === 'number' && !isNaN(longitude)) setLngInput(String(longitude));

        // Get user location first
        if (isGeolocationAvailable) getUserLocation();

        // Load Leaflet CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
            document.head.appendChild(link);
        }

        // Load Leaflet JS
        if (!(window as any).L) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
            script.onload = () => {
                // initialize map only if map container is present and we want the map shown
                if (showMapPicker) initializeMap();
            };
            document.body.appendChild(script);
        } else {
            if (showMapPicker) initializeMap();
        }
    }, []);

    // Initialize map when user toggles to map picker
    useEffect(() => {
        if (!showMapPicker) return;

        // If Leaflet not loaded yet, initializeMap will be called when script loads
        if (!(window as any).L) return;

        // If a previous map instance exists (attached to a removed container), remove it first
        try {
            if (mapRef.current) {
                // remove map and clear refs so initializeMap creates a fresh map bound to current DOM node
                mapRef.current.remove();
                mapRef.current = null;
                markerRef.current = null;
            }
        } catch (err) {
            // ignore
        }

        // Initialize a fresh map bound to the current container
        initializeMap();
    }, [showMapPicker]);

    // validation helpers
    const validateLat = (value: string) => {
        const v = parseFloat(value);
        if (isNaN(v)) return 'Invalid number';
        if (v < -90 || v > 90) return 'Latitude must be between -90 and 90';
        return '';
    };

    const validateLng = (value: string) => {
        const v = parseFloat(value);
        if (isNaN(v)) return 'Invalid number';
        if (v < -180 || v > 180) return 'Longitude must be between -180 and 180';
        return '';
    };

    const useMyLocation = () => {
        if (!('geolocation' in navigator)) {
            setIsGeolocationAvailable(false);
            return;
        }

        setIsGeolocating(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude: lat, longitude: lng } = pos.coords;
                setLatInput(String(lat));
                setLngInput(String(lng));
                setLatError('');
                setLngError('');
                setIsGeolocating(false);
            },
            (err) => {
                console.error('Geolocation failed:', err);
                setIsGeolocating(false);
            }
        );
    };

    // Helper to parse current inputs
    const parseCoordInputs = () => {
        const lat = parseFloat(latInput);
        const lng = parseFloat(lngInput);
        const latValid = !isNaN(lat) && lat >= -90 && lat <= 90;
        const lngValid = !isNaN(lng) && lng >= -180 && lng <= 180;
        return { lat, lng, valid: latValid && lngValid };
    };

    // Debounced sync: when lat/lng inputs change, update marker and map
    const coordDebounceRef = useRef<number | null>(null);
    useEffect(() => {
        if (!showMapPicker) return;

        const latErr = validateLat(latInput);
        const lngErr = validateLng(lngInput);
        setLatError(latErr);
        setLngError(lngErr);
        if (latErr || lngErr) return;

        if (coordDebounceRef.current) {
            window.clearTimeout(coordDebounceRef.current);
            coordDebounceRef.current = null;
        }

        coordDebounceRef.current = window.setTimeout(async () => {
            const { lat, lng, valid } = parseCoordInputs();
            if (!valid) return;

            if (!(window as any).L) return;
            if (!mapRef.current) {
                initializeMap();
                await new Promise((r) => setTimeout(r, 150));
            }

            try {
                if (mapRef.current && markerRef.current) {
                    mapRef.current.setView([lat, lng], 15);
                    markerRef.current.setLatLng([lat, lng]);
                    const place = await fetchPlaceName(lat, lng);
                    markerRef.current.setPopupContent(
                        `<strong>${place}</strong><br><strong>Lat:</strong> ${lat.toFixed(6)}<br><strong>Lng:</strong> ${lng.toFixed(6)}`
                    );
                    markerRef.current.openPopup();
                    onLocationChange(lat, lng, place);
                }
            } catch (err) {
                console.error('Error syncing coords to map', err);
            }
        }, 450) as unknown as number;

        return () => {
            if (coordDebounceRef.current) {
                window.clearTimeout(coordDebounceRef.current);
                coordDebounceRef.current = null;
            }
        };
    }, [latInput, lngInput, showMapPicker]);

    const initializeMap = () => {
        if (!mapContainerRef.current || mapRef.current) return;

        const L = (window as any).L;

        // Marker always starts at input coords (if provided), otherwise props, otherwise user location
        const parsedLat = parseFloat(latInput);
        const parsedLng = parseFloat(lngInput);
        const hasInputCoords = !isNaN(parsedLat) && !isNaN(parsedLng);
        const markerLat = hasInputCoords
            ? parsedLat
            : (typeof latitude === 'number' && latitude !== 0 ? latitude : (userLocation?.lat || 0));
        const markerLng = hasInputCoords
            ? parsedLng
            : (typeof longitude === 'number' && longitude !== 0 ? longitude : (userLocation?.lng || 0));

        // Map center: prioritize user location for better UX
        const centerLat = userLocation?.lat || markerLat || 0;
        const centerLng = userLocation?.lng || markerLng || 0;

        const map = L.map(mapContainerRef.current).setView([centerLat, centerLng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        // Add marker for selected/user location
        const marker = L.marker([markerLat, markerLng]).addTo(map);
        marker.bindPopup(`<strong>Lat:</strong> ${markerLat.toFixed(6)}<br><strong>Lng:</strong> ${markerLng.toFixed(6)}`);
        markerRef.current = marker;

        // Add blue circle for user's current location only if it's different from the marker
        if (userLocation && (markerLat !== userLocation.lat || markerLng !== userLocation.lng)) {
            L.circleMarker([userLocation.lat, userLocation.lng], {
                radius: 8,
                fillColor: '#3b82f6',
                color: '#1e40af',
                weight: 3,
                opacity: 1,
                fillOpacity: 0.8,
            })
                .addTo(map)
                .bindPopup('<strong>Your Current Location</strong>');
        }

        map.on('click', async (e: any) => {
            const { lat, lng } = e.latlng;
            marker.setLatLng([lat, lng]);

            const place = await fetchPlaceName(lat, lng);
            marker.setPopupContent(
                `<strong>${place}</strong><br><strong>Lat:</strong> ${lat.toFixed(6)}<br><strong>Lng:</strong> ${lng.toFixed(6)}`
            );
            onLocationChange(lat, lng, place);
        });

        mapRef.current = map;
        setIsLoading(false);
    }

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin size={16} className="text-indigo-600" />
                Branch Location on Map
            </label>

            {/* Coord inputs or map toggle */}
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">Coordinates</span>
                        <Button
                            loading={isGeolocating}
                            type="button"
                            onClick={useMyLocation}
                            disabled={!isGeolocationAvailable || isGeolocating}
                            title={!isGeolocationAvailable ? 'Geolocation not available in your browser' : isGeolocating ? 'Getting your location...' : 'Use my current location'}
                            className={`flex items-center gap-2 px-2 py-1 text-xs rounded-md ${isGeolocationAvailable && !isGeolocating ? 'bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer' : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                            {!isGeolocating && <Smartphone size={14} />} {isGeolocating ? 'Getting location...' : 'Use my location'}
                        </Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setShowMapPicker(!showMapPicker)}
                            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md"
                        >
                            {showMapPicker ? 'Enter coords manually' : 'Select on map'}
                        </button>
                    </div>
                </div>

                {!showMapPicker ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                        <div className="md:col-span-1">
                            <label className="block text-xs text-gray-600">Latitude</label>
                            <input
                                type="text"
                                placeholder="e.g. -1.292066"
                                value={latInput}
                                onChange={(e) => {
                                    setLatInput(e.target.value);
                                    setLatError(validateLat(e.target.value));
                                }}
                                className={`w-full pl-3 pr-3 py-2 border rounded-lg text-sm focus:outline-none ${latError ? 'border-red-300' : 'border-gray-300'}`}
                            />
                            {latError && <p className="text-xs text-red-500 mt-1">{latError}</p>}
                        </div>

                        <div className="md:col-span-1">
                            <label className="block text-xs text-gray-600">Longitude</label>
                            <input
                                type="text"
                                placeholder="e.g. 36.821946"
                                value={lngInput}
                                onChange={(e) => {
                                    setLngInput(e.target.value);
                                    setLngError(validateLng(e.target.value));
                                }}
                                className={`w-full pl-3 pr-3 py-2 border rounded-lg text-sm focus:outline-none ${lngError ? 'border-red-300' : 'border-gray-300'}`}
                            />
                            {lngError && <p className="text-xs text-red-500 mt-1">{lngError}</p>}
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-gray-600">Use the map to pick a location or switch to manual entry to paste coordinates.</div>
                )}
            </div>

            {/* Search Box */}
            <div className="relative z-100">
                <div className="relative flex items-center">
                    <Search size={18} className="absolute left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for a place..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value);
                        }}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSearchResults([]);
                                setShowResults(false);
                            }}
                            className="absolute right-3 text-gray-400 hover:text-gray-600"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                {/* Search Results Dropdown */}
                {showResults && searchResults.length > 0 && (
                    <div className="top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-2xl 
          max-h-48 overflow-y-auto z-50">
                        {searchResults.map((result, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSearchResultSelect(result)}
                                className="w-full text-left px-4 py-2 hover:bg-indigo-50 border-b border-gray-100 last:border-b-0 transition-colors"
                            >
                                <p className="text-sm font-medium text-gray-900">{result.display_name.split(',')[0]}</p>
                                <p className="text-xs text-gray-500">{result.display_name}</p>
                            </button>
                        ))}
                    </div>
                )}

                {isSearching && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-2xl z-50 p-4 text-center">
                        <p className="text-sm text-gray-600">Searching...</p>
                    </div>
                )}
            </div>

            {/* Map Container (conditionally shown) */}
            {showMapPicker && (
                <div className="relative rounded-lg overflow-hidden border border-gray-300 h-96 bg-gray-100">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                            <div className="text-center">
                                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-2"></div>
                                <p className="text-sm text-gray-600">Loading map...</p>
                            </div>
                        </div>
                    )}
                    <div ref={mapContainerRef} className="w-full h-full" />
                </div>
            )}

            {selectedPlace && (
                        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center gap-3">
                            <p className="text-sm text-gray-700 flex items-center gap-2">
                                <span className="font-medium">Selected Location:</span>
                                {isFetchingPlace ? (
                                    <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                                ) : null}
                                <span>{selectedPlace}</span>
                            </p>
                        </div>
            )}

            <p className="text-xs text-gray-500">
                Click on the map or use search to select a location. <span className="text-blue-600 font-medium">Blue circle</span> shows your current location. Current coordinates: <strong>{(latitude || 0).toFixed(6)}, {(longitude || 0).toFixed(6)}</strong>
            </p>
        </div>
    );
}

