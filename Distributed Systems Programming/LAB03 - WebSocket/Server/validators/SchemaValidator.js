'use strict';

/* --------- ERROR MESSAGES --------- */
const ERROR_400 = {code: 400, message: 'Bad request'};

/* --- VALIDATOR MODULES --- */
const Ajv   = require("ajv");
const addFormats = require("ajv-formats")

const validator     = new Ajv({ allErrors: true });
addFormats(validator);

/**
 * Middleware to validate the schema body
 * ------------------------------------------------
 * @param {Object} request HTTP request 
 * @param {Object} response HTTP response
 * @param {Function} next move to the next validation
 */
function schemaHandler (request, response, next) {
    try {
        if (!validator.validate(request.schema, request.body)) {
            return response.status(ERROR_400.code).json(ERROR_400.message);
        }
        next();
    } catch (error) {
        next();
    }
}

module.exports = { schemaHandler };