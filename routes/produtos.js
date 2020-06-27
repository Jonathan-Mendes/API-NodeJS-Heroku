const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        conn.query(
            "SELECT * FROM PRODUTOS",
            // [req.body.id, req.body.nome, req.body.preco],
            (error, resultado, fields) => {
                conn.release();

                if(error) {
                    return res.status(500).send({
                        error: error,
                        rsponse: null
                    });
                }

                res.status(200).send({
                    mensagem: "GET SUCESSO",
                    id: resultado.id
                });
            }
        )
    });
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        conn.query(
            "INSERT INTO produtos (id, nome, preco) VALUES (?, ?, ?)"
            [req.body.id, req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();

                if(error) {
                    return res.status(500).send({
                        error: error,
                        rsponse: null
                    });
                }

                res.status(201).send({
                    mensagem: "Produto Inserido",
                    id: resultado.id
                });
            }
        )
    })
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    
    if(id === 'especial') {
        res.status(200).send({
            mensagem: "ID Especial",
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: "Usando o GET com ID",
            id: id
        });
    } 

    router.patch('/', (req, res, next) => {
        res.status(200).send({
            mensagem: "Usando o PACTH dentro da rota"
        });
    });

    router.delete('/', (req, res, next) => {
        res.status(200).send({
            mensagem: "Usando o DELETE dentro da rota"
        });
    });
});


module.exports = router;