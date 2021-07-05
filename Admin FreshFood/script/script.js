function LogOut() {
    localStorage.setItem('user', null);
    window.location.href = "login.html";
}