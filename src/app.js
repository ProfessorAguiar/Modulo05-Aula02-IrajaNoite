import express from 'express'
import UsuarioController from './controllers/usuarioController.js'
import TarefaController from './controllers/tarefaController.js'
const app = express()
app.use(express.json())
UsuarioController(app)
TarefaController(app)
export default app