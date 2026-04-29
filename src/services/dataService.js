import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Fetches safety data (danger zones) from Firestore.
 * safeRoute is left empty for now as requested.
 */
export const getSafetyData = async () => {
  try {
    const dangerZonesCol = collection(db, "danger_zones");
    const dangerZonesSnapshot = await getDocs(dangerZonesCol);
    const dangerZonesList = dangerZonesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      dangerZones: dangerZonesList,
      safeRoute: []
    };
  } catch (error) {
    console.error("Error fetching danger zones from Firestore:", error);
    return {
      dangerZones: [],
      safeRoute: []
    };
  }
};

/**
 * Fetches real route from OSRM API
 */
export const getOSRMRoute = async (origin, destination) => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.routes && data.routes.length > 0) {
      // OSRM returns [lng, lat], we must map to [lat, lng] for Leaflet
      return data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
    }
    return [];
  } catch (error) {
    console.error("Error fetching OSRM route:", error);
    return [];
  }
};
