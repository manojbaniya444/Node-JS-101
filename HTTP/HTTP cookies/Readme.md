## HTTP cookies
A cookie also known as web cookie or browser cookie is a data a server sends to a users web browser. The browser may store cookies, create new cookies, modify existing ones and send them back to the same server with another requests.

Cookies enable web app to store limited amount of data and remember state information as by default the HTTP protocol is stateless i.e dont keep any state in it.

## What cookies are for?
- for sending sign in `**credentials**` via form submission and if credentials are correct server respond with a cookie containing a sessionID that record the sign in status on the browser.
- If a user visit another page then the same sessionID if valid can be used for access of other pages other wise access is denied in case expired cookie.

Cookies are mainly used for these purposes:
- Session Management
- Personalization
- Tracking

Some things to keep in mind are:
- Browsers are generally limited to a maximum number of cookies per domain and a maximum size per cookie is like 4kilobytes
- Cookies are sent with every request so they can worsen performance

## Hands on cookie

### Setting cookie
Server can send one or more `**Set-Cookie**` headers with the response, each one of which will set a cookie.
```
HTTP
Set-Cookie: <cookie-name>=<cookie-value>
```
The HTTP response sample:
```
HTTP/2.0 200 OK
Content-Type: <>
Set-Cookie:<cookie-name>=<cookie-value>

{...}
```

### Parsing cookie
When a new request is made, the browser sends previously stored cookies for the current domain back to the server within a `**Cookie**` HTTP header:
```
GET / HTTP/1.1
Host: <>
Set-Cookie: <cookie>=<value>; {same if other}
```

### Removing cookie
We can set expiry date or time period after which the cookie should be deleted and no longer need to be in the request.
```
HTTP
Set-Cookie: <cookie>=<value>; Expires=Thu, 31 Oct 2021 7:28:00 GMT;
```
or using Max-Age
```
Set-Cookie: <cookie>=<value>; Max-Age=<timeInMs>
```

### Updating the cookie
- Server can send a cookie header with the same name to update.
- Browser can update cookie using `Document.cookie` property.
```javascript
document.cookie = "<cookie>=<value>";
```

> **NOTE**: Set `**HTTP ONLY**` attribute in order to prevent client (javascript) to modify the cookie and protect from `XSS` Cross-Site scripting.

### Security
1. Block access to cookies : With `HttpOnly` and `Secure` attribute set on cookie. Secure is for HTTPS only protocol send the cookie.

```
HTTP
Set-Cookie: <cookie>=<value>; Max-Age=<time-in-ms>; Secure; HttpOnly
```

2. Define where cookies are sent: Use the `Domain` and `Path` attributes to define the scope of a cookie.
The Domain attribute specifies which server can receive a cookie and Path is for which certain path of the domain.

```
HTTP
Set-Cookie: <cookie>=<value>; Expires= Th, 21 Oct 2021 00:00:00 GMT; Secure; HttpOnly; Path=/<pathname>
```

3. Controlling third-party cookies with `SameSite`
The samesite attribute lets servers sepcify whether or when cookies are sent with cross-site request.

Cross-site request is request where the site do not match the site the user is currently visiting. This includes request sent when link is clicked on other sites to navigate to our site and any request sent by embedded third party content.

This helps prevent leakage and prevent against `CSRF`.

```
HTTP
Set-Cookie: cookie-value; SameSite=<None | Lax | Strict>
```

### Access-Control-Allow-Credentials
This is the header that needs to be allow to send cookies or other important thing for cross-origin request.

In order to reduce chance of CSRF in CORS, CORS requires both the server and the client to acknowledge that it is ok to include cookies on requests. Doing this makes cookies an active decision rather than passive.

In the client side:
Using `**fetch()**` set the credentials option to "include"

In server:
```
HTTP
Access-Control-Allow-Credentials: true
```

### third pary cookie