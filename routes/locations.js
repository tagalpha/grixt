const router = require('express').Router();

module.exports = (api) => {

    router.get('/', api.actions.locations.list);

    router.get('/:id', api.actions.locations.show);

    router.post('/',
        api.middlewares.isAuthenticated,
        api.middlewares.bodyParser.json(),
        api.actions.models.create);

    return router;
};
