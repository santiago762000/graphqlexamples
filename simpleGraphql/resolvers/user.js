const resolvers = {
    Query: {
        users: (parent, args, {models}) => models.users,
        user: (parent, { id }, {models}) => {
            const user = models.users.filter(user => user.id === id)
            return user[0];
        },
        me: (parent, args, {me}) => me
    },
    // CRUD
    Mutation: {
        makeUser: (parent, { id, name }, {models}) => {
            const user = {
                id, name
            }
            models.users.push(user);
            return user;
        },
        removeUser: (parent, { id }, {models}) => {
            const count = models.users.length;
            models.users = models.users.filter(obj => {
                return obj.id !== id;
            });
            if (count === models.users.length) {
                return false;
            }
            return true;
        }
    },
    User: {
        car: (parent, args, {models}) => {
            return parent.car.map(carId => models.cars[carId - 1])
        }
    }
};

module.exports = resolvers;