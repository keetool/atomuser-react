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
    return capitalizeFirstLetter(convertTime(time).startOf('minute').fromNow());
}
