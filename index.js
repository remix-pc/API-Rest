const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



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
    ]
}


//Get (Buscar todos os itens)

app.get("/games", (req, res) => {
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



//Conexão

app.listen(8080, () => {
    console.log("API Rodando")
})