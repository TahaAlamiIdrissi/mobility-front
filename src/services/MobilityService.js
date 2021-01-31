import axios from "axios";

export class MobilityService {

    getMobilities(path) {
        return axios.get(path);
    }
    addMobility(path, mobility) {
        return axios.post(path, mobility);
    }
    getMobility(path) {
        return axios.get(path);
    }
    removeMobility(path) {
        return axios.delete(path);
    }
    validateMobility(path) {
        return axios.post(path);
    }
}

export default new MobilityService();