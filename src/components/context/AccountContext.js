import React from "react";
import {isLoggedIn} from "../../helpers/auth";

const AccountContext = React.createContext();

export const AccountProvider = AccountContext.Provider;

export function withAccount(Component) {
    return function AccountConsumer(props) {
        return (
            <AccountContext.Consumer>
                {account => {
                    const acceptAction = isLoggedIn() && account.joined;
                    const accountData = {...account, acceptAction};
                    return (<Component {...props} account={accountData}/>);
                }
                }
            </AccountContext.Consumer>
        );
    };
}
