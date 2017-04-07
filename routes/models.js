const router = require('express').Router();

module.exports = (api) => {

    router.get('/', api.actions.models.list);

    router.get('/:id', api.actions.models.show);

    router.post('/',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure("admin"),
        api.middlewares.bodyParser.json(),
        api.actions.models.create);

    return router;
};
