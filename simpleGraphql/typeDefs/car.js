const { gql } = require('apollo-server-express');

// This is the template (it is not JSON)
// These types should go according to the data structure
module.exports = gql`
    extend type Query {
        cars: [Car]
        car(id: Int!):Car
    }

    extend type Mutation {
        makeCar(id: Int!, make:String!, model:String!, color:String!):Car!
        removeCar(id: Int!): Boolean
    }

    type Car {
        id: ID!
        make: String!
        model: String!
        color: String!
        owner: User!
    }
`;