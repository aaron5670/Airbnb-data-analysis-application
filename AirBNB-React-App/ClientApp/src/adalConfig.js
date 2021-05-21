import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
    tenant: 'edbba387-420d-4308-8dd9-59d2b1e16547',
    clientId: '770e076d-f85f-43b9-a090-be0f007114a8',
    endpoints: {
        api: '14d71d65-f596-4eae-be30-27f079bf8d4b',
    },
    cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);