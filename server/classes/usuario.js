class Usuario {

    constructor(){
        this.personas = [];
    }

    agregarPersona( id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.getPersonaPorSala(persona.sala);
    }

    getPersona( id ){
        let persona = this.personas.filter(item => item.id === id)[0];
        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonaPorSala( sala ){
        let personaEnSala = this.personas.filter(item =>   item.sala === sala );
        return personaEnSala;
    }

    borrarPersona( id ){

        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(item =>  item.id != id);
        return personaBorrada;
    }
}

module.exports = {
    Usuario
};