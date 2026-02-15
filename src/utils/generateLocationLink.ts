import { Capacitor } from "@capacitor/core";

export const generateLocationLink = (lat: number, lng: number, name: string) => {
  if (Number.isNaN(lat) || Number.isNaN(lng)) return;

  const label = encodeURIComponent(name || 'Venue');
  const platform = Capacitor.getPlatform();

  const googleMapsAppUrl = `comgooglemaps://?q=${lat},${lng}&center=${lat},${lng}&zoom=16`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const appleMapsUrl = `maps://?q=${lat},${lng}`;
  const androidGeoUrl = `geo:${lat},${lng}?q=${lat},${lng}(${label})`;

  if (platform === 'ios') {
    const useGoogleMaps = window.confirm('¿Abrir en Google Maps?');
    if (useGoogleMaps) {
      return googleMapsAppUrl
    }

    return appleMapsUrl;
  }

  if (platform === 'android') {
    return androidGeoUrl;
  }

  return googleMapsUrl;
}