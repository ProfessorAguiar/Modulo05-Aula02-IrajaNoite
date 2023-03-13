function TarefaController(app){
    app.get('/tarefa',exibir)
    function exibir(req, res){
        res.send('Exibindo Tarefas')
    }
    app.post('/tarefa',inserir)
    function inserir(req, res){
        res.send('Inserindo Tarefa')
    }
}
export default TarefaController