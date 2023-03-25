import express from 'express'
import UsuarioController from './controllers/usuarioController.js'
import TarefaController from './controllers/tarefaController.js'
import rootController from './controllers/rootController.js'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
UsuarioController(app)
TarefaController(app)
rootController(app)
export default app