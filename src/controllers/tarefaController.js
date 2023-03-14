import { tarefas } from "../infra/bd.js"
function TarefaController(app){
    app.get('/tarefa',exibir)
    function exibir(req, res){
        res.send(tarefas)
    }
    app.post('/tarefa',inserir)
    function inserir(req, res){
        res.send('Inserindo Tarefas')
        tarefas.push(req.body)
        console.log(req.body)
    }
}
export default TarefaController