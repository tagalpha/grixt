module.exports = (api) => {
    const Location = api.models.Location;

    function create(req, res, next) {
        var location = new Location(req.body);
        location.save()
            .then(res.prepare(201))
            .catch(res.prepare(500));
    }

    function list(req, res, next) {
        Location.find()
            .then(res.prepare(200))
            .then(res.prepare(500));
    }

    function show(req, res, next) {
        Location.findById(req.params.id)
            .then(res.prepare(200))
            .catch(res.prepare(500));
    }

    function update(req, res, next) {
        Location.findByIdAndUpdate(req.params.id, req.body)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function remove(req, res, next) {
        Location.findByIdAndRemove(req.params.id)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    return {
        create,
        list,
        show,
        update,
        remove
    };
};
