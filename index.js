const fs = require('fs')
const  fse  = require('fs-extra')
const  process = require('process')
const  njh = require('node-inject-html')

const { injectHTML } = njh

console.log('current path : ',process.cwd())

const sourceFolder = './dist/'
const distFolder = '../node js/dist/'

// read the data first
const html = fs.readFileSync('dist/index.html', 'utf-8')

const injectedHTML = injectHTML(html, {
    headStart: '<script>{{{body}}}</script>'
})

fse.copySync(sourceFolder, distFolder, {overwrite : true}, (err) => {
    if(err) {
        console.log('error')
    }else {
        console.log('all good')
    }
})

process.chdir(distFolder);

fse.removeSync('index.html')

process.chdir('../views/layouts/');

fse.writeFileSync('main.handlebars' , injectedHTML)

// delete all data in nodejs/dist