module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    var LocationSchema = Schema({
      garageStart: {
          type: Schema.Types.ObjectId,
          ref: 'Garage'
      },
      garageEnd: {
          type: Schema.Types.ObjectId,
          ref: 'Garage'
      },
      car: {
          type: Schema.Types.ObjectId,
          ref: 'Car'
      },
      user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      },
      dateStart: {
        type: Date,
        default: new Date()
      },
      dateEnd: {
        type: Date,
        default: new Date(),
        required: true,
      },
      nbSiteRent: {
        type: Number,
        default: 1
      }
    });

    return mongoose.model('Location', LocationSchema);
};
