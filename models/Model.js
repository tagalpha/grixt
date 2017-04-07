module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    var ModelSchema = Schema({
        name: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        seat: {
            type: Number,
            required: true
        }
    });

    return mongoose.model('Model', ModelSchema);
};
