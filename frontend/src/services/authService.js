import { APIURL as API_URL } from "../utils/api_url";

export async function login(email, password) {
    const response = await fetch(`${API_URL}loginTeachers`, { // ← cambiado
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error en el login");
    return data;
}

export async function logout() {
    const response = await fetch(`${API_URL}logout`, {
        method: 'POST',
        credentials: "include"
    });
    return await response.json();
}

export async function getMe() {
    const response = await fetch(`${API_URL}me`, {
        method: 'GET',
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Sin sesión activa");
    return data;
}

export async function requestCode(email) {
    const response = await fetch(`${API_URL}recoveryPasswordTeachers/requestCode`, { // ← cambiado
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Usuario no encontrado");
    return data;
}

export async function verifyCode(code) {
    const response = await fetch(`${API_URL}recoveryPasswordTeachers/verifyCode`, { // ← cambiado
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export async function updatePassword(newPassword, confirmedPassword) {
    const response = await fetch(`${API_URL}recoveryPasswordTeachers/newPassword`, { // ← cambiado
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword, newPassword: confirmedPassword }), // ← cambiado
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}