const router = require('express').Router();

module.exports = (api) => {

    router.get('/', api.actions.locations.list);

    router.get('/:id', api.actions.locations.show);

    router.post('/',
        api.middlewares.isAuthenticated,
        api.middlewares.bodyParser.json(),
        api.middlewares.ensureFields(['car', 'user', 'garageEnd', 'dateEnd']),
        api.actions.locations.create
    );

    return router;
};
