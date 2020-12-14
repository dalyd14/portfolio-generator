const inquirer = require('inquirer')
// const fs = require('fs')
// const generatePage = require('./src/page-template.js');


// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;

//     console.log("Portfolio complete! Check out index.html to see the output!")
// })

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if(nameInput) {
                    return true
                } else {
                    console.log('Please enter your name!')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username',
            validate: githubInput => {
                if(githubInput) {
                    return true
                } else {
                    console.log('Please enter your GitHub Username!')
                    return false
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About Me" secion?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true
                } else {
                    return false
                }
            }
        }
    ])
}

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = []
    }
    
    console.log(`
=================
Add a New Project
=================
`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectNameInput => {
                if(projectNameInput) {
                    return true
                } else {
                    console.log('Please enter your project name!')
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project. (Required)',
            validate: projectDescriptionInput => {
                if(projectDescriptionInput) {
                    return true
                } else {
                    console.log('Please enter a description to your project!')
                    return false
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Gitub link to your project. (Required)',
            validate: linkInput => {
                if(linkInput) {
                    return true
                } else {
                    console.log('Please enter a link to your project!')
                    return false
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        },
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData)
        } else {
            return portfolioData
        }
    })
}

promptUser()
    .then(promptProject)
    .then(portfolioData => console.log(portfolioData))

// .then(data => promptProject(data)) IS THIS THE SAME AS 3 LINES ABOVE?????????