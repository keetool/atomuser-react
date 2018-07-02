import {capitalizeFirstLetter} from "./utility";
import moment from "moment";

export function formatTime(time, format = "LLLL") {
    return capitalizeFirstLetter(convertTime(time).format(format));
}

/**
 * convert timestamp to moment
 */
export function convertTime(time) {
    return moment.unix(time);
}

export function relativeTime(time) {
    const currentTimestamp = moment().unix();
    if (currentTimestamp - time > 24 * 60 * 60) {
        return formatTime(time);
    }
    return capitalizeFirstLetter(convertTime(time).startOf('minute').fromNow());
}

export function fullRelativeTime(time) {
    return capitalizeFirstLetter(convertTime(time).startOf('minute').fromNow());
}
