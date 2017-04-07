module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let ModelSchema = Schema({
        name: {
            type: String,
            default: 'unknown'
        },
        year: {
            type: String
        },
        seat: {
            type: Number
        }
    });

    return mongoose.model('Model', ModelSchema);
};