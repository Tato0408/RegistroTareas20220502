import { APIURL as API_URL } from "../utils/api_url";

// GET - Obtener todos
export async function getAllUsers(page = 0, size = 10) {
    try {
        const response = await fetch(`${API_URL}employee`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error(`Error fetching users`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching users: ${error}`);
        throw error;
    }
}

export async function getAllBranches() {
    try {
        const response = await fetch(`${API_URL}branches`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error(`Error fetching branches`);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching branches: ${error}`);
        throw error;
    }
}

// POST - Registrar Empleado
export async function createUser(userData) {
    try {
        // Tu app.js dice: app.use("/api/registerEmployee", registerEmployeeRoutes)
        const response = await fetch(`${API_URL}employee`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            credentials: "include"
        });
        if (!response.ok) throw new Error(`Error en el registro`);
        return await response.json();
    } catch (error) {
        console.error(`Error: ${error}`);
        throw error;
    }
}

// DELETE - Eliminar Empleado
export async function deleteUser(userId) {
    try {
        const url = `${API_URL}employee/${userId}`;

        const response = await fetch(url, {
            method: 'DELETE',
            credentials: "include"
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            console.error("Respuesta del servidor:", errorBody);
            throw new Error(`Error al eliminar: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error en deleteUser: ${error}`);
        throw error;
    }
}

export async function updateUser(userId, userData) {
    try {
        const response = await fetch(`${API_URL}employee/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            credentials: "include"
        });

        if (!response.ok) throw new Error(`Error al actualizar: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Error en updateUser: ${error}`);
        throw error;
    }
}