/**
 * KOPI NUSANTARA — Authentication Preview Script
 * Handles tab switching between Login & Register, password toggling,
 * demo credentials filling, and interactive form submissions.
 */

document.addEventListener('DOMContentLoaded', () => {
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabRegisterBtn = document.getElementById('tabRegisterBtn');
    const formLogin = document.getElementById('formLoginView');
    const formRegister = document.getElementById('formRegisterView');

    function switchAuthTab(target) {
        if (target === 'register') {
            tabRegisterBtn?.classList.add('active');
            tabLoginBtn?.classList.remove('active');
            formRegister?.classList.add('active');
            formLogin?.classList.remove('active');
            document.title = 'Daftar Akun — Kopi Nusantara (Preview)';
        } else {
            tabLoginBtn?.classList.add('active');
            tabRegisterBtn?.classList.remove('active');
            formLogin?.classList.add('active');
            formRegister?.classList.remove('active');
            document.title = 'Masuk — Kopi Nusantara (Preview)';
        }
    }

    // Check URL hash or query param on load
    const hash = window.location.hash.toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    if (hash === '#register' || urlParams.get('mode') === 'register') {
        switchAuthTab('register');
    } else {
        switchAuthTab('login');
    }

    tabLoginBtn?.addEventListener('click', () => switchAuthTab('login'));
    tabRegisterBtn?.addEventListener('click', () => switchAuthTab('register'));

    // Toggle password eye visibility
    document.querySelectorAll('.btn-toggle-pwd').forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash', 'bi-eye');
            }
        });
    });

    // 1-Click Demo Account Autofill
    const btnFillDemo = document.getElementById('btnFillDemo');
    if (btnFillDemo) {
        btnFillDemo.addEventListener('click', () => {
            const emailInput = document.getElementById('loginEmail');
            const pwdInput = document.getElementById('loginPassword');
            if (emailInput && pwdInput) {
                emailInput.value = 'fadhil@kopinusantara.id';
                pwdInput.value = 'kopi1234';
                showToast('Akun Demo Diisi', 'Silakan klik tombol "Masuk Sekarang".', 'bi-person-check-fill');
            }
        });
    }

    // Login Form Submit Simulation
    const loginForm = document.getElementById('actualLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalHtml = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Memverifikasi Akun...
            `;

            setTimeout(() => {
                showToast('Login Berhasil!', 'Selamat datang kembali, Fadhil. Mengalihkan ke Halaman User...', 'bi-check-circle-fill');
                setTimeout(() => {
                    window.location.href = 'user.html';
                }, 1000);
            }, 800);
        });
    }

    // Register Form Submit Simulation
    const registerForm = document.getElementById('actualRegisterForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const pwd = document.getElementById('regPassword')?.value;
            const confirmPwd = document.getElementById('regConfirmPassword')?.value;

            if (pwd && confirmPwd && pwd !== confirmPwd) {
                showToast('Peringatan', 'Konfirmasi password tidak cocok!', 'bi-exclamation-triangle-fill');
                return;
            }

            const submitBtn = registerForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Mendaftarkan Akun...
            `;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Daftar Sekarang';
                showToast('Pendaftaran Berhasil!', 'Akun Anda telah dibuat. Silakan masuk untuk memulai.', 'bi-party-popper');
                
                // Auto switch to login tab with prefill
                switchAuthTab('login');
                const regEmail = document.getElementById('regEmail')?.value;
                if (regEmail && document.getElementById('loginEmail')) {
                    document.getElementById('loginEmail').value = regEmail;
                }
            }, 1000);
        });
    }
});

