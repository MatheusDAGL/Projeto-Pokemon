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
        this.defense = 43;
        this.maxLife = this.life;
    }
}

class Squirtle extends Pokemon{
    constructor(name){
        super(name);
        this.life = 44;
        this.attack = 10;
        this.defense = 65;
        this.maxLife = this.life;
    }
}

class Bulbassaur extends Pokemon{
    constructor(name){
        super(name);
        this.life = 45;
        this.attack = 10;
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

        this.pokemon1El.querySelector('.attackButton').addEventListener('click',() => this.doAttack(this.pokemon1,this.pokemon2))
        
        this.pokemon2El.querySelector('.attackButton').addEventListener('click',() => this.doAttack(this.pokemon2,this.pokemon1))
    }

    update(){
        //pokemon1
        this.pokemon1El.querySelector('.name').innerHTML = this.pokemon1.name;
        let p1Pct = (this.pokemon1.life / this.pokemon1.maxLife) * 100;
        this.pokemon1El.querySelector('.bar').style.width = `${p1Pct}%`;
        if (p1Pct <=15){
            this.pokemon1El.querySelector('.bar').style.backgroundColor='red'
        }
        //pokemon2
        this.pokemon2El.querySelector('.name').innerHTML = this.pokemon2.name;
        let p2Pct = (this.pokemon2.life / this.pokemon2.maxLife) * 100;
        this.pokemon2El.querySelector('.bar').style.width = `${p2Pct}%`;
        if (p2Pct <=15){
            this.pokemon2El.querySelector('.bar').style.backgroundColor='red'
        }
    }

    doAttack(attacking, attacked){

        if(attacking.life <=0 || attacked.life<=0){
        this.log.addMessage("Já morreu");
            return;
        }
        let attackFactor = (Math.random()).toFixed(2);
        let defenseFactor = (Math.random()).toFixed(2);

        let actualAttack = attacking.attack * parseFloat(attackFactor);
        let actualDefense = attacked.defense *parseFloat(defenseFactor);


            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} em ${attacked.name}`)
        
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