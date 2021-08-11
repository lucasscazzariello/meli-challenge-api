const SEARCH_AMOUNT = process.env.SEARCH_AMOUNT || 4
const FILTER_ID = "category"
const AUTHOR = {
    name: 'Lucas',
    lastname: 'Scazzariello'
}

const filterById = ({ id }) => id === FILTER_ID


// Tomo los datos que necesito y los retorno
const transformList = ({ data }) => {
    if (data.results.length < 1) {
        return []
    }
    const filter = data.filters.find(filterById)

    const categories = filter ? filter.values.map(({ path_from_root }) => {
        return path_from_root
    }).flat() : []

    const items = data.results.splice(0, SEARCH_AMOUNT).map(({ id, title, price, currency_id, thumbnail, condition, shipping, address }) => ({
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

    const resolve = {
        author: AUTHOR,
        categories: categories,
        items: items
    }

    return resolve
}


const transformDetail = ({ detailResponse, descriptionResponse }) => {
    const { id, title, currency_id, price, pictures, condition, sold_quantity, shipping, category_id } = detailResponse.data;
    const { plain_text } = descriptionResponse.data;
    const picture = pictures[0].url;

    return {
        author: AUTHOR,
        item: {
            id: id,
            title: title,
            price: {
                currency: currency_id,
                amount: price,
            },
            picture,
            condition: condition,
            free_shipping: shipping.free_shipping,
            sold_quantity: sold_quantity,
            description: plain_text,
            category_id: category_id,
        }
    }
}

module.exports = {
    transformList,
    transformDetail
}