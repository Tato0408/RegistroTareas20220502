import { APIURL as API_URL } from "../utils/api_url";

// GET - Obtener todas las tareas
export async function getAllTasks() {
    try {
        const response = await fetch(`${API_URL}tasks`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error("Error al obtener tareas");
        return await response.json();
    } catch (error) {
        console.error("Error en getAllTasks:", error);
        throw error;
    }
}

// POST - Crear tarea
export async function createTask(taskData) {
    try {
        const response = await fetch(`${API_URL}tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
            credentials: "include"
        });
        if (!response.ok) throw new Error("Error al crear tarea");
        alert("Tarea agregada correctamente")
        return await response.json();
    } catch (error) {
        console.error("Error en createTask:", error);
        throw error;
    }
}

// DELETE - Eliminar tarea
export async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}tasks/${taskId}`, {
            method: 'DELETE',
            credentials: "include"
        });
        if (!response.ok) throw new Error("Error al eliminar tarea");
        alert("Tarea eliminada correctamente");
        return await response.json();
    } catch (error) {
        console.error("Error en deleteTask:", error);
        throw error;
    }
}

// PUT - Actualizar tarea
export async function updateTask(taskId, taskData) {
    try {
        const response = await fetch(`${API_URL}tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData),
            credentials: "include"
        });
        if (!response.ok) throw new Error("Error al actualizar tarea");
        alert("Tarea actualizada correctamente");
        return await response.json();
    } catch (error) {
        console.error("Error en updateTask:", error);
        throw error;
    }
}