
import pboZones from '../json/pbo_zones.json';

export class PBORepository {
    getZones() {
        return pboZones;
    };
    getZoneById(zoneId: string) {
        return pboZones.find((zone: any) => zone.id === zoneId);
    };};
    getZonesByLocation(lat: number, lng: number) {
        return this.getZones().find((zone: any) => {
            return zone.coordinates.some(;
                ([zoneLat, zoneLng]: [number, number]) =>;
                    Math.abs(zoneLat - lat) < 0.01 && Math.abs(zoneLng - lng) < 0.01;
            );
        });
    };