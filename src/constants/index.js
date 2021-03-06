export const TOKEN_EXPIRED_TIME = "518400"; //ms
export const LOGO_SIDER =
    "https://d1j8r0kxyu9tj8.cloudfront.net/files/1527836835agwLmRolMVrN7Fs.png";
export const LOGO =
    "https://d1j8r0kxyu9tj8.cloudfront.net/files/1530022426ip83rk4BSB9FURd.png";

export const LOGO_HEADER_SIGN_IN =
    "https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/img/colorlogo.png";

export const QUERY_SCREEN = {
    "screen-xs": {
        maxWidth: 575
    },
    "screen-sm": {
        minWidth: 576,
        maxWidth: 767
    },
    "screen-md": {
        minWidth: 768,
        maxWidth: 991
    },
    "screen-lg": {
        minWidth: 992,
        maxWidth: 1199
    },
    "screen-xl": {
        minWidth: 1200
    }
};

export const LANGUAGES = [
    {
        value: "en-us",
        label: "English"
    },
    {
        value: "vi-vn",
        label: "Tiếng Việt"
    },
    // {
    //     value: "fr-fr",
    //     label: "Française"
    // }
];

export const TOKEN_TYPE = "Bearer";
export const TOKEN_FACEBOOK = "EAAceU4B1yBEBAOTzdikxRoABdbPOf6Q2bAazfkq3sIw8PJgRbanD09yJCff0w6lcilQLIxwVZAcufpFB6FZAHgn5qR9NytPuHgWFZC86kBcVtJ2BY3bL9TXz6bMTxgKcwGt9ZA67fPkeQgbe8uKnwsjG6yTXZBHbONxrjD4SbZAwZDZD";
export const FACEBOOK_ID = "622242781443804";
export const GOOGLE_ID = "495439088808-1451ltmfth2pm0vgahhc715kphpauvqs.apps.googleusercontent.com";
export const DISTANCE_TOP_MESSAGE_HOME = 54;

export const TABS = (userID) => {
    return [
        {
            name: 'social.tooltip.tabbar.search',
            path: '/search',
            icon: 'search'
        },
        {
            name: 'social.tooltip.tabbar.mark',
            path: '/mark',
            icon: 'star-o'
        },
        {
            name: 'social.tooltip.tabbar.home',
            path: '/',
            icon: 'appstore-o'
        },
        {
            name: 'social.tooltip.tabbar.notification',
            path: '/notification',
            icon: 'heart-o'
        },
        {
            name: 'social.tooltip.tabbar.profile',
            path: `/profile/${userID}`,
            icon: 'user'
        },

    ];
};