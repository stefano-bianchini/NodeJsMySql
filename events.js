const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  router.post('/categoria', (req, res, next) => {
    db.query(
      'INSERT INTO categoria (descrizione, prezzog, prezzos, prezzom) VALUES (?,?,?,?)',
      [req.body.descrizione, req.body.prezzog, req.body.prezzos, req.body.prezzom],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.get('/categoria', function (req, res, next) {
    db.query(
      'SELECT * FROM categoria',
      [100*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.delete('/categoria/:descrizione', (req, res, next) => {
    db.query(
      'DELETE FROM categoria WHERE descrizione = ?',
      [req.params.descrizione],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  router.put('/categoria/:descrizione', function (req, res, next) {
    db.query(
      'UPDATE categoria SET descrizione=?, prezzog=?, prezzos=?, prezzom = ? WHERE descrizione=?',
      [req.body.descrizione, req.body.prezzog, req.body.prezzos, req.body.prezzom, req.params.descrizione],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;