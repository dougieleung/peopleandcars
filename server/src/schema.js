import { gql } from 'apollo-server'
import { find, remove, filter } from 'lodash'

const people = [
    {
        personId: '1',
        firstName: 'Doug',
        lastName: 'Leung',
    },
    {
        personId: '2',
        firstName: 'Melanie',
        lastName: 'Leung',
    },
    {
        personId: '3',
        firstName: 'Grace',
        lastName: 'Leung',
    }
]

const cars = [
    {
        personId: '1',
        carId: '1',
        year: '2010',
        make: 'Volkswagen',
        model: 'Golf',
        price: 10050.50
    },
    {
        personId: '1',
        carId: '2',
        year: '2020',
        make: 'Ford',
        model: 'Fiesta',
        price: 15030.50
    },
    {
        personId: '1',
        carId: '3',
        year: '2017',
        make: 'Mercedes',
        model: 'C-Class',
        price: 65050.50
    },
    {
        personId: '2',
        carId: '1',
        year: '2015',
        make: 'Volkswagen',
        model: 'Jetta',
        price: '10050.50'
    },
    {
        personId: '2',
        carId: '2',
        year: '2018',
        make: 'Ford',
        model: 'Echo',
        price: 15030.50
    },
    {
        personId: '2',
        carId: '3',
        year: '2021',
        make: 'Mercedes',
        model: 'B-Class',
        price: 65050.50
    }, 
    {
        personId: '3',
        carId: '1',
        year: '2018',
        make: 'Tesla',
        model: 'SUV',
        price: 120050.50
    },
    {
        personId: '3',
        carId: '2',
        year: '2014',
        make: 'Nissan',
        model: 'Leaf',
        price: 15030.50
    },
    {
        personId: '3',
        carId: '3',
        year: '2007',
        make: 'Toyota',
        model: 'Camry',
        price: 2200.23
    }
]

     
const typeDefs = gql`
    type Person {
        personId: String!
        firstName: String
        lastName: String
        cars: [Car]
    }

    type Car {
        personId: String!
        carId: String!
        year: String
        make: String
        model: String
        price: String
    }

    type Query {
        people: [Person]
        person(personId: String!): Person
    }

    type Mutation {
            addPerson(personId: String!, firstName: String!, lastName: String!): Person
            updatePerson(personId: String!, firstName: String, lastName: String): Person
            removePerson(personId: String!): Person
            addCar(personId: String!, carId: String!, year: String!, make: String!, model: String!, price: String!): Car
            updateCar(personId: String!, carId: String!, year: String, make: String, model: String, price: String): Car
            removeCar(personId: String!, carId: String!): Car
            removeCars(personId: String!): [Car]
    }
`

const resolvers = {
    Query: {
        people: () => people, /* prism database / index endpoint / controller logic*/
        person(parent, args, context, info) {
            return find(people, { personId: args.personId })
        }
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