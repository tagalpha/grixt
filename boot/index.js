const sha1 = require('sha1');

module.exports = (api) => {
    const Role = api.models.Role;
    const roles = api.settings.acl.roles;

    const Garage = api.models.Garage;
    const Model = api.models.Model;
    const Car = api.models.Car;

    const User = api.models.User;
    const root = api.settings.acl.root;

    loadRoles()
        .then(loadUser)
        .then(loadGarage)
        .then(loadModel)
        .then(loadCar);

    function loadRoles() {
        var batch = [];

        for (var role of roles) {
            var promise = Role.findOne({
                name: role.name
            })
                .then(ensureOne)
                .catch(create);

            batch.push(promise);

            function ensureOne(found) {
                return (found) ? found : Promise.reject(role);
            }

            function create() {
                console.log('Creating role: ', role);
                new Role(role)
                    .save()
                    .then(() => {
                    console.log('created.');
            });
        }
    }

    return Promise.all(batch);
}

    function loadUser() {
       return User.find()
            .then(ensureOne)
            .catch(create);

        function ensureOne(users) {
            return (users && users.length > 0) ? true : Promise.reject();
        }

        function create() {
            Role.findOne({
                name: "root"
            })
                .then(createUser);

            function createUser(role) {
                var user = new User(root);
                user.password = sha1(user.password);
                user.role = role._id.toString();
                return user.save();
            }
        }
    }

    function loadGarage() {
       return Garage.find()
            .then(ensureOne)
            .catch(create);

        function ensureOne(data) {
            return (data && data.length > 0) ? true : Promise.reject();
        }

        function create() {
            let garage = new Garage();
            garage.nbPlace = 10;
            garage.longitude = '4,2979';
            garage.latitude = '11,1691';
            return garage.save();
        }
    }

    function loadModel() {
        return Model.find()
            .then(ensureOne)
            .catch(create);

        function ensureOne(data) {
            return (data && data.length > 0) ? true : Promise.reject();
        }

        function create() {
            let model = new Model();
            model.name = "Peugeot";
            model.year = '2016';
            model.seat = 5;
            return model.save();
        }
    }

    function loadCar() {
        return Car.find()
            .then(ensureOne)
            .catch(create);

        function ensureOne(cars) {
            return (cars && cars.length > 0) ? true : Promise.reject();
        }

        function create() {
            Model.findOne({
                name: "Peugeot"
            })
                .then(createCar);

            function createCar(model) {
                let car = new Car();
                car.model = model._id.toString();
                car.renters = [];
                return car.save();
            }
        }
    }
};
