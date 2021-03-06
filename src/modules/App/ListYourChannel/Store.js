import {observable, action, runInAction} from "mobx";
import {messageError} from "../../../helpers/message";
import {getValueFromKey} from "../../../helpers/entity/object";
import {getYourChannels} from '../ListYourChannel/queries.graphql';
import {getAccountID} from "../../../helpers/auth";
import {merchantClient} from "../../../graphql/client";
import {graphqlSuccess, messageGraphqlRequest} from "../../../graphql/graphqlSuccess";
import {concat2Array} from "../../../helpers/entity/array";

class Store {
    @observable yourChannels = [];
    @observable isLoading = false;
    @observable error = null;

    @action
    async getYourMerchants() {

        this.isLoading = true;
        this.error = null;
        const variables = {
            user_id: getAccountID(),
            limit: 5
        };

        try {
            const res = await merchantClient
                .query({
                    query: getYourChannels,
                    variables: variables
                });

            const data = res.data;

            if (graphqlSuccess(res.networkStatus)) {
                const yourChannels = getValueFromKey(data, 'merchants.data');
                runInAction(() => {
                    this.yourChannels = concat2Array(this.yourChannels, yourChannels);
                });

            } else {
                runInAction(() => {
                    this.error = messageGraphqlRequest();
                });
            }
        } catch (error) {
            runInAction(() => {
                this.error = messageGraphqlRequest(error);
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