import { APIURL as API_URL } from "../utils/api_url";

export async function login(email, password) {
    const response = await fetch(`${API_URL}loginEmployee`, { // Ajusta la ruta si es /api/customers/login
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: "include" // ¡CRUCIAL para que el navegador guarde la cookie!
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


export async function startRegistration(userData) {
    const response = await fetch(`${API_URL}registerEmployee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        credentials: "include" 
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}

export async function verifyRegistrationCode(code) {
    const response = await fetch(`${API_URL}registerEmployee/verifyCodeEmail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationCodeRequest: code }),
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}
export async function requestCode(email) {
    const response = await fetch(`${API_URL}recoveryPasswordEmployee/requestCode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) throw new Error("Usuario no existe " + data.message);
    return data;
}

export async function verifyCode(code) {
    const response = await fetch(`${API_URL}recoveryPasswordEmployee/verifyCode`, {
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
    const response = await fetch(`${API_URL}recoveryPasswordEmployee/newPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword, confirmedPassword }),
        credentials: "include"
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
}