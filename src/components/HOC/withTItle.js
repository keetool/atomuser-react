import React, {Component} from "react";
import DocumentTitle from 'react-document-title';
import {translate} from "react-i18next";

const withTitle = () => {
    return WrappedComponent => {
        class WebTitle extends Component {
            render() {
                const {t} = this.props;
                return (
                    <DocumentTitle title={t(this.props.title)}>
                        <WrappedComponent {...this.props}/>
                    </DocumentTitle>

                );
            }
        }

        return translate(props => props.namespaces)(WebTitle);
    };
};

export default withTitle;
