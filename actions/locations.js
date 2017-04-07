module.exports = (api) => {
    const Location = api.models.Location;
    const Garage = api.models.Garage;
    const Car = api.models.Car;

    function create(req, res, next) {
        return Location.findOne({
            car: req.body.car
        })
            .then(ensureNone)
            .then(checkSeat)
            .then(checkPlaceEndDispo)
            .then(locate)
            .catch(res.prepare(404));

        function ensureNone(data) {
            if(!data) {
                return new Location(req.body);
            }

            return data ;
        }

        function checkSeat(location) {
            //TODO get all location
            let car = Car.findById(location.car);
            if(location.nbSeatRent === car.model.seat) {
                return Promise.reject();
            }

            return location;
        }

        function checkPlaceEndDispo(location) {
            return Garage.findById(req.body.garage)
                .then(ensureOne)
                .then(checkDispo)
                .catch(res.prepare(404));

            function ensureOne(data) {
                return (data) ? data : Promise.reject()
            }

            function checkDispo(garage) {
                let nbCars = Car.find({
                    garage: req.body.garage
                }).length();

                return (garage.nbPlace - nbCars > 0) ? location : Promise.reject();
            }
        }

        function locate(location) {
            location.save();
            res.prepare(204);
        }
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
