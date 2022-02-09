#!/usr/bin/env node

import words from "./words.js";
import answers from "./answers.js";
import chalk from "chalk";
import inquirer from "inquirer"

let word;
let tries = 0;
let guesses = [];

async function main() {
    word = answers[Math.floor(Math.random() * answers.length)]
    //console.log(word)
    console.log(chalk.magenta('Welcome to CLI Wordle!'));
    console.log(chalk.bold("You know how this works, start guessing."))
    driver()
}

async function driver() {
    tries += 1;
    let letters = await guess()
    check(letters)
    if(letters.join('') == word) {
        console.log(chalk.bold("Congrats!"))
        console.log(chalk.white("Share with your friends:"))
        console.log(`npx-wordle ${tries} tries\n${guesses.join('\n')}\n${chalk.bgGreen(chalk.white(word))}`)
    }else {
        driver()
    }
}

async function guess() {
    let l = await inquirer.prompt({type:"input",name:"guess"}).then(r => {
        const letters = r.guess.split('')
        if(letters.length > 5 || letters.length < 5) return guess();
        if(!words.includes(r.guess)) return guess();
        return(letters)
    })
    return l;
}

function check(letters) {
    //console.log(word, letters)
    const ans = word.split("");
    let msg = "";
    if(word == letters.join('')) return console.log(chalk.bgGreen(chalk.white(word)))
    for(let i = 0; i < 5; i++) {
        if(letters[i] == ans[i]) {
            msg += chalk.bgGreen(chalk.white(letters[i]))
        }else if(ans.includes(letters[i])) {
            msg += chalk.bgYellow(chalk.white(letters[i]))
        }else {
            msg += chalk.bgGrey(chalk.white(letters[i]))
        }
    }
    guesses.push(msg)
    console.log(msg)
}

main()