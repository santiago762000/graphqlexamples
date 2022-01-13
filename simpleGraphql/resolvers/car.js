//This is the data


const resolvers = {
    Query: {
        cars: (parent, args, {models}) => {
            return models.cars},
        car: (parent, { id }, {models}) => {
            const car = models.cars.filter(car => car.id === id)
            return car[0];
        }
    },
    // CRUD
    Mutation: {
        makeCar: (parent, { id, make, model, color }, {models}) => {
            const car = { id, make, model, color }
            models.cars.push(car);
            return car;
        },
        removeCar: (parent, { id }, {models}) => {
            const count = models.cars.length;
            models.cars = models.cars.filter(obj => {
                return obj.id !== id;
            });
            if (count === models.cars.length) {
                return false;
            }
            return true;
        }
    },
    //Custom Queries
    Car: {
        owner: parent => users[parent.ownedBy - 1]
    }
};

module.exports = resolvers;