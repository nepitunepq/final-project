import { skillCount as skillUse } from './main.js';

import { score1 as scoreTa1 } from './main.js';
import { score2 as scoreTa2 } from './main.js';

import { whichTa as thisTa } from './main.js';

import { activateBonus , sendUpdateScore} from './main.js';
import { sendUsedSkillCount } from './main.js';

var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%'
  },
  transparent: true,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var game = new Phaser.Game(config);
var score;
var scaleFactor;
var centerX;
var centerY;
var image1, image2, image3;
var text1, text2, text3;
var sound1, sound2_1, sound2_2, sound3, alertSound;
var soundCheck = false;

function preload() {
  this.load.image('image1', '../resources/skillImage/skillOne.png');
  this.load.image('image2', '../resources/skillImage/skillTwo.png');
  this.load.image('image3', '../resources/skillImage/skillThree.png');

  this.load.audio('sound1', '../resources/skillSound/skillOne.mp3');
  this.load.audio('sound2_1', '../resources/skillSound/skillTwo_1.mp3');
  this.load.audio('sound2_2', '../resources/skillSound/skillTwo_2.mp3');
  this.load.audio('sound3', '../resources/skillSound/skillThree.mp3');
  this.load.audio('alertSound', '../resources/skillSound/alertSound.mp3');
}

function create() {

  centerX = this.cameras.main.centerX;
  centerY = this.cameras.main.centerY;

  var canvas = document.querySelector('canvas');
  var canvasRect = canvas.getBoundingClientRect();

  scaleFactor = Math.max(canvasRect.width / 1500, canvasRect.height / 600);

  sound1 = this.sound.add('sound1');
  sound2_1 = this.sound.add('sound2_1');
  sound2_2 = this.sound.add('sound2_2');
  sound3 = this.sound.add('sound3');
  alertSound = this.sound.add('alertSound');

  image1 = this.add.image(0, 0, 'image1').setVisible(false);
  image1.setScale(scaleFactor);
  image1.setPosition(centerX, centerY);
  image2 = this.add.image(0, 0, 'image2').setVisible(false);
  image2.setScale(scaleFactor);
  image2.setPosition(centerX, centerY);
  image3 = this.add.image(0, 0, 'image3').setVisible(false);
  image3.setScale(scaleFactor);
  image3.setPosition(centerX, centerY);

  text1 = this.add.text(0, 0, `Click 00 times\nto activate this skill!!`,
    {
      fontFamily: 'Georgia',
      fontSize: '24px',
      color: '#ff0000',
      fontWeight: 'bold',
      align: 'center',
      backgroundColor: '#ffffff',
      backgroundPadding : '5px'
    }).setVisible(false);
  text1.setScale(scaleFactor);
  text1.setPosition(centerX - (text1.width / 2), centerY - (text1.height / 2));


  text2 = this.add.text(0, 0, `Click 00 times\nto activate this skill!!`,
    {
      fontFamily: 'Georgia',
      fontSize: '24px',
      color: '#ff0000',
      fontWeight: 'bold',
      align: 'center',
      backgroundColor: '#ffffff',
    }).setVisible(false);
  text2.setScale(scaleFactor);
  text2.setPosition(centerX - (text2.width / 2), centerY - (text2.height / 2));

  text3 = this.add.text(0, 0, `Click 00 times\nto activate this skill!!`,
    {
      fontFamily: 'Georgia',
      fontSize: '24px',
      color: '#ff0000',
      fontWeight: 'bold',
      align: 'center',
      backgroundColor: '#ffffff',
    }).setVisible(false);
  text3.setScale(scaleFactor);  
  text3.setPosition(centerX - (text3.width / 2), centerY - (text3.height / 2));

  var button1 = document.getElementById(`skill1Button`);
  button1.addEventListener('click', function () {
    if (thisTa == 1) {
      score = scoreTa1;
    } else if (thisTa == 2) {
      score = scoreTa2;
    }
    if (skillUse.value >= 10) {
      sendUsedSkillCount(1,thisTa-1);
      score.value += 50;
      sendUpdateScore(50,thisTa);
      skillUse.value -= 10;

      image1.setVisible(true);

      sound1.play();

      this.tweens.add({
        targets: image1,
        alpha: 1,
        duration: 2000,
        ease: 'Linear',
        onComplete: function () {
          image1.setVisible(false);
        }
      });
    } else {
      if (soundCheck == false){
        soundCheck = true;
        alertSound.play();
      };
      text1.setAlpha(1);
      text1.setVisible(true);
      this.tweens.add({
        targets: text1,
        alpha: 0,
        duration: 500,
        ease: 'Linear',
        onComplete: function () {
          text1.setVisible(false);
          soundCheck = false;
        }
      });
    }
  }.bind(this));

  var button2 = document.getElementById(`skill2Button`);
  button2.addEventListener('click', function () {
    if (thisTa == 1) {
      score = scoreTa1;
    } else if (thisTa == 2) {
      score = scoreTa2;
    }
    if (skillUse.value >= 50) {
      sendUsedSkillCount(2,thisTa-1);
      score.value = Math.max(score.value-100,0);
      sendUpdateScore(-100,thisTa);
      skillUse.value -= 50;

      image2.setVisible(true);

      sound2_1.play();
      setTimeout(() => {
        sound2_2.play();
      }, 1000);

      this.tweens.add({
        targets: image2,
        alpha: 1,
        duration: 2000,
        ease: 'Linear',
        onComplete: function () {
          image2.setVisible(false);
        }
      });

    } else {
      if (soundCheck == false){
        soundCheck = true;
        alertSound.play();
      };
      text2.setAlpha(1);
      text2.setVisible(true);
      this.tweens.add({
        targets: text2,
        alpha: 0,
        duration: 500,
        ease: 'Linear',
        onComplete: function () {
          text2.setVisible(false);
          soundCheck = false;
        }
      });
    }
  }.bind(this));

  var button3 = document.getElementById(`skill3Button`);
  button3.addEventListener('click', function () {
    if (skillUse.value >= 100) {
      sendUsedSkillCount(3,thisTa-1);

      image3.setVisible(true);

      skillUse.value -= 100;

      sound3.play();

      this.tweens.add({
        targets: image3,
        alpha: 1,
        duration: 2000,
        ease: 'Linear',
        onComplete: function () {
          image3.setVisible(false);
        }
      });

      activateBonus();

    } else {
      if (soundCheck == false){
        soundCheck = true;
        alertSound.play();
      };
      text3.setAlpha(1);
      text3.setVisible(true);
      this.tweens.add({
        targets: text3,
        alpha: 0,
        duration: 500,
        ease: 'Linear',
        onComplete: function () {
          text3.setVisible(false);
          soundCheck = false;
        }
      });
    }
  }.bind(this));
}

function update() {
  text1.text = `Click ${Math.max(10 - skillUse.value, 0)} times\nto activate this skill!!`;

  text2.text = `Click ${Math.max(50 - skillUse.value, 0)} times\nto activate this skill!!`;

  text3.text = `Click ${Math.max(100 - skillUse.value, 0)} times\nto activate this skill!!`;

  this.scale.on('resize', function (gameSize) {
    // Calculate the new center of the game
    let centerX = gameSize.width / 2;
    let centerY = gameSize.height / 2;

    // Update the position of the images
    image1.setPosition(centerX, centerY);
    image2.setPosition(centerX, centerY);
    image3.setPosition(centerX, centerY);
    text1.setPosition(centerX,centerY);
    text2.setPosition(centerX,centerY);
    text3.setPosition(centerX,centerY);
});
}
