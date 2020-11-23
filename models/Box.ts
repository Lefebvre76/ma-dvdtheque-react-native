import Movie from "./Movie";

export default class Box {
    public id: number = 0;
    public name: string = '';
    public bar_code: string = '';
    public format: string = '';
    public edition: string = '';
    public editor: string = '';
    public cover: string = '';

    public movies: Movie[] = [];

    static parsing(json: any) {
        let result: Box = Object.assign(new Box, json);
        result.movies = json.movies.map((json: any) => {return Movie.parsing(json)});
        return result;
    }
}
