const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filter = {};

    if (query) {
      if (query === 'available') filter.status = true;
      else filter.category = query;
    }

    let sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    else if (sort === 'desc') sortOption.price = -1;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption
    };

    const mongoosePaginate = require('mongoose-paginate-v2');
    if (!Product.schema.plugins.find(p => p.fn === mongoosePaginate)) {
      Product.schema.plugin(mongoosePaginate);
    }

    const result = await Product.paginate(filter, options);

    const buildLink = (p) => p ? `/api/products?limit=${limit}&page=${p}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;

    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: buildLink(result.prevPage),
      nextLink: buildLink(result.nextPage)
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

module.exports = router;