const router = require('express').Router();

module.exports = (api) => {

    router.get('/', api.actions.locations.list);

    router.get('/:id', api.actions.locations.show);

    return router;
};
