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
    			repositories(first: 10){
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

export const GET_ISSUES_OF_REPO = gql `
    query GetIssuesOfRepo($login: String!, $name: String!) {
        user(login: $login) {
            repository(name: $name){
   		        issues (first: 10){
                edges {
                node {
                title
                id
                createdAt
          }
        }
      }
    }
  }
}
`

export const ADD_NEW_ISSUE = gql`
    mutation AddNewIssue($id: String!, $title: String!, $body: String) {
        createIssue(input: {repositoryId: $id, title: $title, body: $body}) {
            issue {
                number
                body
              }
        }
    }
`