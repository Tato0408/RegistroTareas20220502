import logout from './src/routes/logout.js'

import loginStudents from './src/routes/students/loginStudents.js'
import recoveryPasswordStudents from './src/routes/students/recoveryPasswordStudents.js'
import registerStudents from './src/routes/students/registerStudents.js'
import students from './src/routes/students/students.js'

import loginTeacher from './src/routes/teachers/loginTeachers.js'
import recoveryPasswordTeacher from './src/routes/teachers/recoveryPasswordTeachers.js'
import registerTeacher from './src/routes/teachers/registerTeachers.js'
import teachers from './src/routes/teachers/teachers.js'

import tasks from './src/routes/tasks/tasks.js'
import topics from './src/routes/topics/topics.js'
import categories from './src/routes/categories/categories.js'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

//Estudiantes
app.use("/api/students", students)
app.use("/api/registerStudents", registerStudents)
app.use("/api/loginStudents", loginStudents)
app.use("/api/recoveryPasswordStudents", recoveryPasswordStudents)
app.use("/api/logout", logout)

//Maestros
app.use("/api/teachers", teachers)
app.use("/api/registerTeachers", registerTeacher)
app.use("/api/loginStudents", loginTeacher)
app.use("/api/recoveryPasswordStudents", recoveryPasswordTeacher)

//Tareas
app.use("/api/tasks", tasks)

//Materias
app.use("/api/topics", topics)

//Categorias
app.use("/api/categories", categories)

export default app;