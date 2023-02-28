# API de Games
Essa API foi feita para fins de estudo, tendo um CRUD e arquivo HTML para ser testado a API
## EndPoint
### GET /games
Responsável por retornar a listagem de todos os games cadastrados no "banco de dados"
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os games.

Exemplo de resposta:

```
[
  {
    "id": 23,
    "title": "VALORANT",
    "year": 2020,
    "price": 0
  },
  {
    "id": 65,
    "title": "Sea Of Thievs",
    "year": 2018,
    "price": 90
  },
  {
    "id": 2,
    "title": "Minecraft",
    "year": 2012,
    "price": 130
  }
]
```

##### Falha na autenticação! 401
Caso essa resposta aconteça, significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de Resposta:

```

{
  "erro": "Token Inválido"
}

```

### POST /auth
Responsável por fazer o processo de Login
#### Parametros

email: E-mail do usuário cadastrado no sistema

password: senha do usuário cadastrado no sistema, com aquele determinado e-mail

Exemplo: 

```
{
  "email": "gui@gmail.com",
  "password": "senha123"
}
```

#### Respostas
##### OK! 200
Caso essa resposta aconteça, você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiZ3VpQGdtYWlsLmNvbSIsImlhdCI6MTY3NzYwMDUxNSwiZXhwIjoxNjc3NzczMzE1fQ.25rRA1JRmDPl6tmS30up4iR_vJZXfjevmhpyX4pUeB8"
}
```

##### Falha na autenticação! 401
Caso essa resposta aconteça, significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou email incorretos.

Exemplo de Resposta:

```

{
  "erro": "Credenciais Incorretos!"
}

```




