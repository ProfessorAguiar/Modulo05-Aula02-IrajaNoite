import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
function TarefaController(app) {
    app.get('/tecnologia', exibir)
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Tecnologia')
            res.send(result)
            db.close()
        })()
    }
    app.get('/tecnologia/titulo/:titulo', buscarTitulo)
    function buscarTitulo(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Tecnologia where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Tecnologia com titulo: ${req.params.titulo} não encontrado`)
            }
            db.close()
        })()
    }
    app.post('/tecnologia', inserir)
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            await db.run(`INSERT INTO Tecnologia(titulo,descricao,status,data_criacao,id_usuario) VALUES(?,?,?,?,?)`, req.body.titulo, req.body.descricao, req.body.status,req.params.data_criacao,req.params.id_usuario)
            res.send(`Tarefa: ${req.body.titulo} inserida com sucesso.`)
            db.close()
        })()
    }
    app.delete('/tecnologia/titulo/:titulo', deletartitulo)
    function deletartitulo(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Tecnologia where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(`Tecnologia com titulo: ${req.params.titulo} deletada`)
                await db.run('DELETE from Tecnologia WHERE titulo= ?', req.params.titulo)
            } else {
                res.send(`Tecnologia com titulo: ${req.params.titulo} não encontrada`)
            }
            db.close()
        })()
    }
    app.delete('/tecnologia/titulo/:titulo', deletarTitulo)
    function deletarTitulo(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Tecnologia where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(`Tecnologia: ${req.params.titulo} deletada`)
                await db.run('DELETE from Tecnologia WHERE titulo= ?', req.params.titulo)
            } else {
                res.send(`Tecnologia: ${req.params.titulo} não encontrada`)
            }
            db.close()
        })()
    }
    app.put('/tecnologia/titulo/:titulo', Atualizar)
    function Atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Tecnologia where titulo like ?', req.params.titulo)
            if (result != '') {
                res.send(`Tecnologia: ${req.params.titulo} Atualizada`)
                await db.run('UPDATE Tecnologia SET titulo=?, descricao=?, status=?, data_criacao=?, id_usuario=? WHERE titulo= ?', req.body.titulo, req.body.descricao, req.body.status,req.params.data_criacao,req.params.id_usuario)
            } else {
                res.send(`Tecnologia: ${req.params.titulo} não encontrada`)
            }
            db.close()
        })() 
    }
}
export default TarefaController