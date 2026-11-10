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

const about = "a senior software engineer talking to machines, and letting them talk back.\n\ni break and fix code, and have published articles on several publications including css-tricks and freeCodeCamp. you can find me developing my projects on GitHub, or writing on my blog syntackle.com."
const links = [
    {
        title: chalk.rgb(255, 255, 255).bgHex("a53c23")(" more about me "),
        link: generateLink('https://murtuzaalisurti.com')
    },
    {
        title: chalk.rgb(255, 255, 255).bgHex("4c8e52")(" github "),
        link: generateLink("https://github.com/murtuzaalisurti")
    },
    {
        title: chalk.rgb(255, 255, 255).bgHex("0058e0")(" linkedin "),
        link: generateLink("https://linkedin.com/in/murtuzaali-surti")
    },
    {
        title: chalk.rgb(255, 255, 255).bgHex("366b71")(" blog - syntackle "),
        link: generateLink("https://syntackle.com")
    },
    {
        title: chalk.rgb(255, 255, 255).bgHex("399ee6")(" twitter (x) "),
        link: generateLink("https://x.com/murtuza_surti")
    },
]

const content = `${about}\n\n\n${links.map(link => `${link.title}\n${link.link}`).join("\n\n")}`
console.log(boxen(content, boxenConfig))