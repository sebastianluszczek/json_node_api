const search_combinations = (movies, search_genres) => {
    const combinations = new Array(1 << search_genres.length).fill().map(
        (e1, i) => search_genres.filter((e2, j) => i & 1 << j))
        .filter(a => a.length > 0)
        .sort((a, b) => b.length - a.length);

    const searched = []
    for (let n of combinations) {
        const searched_comb = movies.filter(movie => n.every(item => movie.genres.includes(item)))
        searched_comb.forEach(movie => {
            if (!searched.includes(movie)) {
                searched.push(movie);
            }
        })
    }
    return searched;
}

const search_algorithm = (movies, search_genres, duration) => {

    let searched;
    if (duration) {
        const duration_movies = movies.filter(movie => {
            return (parseInt(movie.runtime) >= duration - 10 && parseInt(movie.runtime) <= duration + 10)
        })
        if (search_genres && search_genres.length > 0) {
            // Duration & genres 
            // - return all films in spec. duration (+/- 10 min) that contain specific genres
            searched = search_combinations(duration_movies, search_genres);
        } else {
            // Only duration
            // - return all films in spec. duration (+/- 10 min) 
            searched = duration_movies;
        }
    } else {
        if (search_genres && search_genres.length > 0) {
            // Only genres
            // - return all movies containing specific genres
            searched = search_combinations(movies, search_genres);
        } else {
            // Without duration & genres
            // - return one random movie
            searched = [movies[Math.floor(Math.random() * movies.length)]];
        }
    }
    return searched;
}

module.exports = search_algorithm;

