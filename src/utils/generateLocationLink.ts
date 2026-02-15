import { Capacitor } from "@capacitor/core";

export const generateLocationLink = (lat: number, lng: number, name: string) => {
  if (Number.isNaN(lat) || Number.isNaN(lng)) return;

  const label = encodeURIComponent(name || 'Venue');
  const platform = Capacitor.getPlatform();

  const googleMapsAppUrl = `comgooglemaps://?q=${lat},${lng}&center=${lat},${lng}&zoom=16`;
  const appleMapsUrl = `maps://?q=${lat},${lng}`;
  const androidGeoUrl = `geo:${lat},${lng}?q=${lat},${lng}(${label})`;

  let url = '';

  if (platform === 'ios') {
    const useGoogleMaps = window.confirm('¿Abrir en Google Maps?');
    if (useGoogleMaps) {
      url = googleMapsAppUrl
      return;
    }

    url = appleMapsUrl;
    return;
  }

  if (platform === 'android') {
    url = androidGeoUrl;
    return;
  }

  return url
}