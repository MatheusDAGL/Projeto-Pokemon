let log = new Log(document.querySelector('.log'));
let charmander = new Charmander("Charmander");
let squirtle = new Squirtle("Squirtle");
let bulbasaur = new Bulbasaur("Bulbasaur");
let player, opponent;

 if (document.title.includes("Bulbasaur")) {
    player = bulbasaur;
    opponent = charmander;
} else if (document.title.includes("Squirtle")) {
    player = squirtle;
    opponent = bulbasaur;
}else if (document.title.includes("Charmander")) {
    player = charmander;
    opponent = squirtle;
}

let stage = new Stage(
    player,
    opponent,
    document.querySelector('#player'),
    document.querySelector('#opponent'),
    log
)

console.log(player,opponent)
stage.start();