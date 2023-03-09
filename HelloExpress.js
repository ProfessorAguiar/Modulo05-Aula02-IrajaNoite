import express from 'express'
const app = express()
const port = 3000
app.get('/usuario', (req, res) => {
    res.send('Rota Raiz')
  })
app.get('/contato', (req, res) => {
  res.send('Rota Contato')
})
app.listen(port, () => {
  console.log(`Servidor Rodando em: http://localhost:${port}`)
})