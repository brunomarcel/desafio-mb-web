import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json());

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.post('/registration', (req, res) => {
  const body = req.body;

  if (!body.email || !body.password) {
    return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
  }

  if(body.type === 'PhysicsPerson' && validatePhysicsPerson(body)) {
    const { physicsPerson } = body
    if (physicsPerson)  
        return res.status(200).json({ message: 'Cadastro de Pessoa Física recebido com sucesso!' });
  } 

  if(body.type === 'LegalPerson' && validateLegalPerson(body)) {
    const { legalPerson } = body
    if (legalPerson)  
        return res.status(200).json({ message: 'Cadastro de Pessoa Jurídica recebido com sucesso!' });
  } 

  return res.status(400).json({ message: 'Campos obrigatórios ausentes' });

});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

const validatePhysicsPerson = body => {
    const { physicsPerson } = body
    const isValidPhysicsPerson = 
        physicsPerson.name && 
        physicsPerson.cpf && 
        physicsPerson.dateOfBirth && 
        physicsPerson.phone
    
    return isValidPhysicsPerson
}

const validateLegalPerson = body => {
    const { legalPerson } = body
    const isValidLegalPerson = 
        legalPerson.registeredName && 
        legalPerson.cnpj && 
        legalPerson.openingDate && 
        legalPerson.phone
    
    return isValidLegalPerson
}