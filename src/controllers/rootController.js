import path from 'path'
function rootController(app) {
    app.get('/', exibir)
    function exibir(req, res){
        res.sendFile(path.join(path.resolve(), "/src/controllers/documentacao.html"))  
    }  
}
export default rootController