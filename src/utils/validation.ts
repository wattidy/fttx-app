import { Coordinates } from '../domain/models/PBOZone';

export const isValidCoordinate = (coordinate: Coordinates): boolean => {
  return (
    coordinate.latitude >= -90 &&
    coordinate.latitude <= 90 &&
    coordinate.longitude >= -180 &&
    coordinate.longitude <= 180
  );
};

export const isValidPolygon = (coordinates: Coordinates[]): boolean => {
  if (coordinates.length < 3) return false;
  
  return coordinates.every(isValidCoordinate) &&
         coordinates[0].latitude === coordinates[coordinates.length - 1].latitude &&
         coordinates[0].longitude === coordinates[coordinates.length - 1].longitude;
};