const ObjectID = require('mongodb').ObjectID; // Special Object format for MongoDB
const errorMessage = {'error': 'An error has occured'};

module.exports = (app, db) => {

  // GET
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

  // POST
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

  // PUT
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    const note = {text: req.body.body, title: req.body.title};
    if (note.text || note.title) {
      db.collection('notes').update(details, note, (err, result) => {
        if (err) {
          res.send(errorMessage);
        } else {
          res.send(note);
        }
      });
    }
  });

  // DELETE
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send(errorMessage)
      } else {
        res.send(`Note ${id} deleted`);
      }
    });
  });
}
