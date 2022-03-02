import { gql } from "@apollo/client";

export const GET_PEOPLE_CARS = gql`
  {
    people {
      personId
      firstName
      lastName
      cars {
        personId
        carId
        year
        make
        model
        price
      }
    }
  }
`

export const GET_PERSON = gql`
  query Person($personId: String!) {
    person(personId: $personId) {
      personId
      firstName
      lastName
      cars {
        personId
        carId
        year
        make
        model
        price
      }
    }
  }
`

export const ADD_PERSON = gql`
  mutation addPerson(
    $personId: String!
    $firstName: String!
    $lastName: String!
  ) {
    addPerson(personId: $personId, firstName: $firstName, lastName: $lastName) {
      personId
      firstName
      lastName
      cars {
        personId
        carId
        year
        make
        model
        price
      }
    }
  }
`

export const UPDATE_PERSON = gql`
  mutation updatePerson(
    $personId: String!
    $firstName: String
    $lastName: String
  ) {
    updatePerson(
      personId: $personId
      firstName: $firstName
      lastName: $lastName
    ) {
      personId
      firstName
      lastName
    }
  }
`

export const REMOVE_PERSON = gql`
  mutation removePerson($personId: String!) {
    removePerson(personId: $personId) {
      personId
      firstName
      lastName
    }
  }
`

export const ADD_CAR = gql`
  mutation addCar(
    $personId: String!
    $carId: String!
    $year: String!
    $make: String!
    $model: String!
    $price: String!
  ) {
    addCar(
      personId: $personId
      carId: $carId
      year: $year
      make: $make
      model: $model
      price: $price
    ) {
      personId
      carId
      year
      make
      model
      price
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation updateCar(
    $personId: String!
    $carId: String!
    $year: String
    $make: String
    $model: String
    $price: String
  ) {
    updateCar(
      personId: $personId
      carId: $carId
      year: $year
      make: $make
      model: $model
      price: $price
    ) {
      personId
      carId
      year
      make
      model
      price
    }
  }
`;

export const REMOVE_CAR = gql`
  mutation removeCar($personId: String!, $carId: String!) {
    removeCar(personId: $personId, carId: $carId) {
      personId
      carId
      year
      make
      model
      price
    }
  }
`

export const REMOVE_CARS = gql`
  mutation removeCars($personId: String!) {
    removeCars(personId: $personId) {
      personId
      carId
      year
      make
      model
      price
    }
  }
`
