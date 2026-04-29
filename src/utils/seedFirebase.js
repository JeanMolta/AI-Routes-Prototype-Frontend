import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

const zones = [
  { name: "Bochalema", lat: 3.3542, lng: -76.5230, radius: 400, label: "Iluminación Crítica" },
  { name: "Panamericana", lat: 3.3015, lng: -76.5318, radius: 500, label: "Zona de Hurtos" },
  { name: "Entrada Jamundí", lat: 3.2785, lng: -76.5390, radius: 350, label: "Punto de Control" }
];

export const seedDatabase = async () => {
  try {
    const dangerZonesCol = collection(db, "danger_zones");
    
    for (const zone of zones) {
      const docRef = await addDoc(dangerZonesCol, zone);
      console.log(`Documento agregado con éxito: ${zone.name} con ID: ${docRef.id}`);
    }
    
    console.log("Seeding completado exitosamente.");
  } catch (error) {
    console.error("Error al sembrar la base de datos:", error);
  }
};
