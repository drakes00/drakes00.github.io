var host = "{{ site.url }}".replace(/http(s)?:\/\//g, "");
if ((host == window.location.host) && (window.location.protocol != "https:")) {
        window.location.protocol = "https";
}
