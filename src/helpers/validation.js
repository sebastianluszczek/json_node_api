const Joi = require('@hapi/joi');

const filmValidator = (data, genres) => {
    const schema = Joi.object({
        title: Joi.string()
            .min(2)
            .max(255)
            .required(),
        year: Joi.number()
            .required(),
        runtime: Joi.number()
            .required(),
        genres: Joi.array()
            .items(
                Joi.string()
                    .valid(...genres)
            ),
        director: Joi.string()
            .min(2)
            .max(255)
            .required(),
        actors: Joi.string()
            .min(2)
            .max(255),
        plot: Joi.string()
            .min(2)
            .max(255),
        posterUrl: Joi.string()
            .min(2)
            .max(255)
    });

    return schema.validate(data);
}

const searchValidator = (data, genres) => {
    const schema = Joi.object({
        duration: Joi.number(),
        genres: Joi.array()
            .items(
                Joi.string()
                    .valid(...genres)
            )
    });

    return schema.validate(data);
}

module.exports = {
    filmValidator,
    searchValidator
};