/*
Imports
*/
    // Node
    const express = require('express');
    const router = express.Router();
//

/*
Routes definition
*/
    class ApiRouterClass {

        // Inject Passport to secure routes
        constructor(connection) {
            // Instanciate MYsql connection
            this.connection = connection;
        }
        
        // Methode to get data from :endpoint and :id
        getDataFromid( endpoint, id ){
            return new Promise( (resolve, reject) => {
                // Get item by ID from table :endpoint
                this.connection.query(`SELECT * FROM ${endpoint} WHERE id = ${id}`, (queryError, results, fields) => {
                    return queryError ? reject(queryError) : resolve(results);
                });
            })
        }


        // Set route fonctions
        routes(){
            /* 
            CRUD: Create route 
            */
                router.post('/:endpoint', (req, res) => {
                    // Set empty data
                    let data = {};

                    // Check endpoint
                    if(req.params.endpoint === 'post'){
                        // Define post data
                        data = {
                            title: req.body.title,
                            content: req.body.content
                        }
                    }

                    // Insert item in table :endpoint
                    this.connection.query(`INSERT INTO ${req.params.endpoint} SET ?`, data, (queryError, results, fields) => {
                        if (queryError) {
                            return res.json({ msg: 'MYSQL: ok query', err: queryError })
                        }
                        else{
                            return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                        }
                    });
                })
            //

            /* 
            CRUD: Read all route 
            */
           router.get('/:endpoint/:id', (req, res) => {

            if( req.params.endpoint === 'post' ){
                /* 
                Récupérer info du post + author.id + comment.id
                */
                // Get item by ID from table :endpoint
                this.connection.query(`SELECT * FROM ${req.params.endpoint} WHERE id = ${req.params.id}`, (queryError, results, fields) => {
                    if (queryError) {
                        return res.json({ msg: 'MYSQL: error query', err: queryError })
                    }
                    else{
                        return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                    }
                });
            }
            else if(req.params.endpoint === 'users'){
                /* 
                Récupérer info du user + post.author + comment.auhtor
                */

                this.connection.query(`SELECT * FROM ${req.params.endpoint} WHERE id = ${req.params.id}`, (queryError, results, fields) => {
                    if (queryError) {
                        return res.json({ msg: 'MYSQL: error query', err: queryError })
                    }
                    else{
                        return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                    }
                });
            }
        })
            //

            /* 
            CRUD: Read one route
            */
                router.get('/:endpoint/:id', (req, res) => {
                    // Get item by ID from table :endpoint
                    this.connection.query(`SELECT * FROM ${req.params.endpoint} WHERE id = ${req.params.id}`, (queryError, results, fields) => {
                        if (queryError) {
                            return res.json({ msg: 'MYSQL: error query', err: queryError })
                        }
                        else{
                            return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                        }
                    });
                })
            //

            /* 
            CRUD: Update route 
            */
                router.put('/:endpoint/:id', (req, res) => {
                    // Get all item from table :endpoint
                    this.connection.query(`
                        UPDATE ${req.params.endpoint} 
                        SET title = "${req.body.title}", content = "${req.body.content}" 
                        WHERE id = ${req.params.id}
                    `, (queryError, results, fields) => {
                        if (queryError) {
                            return res.json({ msg: 'MYSQL: error query', err: queryError })
                        }
                        else{
                            return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                        }
                    });
                })
            //

            /* 
            CRUD: Delete route 
            */
                router.delete('/:endpoint/:id', (req, res) => {
                    // Get all item from table :endpoint
                    this.connection.query(`
                        DELETE FROM ${req.params.endpoint} 
                        WHERE id = ${req.params.id}
                    `, (queryError, results, fields) => {
                        if (queryError) {
                            return res.json({ msg: 'MYSQL: error query', err: queryError })
                        }
                        else{
                            return res.json({ msg: 'MYSQL: OK query', results: results, fields: fields })
                        }
                    });
                })
            //            
        };

        // Start router
        init(){
            // Get route fonctions
            this.routes();

            // Sendback router
            return router;
        };
    };
//

/*
Export
*/
    module.exports = ApiRouterClass;
//