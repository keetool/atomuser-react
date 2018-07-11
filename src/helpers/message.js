import {message} from "antd";
import {DISTANCE_TOP_MESSAGE_HOME} from "../constants";

export function messageSuccess(text, top = DISTANCE_TOP_MESSAGE_HOME, duration = 2.5) {
    message.config({
        top: top
    });
    message.success(text, duration);
}

export function messageError(text, top = DISTANCE_TOP_MESSAGE_HOME, duration = 2.5) {
    message.config({
        top: top
    });
    message.error(text, duration);
}

export function messageWarning(text, top = DISTANCE_TOP_MESSAGE_HOME, duration = 2.5) {
    message.config({
        top: top
    });
    message.warning(text, duration);
}