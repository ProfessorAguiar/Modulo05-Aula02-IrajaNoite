import Usuario from "../models/Usuario.js"
import Tarefa from "../models/Tarefa.js"
const users=[]
const tarefas=[]
const user1=new Usuario('Vinicius','vinicius@','123')
users.push(user1)
const user2=new Usuario('João','joao@','321')
users.push(user2)
const dataAtual=new Date()
const t1=new Tarefa('Estudar NodeJs','Estudar pela documentação online','em andamento',dataAtual)
tarefas.push(t1)
const t2=new Tarefa('Estudar ExpressJs','Estudar pela documentação online','em andamento',dataAtual)
tarefas.push(t2)
export {users, tarefas}