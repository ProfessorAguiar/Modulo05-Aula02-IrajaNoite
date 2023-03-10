import express from 'express'
const app = express()
const port = 3000
app.get('/usuario', (req, res) => {
    res.send('Rota Usuario com metodo GET')
  })
app.get('/tarefa', (req, res) => {
  res.send('Rota tarefa com metodo GET')
})
app.listen(port, () => {
  console.log(`Servidor Rodando em: http://localhost:${port}`)
})