import Director from "./Director";

export default class Movie {
    public id: number = 0;
    public title: string = '';
    public poster: string = '';
    public directors: Director[] = [];

    public directorsName(): string {
        return this.directors.map((director: any) => { return director.name }).join(', ');
    }

    static parsing(json: any) {
        let result: Movie = Object.assign(new Movie, json);
        result.directors = json.directors.map((json: any) => {return Object.assign(new Director, json)});
        return result;
    }
}
