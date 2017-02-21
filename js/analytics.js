<script type="text/javascript">
/* eslint-disable */

(function() {
    function set_cookie(key, value) {
        document.cookie = key + '=' + value + '; max-age=' + 60 * 60 * 24 * 365 + '; path=/; domain=.' + get_domain();
    }

    function get_campaign() {
        // Get url from the query parameter
        var query_string = location.search.substring(1);
        var items = query_string.split('&');
        var key = 'c=';
        for (var i = 0; i < items.length; i++) {
            if (items[i].startsWith(key)) {
                return items[i].substring(key.length);
            }
        }
        return null;
    }

    function get_domain() {
        var items = location.hostname.split('.');
        var domain_name = items[items.length - 2] + '.' + items[items.length - 1];
        return domain_name;
    }

    function is_external_url(url) {
        // Check that the url is not part of the current domain
        var element = document.createElement('a');
        element.href = url;
        if (element.hostname.endsWith(get_domain())) {
            return false;
        }
        return true;
    }

    function add_tracking_cookies() {
        var campaign = get_campaign();
        if (document.referrer && is_external_url(document.referrer)) {
            set_cookie('tracking_referrer', document.referrer);
        }
        if (campaign) {
            set_cookie('tracking_campaign', campaign);
        }
    }

    add_tracking_cookies();
})();

!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
analytics.load("heiBMDbisXlpJXGX7EXveLCcF3JU7kZP");
analytics.page();
}}();

</script>