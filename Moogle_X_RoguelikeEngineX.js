//=============================================================================
// Roguelike Engine X by Moogle_X (Work In Progress)
// Moogle_X_RoguelikeEngineX.js
// Created on: December 20th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_REX = true;

var Moogle_X = Moogle_X || {};
Moogle_X.REX = Moogle_X.REX || {};

//=============================================================================
/*:
 * @plugindesc v1.0 Adds Roguelike battle system to your game.
 * @author Moogle_X
 *
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 *
 * ============================================================================
 * Notetags and Plugin Commands List
 * ============================================================================
 * Actors, Classes, Weapons, Armors, and States Notetags:
 * <REX Belly Rate: x%>
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free to use in both commercial and non-commercial project as long as credit
 * is given.
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 * Version 1.0:
 * - Completed plugin.
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Moogle_X.REX.parameters = PluginManager.parameters('Moogle_X_RoguelikeEngineX');

//=============================================================================
// Constant Declaration
//=============================================================================

Game_BattlerBase.TRAIT_REX_BELLY_RATE = 114; // New trait code.

//=============================================================================
// RexLog
//=============================================================================

function RexLog() {
    throw new Error('This is a static class');
}

RexLog.logs = function() {
    return $gameSystem._rexLog;
};

RexLog.add = function(text) {
    if (this.logs().length >= 20) { // Replace 20 with parameter later.
        this.logs().shift();
    }
    this.logs().push(text);
    console.log(text);  // Testing.
};

//=============================================================================
// DataManager
//=============================================================================

Moogle_X.REX.DatabaseLoaded = false;
Moogle_X.REX.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.REX.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Moogle_X.REX.DatabaseLoaded) {
        DataManager.readNotetags_REX1($dataActors);
        DataManager.readNotetags_REX1($dataClasses);
        DataManager.readNotetags_REX1($dataWeapons);
        DataManager.readNotetags_REX1($dataArmors);
        DataManager.readNotetags_REX1($dataStates);
        Moogle_X.REX.DatabaseLoaded = true;
    }
    return true;
};

DataManager.readNotetags_REX1 = function(group) {
  var note1 = /<(?:REX BELLY RATE):[ ](\d+)\%>/i;

  for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);

      for (var i = 0; i < notedata.length; i++) {
          var line = notedata[i];
          if (line.match(note1)) {
              var rate = Number(RegExp.$1) / 100;
              var code = Game_BattlerBase.TRAIT_REX_BELLY_RATE;
              var bellyRate = [{"code":code,"dataId":0,"value":rate}];
              obj.traits = obj.traits.concat(bellyRate);
          }
      }
  }
};


//=============================================================================
// Game_System
//=============================================================================

Moogle_X.REX.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Moogle_X.REX.Game_System_initialize.call(this);
    this.rexInitGameSystem();
};

Game_System.prototype.rexInitGameSystem = function() {
    this._rexMode = false;
    this._rexLog = [];
};

// Plugin Command "REX Mode On"
Game_System.prototype.rexModeOn = function() {
    this._rexMode = true;
    // Add window RexLog show later.
};

// Plugin Command "REX Mode Off"
Game_System.prototype.rexModeOff = function() {
    this._rexMode = false;
    // Add window RexLog hide later.
};

Game_System.prototype.rexMode = function() {
    return this._rexMode;
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Moogle_X.REX.Game_CharacterBase_initMembers =
    Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    Moogle_X.REX.Game_CharacterBase_initMembers.call(this);
    this.rexInitGameCharacterBase();
};

Game_CharacterBase.prototype.rexInitGameCharacterBase = function() {
    this._rexIsBattler = false;
    this._rexBattler = null;
};

Game_CharacterBase.prototype.rexIsBattler = function() {
    return this._rexIsBattler;
};


//=============================================================================
// Game_Event
//=============================================================================

Moogle_X.REX.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    Moogle_X.REX.Game_Event_initialize.call(this, mapId, eventId);
    this.rexInitGameEvent();
};

Game_Event.prototype.rexInitGameEvent = function() {
    this.rexInitEnemy();
};

Game_Event.prototype.rexInitEnemy = function() {
    var note = /<(?:REX ENEMY):[ ](\d+)>/i;
    var name = this.event().name;
    if (name.match(note)) {
        var enemyId = Number(RegExp.$1);
        this._rexIsBattler = true;
        this._rexBattler = new Game_Enemy(enemyId, 0, 0);
    }
};

Game_Event.prototype.rexBattler = function() {
    return this._rexBattler;
};

//=============================================================================
// Game_Player
//=============================================================================

// Testing enemy auto movement.
Game_Player.prototype.moveStraight = function(d) {
    if (this.canPass(this.x, this.y, d)) {
        this._followers.updateMove();
        $gameMap.rexUpdateEnemyMovement();
    }
    Game_Character.prototype.moveStraight.call(this, d);
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.rexUpdateEnemyMovement = function() {
    var enemies = this.rexGetEnemyList();
    enemies.forEach(function(enemy) {
        enemy.moveTypeRandom();
    });
};

Game_Map.prototype.rexGetEnemyList = function() {
    return this._events.filter(function(event) {
        if (event) { // Fix error when loading save file.
            return event.rexIsBattler();
        }
    });
};

//=============================================================================
// Game_Party
//=============================================================================

Moogle_X.REX.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    Moogle_X.REX.Game_Party_initialize.call(this);
    this.rexInitPartyBelly();
};

Game_Party.prototype.rexInitPartyBelly = function() {
    this._rexBelly = 0;
    this._rexBellyBase = 100;
    this._rexBellyPlus = 0;
    this.rexBellyRefresh();
};

Game_Party.prototype.rexBelly = function() {
    return this._rexBelly;
};

Game_Party.prototype.rexBellyRefresh = function() {
    this._rexBelly = this.rexMaxBelly();
};

Game_Party.prototype.rexMaxBelly = function() {
    var baseValue = this._rexBellyBase + this._rexBellyPlus;
    var modifier = this.rexBellyModifier();
    var total = baseValue * modifier;
    total = Math.max(total, 0);
    total = Math.round(total);
    return total;
};

Game_Party.prototype.rexBellyModifier = function() {
    var array = this.battleMembers().map(function(member) {
        return member.rexBellyModifier();
    });
    return array.reduce(function(r, mod) {
        return r * mod;
    }, 1);
};

Game_Party.prototype.rexBellyGain = function(value) {
    var gain = Math.max(value, 0);
    gain = Math.round(gain);
    this._rexBelly += gain;
    this._rexBelly = Math.min(this._rexBelly, this.rexMaxBelly());
};

Game_Party.prototype.rexBellyLose = function(value) {
    var lose = Math.max(value, 0);
    lose = Math.round(lose);
    this._rexBelly -= lose;
    this._rexBelly = Math.max(this._rexBelly, 0);
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.rexBellyModifier = function() {
    return this.traitsPi(Game_BattlerBase.TRAIT_REX_BELLY_RATE, 0);
};

//=============================================================================
// Scene_Map
//=============================================================================

Moogle_X.REX.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    this.rexCreateStatusWindows();
    this.rexCreateBattleLogWindow();
    Moogle_X.REX.Scene_Map_createAllWindows.call(this);
};

Scene_Map.prototype.rexCreateStatusWindows = function() {
    this.rexCreateLeaderStatusWindow();
    this.rexCreatePartyStatusWindow();
};

Scene_Map.prototype.rexCreateLeaderStatusWindow = function() {
    this._rexLeaderStatusWindow = new Window_RexLeaderStatus();
    this.addChild(this._rexLeaderStatusWindow);
};

Scene_Map.prototype.rexCreatePartyStatusWindow = function() {
    //this._rexPartyStatusWindow = null;
    //this.addChild(this._rexPartyStatusWindow);
};

Scene_Map.prototype.rexCreateBattleLogWindow = function() {
    //this._rexBattleLogWindow = new Window_RexLog();
    //this.addChild(this._rexBattleLogWindow);
};

//=============================================================================
// Window_RexLeaderStatus
//=============================================================================

function Window_RexLeaderStatus() {
    this.initialize.apply(this, arguments);
}

Window_RexLeaderStatus.prototype = Object.create(Window_Base.prototype);
Window_RexLeaderStatus.prototype.constructor = Window_RexLeaderStatus;

Window_RexLeaderStatus.prototype.initialize = function(x, y) {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(1);
    this._width = width;
    this._height = height;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.opacity = 0;
    this.refresh();
};

Window_RexLeaderStatus.prototype.refresh = function() {
    this.contents.clear();
    this.resetFontSettings();
    this.drawBackground(0, 0, this._width, this._height);
    this.drawText("B2F", 0, 0, this._width, 'left');
    this.drawText("Harold", 100, 0, this._width, 'left');
    this.drawActorHp($gameActors.actor(1), 240, 0, 180);
    this.drawActorMp($gameActors.actor(1), 450, 0, 180);
    this.drawActorTp($gameActors.actor(1), 660, 0, 180);
    this.drawText("100%", 855, 0, 50);
    //this.drawText("Marsha", 100, this.lineHeight(), this._width, 'left');
    //this.drawActorHp($gameActors.actor(3), 240, this.lineHeight(), 180);
    //this.drawActorMp($gameActors.actor(3), 450, this.lineHeight(), 180);
    //this.drawActorTp($gameActors.actor(3), 660, this.lineHeight(), 180);
};

Window_RexLeaderStatus.prototype.drawBackground = function(x, y, width, height) {
    this.showBackgroundDimmer();
};

//=============================================================================
// Window_RexLog
//=============================================================================

function Window_RexLog() {
    this.initialize.apply(this, arguments);
}

Window_RexLog.prototype = Object.create(Window_Base.prototype);
Window_RexLog.prototype.constructor = Window_RexLog;

Window_RexLog.prototype.initialize = function(x, y) {
    Window_Base.prototype.initialize.call(this);
};


//=============================================================================
// End of File
//=============================================================================
