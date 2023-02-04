#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";
import figures from "figures";

const generateLink = (link) => {
    return `${figures.lineUpRight}${figures.triangleRight} ${link}`
}

const boxenConfig = {
    title: `Murtuzaali Surti - ${new Date().getFullYear()}`,
    titleAlignment: "center",
    width: 60,
    padding: 1.5,
    margin: 1,
    borderStyle: 'round',
    borderColor: '#8d9191'
}

const about = "Hey there! I am a software engineer & technical writer who loves to develop software using javascript and educate people!\n\nBugs are on my most wanted list!"

const links = [
    {
        title: chalk.rgb(255, 255, 255).bgHex("a53c23")("Portfolio"),
        link: generateLink('https://murtuzaalisurti.github.io')
    },
    {
        title: chalk.rgb(255, 255, 255).bgHex("4c8e52")("GitHub"),
        link: generateLink("https://github.com/murtuzaalisurti")
    },
    {
        title: chalk.rgb(255, 255, 255).bgHex("0058e0")("LinkedIn"),
        link: generateLink("https://linkedin.com/in/murtuzaali-surti")
    },
    {
        title: chalk.rgb(255, 255, 255).bgHex("399ee6")("Twitter"),
        link: generateLink("https://twitter.com/murtuza_surti")
    },
    {
        title: chalk.rgb(255, 255, 255).bgHex("366b71")("Blog - Syntackle"),
        link: generateLink("https://syntackle.live")
    }
]

const content = `${about}\n\n\n${links.map(link => `${link.title}\n${link.link}`).join("\n\n")}`
console.log(boxen(content, boxenConfig))