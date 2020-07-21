function logoutAction() {
  localStorage.removeItem('token');
  window.location.reload();
}
export default logoutAction;
