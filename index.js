const express = require('express')
const db = require('./data/config')
const { where } = require('./data/config')
const server = express()
const PORT = process.env.PORT || 5678

server.use(express.json())

server.get('/cars', (req, res) => {
    db.select('*').from('car-dealer')
    .then(list => {
        res.status(200).json({data: list})
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
})

server.get('/cars/:id', (req, res) => {
    db('*').from('car-dealer')
    where('id', req.params.id)
    .then(list => {
        res.status(200).json({list})
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
})

server.post('/cars', (req, res) => {
    db('car-dealer').insert(req.body, 'id')
    .then(ids => {
        res.status(201).json({insert: ids})
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
})

server.put('/cars/:id', (req, res) => {
    const changes = req.body
    const postid = req.params.id
    db('car-dealer').where({id: postid}).update(changes)
    .then(count => {
        if (count) {
            res.status(200).json({message: 'updated successfully'})
        } else {
            res.status(404).json({message: 'not found'})
        }
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
})

server.delete('/cars/:id', (req, res) => {
    db('car-dealer').where({ id: req.params.id}).delete()
    .then(count => {
        if (count) {
           res.status(200).json({message: 'removed successfully'}) 
        } else {
            res.status(404).json({message: 'not found'})
        }
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
})

server.listen(PORT, console.log(`server is listening on ${PORT}`))