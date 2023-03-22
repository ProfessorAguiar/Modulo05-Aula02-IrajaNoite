import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
function TarefaController(app) {
    app.get('/tarefa', exibir)
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM tarefa')
            res.send(result)
            db.close()
        })()
    }
    app.get('/tarefa/titulo/:titulo', buscarTitulo)
    function buscarTitulo(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM tarefa where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Tarefa com titulo: ${req.params.titulo} não encontrado`)
            }
            db.close()
        })()
    }
    app.post('/tarefa', inserir)
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            await db.run(`INSERT INTO tarefa(titulo,descricao,status,data_criacao,id_usuario) VALUES(?,?,?,?,?)`, req.body.titulo, req.body.descricao, req.body.status,req.params.data_criacao,req.params.id_usuario)
            res.send(`Tarefa: ${req.body.titulo} inserida com sucesso.`)
            db.close()
        })()
    }
    app.delete('/tarefa/titulo/:titulo', deletartitulo)
    function deletartitulo(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM tarefa where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(`Tarefa com titulo: ${req.params.titulo} deletada`)
                await db.run('DELETE from tarefa WHERE titulo= ?', req.params.titulo)
            } else {
                res.send(`Tarefa com titulo: ${req.params.titulo} não encontrada`)
            }
            db.close()
        })()
    }
    app.delete('/tarefa/titulo/:titulo', deletarTitulo)
    function deletarTitulo(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Tarefa where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(`Tarefa: ${req.params.titulo} deletada`)
                await db.run('DELETE from Tarefa WHERE titulo= ?', req.params.titulo)
            } else {
                res.send(`Tarefa: ${req.params.titulo} não encontrada`)
            }
            db.close()
        })()
    }
    app.put('/Tarefa/titulo/:titulo', Atualizar)
    function Atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Tarefa where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(`Usuário: ${req.params.titulo} Atualizado`)
                await db.run('UPDATE Tarefa SET titulo=?, descricao=?, status=?, data_criacao=?, id_usuario=? WHERE titulo= ?', req.body.titulo, req.body.descricao, req.body.status,req.params.data_criacao,req.params.id_usuario)
            } else {
                res.send(`Tarefa: ${req.params.titulo} não encontrada`)
            }
            db.close()
        })() 
    }
}
export default TarefaController