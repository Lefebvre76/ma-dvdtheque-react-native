import Director from "./Director";

export default class Movie {
    public id: number = 0;
    public title: string = '';
    public directors: Director[] = [];
}
