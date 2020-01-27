import gql from "graphql-tag";

export const SIGNIN_USER_MUTATION = gql`
  mutation {
    signIn(login:"omar@app.com", password: "password") {
      token
      user {
        id
        name
        email
      }
    }
  }
`;