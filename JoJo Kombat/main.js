'use strict'

const game = new Phaser.Game(1090, 613, Phaser.AUTO, 'game-canvas', { preload, create, update})
//random
let bg
let plat1, plat2, ground
let hp1, hp2 
let hitPlatform, hitGround
//cooldowns
let jump_cooldown = 1
let kick_cooldown = 60
let punch_cooldown = 20
//stats
let move = 400
let jump = 610
let dive = 200
let knockback
//Jotaro
let player
let jotpic
let jotaro_hp = 100
let Jsize = 1.4
let StarPlatinum = 250
let stand_counter = 0
let jotaro_jump = 0
let jotaro_punch = 0
let jotaro_kick = 0
let StarPlatinum_cooldown = 0
//Dio
let dio
let diopic
let Dsize = 1.4 
let dio_hp = 100
let The_World = 250
let The_World_cooldown = 0
let pose_counter = 0
let dio_jump = 0
let dio_punch = 0
let dio_kick = 0
//Dist
let max_kick_X, cur_kick_X, max_kick_Y, cur_kick_Y
let max_punch_X, cur_punch_X, max_punch_Y, cur_punch_Y
//Music
let diotheme
let jotarotheme
let warudo
let starplat
let roundabout
let punch
let ora
let muda
let zero
let bruh
let time_end
//let dost = 0, jost = 0
let kaktheme


function preload() {
game.load.image('JotaroWins', 'JotaroWins.png')
game.load.image('DioWins', 'DioWins.png')
game.load.image('diopic', 'diopic.png')
game.load.image('jotpic', 'jotpic.png')
game.load.spritesheet('romaBG', 'roma_sprt1.jpg', 1090, 613)
game.load.spritesheet('jotaro', 'Jotarofinished_kappa.png', 630 / 10, 1319 / 20)
game.load.spritesheet('dio', 'dio.png', 650 /10 , 1738 /22)
game.load.audio('dio theme', 'dios theme.ogg')
game.load.audio('the world', 'Za Warudo 1.ogg')
game.load.audio('dio tp', 'dio_tp.ogg')
game.load.audio('jotaro theme', 'jotaro_ost.ogg')
game.load.audio('ora', 'ora.ogg')
game.load.audio('muda', 'muda.ogg')
game.load.audio('Star_Plat1', 'StarPlat_TW.ogg')
game.load.audio('punch', 'punch.ogg')
game.load.audio('round', 'Round.ogg')
game.load.audio('zero', 'zero.ogg')
game.load.spritesheet('platform2', 'kqueen.png', 429, 96)
game.load.spritesheet('health', 'health.png', 628, 1184 / 8)
game.load.audio('TE', 'brrr.ogg')
game.load.audio('Kakost', 'noble pope.ogg')
}

function create() { 
    BG()
    JOTARO()
    DIO()
    OST()
    PALTFORM1()
    //PALTFORM2()
    GROUND()
    
    max_punch_X = player.width / 2 + dio.width / 2 - 50
    max_punch_Y = player.height / 2 + dio.height / 2
    max_kick_X = player.width / 2 + dio.width / 2 - 45
    max_kick_Y = player.height / 2 + dio.height / 2
    
    HEALTHBARDIO()
    HEALTHBARJOTARO()
}

function update () {
    game.physics.arcade.collide(player, plat1)
    game.physics.arcade.collide(player, plat2)
    game.physics.arcade.collide(player, ground)
    
    game.physics.arcade.collide(dio, plat1)
    game.physics.arcade.collide(dio, plat2)
    game.physics.arcade.collide(dio, ground)
    
     if (dio.x < player.x){
        knockback = -20
    } else knockback = 20

    
    
    JOTARO_ATK()
    DIO_ATK()
    JOTARO_MOVE()
    DIO_MOVE()
    FIZIKI_JOTARO()
    FIZIKI_DIO()
    DMGDIO()
    DMGJOTARO()
    CONTACTRIGHT()
    STOPTIME()
    DEATH()

    
    jotaro_punch += 1
    jotaro_kick += 1
 
    stand_counter += 1
    
    StarPlatinum_cooldown += 1

    dio_punch += 1
    dio_kick += 1

    pose_counter += 1
    
    The_World_cooldown += 1

    if(dio_hp > 0){
       StarPlatinum += 1 
    }
    else StarPlatinum = 0

    if(jotaro_hp > 0){
        The_World += 1
    }
    else The_World = 0

    if (stand_counter > 10){
        player.animations.play('stand')
    }
    if (pose_counter > 10){
        dio.animations.play('stand')    
    }

}

const BG = function(){
bg = game.add.sprite(0, 0, 'romaBG')
    bg.animations.add('warudo', [1], 60, true) 
    bg.frame = 1
diopic = game.add.image(250, 0, 'diopic')
diopic.scale.setTo(0.3)
jotpic = game.add.image(780, 0, 'jotpic')
jotpic.scale.setTo(0.3)  
}
const DIO = function(){
    
dio = game.add.sprite(200, 100, 'dio')
    dio.animations.add('flame', [121, 122, 123, 124, 125, 126, 127, 128, 129], 15, true)
    //dio.animations.add('za warudo', [0, 1, 2, 3], 6, true)
    dio.animations.add('walk', [116, 117, 118], 10, true)
    dio.animations.add('stand', [0, 1, 2, 3], 9, true)
    dio.animations.add('jump', [15, 16], 15, true) 
    dio.animations.add('punch', [75, 76, 77, 78], 20, false) 
    dio.animations.add('kick', [156, 157, 158, 159, 160], 20, false)
    dio.animations.add('deathDio', [33, 34, 35, 36, , 26, 27, 28], 10, false)
    dio.scale.setTo(Dsize)
    dio.anchor.setTo(0.5)
    game.physics.enable(dio)
}
const FIZIKI_DIO = function(){
    dio.body.collideWorldBounds = true
    dio.body.bounce.setTo(0.3, 0.1) 
    
}
const DIO_MOVE = function(){
    if (game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_4).isDown && StarPlatinum > 250) {
        dio.body.velocity.x = -move
        dio.animations.play('walk')
        dio.scale.setTo(-Dsize, Dsize)
        pose_counter = 5
    }else if (game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_6).isDown && StarPlatinum > 250) {
        dio.body.velocity.x = move
        dio.animations.play('walk')
        dio.scale.setTo(Dsize)
        pose_counter = 5
    }else {
        dio.body.velocity.x = 0 
    }    
    
    if (game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8).isDown && game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_1).isDown && dio_jump > jump_cooldown&& StarPlatinum > 250) { 
        dio.body.velocity.y = -jump * 2 
        dio.animations.play('jump')
        dio_jump = 0
        pose_counter = - 5
    }
   else if (game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_8).isDown && dio_jump > jump_cooldown && StarPlatinum > 250) {
        dio.body.velocity.y = -jump
        dio.animations.play('jump')
        dio_jump = 0
        pose_counter = - 5 
    }
    else if (game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_2).isDown && StarPlatinum > 250) {
        dio.body.velocity.y += dive
        pose_counter = 5
        dio.animations.play('jump')
        console.log('gay')
    }
    if (dio.y === 557.7 || dio.y === 375.9 || dio.y === 375.90000000000003 || dio.y === 232.4 || dio.y === 232.39999999999998){
        dio_jump += 1
    } 
     else (dio_jump = 0)
}
const DIO_ATK = function(){
    if (cur_punch_X <= max_punch_X && cur_punch_Y <= max_punch_Y && game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9).isDown && dio_punch > punch_cooldown && StarPlatinum > 250){
        console.log('punchDAMAGEDDDD')
        punch.play()
        muda.play()
        dio.animations.play('punch') 
        jotaro_hp -= 1
        player.x -= knockback
        dio_punch = 0
        pose_counter = -5 
    }
    else if (game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_9).isDown && dio_punch > punch_cooldown && StarPlatinum > 250){
        console.log('punchDDDD')
        dio.animations.play('punch')
        dio_punch = 0
        pose_counter = -5
        muda.play()
    }   
    if (cur_kick_X <= max_kick_X && cur_kick_Y <= max_kick_Y && game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7).isDown && dio_kick > kick_cooldown && StarPlatinum > 250){
        console.log('kickDAMAGEDDDDD')
        punch.play()
        muda.play()
        dio.animations.play('kick') 
        jotaro_hp -= 5
        player.x -= knockback * 2
        dio_kick = 0
        pose_counter = -5 
    }
    else if (game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_7).isDown && dio_kick > kick_cooldown && StarPlatinum > 250){
        console.log('kick')
        dio.animations.play('kick')
        dio_kick = 0
        pose_counter = -5
        muda.play()
    } 

    if (game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0).isDown && The_World_cooldown > 250 && dio_hp > 0 && jotaro_hp > 0){
        The_World = 0
        The_World_cooldown = 0
        warudo.play()
        //warudo.volume += 0.1
        //player.frame = 59
        pose_counter = -5
    } 
    if (The_World < 250 && jotaro_hp < 0){
        player.body.gravity.y = 50000
        player.body.velocity.x = 0
        player.body.velocity.y = 0
    }
    else if (The_World < 250){
        player.body.gravity.y = 0
        player.body.velocity.x = 0
        player.body.velocity.y = 0
        //player.frame = 0

        
    }else {player.body.gravity.y = 1000
    player.body.immovable = false} 
}
const JOTARO = function(){
    player = game.add.sprite(game.width / 2, 0 ,'jotaro')
    player.scale.setTo(Jsize) 
    player.animations.add('buzz', [6, 7, 8, 9, 10, 11, 12, 13], 15, true)
    player.animations.add('stand', [0, 1, 2, 3, 4, 5], 15, true)
    player.animations.add('jump', [144, 145, 146, 147, 148, 149, 150, 151], 15, true) 
    player.animations.add('punch', [95, 96, 97, 98, 99], 20, false) 
    player.animations.add('kick', [105, 106, 107, 108, 109], 15, false)
    //player.animations.add('StarPlatinumANI', [180, 181, 182, 183, 184, 185, 186, 187, 187, 188, 189], 20, false)
    player.animations.add('death', [37, 38, 39, 40, 30, 31, 32], 10, false)
    player.anchor.setTo(0.5)

    game.physics.enable(player)
}
const JOTARO_MOVE = function(){
    if (game.input.keyboard.addKey(Phaser.Keyboard.A).isDown && The_World > 250) {
        player.body.velocity.x = -move
        player.animations.play('buzz')
        player.scale.setTo(-Jsize, Jsize)
        stand_counter = 5 
    }else if (game.input.keyboard.addKey(Phaser.Keyboard.D).isDown && The_World > 250) {
        player.body.velocity.x = move
        player.animations.play('buzz')
        player.scale.setTo(Jsize)
        stand_counter = 5 
    }else {
        //player.animations.play('stand')
        player.body.velocity.x = 0 
    }    
    
    if (game.input.keyboard.addKey(Phaser.Keyboard.W).isDown && game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown && jotaro_jump > jump_cooldown && The_World > 250) { 
        player.body.velocity.y = -jump * 2 
        player.animations.play('jump')
        jotaro_jump = 0
        stand_counter = - 5 
    }
   else if (game.input.keyboard.addKey(Phaser.Keyboard.W).isDown && jotaro_jump > jump_cooldown && The_World > 250) {
        player.body.velocity.y = -jump
        player.animations.play('jump') 
        jotaro_jump = 0
        stand_counter = - 5 
    }
    else if (game.input.keyboard.addKey(Phaser.Keyboard.S).isDown && The_World > 250) {
        player.body.velocity.y += dive
        player.animations.play('jump')
        stand_counter = 5
    }
    if (player.y === 241.53499999999997 || player.y === 241.535 || player.y === 385.035 || player.y === 566.8349999999999){
       jotaro_jump += 1
   } 
    else (jotaro_jump = 0)
    
}
const JOTARO_ATK = function(){
    if (cur_punch_X <= max_punch_X && cur_punch_Y <= max_punch_Y && game.input.keyboard.addKey(Phaser.Keyboard.Q).isDown && jotaro_punch > punch_cooldown && The_World > 250){
        console.log('punchDAMAGE')
        punch.play()
        ora.play()
        player.animations.play('punch') 
        dio_hp -= 1
        dio.x += knockback
        jotaro_punch = 0
        stand_counter = -5 
    }
    else if (game.input.keyboard.addKey(Phaser.Keyboard.Q).isDown && jotaro_punch > punch_cooldown && The_World > 250){
        console.log('punch')
        ora.play()
        player.animations.play('punch')
        jotaro_punch = 0
        stand_counter = -5
    }  
    if (cur_kick_X <= max_kick_X && cur_kick_Y <= max_kick_Y && game.input.keyboard.addKey(Phaser.Keyboard.E).isDown && jotaro_kick > kick_cooldown && The_World > 250){
        console.log('kickDAMAGE')
        punch.play()
        ora.play()
        player.animations.play('kick') 
        dio_hp -= 5
        dio.x += knockback * 2
        jotaro_kick = 0
        stand_counter = -5 
    }
    else if (game.input.keyboard.addKey(Phaser.Keyboard.E).isDown && jotaro_kick > kick_cooldown && The_World > 250){
        console.log('kick')
        ora.play()
        player.animations.play('kick')
        jotaro_kick = 0
        stand_counter = -5
    } 

    if (game.input.keyboard.addKey(Phaser.Keyboard.X).isDown && StarPlatinum_cooldown > 250 && jotaro_hp > 0 && dio_hp > 0){
        StarPlatinum = 0
        StarPlatinum_cooldown = 0
        starplat.play()
        //player.animations.play('StarPlatinumANI')
        stand_counter = -10
    } 

    if (StarPlatinum < 250 && dio_hp < 0){
        dio.body.gravity.y = 50000
        dio.body.velocity.x = 0
        dio.body.velocity.y = 0
    }
    else if (StarPlatinum < 250){
        dio.body.gravity.y = 0
        dio.body.velocity.x = 0
        dio.body.velocity.y = 0
        //dio.frame = 0
        
    }else {dio.body.gravity.y = 1000
    dio.body.immovable = false} 
}
const FIZIKI_JOTARO = function(){
player.body.collideWorldBounds = true
player.body.bounce.setTo(0.3, 0.1)

}
const OST = function(){
    diotheme = game.add.audio('dio theme')
    jotarotheme = game.add.audio('jotaro theme')
    //tp = game.add.audio('dio tp')
    warudo = game.add.audio('the world')
    starplat = game.add.audio('Star_Plat1')
    roundabout = game.add.audio('round') 
    punch = game.add.audio('punch')
    zero = game.add.audio('zero')
    ora = game.add.audio('ora')
    muda = game.add.audio('muda')
    time_end = game.add.audio('TE')
    kaktheme = game.add.audio('Kakost')
    warudo.volume = 0.1
    ora.volume = 0.2
    muda.volume = 0.3
    punch.volume = 0.5
    roundabout.volume = 0.1
    zero.volume = 0.5
    starplat.volume = 0.2
    kaktheme.volume = 0.3
    kaktheme.play()
    kaktheme.loopFull()
}
const CONTACTRIGHT = function(){
    
    cur_punch_X = dio.x - player.x
    cur_punch_Y = player.y - dio.y

    if (cur_punch_X < 0) cur_punch_X *= -1
    if (cur_punch_Y < 0) cur_punch_Y *= -1


    cur_kick_X = dio.x - player.x
    cur_kick_Y = player.y - dio.y

    if (cur_kick_X < 0) cur_kick_X *= -1
    if (cur_kick_Y < 0) cur_kick_Y *= -1

      
    
} 
const STOPTIME = function(){
    if (StarPlatinum < 250 && dio_hp <= 0){
        bg.frame = 3
    }
    else if (The_World < 250 && jotaro_hp <= 0){
        bg.frame = 2
    }
    else if (StarPlatinum < 250 && dio_hp > 0){
        bg.frame = 0
    }
    else if (The_World < 250 && jotaro_hp > 0){
        bg.frame = 0

    }else bg.frame = 1
}
const PALTFORM1 = function(){
    
    plat1 = game.add.sprite(200, game.height / 2 , 'platform2')    
    plat1.scale.setTo(0.4)
    plat1.anchor.setTo(0.5)
    
    game.physics.enable(plat1, plat2, ground)
    
    plat1.body.allowGravity = false
    plat1.body.immovable = true
     
    
} 
const GROUND = function(){ 
    ground = game.add.sprite(700, 450, 'platform2')    
    ground.scale.setTo(0.4) 
    ground.anchor.setTo(0.5)
    
    game.physics.enable(ground)
    ground.body.allowGravity = false
    ground.body.immovable = true
} 
const PLATFORM2 = function(){ 
    plat2 = game.add.sprite(100, 150, 'platform2')    
    plat2.scale.setTo(0.6)
    plat2.anchor.setTo(0.5)
    
    game.physics.enable(plat2)
    plat2.body.allowGravity = false
    plat2.body.immovable = true
} 
const HEALTHBARDIO = function(){
    hp1 = game.add.sprite(0, 0, 'health')
    hp1.animations.add('gae', [0, 1, 2, 3, 4, 5, 6, 7], 60, false)
    hp1.scale.setTo(0.4)
}
const DMGDIO = function() {
    if (dio_hp === 100) {hp1.frame = 0}
    else if (dio_hp <100 && dio_hp >= 83) {hp1.frame = 1}
    else if (dio_hp <= 83 && dio_hp > 66) {hp1.frame = 2}
    else if (dio_hp <= 66 && dio_hp > 50) {hp1.frame = 3}
    else if (dio_hp <= 50 && dio_hp > 33) {hp1.frame = 4}
    else if (dio_hp <= 33 && dio_hp > 17) {hp1.frame = 5}
    else if (dio_hp <= 17 && dio_hp >= 1) {hp1.frame = 6}
    else if (dio_hp < 1) {hp1.frame = 7}
    //if (dio_hp < 40){
    //    jost = 1 
    //}
}
const HEALTHBARJOTARO = function(){
    hp2 = game.add.sprite(game.width, 0, 'health')
    hp2.animations.add('gae', [0, 1, 2, 3, 4, 5, 6, 7], 60, false)
    hp2.scale.setTo(-0.4, 0.4)
    //hp2.anchor.setTo(1, 0)
}
const DMGJOTARO = function() {
    if (jotaro_hp === 100) {hp2.frame = 0}
    //else if (jotaro_hp <100 && jotaro_hp >= 83) {hp2.frame = 1}
    else if (jotaro_hp <= 83 && jotaro_hp > 66) {hp2.frame = 2}
    else if (jotaro_hp <= 66 && jotaro_hp > 50) {hp2.frame = 3}
    else if (jotaro_hp <= 50 && jotaro_hp > 33) {hp2.frame = 4}
    else if (jotaro_hp <= 33 && jotaro_hp > 17) {hp2.frame = 5}
    else if (jotaro_hp <= 17 && jotaro_hp >= 1) {hp2.frame = 6}
    else if (jotaro_hp < 1) {hp2.frame = 7}

}
const DEATH = function() {
    if (jotaro_hp <= 0 && jotaro_hp >= -4){
        player.animations.play('death')
        stand_counter = -1000000
        The_World = -100000
        bruh = false
        jotaro_hp = - 5
        zero.play()
        roundabout.play()
        kaktheme.stop()
       
    } 
    else if (dio_hp <= 0 && dio_hp >= -4){
        dio.animations.play('deathDio')
        pose_counter = -1000000
        StarPlatinum = -100000
        bruh = false
        dio_hp = - 5
        roundabout.play()
        kaktheme.stop()
    } else {
        bruh = true 
        
    }

}