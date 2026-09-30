// Bypass login - auto authenticate
(function() {
    // Mark auth gate as settled immediately
    window.markAuthGateSettled?.();

    // Hide login screen
    const loginScreen = document.getElementById('u2-login-screen');
    if (loginScreen) {
        loginScreen.inert = true;
        loginScreen.setAttribute('aria-hidden', 'true');
        loginScreen.classList.add('is-hidden');
    }

    // Unlock main content
    const lockedEl = document.getElementById('u2-login-locked');
    if (lockedEl) {
        lockedEl.classList.remove('u2-login-locked');
    }

    // Provide stub auth API for any code that checks login status
    window.u2Auth = {
        logout: function() { console.log('Logout disabled'); },
        getSession: function() { return { username: 'guest', access_token: 'bypass' }; },
        isLoggedIn: function() { return true; },
        showLoginScreen: function() { console.log('Login screen disabled'); },
        hideLoginScreen: function() {}
    };

    // Dispatch event that main interface is ready
    window.dispatchEvent(new CustomEvent('u2:main-interface-ready', {
        detail: { username: 'guest' }
    }));
})();
