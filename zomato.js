fetch("https://am1nsec.github.io/bimo.github.io/index.html")
  .then(res => res.text())
  .then(html => {
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
  })
  .catch(err => console.error("Error loading HTML:", err));
