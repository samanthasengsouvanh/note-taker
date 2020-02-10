var router = require("express").Router();
const store = require("../db/store")

router.get("/notes", function(req, res){
    store.getNotes().then(notes => res.send(notes))
})
router.post("/notes", function(req, res){
   store.addNotes(req.body).then((note) => res.json(note))
})
router.delete("/notes/:id", function(req, res){
    store.removeNote(req.params.id).then(() => res.json({deleted: true}))
 })

module.exports = router;