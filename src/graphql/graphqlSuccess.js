import i18n from "../languages/i18n";

export function graphqlSuccess(status) {
    return status === 7;
}

export function messageGraphqlRequest(error) {
    console.log(error);
    return i18n.t("manage.error.message.there_are_errors");
}