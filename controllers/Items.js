"use strict";

const { transformList, transformDetail } = require('../utils/transform')
const axios = require("axios");
const BASE_URL = process.env.BASE_URL || 'https://api.mercadolibre.com/'
const ERROR_MESSAGE = process.env.ERROR_MESSAGE || 'Ocurrió un error inesperado'

const getItems = async (req, res, next) => {
    try {
        const response = await axios.get(`${BASE_URL}sites/MLA/search`, {
            params: {
                q: req.query.search
            }
        })

        res.status(200).json({
            message: ('OK'),
            data: transformList(response)
        });
    } catch (err) {
        res.status(err.response.status).send(ERROR_MESSAGE);
    }
}

const getItemById = async (req, res) => {
    try {
        const itemId = req.params.id
        const [detailResponse, descriptionResponse] = await Promise.all([axios.get(`${BASE_URL}items/${itemId}`), axios.get(`${BASE_URL}items/${itemId}/description`)])
        let response = transformDetail({ detailResponse, descriptionResponse })
        
        const { category_id } = detailResponse.data
        const categoryResponse = await axios.get(`${BASE_URL}categories/${category_id}`)
        const { path_from_root } = categoryResponse.data
        response.categories = path_from_root || []

        res.status(200).json({
            message: ('OK'),
            data: response
        });
    } catch (err) {
        res.status(err.response.status).send(ERROR_MESSAGE);
    }
}

module.exports = {
    getItems,
    getItemById
}