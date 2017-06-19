<a href="https://www.surfly.com/">![logo](images/logosmall.png)</a>

<a name="session-continuation"></a>
#Session Continuation{#session-continuation}

The high performance of Surfly can be attributed to our [proxy approach](https://docs.surfly.com/introduction/the-technology.html#surfly-co-browsing "proxy approach"). If a user wants to continue the web-session as-is (if you want to hold on to the user's logged in status for instance, or if your website makes use of a shopping cart), it is necessary to transfer all information to our proxy.  With Surfly, you can bring the necessary cookies of the user into the co-browsing session, and also store them after the session has ended.

By default, Surfly does this for you. If your website makes use of http-only cookies though, it is necessary to setup a _continuation point_. 

<a name="continuation-point-setup"></a>
###Continuation point setup{#continuation-point-setup}

You start the continuation point setup on the admin panel. Here, you go to "settings" >> "options" and make sure the boxes for "Cookie transfer enabled" and "Cookie transfer proxying" are checked. Also, add the URLs you wish to transfer cookies from (in list format):

![](/assets/continuationpointdash2.png)

Next, there are two options:
 - Set up the continuation point within your server (server level)
 - Or integrate it within your website's code by adding a reverse proxy (application level)
    
<a name="server-continuation-point"></a>    
####Server level continuation point{#server-continuation-point}

The website needs to forward all HTTP requests for the path `/surfly_cookie_transfer/`
to the Surfly server. This is usually a small adjustment in load balancer configuration.

<a name="nginx"></a>
#####Nginx{#nginx}

Add these lines in your config file:

``` javascript
location /surfly_cookie_transfer/ {
    proxy_pass https://surfly.com;
    proxy_set_header X-Continuation-Origin https://example.com;
    proxy_set_header X-Widget-Key 24d1414c71a94cbf9f205ed4fc4999b5;
}
```
<a name="haproxy"></a>
#####Haproxy{#haproxy}

``` javascript
frontend example-com-https
  acl surfly_session_continuation hdr(host) -i example.com path_beg /surfly_cookie_transfer/
  use_backend surfly_continuation_point_https if surfly_session_continuation
  ...your custom configuration here...

backend surfly_continuation_point_https
   https://example.com
   http-request set-header X-Widget-Key 24d1414c71a94cbf9f205ed4fc4999b5
   http-request set-header Host surfly.com
   server surfly surfly.com:443 ssl
```
<a name="apache"></a>
#####Apache{#apache}
Make sure you have **mod_ssl**, **mod_proxy**, **mod_proxy_http**, and **mod_headers** modules installed and loaded, see [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension) for details):

```xml
SSLProxyEngine On

<Location "/surfly_cookie_transfer/">
   RequestHeader set X-Continuation-Origin "https://example.com"
   RequestHeader set X-Widget-Key "24d1414c71a94cbf9f205ed4fc4999b5"
   ProxyPass "https://surfly.com/surfly_cookie_transfer/"
</Location>
```

Please note that you also need to set additional request headers:
`X-Widget-Key` should contain your widget key (the same that is used in javscript snippet).
`X-Continuation-Origin` should contain the origin of the page where Surfly widget is integrated.
That is, a protocol scheme followed by domain name and a port in case it is non-standard.

<a name="manual-cookie-scopes"></a>
####Cookies from a specific file path{#manual-cookie-scopes}

Default session continuation functionality works in most cases. However, if your application is using some special cookie scopes (for example, it sets cookies for specific path or subdomain), you might need to provide this information to Surfly.

This is possible with the `cookie_transfer_scopes` setting. If specified, it should contain a list of JSON objects, each of them describing a single cookie using `name`, `path`, and `domain` properties:

```javascript
cookie_transfer_scopes: [
   {name: 'shoppingcart', path: '/cart', domain: 'example.com'},
   {name: 'sessionid', path: '/', domain: '.example.com'}
]
```

The example above describes two cookies: `shoppingcart`, which is available on all pages under `example.com/cart`, and `sessionid`, which is set for all subdomains of `example.com`.

<a name="test-page"></a>
###Testing the continuation point{#test-page}

Once you've set up the continuation point, you can check the session continuation status by typing in your domain, and adding /surfly-cookie-transfer/ to the end:

![](/assets/Schermafbeelding 2017-06-14 om 16.16.28.png)<a href="https://www.surfly.com/">

Please note: http/https matters here.

You will then see a page that looks like this:

![](/assets/continuation_point_page.png)

If any of the boxes are red, it means that your continuation point is not set up correctly. Click the "?" of the respective box for instructions on how to adjust this.


