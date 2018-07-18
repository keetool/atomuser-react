function isUndefined(data) {
    return data === undefined;
}

function isNull(data) {
    return data == null;
}

function isNotValue(data) {
    return data == "";
}

function isEmpty(data) {
    return isUndefined(data) || isNull(data) || isNotValue(data);
}

/**
 * get value of object with string key
 * @param object example: {post: {creator: 'A'}}
 * @param strKey example: "post.creator"
 * @returns {*} example: A
 */
export function getValueFromKey(object, strKey) {
    let arrKey = strKey.split('.');
    let objectData = {...object};
    arrKey.forEach((key) => {
        if (isEmpty(objectData)) return;

        objectData = objectData[key];
    });
    return objectData;
}

/**
 * get value of object with string key
 * @param object example: {post: {creator: 'A'}, id: 10}
 * @param arrayKey example: ["post.creator", "id"]
 * @returns {*} example: {"post.creator": 'A', "id": 10} if empty value then return empty value
 */
export function getValuesFromKeys(object, arrayKey) {

    if (isEmpty(arrayKey)) return undefined;

    if (!Array.isArray(arrayKey)) {
        return {[arrayKey]: getValueFromKey(object, arrayKey)};
    }

    let data = {};

    arrayKey.forEach((key) => {
        data[key] = getValueFromKey(object, key);
    });

    return data;
}

/**
 * get second value if primary Value is empty
 * @param primaryValue
 * @param secondValue
 * @returns {*}
 */
export function getValuePrimary(primaryValue, secondValue) {
    return !isEmpty(primaryValue) ? primaryValue : secondValue;
}

/**
 * check data with key is empty
 * @param data
 * @param strKey
 * @returns {*}
 */
export function isEmptyWithKey(data, strKey) {
    return isEmpty(getValueFromKey(data, strKey));
}

export function removePropertyObjectWithKey(data, strKey) {
    return Object.entries(data).reduce((acc, [key, value]) => {
        return key === strKey ? acc : {...acc, [key]: value};
    }, {});
}

export function removePropertyObjectWithKeys(data, arrayKey) {
    return Object.entries(data).reduce((acc, [key, value]) => {
        return arrayKey.indexOf(key) > -1 ? acc : {...acc, [key]: value};
    }, {});
}