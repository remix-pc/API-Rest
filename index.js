const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())


const jwtSecret = "dkwoskaodjaoidjwfwjfadnaoid21@#EDJIWDJA"


function auth(req, res, next) { //Middleware

    const authToken = req.headers['authorization'];

    if(authToken != undefined) {

        const bearer = authToken.split(' ')
        const token = bearer[1]

        jwt.verify(token,jwtSecret,(erro, data) => {
            if(erro) {
                res.status(401)
                res.json({err: "Token Inválido"})
            } else {
                req.token = token
                req.loggedUser = {id: data.id, email: data.email}
                console.log(data)
            }
        })

    }else {
        res.status(401)
        res.json({erro: "Token Inválido"})
    }
    next() //Responsável para passar a requisição na rota.

}


//Lista com os games (pode alterar para algum banco de dados.)

let DB = {
    games: [
        {
            id: 23,
            title: "VALORANT",
            year: 2020,
            price: 0
        },
        {
            id: 65,
            title: "Sea Of Thievs",
            year: 2018,
            price: 90
        },
        {
            id: 2,
            title: "Minecraft",
            year: 2012,
            price: 130
        }
    ],
    users: [
        {
            id: 1,
            name: "Guilherme Moreira",
            email: "remix@gmail.com",
            password: "nodejs<3"
        },
        {
            id: 20,
            name: "Remix",
            email: "guigg@gmail.com",
            password: "Java123"
        }
    ]
    
}


//Get (Buscar todos os itens)

app.get("/games",auth, (req, res) => {
    res.statusCode = 200
    res.json(DB.games)
})


//Get (Selecionar item específico pelo ID)

app.get("/game/:id", (req, res) => {
    

    if(isNaN(req.params.id)) {

        res.sendStatus = 400
    } else {

        let id = parseInt(req.params.id)
        
        let game = DB.games.find(g => g.id == id)

        if(game != undefined) {
            res.statusCode = 200
            res.json(game)
        } else {
            res.sendStatus = 404
        }

    }
})


//Post (Criar)

app.post("/game", (req, res) => {
        let {title, price, year} = req.body

        DB.games.push({
            id: 2323,
            title,
            price,
            year
        })
        res.sendStatus = 200
})


//Delete (Deletar)

app.delete("/game/:id", (req, res) => {

    if(isNaN(req.params.id)) {

        res.sendStatus(400)
    } else {

        let id = parseInt(req.params.id)
        
        let index = DB.games.findIndex(g => g.id == id);


        if(index == -1) {
            res.sendStatus(404)
        } else {
            DB.games.splice(index, 1)
            res.sendStatus(200)
        }
    }

})


//Put (Atualizar)

app.put("/game/:id", (req, res) => {
    

    if(isNaN(req.params.id)) {

        res.sendStatus(404)
    } else {

        let id = parseInt(req.params.id)
        
        let game = DB.games.find(g => g.id == id)

        if(game != undefined) {
            

            let {title, price, year} = req.body

            if(title != undefined || price != undefined || year != undefined) {
            
                game.title = title
                game.price = price
                game.year = year
                
                res.sendStatus(200)
            } else {
                res.sendStatus(404)
            }


        } else {
            res.sendStatus(404)
        }

    }
})


app.post("/auth", (req, res) => {
    var {email, password} = req.body

    if(email != undefined) {
        var user = DB.users.find(u => u.email == email)

        if(user != undefined) {

            if(user.password == password) {
               jwt.sign({id:user.id, email: user.email},jwtSecret,{expiresIn: "48h"}, (err, token) => {
                if(err) {
                    res.status(400)
                } else {
                    res.status(200)
                    res.json({token: token})
                }
               })
            } else {
                res.status(401);
                res.json({err: "Senha Inválida!"})
            }

        } else {
            res.status(404)
            console.log("caiu aqui")
        }

    } else {
        res.status(404)
        console.log("Erro")
    }
})



//Conexão

app.listen(8080, () => {
    console.log("API Rodando")
})