function UsuarioController(app){
    app.get('/usuario',exibir)
    function exibir(req, res){
        res.send('Exibindo Usuários')
    }
    app.post('/usuario',inserir)
    function inserir(req, res){
        res.send('Inserindo Usuários')
        console.log(req)
    }
}
export default UsuarioController