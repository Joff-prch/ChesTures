export class Photox {
    photo;
    id;
    constructor(url, id) {
        this.photo = url;
        this.id = id;
    }

    static randID = function () {
        let id = Date.now();
        return id;
    }
}