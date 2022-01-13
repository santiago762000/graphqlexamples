let users = [{
    id: 1,
    name: "John",
    car:[1,2]
},
{
    id: 2,
    name: "Mike",
    car:[3]
},
{
    id: 3,
    name: "Mary",
    car:[1]
}
];

let cars=[
    {
        id:1,
        make : "Toyota",
        model : "Tarago",
        color : "White",
        ownedBy: 1
    },
    {
        id:2,
        make : "BMW",
        model : "Sedan",
        color : "Blue",
        ownedBy: 1
    },
    {
        id:3,
        make : "AUDI",
        model : "Zuco",
        color : "Black",
        ownedBy: 3
    }
    ];

module.exports = {
    users,
    cars
}