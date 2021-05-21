import {AuthenticationContext, adalFetch, withAdalLogin} from 'react-adal';

export const adalConfig = {
    tenant: 'edbba387-420d-4308-8dd9-59d2b1e16547',
    clientId: '86b8817c-acb9-47b8-aeea-f4534ef3869e',
    endpoints: {
        api: 'https://airbnbportal.onmicrosoft.com/86b8817c-acb9-47b8-aeea-f4534ef3869e'
    },
    cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);