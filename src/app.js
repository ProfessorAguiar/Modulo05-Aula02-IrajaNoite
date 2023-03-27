import express from 'express'
import UsuarioController from './controllers/usuarioController.js'
import TarefaController from './controllers/tarefaController.js'
import rootController from './controllers/rootController.js'
import cors from 'cors'
import session from 'cookie-session'
const app = express()
app.use(cors())
app.use(express.json())
// const sess = {
//   secret: 'keyboard cat',
//   cookie: {
//     sameSite: 'lax'
//   }
// }

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }

// app.use(session(sess))
// app.use(session({
//   genid: function(req) {
//     return genuuid() // use UUIDs for session IDs
//   },
//   secret: 'keyboard cat'
// }))
UsuarioController(app)
TarefaController(app)
rootController(app)
export default app