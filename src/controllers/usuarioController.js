import { users } from "../infra/bd.js"
function UsuarioController(app){
    app.get('/usuario',exibir)
    function exibir(req, res){
        res.send(users)
    }
    app.post('/usuario',inserir)
    function inserir(req, res){
        res.send('Inserindo Usuários')
        console.log(req.body)
    }
}
export default UsuarioController