const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
let users = require('./data').users;
let cars = require('./data').cars;
const me = users[0];


// This is the template (it is not JSON)
// These types should go according to the data structure
const typeDefs = gql`
    type Query {
        users : [User]
        user(id: Int!): User
        cars: [Car]
        car(id: Int!):Car
        me: User
    }

    type Mutation {
        makeUser(id: Int!, name: String!): User!
        removeUser(id: Int!): Boolean
        
        makeCar(id: Int!, make:String!, model:String!, color:String!):Car!
        removeCar(id: Int!): Boolean
    }

    type User {
        id: ID!
        name: String!,
        car: [Car]
    }

    type Car {
        id: ID!
        make: String!
        model: String!
        color: String!
        owner: User!
    }
`;

//This is the data
const resolvers = {
    Query: {
        users: () => users,
        user: (parent, { id }) => {
            const user = users.filter(user => user.id === id)
            return user[0];
        },
        cars: () => cars,
        car: (parent, { id }) => {
            const car = cars.filter(car => car.id === id)
            return car[0];
        },
        me: () => me
    },
    // CRUD
    Mutation: {
        makeUser: (parent, { id, name }) => {
            const user = {
                id, name
            }
            users.push(user);
            return user;
        },
        removeUser: (parent, { id }) => {
            const count=users.length;
            users = users.filter( obj => {
                return obj.id !== id;
            });
            if(count===users.length){
                return false;
            }
            return true;
        },
        makeCar: (parent, {id, make, model, color})=>{
            const car = {id, make, model, color}
            cars.push(car);
            return car;
        },
        removeCar: (parent, {id}) =>{
            const count=cars.length;
            cars = cars.filter( obj => {
                return obj.id !== id;
            });
            if(count===cars.length){
                return false;
            }
            return true;
        }
        
    },
    //Custom Queries
    Car: {
        owner: parent => users[parent.ownedBy - 1]
    },
    User: {
        car: parent => {
            return parent.car.map(carId => cars[carId - 1])
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();

app.listen(3000, function () {
    console.log(`server running on port 3000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});
