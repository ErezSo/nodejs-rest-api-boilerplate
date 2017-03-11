const ObjectID = require('mongodb').ObjectID;
const errorMessage = {'error': 'An error has occured'};

module.exports = (app, db) => {
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send(errorMessage);
      } else {
        res.send(item);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = {text: req.body.body, title: req.body.title};
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send(errorMessage);
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    const note = {text: req.body.body, title: req.body.title};
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
        res.send(errorMessage);
      } else {
        res.send(note);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send(errorMessage)
      } else {
        res.send(`Node ${id} deleted`);
      }
    });
  });
}
