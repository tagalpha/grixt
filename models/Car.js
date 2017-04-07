module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    var CarSchema = Schema({
        model: {
            type: Schema.Types.ObjectId,
            ref: 'Model'
        },
        renters: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    });

    return mongoose.model('Car', CarSchema);
};