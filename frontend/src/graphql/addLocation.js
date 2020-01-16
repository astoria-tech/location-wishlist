import gql from 'graphql-tag'

export default gql`mutation addLocation($address: String!, $photo: Upload!) {
  addLocation(address: $address, photo: $photo) 
}`
