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

module.exports = search_combinations;

