import asyncComponent from "../helpers/AsyncFunc";
import React from "react";
import queryString from "query-string";
import {message} from "antd";


export function getPathComponent(path) {
    return asyncComponent(() => import(path));
}

export function URL_add_parameter(param, value) {
    let hash = {};
    let url = window.location.href;

    let parameters = url.split(/\?|&/);

    for (let i = 0; i < parameters.length; i++) {
        if (!parameters[i]) continue;

        let ary = parameters[i].split("=");
        hash[ary[0]] = ary[1];
    }

    hash[param] = value;

    let list = [];
    Object.keys(hash).forEach(function (key) {
        if (hash[key]) {
            list.push(key + "=" + hash[key]);
        }
    });

    url = window.location.pathname + "?" + list.join("&");
    return url;
}

export function reload_url(url) {
    window.location.href = url;
}

export function isEmpty(data) {
    return data == undefined || data == null || data == "";
}

/**
 * Add props to component
 * @param {*} beforeProps
 * @param {*} props
 * @param {*} component
 * @param {*} keyComponent
 */
export function addPropsComponent(beforeProps,
                                  props = {},
                                  component = null,
                                  keyComponent = null) {
    if (component && keyComponent) {
        component = React.cloneElement(component, props);
        return {
            ...beforeProps,
            [keyComponent]: component
        };
    }
    return beforeProps;
}

/**
 * remove property in props
 * @param {*} props
 * @param {*} key
 */
export function removeProp(props, key = null) {
    if (key) {
        return {
            ...props,
            [key]: undefined
        };
    }
    return props;
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatPagination(pagination) {
    return {
        pageSize: parseInt(pagination.per_page),
        current: pagination.current_page,
        total: pagination.total
    };
}

/**
 * convert data sort of ant table with server sort
 * @param {*} sorter sorter of ant table
 * @param {*} key key of object need sort in server
 */
export function formatSortTable(sorter, key) {
    if (key == sorter.field) {
        if (sorter.order == "ascend") return "asc";
        else {
            return "desc";
        }
    }
    return "";
}

/**
 *
 * @param location = props.location
 * @param key params
 * @returns {string || null} value params
 */
export function getQueryParamsUrl(location, key) {
    if (location && location.search) {
        const parsed = queryString.parse(location.search);
        return parsed[key];
    }
    return undefined;
}

export function redirectURL(url) {
    window.location.replace(url);
}

/**
 *
 * @returns {{domain, type, subdomain}}
 */
export function splitHostname() {
    let result = {};
    /*eslint-disable*/
    let regexParse = new RegExp("([a-z\-0-9]{2,63})\.([a-z\.]{2,5})$");
    /*eslint-enable*/
    let urlParts = regexParse.exec(window.location.hostname);
    result.domain = urlParts[1];
    result.type = urlParts[2];
    result.subdomain = window.location.hostname.replace(result.domain + '.' + result.type, '').slice(0, -1);
    return result;
}

export function messageSuccess(text, top = 24, duration = 2.5) {
    message.config({
        top: top
    });
    message.success(text, duration);
}

export function messageError(text, top = 24, duration = 2.5) {
    message.config({
        top: top
    });
    message.error(text, duration);
}
