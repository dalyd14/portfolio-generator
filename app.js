const inquirer = require('inquirer')
const { writeFile, copyFile } = require('./utils/generate-site.js')
const generatePage = require('./src/page-template.js');

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
    .then(portfolioData => {
        return generatePage(portfolioData)
    })
    .then(pageHTML => {
        return writeFile(pageHTML)
    })
    .then(writeFileResp => {
        console.log(writeFileResp)
        return copyFile()
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse)
    })
    .catch(err => {
        console.log(err);
    })

// .then(data => promptProject(data)) IS THIS THE SAME AS ABOVE?????????

const mockData = {
    name: 'Dave',
    github: 'dalyd14',
    about: 'I love sports and coding',
    projects: [
        {
            name: 'RunBuddy',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus condimentum vestibulum. Sed at dolor et risus varius bibendum. Vivamus vehicula rhoncus feugiat. Quisque volutpat condimentum lorem. Donec ut ipsum eget metus tempor facilisis. Cras tincidunt purus sit amet augue maximus, vel facilisis tellus facilisis. Cras congue nibh id orci posuere porttitor. Praesent metus dolor, facilisis eget metus sed, egestas interdum nisi. Proin vitae facilisis quam.',
            languages: [
                'HTML',
                'CSS'
            ],
            link: 'https://dalyd14.github.io/run-buddy/',
            feature: false,
            confirmAddProject: true
        },
        {
            name: 'Taskinator',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'HTML', 'CSS'],
            link: 'https://dalyd14.github.io/taskinator',
            feature: false,
            confirmAddProject: true
        },
        {
            name: 'Taskmaster Pro',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
            languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
            link: 'https://dalyd14.github.io/taskmaster-pro',
            feature: false,
            confirmAddProject: true
        },
        {
            name: 'Robot Gladiators',
            description:
              'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
            languages: ['JavaScript'],
            link: 'https://dalyd14.github.io/robot-gladiators',
            feature: false,
            confirmAddProject: true
        },
        {
            name: 'Timeless Movies',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus condimentum vestibulum. Sed at dolor et risus varius bibendum. Vivamus vehicula rhoncus feugiat. Quisque volutpat condimentum lorem. Donec ut ipsum eget metus tempor facilisis. Cras tincidunt purus sit amet augue maximus, vel facilisis tellus facilisis. Cras congue nibh id orci posuere porttitor. Praesent metus dolor, facilisis eget metus sed, egestas interdum nisi. Proin vitae facilisis quam.',
            languages: [
                'HTML',
                'CSS',
                'JavaScript',
                'jQuery'
            ],
            link: 'https://dalyd14.github.io/movie-timeline/',
            feature: true
        }
    ]
}