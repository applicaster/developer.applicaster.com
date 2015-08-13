# Authorization Provider Service

## Overview

**The authorization provider service**, gives the ability to grant/deny end user access to content,
through external authorization systems.
This product aims to allow customers to connect any type of 'entry pass' to
their content.
Some examples of what an 'entry pass' type can be:

1. User Registration (username/password form)
1. A mobile operator recognized-only access
1. A specific activity (question, game) which grants access to the successful users.

## Glossary

##### User / End User
The person using the application

##### Application
The customer's native application - either iOS or Android.

##### Authorization Provider
The external provider who is responsible for authorization of the user.

##### Storefront
The native screen in which the options for accessing the video item are displayed. These can include in-app purchase, redeem code entry, and/or the authorization provider option.

##### Security Token / Access Token
The credential used to access protected resources. An access token is a string representing an authorization issued to the client. In this service we use JSON Web Token type (as explained [here](http://jwt.io/)).

##### Secret Key
A pre-shared key that is used to sign the security token on the provider side and verify the signature at Applicaster's side.

## Main Flow

1. User clicks play on a video item
1. If the item is marked for authorization (on Applicaster side), user is presented with a
Storefront which includes the option to get authorized
1. User chooses the authorization option.
1. Applicaster client initiates the authorization process by opening the relevant authorization provider URL, and passing the authorization provider the relevant parametrs.
1. An authorization screen appears and user goes through authorization procedure with authorization provider.
1. If the authorization provider authorizes the user, a redirect is done, passing a valid security token and other expected parameters.
1. If the authorization provider does not authorize the user, the authorization provider will deal with the failure.
1. The application makes another request to Applicaster's servers along with the security token.
1. If the claim is verified, Applicaster's content system will send the Item's stream URL to the application.
1. If the claim is not verified, the user will be redirected to the Storefront to select another option to access the content.

![image](./images/auth_provider_logic.png)

## Implementation
In order to implement this feature, the authorization provider would need to create a URL which has the ability to authorize the user's validity, while adhering to the following standards described.

### Opening the authorization provider URL
After the user chooses the authorization option from the Storefront in the app, Applicaster will open the authorization provider, with the following parameters: <br>
- *redirect_uri*: This is the URL that the authorization provider will need to redirect to at the end of the successful authorization process. <br>
- *uuid*: The unique identifier of the device, will need to be added to the JWT payload, explained below. <br>

The authorization provider URL will thus open in a way that looks similar to this:

`http://auth-provider-domain.com?redirect_uri=applicaster%3A%2F%2Fauth%26state%3DANdyL4BLCX&uuid=er345678sfd`

### Authorization Process

The authorization provider is responsible for authorizing/not authorizing the user. If the user is found valid, the authorization provider will need to redirect to the redirect_uri specified by Applicaster (explained above), and add a JWT as a token parameter. <br>

The redirect URL will thus look similar to this:

`applicaster://auth?state=ANdyL4BLCX&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ`

### How to build the security token (JWT)
The JWT website describes the concept of this token type and the way to build it. Please also refer to the JWT libraries listed at the end of this document. <br>
The token we need to receive back, should adhere to the following: <br>

##### JWT Header
The algorithm supported is always *HS256*, and the type of token is always *JWT*,
so the JWT **header** will consist of this:

```javascript
{
	"alg": "HS256",
	"typ": "JWT"
}
```
##### JWT Payload

The JWT **payload** should include the following parameters.

```javascript
{
	"iss": "CUSTOMER_NAME",
	"exp": "1434266030",
	"uuid":"er345678sfd"
}
```

- *iss* (Issuer): The authorization provider.
- *exp* (Expiration Time): The time in [unix timestamp](https://en.wikipedia.org/wiki/Unix_time) until which the token is valid.
- *uuid* (Unique user identifier): Universally unique identifier, provided to the authorization provider by Applicaster client.

##### JWT Signing

Then, the JWT needs to be signed with the **secret key** (Explained in section below).

##### Secret Key

The secret key is the key that is used to sign the JWT (as explained [here](http://jwt.io/)). It can be generated on the Applicaster side in our CMS, as shown below.
The secret key should be kept the same on both servers (Applicaster's, and the authorization provider's) in order to sign the JWT on the authorization provider's side, and then authenticate it correctly on the Applicaster side.

### Creating an Authorization Provider entity in the CMS
In the Applicaster CMS, go to Admin > Policies.

![image](./images/cms_auth_providers_index.png)

Click on the (+) to add an Authorization Provider, and choose the 'Web' option.

![image](./images/cms_auth_providers_index_open_menu.png)

Enter the **name** of the authorization (for example, user login), the **store front title** (for example 'Login to view content for free'), and the **authorization provider URL**.

![image](./images/cms_auth_providers_new.png)

Once created, and when opening for Edit mode, you will notice that the Applicaster server has given you a random **secret key**. <br>
Please use this secret key on your servers as well in order to make sure we are able to authenticate your security token (as described in above sections).

![image](./images/cms_auth_providers_edit.png)

### Links to [JWT Libraries](http://jwt.io/#libraries)

1. [#NET](https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet)
2. [JAVA](https://bitbucket.org/b_c/jose4j/wiki/Home)
3. [PHP](https://github.com/firebase/php-jwt)
4. [Ruby](https://github.com/progrium/ruby-jwt)
