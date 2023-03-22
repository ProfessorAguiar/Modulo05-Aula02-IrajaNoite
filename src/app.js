import express from 'express'
import UsuarioController from './controllers/usuarioController.js'
import TarefaController from './controllers/tarefaController.js'
import rootController from './controllers/rootController.js'
const app = express()
app.use(express.json())
UsuarioController(app)
TarefaController(app)
rootController(app)
export default app