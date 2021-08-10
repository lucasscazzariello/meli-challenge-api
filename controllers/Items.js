"use strict";
const axios = require("axios");
const BASE_URL = process.env.BASE_URL || 'https://api.mercadolibre.com/'
const ERROR_MESSAGE = process.env.ERROR_MESSAGE || 'Ocurrió un error inesperado'
const SEARCH_AMOUNT = process.env.SEARCH_AMOUNT || 4
const AUTHOR = {
    name: 'Lucas',
    lastname: 'Scazzariello'
}

const items = {}

items.getItems = async (req, res, next) => {
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

items.getItemById = async () => {
    console.log('casa')
}


// Tomo los datos que necesito y los retorno
const transformList = ({ data }) => {
    if (data.results.length < 1) {
        return []
    }
    let categories = data.filters.find(item => item.id === 'category').values.map(({ path_from_root }) => {
        return path_from_root
    }).flat()

    const items = data.results.splice(0, SEARCH_AMOUNT).map(({ id, title, price, currency_id, thumbnail, condition, shipping, address, category_id }) => ({
        id,
        title,
        price: {
            currency: currency_id,
            amount: price,
        },
        picture: thumbnail,
        condition: condition,
        free_shipping: shipping?.free_shipping,
        state_name: address?.state_name
    }))

    let resolve = {
        author: AUTHOR,
        categories: categories,
        items: items
    }

    return resolve
}

module.exports = items;