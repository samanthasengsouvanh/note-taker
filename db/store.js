const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);

const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    constructor(){
        this.id = 0;
    }
    read(){
        return readFileAsync("db/db.json", "utf8");
    }
    write(note){
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes(){
        return this.read().then(notes => {
            let formattedNotes = [];
            formattedNotes = formattedNotes.concat(JSON.parse(notes))
            return formattedNotes
        })
    }
    addNotes(note){
        const {title, text} = note;

        const noteWithId = {title, text, id: ++this.id}

        return this.getNotes().then(notes => [...notes, noteWithId])
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => noteWithId)
    }
    removeNote(id){
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== parseInt(id)))
        .then(filteredNotes => this.write(filteredNotes))
    }
}

module.exports = new Store();