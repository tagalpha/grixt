module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    var RoleSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            required: true
        }
    });

    return mongoose.model('Role', RoleSchema);
};