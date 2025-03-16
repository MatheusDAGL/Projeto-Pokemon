let log = new Log(document.querySelector('.log'));


let  charmander = new Charmander("Charmander");

let squirtle = new Squirtle("Squirtle");

let bulbasaur = new Bulbasaur("Bulbasaur");



    const stage = new Stage(
        charmander,
        squirtle,
        document.querySelector('#player'),
        document.querySelector('#opponent'),
        log
    )


stage.start();

