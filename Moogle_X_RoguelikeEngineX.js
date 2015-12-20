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
    if (this.logs().length >= 20) {
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
        Moogle_X.REX.DatabaseLoaded = true;
    }
    return true;
};

DataManager.readNotetags_REX1 = function(group) {

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
};

// Plugin Command "REX Mode Off"
Game_System.prototype.rexModeOff = function() {
    this._rexMode = false;
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
        return event.rexIsBattler();
    });
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
    //this._rexLeaderStatusWindow = null;
    //this.addChild(this._rexLeaderStatusWindow);
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
