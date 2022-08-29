/*


    nasOS, hereby disclaims all copyright interest in the program “WhatMelody” (which deconstructs trees) written by nasOS.

    signature of Moe Ghoul 13 July 2022
    nasOS-official, President of nasOS

     This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>. 
*/
const { app, BrowserWindow, dialog, remote, Menu} = require('electron')
let level = require("./level.json");
const path = require('path');
const { executionAsyncResource } = require('async_hooks');
// var fs = require('fs');
require('@electron/remote/main').initialize()

//####################################################################################################
const menu = [
     { label:'Файл',
                 submenu: [
               {label:'Open level file',
              accelerator: "CmdOrCtrl+O",
              click() {

                lol();
                
                   }},
               {type:'separator'},
               {label:'Exit',
               accelerator: 'CmdOrCtrl+Q',
               click() {
                        app.quit()
                           }
               } ]}
 ]; 

const mainMenu = Menu.buildFromTemplate(menu);
Menu.setApplicationMenu(mainMenu);
const createWindow = () => {
  const win = new BrowserWindow({
    //kiosk: true,
    webPreferences: {
      nodeIntegration: true,
      enableremotemodule: true,
      contextIsolation: false,
      title: "lol"
    }
  })
  //mainWindow.loadFile('index.html')
  win.loadFile('main.html');
  win.setTitle("Угадай мелодию");
  //win.title('Угадай мелодию');

  //mainWindow.webContents.openDevTools()
}


function lol(){
  console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }));
  console.log("################################################ \nЗАГЛУШКА!");

}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
  // * (max - min) + min
}
function randomize_num() {
  return getRandomArbitrary(1, level.levels + 1);
}
function start_game() {
  test = randomize_num();
  console.log(test);
  //INIT HTML ELEMENTS
  one_btn = document.getElementById(level[test].correct_btn);
  btn_1_inc = document.getElementById(level[test].invalid[1]);
  btn_2_inc = document.getElementById(level[test].invalid[2]);
  linebr = document.getElementById('linebr');
  start = document.getElementById('start');
  title = document.getElementById('title');
  var music = new Audio(level[test].assets.sound)
  /*########################################################*/

  // console.log(levelnow)     
  console.log(level[String(test)].level);
  console.log(level[String(test)].assets.sound);
  start.hidden = true;
  title.innerHTML = level[test].title;
  music.play(); // plays the file
  music.loop = true;

  btn_1_inc.addEventListener("click", function () { alert(level[test].invalid_message); }, false);
  btn_2_inc.addEventListener("click", function () { alert(level[test].invalid_message); }, false);
  one_btn.addEventListener("click", function () { alert(level[test].valid_msg); document.location.replace('./main-blank.html'); }, false);
  btn_1_inc.innerHTML = level[test].vars[level[test].invalid[1]]
  btn_2_inc.innerHTML = level[test].vars[level[test].invalid[2]]
  one_btn.innerHTML = level[test].vars[level[test].correct_btn]
  linebr.hidden = false;
  btn_1_inc.hidden = false;
  btn_2_inc.hidden = false;
  title.hidden = false;
  one_btn.hidden = false;
}


function play_next() {

  test = randomize_num();
  console.log(test);
  //INIT HTML ELEMENTS
  var music = new Audio(level[test].assets.sound)
  one_btn = document.getElementById(level[test].correct_btn);
  btn_1_inc = document.getElementById(level[test].invalid[1]);
  btn_2_inc = document.getElementById(level[test].invalid[2]);
  title = document.getElementById('title');
  /*########################################################*/

  // console.log(levelnow)     
  // console.log(level[String(test)].level);
  // console.log(level[String(test)].assets.sound);
  title.innerHTML = level[test].title;
  music.play();
  music.loop = true;

  btn_1_inc.addEventListener("click", function () { alert(level[test].invalid_message); }, false);
  btn_2_inc.addEventListener("click", function () { alert(level[test].invalid_message); }, false);
  one_btn.addEventListener("click", function () { alert(level[test].valid_msg); location.reload() }, false);
  btn_1_inc.innerHTML = level[test].vars[level[test].invalid[1]]
  btn_2_inc.innerHTML = level[test].vars[level[test].invalid[2]]
  one_btn.innerHTML = level[test].vars[level[test].correct_btn]
  btn_1_inc.hidden = false;
  btn_2_inc.hidden = false;
  one_btn.hidden = false;
}
