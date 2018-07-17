const MAX_LENGTH_STRING = 200;
const MAX_LINE_NUMBER = 5;

export function findLinkAndAddTab(str) {
    /*eslint-disable*/
    const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;
    /*eslint-enable*/
    return str.replace(urlRegex, (url) => {
        return '<a target="_blank" href="' + url + '">' + url + '</a>';
    });
}

export function removeScriptInString(data) {
    const reFindJS = /(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/g;
    return data.replace(reFindJS, "");
}

export function removeStyleInString(data) {
    const reFindJS = /(<|%3C)style[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)style[\s\S]*?(>|%3E)/g;
    return data.replace(reFindJS, "");
}

export function removeTagA(data) {
    const reFindHtml = /<[/]*a[^>]*>/g;
    return data.replace(reFindHtml, "");
}

export function html2text(data) {
    const reFindHtml = /<[^>]*>/g;
    return data.replace(reFindHtml, "");
}

export function convertDataBeforeAddEditor(data) {
    data = removeTagA(data);
    return data;
}

function htmlEncode(value) {
    let element = document.createElement('div');
    element.textContent = value;
    return element.innerHTML;
}

export function convertDataPastedEditor(data) {

    data = htmlEncode(data);

    data = removeScriptInString(data);

    data = html2text(data);

    return data;
}

export function convertDataEditor(data) {

    data = removeScriptInString(data);

    data = removeStyleInString(data);

    data = findLinkAndAddTab(data);

    return data;
}

export function removeEntities(data) {
    const re = /&[^;]*;/g;
    return data.replace(re, "");
}

export function isViewMore(data) {

    let text = html2text(data);

    text = removeEntities(text);

    return text.length > MAX_LENGTH_STRING;
}

function getNumberLine(content) {
    let element = document.createElement('div');
    element.innerHTML = content;
    return element.childElementCount;
}

function getContentMaxLine(data) {
    let result = '';
    let element = document.createElement('div');
    element.innerHTML = data;
    let childs = element.childNodes;

    for (let i = 0; i < MAX_LINE_NUMBER; i++) {
        if (childs[i].nodeName === "#text") {
            result += htmlEncode(childs[i].data);
        } else {
            result += childs[i].outerHTML;
        }
    }

    return result;
}

export function splitStrToViewMore(data, maxLine = MAX_LINE_NUMBER, maxLength = MAX_LENGTH_STRING) {

    if (overLineNumber(data, maxLine)) {
        data = getContentMaxLine(data, maxLine) + '<div>...</div>';
    }

    if (overMaxString(data, maxLength)) {
        data = data.substring(0, maxLength) + '<div>...</div>';
    }

    return data;


}

export function overLineNumber(data, maxLine = MAX_LINE_NUMBER) {
    const lineNumber = getNumberLine(data);
    return lineNumber > maxLine;
}

export function overMaxString(data, maxLength = MAX_LENGTH_STRING) {
    return data.length > maxLength;
}

