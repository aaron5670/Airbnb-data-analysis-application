using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServer
{
    public static class Config
    {
        public static IEnumerable<ApiScope> ApiScopes =>
            new List<ApiScope>
            {
                new ApiScope("api1", "My API")
            };

        // public static IEnumerable<ApiResource> GetApis()
        // {
        //     return new ApiResource[]
        //     {
        //         // name and human-friendly name of our API
        //         new ApiResource("api1", "My API")
        //     };
        // }

        public static IEnumerable<Client> Clients =>
            new List<Client>
            {
                new Client
                {
                    AllowAccessTokensViaBrowser = true,
                    AllowOfflineAccess = true,
                    RedirectUris = new[] {"https://localhost:6001/signin-oidc"},
                    PostLogoutRedirectUris = new[] {"https://localhost:6001/signout-oidc"},
                    AllowedCorsOrigins = new[] {"https://localhost:6001"},

                    ClientId = "client",
                    
                    RequireClientSecret = false,

                    // // no interactive user, use the clientid/secret for authentication
                    // AllowedGrantTypes = GrantTypes.ClientCredentials,
                    
                    // set to GrantType.ResourceOwnerPassword - because using Username/Password to login
                    AllowedGrantTypes =  GrantTypes.ResourceOwnerPassword,

                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    // scopes that client has access to
                    AllowedScopes = {"api1"}
                }
            };
    }
}