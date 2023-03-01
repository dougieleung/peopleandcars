import { gql } from 'apollo-server'
import { find, remove, filter } from 'lodash'
import { User } from '../models/user';

const people = [
    {
        personId: '604a9719-9f2b-427e-bd70-3d9034b84a37',
        firstName: 'Doug',
        lastName: 'Leung',
        cars: []
    },
    {
        personId: '139d9986-de63-4ee3-852b-3a9f52314d31',
        firstName: 'Melanie',
        lastName: 'Leung',
        cars: []
    },
    {
        personId: '3860d811-15de-4d0f-ada5-046cc7f225e4',
        firstName: 'Grace',
        lastName: 'Leung',
        cars: []
    }
]

const cars = [
    {
        personId: '604a9719-9f2b-427e-bd70-3d9034b84a37',
        carId: '9b1d4c1e-510f-4ad4-985f-60beb52e6931',
        year: '2010',
        make: 'Volkswagen',
        model: 'Golf',
        price: '10050.50'
    },
    {
        personId: '604a9719-9f2b-427e-bd70-3d9034b84a37',
        carId: '37d592c6-57f4-499d-9704-3213c522253f',
        year: '2020',
        make: 'Ford',
        model: 'Fiesta',
        price: '15030.50'
    },
    {
        personId: '604a9719-9f2b-427e-bd70-3d9034b84a37',
        carId: '1d0ead7e-0fdc-4976-8256-428e09e84f4b',
        year: '2017',
        make: 'Mercedes',
        model: 'C-Class',
        price: '65050.50'
    },
    {
        personId: '139d9986-de63-4ee3-852b-3a9f52314d31',
        carId: '4ffdadbc-cab8-42e7-9362-f98e8ed1760b',
        year: '2015',
        make: 'Volkswagen',
        model: 'Jetta',
        price: '10050.50'
    },
    {
        personId: '139d9986-de63-4ee3-852b-3a9f52314d31',
        carId: 'c74dcda8-4e91-4ea4-9f82-82be895707f8',
        year: '2018',
        make: 'Ford',
        model: 'Echo',
        price: '15030.50'
    },
    {
        personId: '139d9986-de63-4ee3-852b-3a9f52314d31',
        carId: 'a9be1872-af68-48d3-95a6-e4d48bf51a50',
        year: '2021',
        make: 'Mercedes',
        model: 'B-Class',
        price: '65050.50'
    }, 
    {
        personId: '3860d811-15de-4d0f-ada5-046cc7f225e4',
        carId: '28e82f0d-b7ec-49ce-9358-a3790ce2242a',
        year: '2018',
        make: 'Tesla',
        model: 'SUV',
        price: '120050.50'
    },
    {
        personId: '3860d811-15de-4d0f-ada5-046cc7f225e4',
        carId: '5507c584-229b-4101-8ff0-7d669bfd325e',
        year: '2014',
        make: 'Nissan',
        model: 'Leaf',
        price: '15030.50'
    },
    {
        personId: '3860d811-15de-4d0f-ada5-046cc7f225e4',
        carId: '12b362e8-55c5-45b7-b91f-bfc650edfd01',
        year: '2007',
        make: 'Toyota',
        model: 'Camry',
        price: '2200.23'
    }
]

     
const typeDefs = gql`
    type Person {
        personId: ID!
        firstName: String!
        lastName: String!
        cars: [Car]
    }

    type Car {
        personId: ID!
        carId: ID!
        year: String!
        make: String!
        model: String!
        price: String!
    }

    type Query {
        people: [Person]
        person(personId: ID!): Person
        cars: [Car]
    }

    type Mutation {
            addPerson(personId: ID!, firstName: String!, lastName: String!): Person
            updatePerson(personId: ID!, firstName: String!, lastName: String!): Person
            removePerson(personId: ID!): Person
            addCar(personId: ID!, carId: ID!, year: String!, make: String!, model: String!, price: String!): Car
            updateCar(personId: ID!, carId: ID!, year: String, make: String, model: String, price: String): Car
            removeCar(personId: ID!, carId: ID!): Car
            removeCars(personId: ID!): [Car]
    }
`

const resolvers = {
    Query: {
        people: () => people,
        person(parent, args, context, info) {
            return find(people, { personId: args.personId })
        },

        cars: () => cars
    },
    Person: {
        cars: (person) => {
            return cars.filter((car) => car.personId === person.personId)
        }
    },
    Mutation: {
        addPerson(parent, args, context, info) {
            const newPerson = {
                personId: args.personId,
                firstName: args.firstName,
                lastName: args.lastName
            }
            people.push(newPerson) //make note of this.

            return {...newPerson, cars: []}
        },
        updatePerson(root, args) {
            const person = find(people, { personId: args.personId })

            if(!person) {
                throw new Error(`Person with id ${args.personId} not found`)
            }

            person.firstName = args.firstName
            person.lastName = args.lastName

            return person
        },

        removePerson(root, args) {
            const removedPerson = find(people, { personId: args.personId })
            if (!removedPerson) {
              throw new Error(`Person with id ${args.personId} not found`)
            }
      
            remove(people, c => {
              return c.personId === removedPerson.personId
            })
      
            return removedPerson
        },
        addCar(parent, args, context, info) {
            const newCar = {
                personId: args.personId,
                carId: args.carId,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price
            }
            
            cars.push(newCar) //make note of this.
          
            return newCar
        },
        updateCar(root, args) {
            const car = find(cars, { personId: args.personId, carId: args.carId })

            if(!car) {
                throw new Error(`Car with id ${args.carId} not found`)
            }

            car.personId = args.personId
            car.carId = args.carId
            car.year = args.year
            car.make = args.make
            car.model = args.model
            car.price = args.price
            
            return car
        },

        removeCar(root, args) {
            const removedCar = find(cars, { personId: args.personId, carId: args.carId })
            if (!removedCar) {
              throw new Error(`Car with id ${args.carId} not found`)
            }
      
            remove(cars, c => {
              return c.personId === removedCar.personId && c.carId === removedCar.carId
            })
      
            return removedCar 
        },


        removeCars(root, args) {
            const removedCars = filter(cars, { personId: args.personId })
            if (!removedCars) {
              throw new Error(`Cars with id ${args.personId} not found`)
            }
      
            for (let i=0; i < removedCars.length; i++) {
                remove(cars, c => {
                    return c.personId === removedCars[i].personId
                })
            }
      
            return removedCars
        }
    }
}

export { typeDefs, resolvers }