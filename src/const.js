import gql from 'graphql-tag'

export default {

    //email validation regex
    VALID_EMAIL_REGEX: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),

    //password validation regex
    PASSWORD_COMPLEXITY_REGEX: new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"),

    //Error messages
    ERROR_MESSAGE_INVALID_EMAIL: "L'adresse email doit être valide",
    ERROR_MESSAGE_EMAIL_PEAKS: "L'adresse email doit appartenir à Peaks",
    ERROR_MESSAGE_PASSWORD_COMPLEXITY: "Le mot de passe doit contenir au minimum 8 caractères, un chiffre et une majuscule",
    ERROR_MESSAGE_PASSWORD_CONFIRMATION: "Le mot de passe et la confirmation ne correspondent pas",
    ERROR_MESSAGE_INVALID_CREDENTIALS: "La combinaison email - mot de passe est incorrecte",
    ERROR_MESSAGE_EMAIL_DOES_NOT_EXIST: "Cet email n'est lié à aucun utilisateur",
    
    //info messages
    INFO_MESSAGE_RECOVER_EMAIL: "Un email a été envoyé à ",

    //Sucess messages
    SUCCESS_MESSAGE_USER_CREATED: "L'utilisateur a été créé avec succès.",
    SUCCESS_MESSAGE_USER_UPDATED: "L'utilisateur a bien été mis à jour.",

    //List of Peaks Agencies
    AGENCY_OPTIONS: ["Aix-en-Provence", "Lyon", "Reims/Paris"],
    AGENCY_IDS: {
        Aix: "472c3523-80ca-40fb-93cc-e41746894d29",
        Lyon: "ad8cc137-ed55-463c-a232-0f5483c1d5f0",
        ReimsParis: "f756adc3-9d4f-44c3-aca2-cc4901705c60"
    },

    //graphQL queries
    GQL_GET_USER_DATA: gql`query GetUser {
        user {
          id
          email
          password
          profilimage
          firstname
        }
      }
      `,
      GQL_GET_USER_PROFILE_DATA: gql`query GetUser ($id: uuid!) {
        user(where: {id: {_eq: $id}}) {
          firstname
          lastname
          email
          password
          profilimage
          agency {
            id
            name
          }
          retour_exps {
            client
            project
            retour_exp_technologies {
              technology {
                name
              }
            }
          }
        }
      }      
      `,
    GQL_GET_EXPERIENCES: gql`
      query GetExperiences {
        retour_exp {
          id
          project
          client
          start_date
          end_date
          user {
            id
            firstname
            lastname
          }
          agency {
            id
            name
          }
          retour_exp_technologies {
            technology {
              name
            }
          }
        }
      }
      `,
      GQL_GET_ONE_EXPERIENCE: gql`
      query GetOneExperience($id: uuid!) {
        retour_exp(where: {id: {_eq: $id}, retour_exp_technologies: {technology: {name: {}}}}) {
          id
          project
          client
          start_date
          end_date
          description_1
          description_2
          retour_exp_technologies {
            technology {
              id
              name
            }
          }
          user {
            id
            firstname
            lastname
            profilimage
          }
          agency {
            id
            name
          }
        }
      }
      
      `,
    GQL_CREATE_USER: gql`
        mutation CreateUser (
            $email: String!
            $firstname: String!
            $lastname: String!
            $agency_id: uuid!
            ) {
      insert_user_one(object: {
            email: $email, 
            firstname: $firstname, 
            lastname: $lastname, 
            agency_id: $agency_id, 
    }) {
        id
      } 
    }
    `,
    GQL_UPDATE_USER: gql`
    mutation UpdateUser(
      $id: uuid!, 
      $email: String!, 
      $firstname: String!, 
      $lastname: String!, 
      $agency_id: uuid!) {
      update_user(where: {id: {_eq: $id}}, 
      _set: {
        agency_id: $agency_id, 
        email: $email, 
        firstname: $firstname, 
        lastname: $lastname}) {
        returning {
          id
        }
      }
    }
    `

}