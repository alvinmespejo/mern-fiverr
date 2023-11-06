export default function getAuthUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}
