import {
    gql
} from '@apollo/client'

export const GET_USERS = gql `
    query GetUsers($name: String!) { 
        search(query: $name, type: USER, first: 4) {
            edges {
                node {
                    ... on User {
                        name
                        login
                        avatarUrl
                        id
                    }
                }
            }
        }
    }
`

export const GET_REPOSITORIES = gql `
    query GetRepositories($login: String!) {
        user(login: $login) {
    			repositories(first: 6){
      		edges {
            node {
              name
              stargazerCount 
              watchers {
                totalCount
                }
                id
             }
            }
        }	
    }	
}
`