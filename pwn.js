export function run() {
  alert(document.domain);
  // Or: fetch('/api/user', {credentials: 'include'}).then(r => r.text()).then(console.log)
}
