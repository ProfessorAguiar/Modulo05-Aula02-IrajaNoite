import { users } from "../infra/bd.js"
function UsuarioController(app) {
    app.get('/usuario', exibir)
    function exibir(req, res) {
        res.send(users)
    }
    app.get('/usuario/email/:email', buscar)
    function buscar(req, res) {
        const usuario = users.find(usuario =>
            usuario.email === req.params.email)
        if (usuario) {
            res.send(`<b><p>nome: ${usuario.nome}</p></b>
            <p>email: ${usuario.email}</p>
            <p>senha: ${usuario.senha}</p>`)
        }else{
            res.send(`Usuário: ${req.params.email} não encontrado.`)
        }
    }
    app.post('/usuario', inserir)
    function inserir(req, res) {
        res.send('Inserindo Usuários')
        users.push(req.body)
        console.log(req.body)
    }
}
export default UsuarioController