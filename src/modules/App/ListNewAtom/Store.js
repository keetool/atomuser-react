import {observable, action, runInAction} from "mobx";
import {messageError} from "../../../helpers/message";
import {merchantClient} from "../../../graphql/client";
import {concat2Array} from "../../../helpers/entity/array";
import {getValueFromKey} from "../../../helpers/entity/object";
import {graphqlSuccess, messageGraphqlRequest} from "../../../graphql/graphqlSuccess";
import {getNewUsers} from "./queries.graphql";
import {getAccountID} from "../../../helpers/auth";

class Store {
    @observable users = [];
    @observable isLoading = false;
    @observable error = null;

    @action
    async getListNewUser() {

        this.isLoading = true;
        this.error = null;

        const variables = {
            user_id: getAccountID(),
            limit: 5
        };

        try {
            const res = await merchantClient
                .query({
                    query: getNewUsers,
                    variables: variables
                });

            const data = res.data;

            if (graphqlSuccess(res.networkStatus)) {
                const users = getValueFromKey(data, 'users.data');
                runInAction(() => {
                    this.users = concat2Array(this.users, users);
                });

            } else {
                runInAction(() => {
                    this.error = messageGraphqlRequest();
                });
            }
        } catch (error) {
            runInAction(() => {
                this.error = messageGraphqlRequest();
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
            if (this.error) {
                messageError(this.error);
            }
        }
    }
}

export default Store;