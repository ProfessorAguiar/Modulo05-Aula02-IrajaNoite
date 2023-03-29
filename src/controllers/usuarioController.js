import { users } from "../infra/bd.js"
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import multer from 'multer'
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function UsuarioController(app) {
    app.get('/usuario', exibir)
    function exibir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Usuario')
            res.send(result)
            db.close()
        })()
    }

    const storage = multer.diskStorage({
        // dest: './src/imgs/users/',
        destination: function (req, file, cb) {
            cb(null, './src/imgs/users/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname) //Appending .jpg
        }

    })
    const upload = multer({ storage: storage });
    app.post('/usuario/upload', upload.single('image'), (req, res, next) => {
        console.log(req)
        res.send(req.file)

    })
    app.get('/usuario/email/:email', buscarEmail)
    function buscarEmail(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Usuario where email like ?', req.params.email)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Usuário com email: ${req.params.email} não encontrado`)
            }
            db.close()
        })()
    }


    app.get('/usuario/nome/:nome', buscarNome)
    function buscarNome(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all(`SELECT * FROM Usuario where nome like ?`, req.params.nome)
            if (result != '') {
                res.send(result)
            } else {
                res.send(`Usuário: ${req.params.nome} não encontrado`)
            }
            db.close()
        })()
    }


    app.post('/usuario/login/:login', buscarLogin)
    function buscarLogin(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all(`SELECT * FROM Usuario where email like ?`, req.params.login)
            if (result != '') {
                if (result[0].senha == req.body.senha) {
                    res.send(true)
                } else {
                    res.send(false)
                }
            } else {
                res.send(`email ${req.params.login} não encontrado.`)
            }
            db.close()
        })()
    }


    app.post('/usuario', inserir)
    function inserir(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            await db.run(`INSERT INTO Usuario(nome,email,senha,CEP,endereco,complemento,CPF,numero,foto,cidade,estado) VALUES(?,?,?,?,?,?,?,?,?,?,?)`, req.body.nome, req.body.email, req.body.senha, req.body.CEP, req.body.endereco, req.body.complemento, req.body.CPF, req.body.numero, req.body.foto, req.body.cidade, req.body.estado)
            res.send(`Usuário: ${req.body.nome} inserido com sucesso.`)
            db.close()
        })()
    }
    app.delete('/usuario/email/:email', deletarEmail)
    function deletarEmail(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Usuario where email like ?', req.params.email)
            if (result != '') {
                res.send(`Usuário com email: ${req.params.email} deletado`)
                await db.run('DELETE from Usuario WHERE email= ?', req.params.email)
            } else {
                res.send(`Usuário com email: ${req.params.email} não encontrado`)
            }
            db.close()
        })()
    }
    app.delete('/usuario/email/:nome', deletarNome)
    function deletarNome(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Usuario where nome like ?', req.params.nome)
            if (result != '') {
                res.send(`Usuário: ${req.params.nome} deletado`)
                await db.run('DELETE from Usuario WHERE nome= ?', req.params.nome)
            } else {
                res.send(`Usuário: ${req.params.nome} não encontrado`)
            }
            db.close()
        })()
    }
    app.put('/usuario/id/:id', Atualizar)
    function Atualizar(req, res) {
        (async () => {
            const db = await open({
                filename: './src/infra/bdTarefas.db',
                driver: sqlite3.Database
            })
            const result = await db.all('SELECT * FROM Usuario where id like ?', req.params.id)
            if (result != '') {
                res.send(`Usuário: ${req.params.id} Atualizado`)
                await db.run('UPDATE Usuario SET nome=?, email=?, senha=? WHERE email= ?', req.body.nome, req.body.email, req.body.senha, req.params.email)
            } else {
                res.send(`Usuário: ${req.params.id} não encontrado`)
            }
            db.close()
        })()
    }
}
export default UsuarioController