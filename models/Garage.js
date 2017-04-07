module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    var GarageSchema = Schema({
        nbPlace: {
            type: Number,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
        latitude: {
          type: String,
          required: true
        }
    });

    return mongoose.model('Garage', GarageSchema);
};
