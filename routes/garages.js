const router = require('express').Router();

module.exports = (api) => {

    router.get('/', api.actions.garages.list);

    router.get('/:id', api.actions.garages.show);

    router.post('/',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure("admin"),
        api.middlewares.bodyParser.json(),
        api.actions.garages.create);

    router.put('/:id',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure("admin"),
        api.middlewares.bodyParser.json(),
        api.actions.garages.update);

    router.delete('/:id',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure("admin"),
        api.actions.garages.remove);

    return router;
};
