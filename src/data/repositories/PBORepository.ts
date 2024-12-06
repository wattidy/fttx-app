
import pboZones from '../json/pbo_zones.json';

export class PBORepository {
    getZones() {
        return pboZones;
    }

    getZoneById(zoneId: string) {
        return pboZones.find((zone: any) => zone.id === zoneId);
    }
}
