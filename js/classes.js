class Pokemon {

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;
    constructor(name){
        this.name = name;

    }

    get life(){
        return this._life;
    }
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Charmander extends Pokemon{
    constructor(name){
        super(name);
        this.life = 39;
        this.attack = 10;
        this.maxLife = this.life;
    }
}

class Squirtle extends Pokemon{
    constructor(name){
        super(name);
        this.life = 44;
        this.attack = 9;
        this.maxLife = this.life;
    }
}

class Bulbasaur extends Pokemon{
    constructor(name){
        super(name);
        this.life = 45;
        this.attack = 8;
        this.defense = 55;
        this.maxLife = this.life;
    }
}

class Stage{
    constructor(pokemon1,pokemon2,pokemon1El,pokemon2El,logObject){
        this.pokemon1 = pokemon1;
        this.pokemon2 = pokemon2;
        this.pokemon1El = pokemon1El;
        this.pokemon2El = pokemon2El;
        this.log = logObject;

    }

    start() {
        this.update();
        this.pokemon1El.querySelector('.attack').addEventListener('click',() => this.doAttack(this.pokemon1,this.pokemon2));
        this.pokemon1El.querySelector('.attack').addEventListener('click',() => this.doAttack(this.pokemon2,this.pokemon1));  
        
    }

    update(){
        //pokemon1
        this.pokemon1El.querySelector('.HP').innerHTML = `${this.pokemon1.life.toFixed(1)} HP`;
        let p1Pct = (this.pokemon1.life / this.pokemon1.maxLife) * 100;
        this.pokemon1El.querySelector('.bar').style.width = `${p1Pct}%`;
        if (p1Pct <=15){
            this.pokemon1El.querySelector('.bar').style.backgroundColor='red'
        }
        if (p1Pct <=0){
            stopAudio();
            playDefeatAudio();
        }
        //pokemon2
        this.pokemon2El.querySelector('.HP').innerHTML = `${this.pokemon2.life.toFixed(1)} HP`;
        let p2Pct = (this.pokemon2.life / this.pokemon2.maxLife) * 100;
        this.pokemon2El.querySelector('.bar').style.width = `${p2Pct}%`;
        if (p2Pct <=15){
            this.pokemon2El.querySelector('.bar').style.backgroundColor='red'
        }
        if (p2Pct<=0){
            stopAudio();
            playVictoryAudio();
        }
    }

    doAttack(attacking, attacked){

    if (attacking.life <= 0) {
        this.log.addMessage(`${attacking.name} desmaiou!`);   
        return;
    }else if (attacked.life <= 0) {
        this.log.addMessage(`${attacked.name} desmaiou!`);
        return;
    }
        
    let attackFactor = (Math.random()).toFixed(2);
    let actualAttack = attacking.attack * parseFloat(attackFactor);
    attacked.life -= actualAttack;
    this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
    this.update();
    }

}

class Log{
    list = [];

    constructor(listEl){
        this.listEl=listEl;
    }

    addMessage(msg){
        this.list.push(msg);
        this.render();
    }

    render(){
        this.listEl.innerHTML = '';

        for (let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}


function stopAudio(){
    let audio = document.getElementById("musica");
    audio.pause();
}

function playVictoryAudio(){
    let audio = document.getElementById("victory");
    audio.play();
}

function  playDefeatAudio(){
    let audio = document.getElementById("defeat");
    audio.play();
}

const soundIcon = document.getElementById("muted");
const music = document.getElementById("musica");
const victoyMusic = document.getElementById("victory")

let isPlaying = false;

soundIcon.addEventListener("click", () => {
    if (isPlaying) {
        music.pause();
        victoyMusic.pause();
        soundIcon.src = "../images/muted.png"; 
    } else {
        music.play();
        victoyMusic.pause();
        soundIcon.src = "../images/mute.png"; 
    }
    isPlaying = !isPlaying;
});



