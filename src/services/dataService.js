import dbData from '../data/db.json';

/**
 * Simulates an asynchronous data fetch from a backend API.
 * Returns the safety data (danger zones and safe route).
 */
export const getSafetyData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dbData);
    }, 500); // 500ms artificial latency
  });
};
