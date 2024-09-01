import { GameObjectClass, collides } from 'kontra';

import GameUI from './GameUI';
import PlayerActor from './Sprites/Player';
import GameArea from './GameArea';

export default class GameState extends GameObjectClass {

    recipe = 0
    timePassed = 0
    clockwise = 10
    recipeTime = 0

    timeLeft = 0

    everySecond = 1;

    state = 'start_screen'
    gameStarted = false

    heatTemperature = 0
    heatTemperatureGoal = 0
    isBoiling = false

    stirTemperature = 0
    stirTemperatureGoal = 0

    gameUI = new GameUI()
    gameArea = new GameArea()
    playerActor = new PlayerActor()


    ingredients = [
        'correct ingredient',
        'wrong ingredient',
        'really wrong ingredient',
    ]

    goodIngredients = [
        'correct ingredient'
    ]

    score = 0

    constructor(properties) {
        super(properties)
    }

    spacePressed() {
        if (this.gameStarted === true) {
            this.heatTemperature = this.heatTemperature + 10
            console.log('space pressed: ', this.heatTemperature)
        }
    }

    onePressed() {
        if (this.gameStarted === true) {
            if (this.goodIngredients.includes(this.ingredients[0])) {
                this.score = this.score + 10
            }else {
                this.score = this.score - 10
            }
            this.ingredients = this.ingredients.sort((a, b) => 0.5 - Math.random());
        }
    }
    twoPressed() {
        if (this.gameStarted === true) {
            if (this.goodIngredients.includes(this.ingredients[1])) {
                this.score = this.score + 10
            }else {
                this.score = this.score - 50
            }
            this.ingredients = this.ingredients.sort((a, b) => 0.5 - Math.random());
        }
    }
    threePressed() {
        if (this.gameStarted === true) {
            if (this.goodIngredients.includes(this.ingredients[2])) {
                this.score = this.score + 10
            }else {
                this.score = this.score - 50
            }
            this.ingredients = this.ingredients.sort((a, b) => 0.5 - Math.random());
        }
    }

    addClockwiseStir() {
        if (this.gameStarted === true) {
            this.stirTemperature = this.stirTemperature + 10
            console.log('Rotated: ', this.stirTemperature)
        }
    }

    reset() {
        this.gameStarted = false
        this.timePassed = 0
        this.recipe = 0
        this.score = 0
        this.loadRecipe()
    }

    loadRecipe() {
        if (this.recipe === 0) {
            this.clockwise = 10
            this.timeLeft = 10
        }
    }

    isGameOver() {
        if (this.timeLeft < 0) {
            this.gameOver()
        }
    }

    gameOver() {
        this.reset()
        this.state = 'game_over'
    }

    isRecipeComplete() {
        if (this.clockwise === 0) {
            return true
        }
        return false
    }

    update(dt) {
        //this.gameUI.update(dt, this)
        this.playerActor.update(dt, this)
    }

    render() {
        this.gameArea.render(this);
        this.playerActor.render(this);
        //this.gameUI.render(this);
        
    }
}