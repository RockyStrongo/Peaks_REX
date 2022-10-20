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

    //List of Peaks Agencies
    AGENCY_OPTIONS: ["Aix", "Lyon", "Reims/Paris"],

}