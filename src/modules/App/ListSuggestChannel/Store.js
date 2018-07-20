import {observable, action, runInAction} from "mobx";
import {messageError} from "../../../helpers/message";
import {getValueFromKey} from "../../../helpers/entity/object";
import {getSuggestChannels} from './queries.graphql';
import {merchantClient} from "../../../graphql/client";
import {graphqlSuccess, messageGraphqlRequest} from "../../../graphql/graphqlSuccess";
import {concat2Array} from "../../../helpers/entity/array";

class Store {
    @observable yourChannels = [];
    @observable isLoading = false;
    @observable error = null;

    @action
    async getSuggestChannels() {

        this.isLoading = true;
        this.error = null;
        const variables = {
            limit: 5
        };

        try {
            const res = await merchantClient
                .query({
                    query: getSuggestChannels,
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