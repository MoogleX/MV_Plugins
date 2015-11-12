//=============================================================================
// Actors Friendship System by Moogle_X
// Moogle_X_ActorsFriendshipSystem.js
// Created on: November 12nd 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_AFS = true;

var Moogle_X = Moogle_X || {};
Moogle_X.AFS = Moogle_X.AFS || {};

//=============================================================================
/*:
 * @plugindesc v1.0 Adds friendship mechanic between main char and party members.
 * @author Moogle_X
 *
 * @param Main Actor ID
 * @desc This is actor ID of your main character.
 * @default 1
 *
 * @param Default Max Level
 * @desc This is the default value for max friendship level for all actors.
 * @default 10
 *
 * @param Default Exp for Level Up
 * @desc This is the default value for "Friendship Exp" needed to level up.
 * @default 20
 *
 * @param Friendship Gain Each Battle
 * @desc "Friendship Exp" gained for each active party members if Main Actor is in active party as well.
 * @default 1
 *
 * @param Allows Level Down
 * @desc Decide whether "Friendship Level" can decrease or not. 1:Yes 0:No
 * @default 0
 *
 * @param ---Scene---
 * @default
 *
 * @param Show in Main Menu
 * @desc Put "Show Friendship" scene command in main menu. 1:Yes 0:No
 * @default 1
 *
 * @param Menu Vocab
 * @desc Change the "Show Friendship" command name in main menu.
 * @default Friendship
 *
 * @param Show Menu Switch ID
 * @desc Turning on the in-game switch with this ID will put scene command in main menu. Put 0 to ignore this feature.
 * @default 0
 *
 * @param Help Text
 * @desc This is the text at the top of "Show Friendship" scene.
 * @default View Friendship Data
 *
 * @param ---Friendship Gauge---
 * @default
 *
 * @param Gauge Height
 * @desc This is the height of Friendship Gauge in "Show Friendship" scene.
 * @default 6
 *
 * @param Gauge Width
 * @desc This is the width of Friendship Gauge in "Show Friendship" scene.
 * @default 382
 *
 * @param Color 1
 * @desc This is the gradient color 1 of Friendship Gauge.
 * @default 24
 *
 * @param Color 2
 * @desc This is the gradient color 2 of Friendship Gauge.
 * @default 29
 *
 * @param ---Friendship Level---
 * @default
 *
 * @param Friendship Level Text
 * @desc Change "Friendship Level" text in "Show Friendship" scene.
 * @default Friendship Level
 *
 * @param Friendship Level Offset X
 * @desc Change the offset X value of "Friendship Level" text in "Show Friendship" scene. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Level Number Offset X
 * @desc Change the offset X value of "Friendship Level" number in "Show Friendship" scene. (Positive: right; Negative: left)
 * @default 0
 *
 * @param ---Current FP (aka "Friendship Points")---
 * @default
 *
 * @param Current FP Text
 * @desc Change "Current FP" text in "Show Friendship" scene.
 * @default Current FP
 *
 * @param Current FP Offset X
 * @desc Change the offset X value of "Current FP" text in "Show Friendship" scene. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Current FP Number Offset X
 * @desc Change the offset X value of "Current FP" number in "Show Friendship" scene. (Positive: right; Negative: left)
 * @default 0
 *
 * @param ---To Next Level---
 * @default
 *
 * @param Next Level Text
 * @desc Change "To Next Level" text in "Show Friendship" scene.
 * @default To Next Level
 *
 * @param Next Level Offset X
 * @desc Change the offset X value of "To Next Level" text in "Show Friendship" scene. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Next Level Number Offset X
 * @desc Change the offset X value of "To Next Level" number in "Show Friendship" scene. (Positive: right; Negative: left)
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin adds friendship mechanic between the main actor and other actors
 * of your choice. Each actor has their own friendship value that can be
 * increased or decreased multiple ways.
 *
 * As the friendship value grows, that actor's friendship level may level up.
 * You can set some skills to be automatically learned at certain friendship
 * level.
 *
 * There is also the option to store certain actor's friendship value or
 * friendship level into in-game variable. You can then use that variable's
 * value as a conditional trigger for new event, etc.
 *
 * Actor's friendship value can be viewed in custom scene. You can access it
 * from the main menu or simply by using plugin command.
 *
 * IMPORTANT!
 * By default, no actor's friendship data will be shown. In order for it to
 * show up in the scene, you must first manually "unlock" that actor by using
 * this plugin command:
 *
 * AFP Show Actor x     // Replace x with Actor ID number.
 *                         Ex: AFP Show Actor 2
 *
 * If you want to hide certain actor in the scene for some reason, simply use
 * this plugin command:
 *
 * AFP Hide Actor x     // Replace x with Actor ID number.
 *                         Ex: AFP Hide Actor 3
 *
 * ============================================================================
 * How to Change Friendship Value
 * ============================================================================
 * There are 3 methods to increase or decrease friendship value. The easiest
 * method is using plugin command. With plugin command, you can increase or
 * decrease actor's friendship value by certain amount.
 *
 * The second method is using skills and items. By default, all skills and
 * items increase actor's friendship value by 0 amount. You can change this by
 * inserting new notetags into the skill/item's notebox. The value can be
 * either positive or negative. You can make the same skill/item to have
 * different effects on different actors.
 *
 * For example, the skill "Heal" with these notetags:
 *
 * <FP Gain 2: 5>
 * <FP Gain 3: -10>
 * <FP Gain Default: 1>
 *
 * That means "Heal" will increase Actor 2's FP (Friendship Points) by 2,
 * decrease Actor 3's FP by 10, and increase other actors' FP by 1.
 * Items also share similar notetags.
 *
 * There are more requirements for skills and items to apply changes to any
 * actor's FP. In battle, the user of those skills and items has to be the
 * Main Actor. On the map, there are different requirements:
 *
 * 1. For skills, the user must be the Main Actor.
 * 2. For items, Main Actor must be in the party (active or not).
 *
 * The third and the last method to increase actor's FP is by having the actor
 * as one of the active battle members. All actors in active battle party will
 * gain certain amount of FP at the end of each battle (win or not).
 * Keep in mind that the Main Actor must battle alongside them as well in order
 * to increase their's FP. Otherwise, there will be no FP gain.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * AFP Open               : Open "Show Friendship" scene.
 * AFP Var x Level y      : Change the value of Variable x with the Friendship
 *                          Level of Actor y.
 *                      Ex: AFP Var 5 Level 2  // Variable 5 will become the
 *                                                Friendship Level of Actor 2.
 * AFP Var x FP y         : Change the value of Variable x with the total
 *                          Friendship Points of Actor y.
 *                      Ex: AFP Var 6 FP 3  // Variable 6 will become the total
 *                                             Friendship Points of Actor 3.
 * AFP Actor x Level Up   : Increase Actor x Friendship Level by 1.
 * AFP Actor x Level Down : Decrease Actor x Friendship Level by 1.
 * AFP Actor x Gain y     : Increase Actor x FP by y amount.
 *                      Ex: AFP Actor 1 Gain 100  // Actor 1 gain 100 FP.
 * AFP Actor x Lose y     : Decrease Actor x FP by y amount.
 *                      Ex: AFP Actor 4 Lose 50   // Actor 4 lose 50 FP.
 * AFP Show Actor x       : "Unlock" Actor x in "Show Friendship" scene.
 * AFP Hide Actor x       : Hide Actor x in "Show Friendship" scene.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 * 1. Actors Notetags
 *
 * <FP Skill x: y>                // Learn skill y at Friendship Level x.
 * <FP Skill x: y1, y2, y3, y4>   // Learn skill y1, y2, y3, y4 at Friendship
 *                                   Level x.
 * <FP Exp: x1, x2, x3>           // The "exp chart" for each level up.
 * <FP Max Level: x>              // Maximum Friendship Level of this actor is
 *                                   level x.
 * Example:
 *
 * <FP Skill 2: 20, 25, 33>       // At Friendship Level 2, this actor will
 *                                   learn skills 20, 25, and 33.
 * <FP Skill 3: 40>               // At Friendship Level 3, this actor will
 *                                   learn skill 40.
 * <FP Skill 6: 100, 101>         // At Friendship Level 6, this actor will
 *                                   learn skill 100 and 101.
 * <FP Exp: 20, 30, 40, 60>       // FP need for each level up. The first level
 *                                   up need 20 FP, the 2nd level up need 30 FP,
 *                                   the 3rd level up need 40 FP, and so on.
 * <FP Max Level: 5>              // This is the maximum Friendship Level of
 *                                   this actor.
 *
 * 2. Skills and Items Notetags
 *
 * <FP Gain x: y>                 // Increase Actor x FP by y amount. Value of
 *                                   y can be negative.
 * <FP Gain Default: x>           // Increase any other Actors' FP not mention
 *                                   by above notetag by x amount. Value of x
 *                                   can be negative.
 * Example:
 * <FP Gain 8: 20>                // Actor 8 will gain 20 FP.
 * <FP Gain 5: -5>                // Actor 5 will lose 5 FP.
 * <FP Gain Default: 10>          // All actors beside Actor 5 and Actor 8 will
 *                                   gain 10 FP.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free to use in both commercial and non-commercial project as long as credit
 * is given.
 *
 */
//=============================================================================

(function() { // IIFE

//=============================================================================
// Parameter Variables
//=============================================================================

var parameters = PluginManager.parameters('Moogle_X_ActorsFriendshipSystem');
var fpDefMaxLvl = Number(parameters['Default Max Level'] || 10);
var fpDefExp = Number(parameters['Default Exp for Level Up'] || 20);
var canLvlDown = Number(parameters['Allows Level Down']) != 0;
var mainCharId = Number(parameters['Main Actor ID'] || 1);
var battleFp = Number(parameters['Friendship Gain Each Battle'] || 0);
var helpText = String(parameters['Help Text'] || '');
var fpGaugeHeight = Number(parameters['Gauge Height'] || 6);
var fpGaugeWidth = Number(parameters['Gauge Width'] || 382);
var fpColorOne = Number(parameters['Color 1'] || 24);
var fpColorTwo = Number(parameters['Color 2'] || 29);
var fpLevelText = String(parameters['Friendship Level Text'] || '');
var fpLevelOffsetX = Number(parameters['Friendship Level Offset X'] || 0);
var levelNumOffsetX = Number(parameters['Level Number Offset X'] || 0);
var currentFpText = String(parameters['Current FP Text'] || '');
var currentFpOffsetX = Number(parameters['Current FP Offset X'] || 0);
var currentFpNumOffsetX = Number(parameters['Current FP Number Offset X'] || 0);
var nextLevelText = String(parameters['Next Level Text'] || '');
var nextLevelOffsetX = Number(parameters['Next Level Offset X'] || 0);
var nextLevelNumOffsetX = Number(parameters['Next Level Number Offset X'] || 0);
var showFpMenu = Number(parameters['Show in Main Menu']) != 0;
var fpTitle = String(parameters['Menu Vocab'] || 'Friendship');
var fpMenuSwitch = Number(parameters['Show Menu Switch ID'] || 0);


//=============================================================================
// DataManager
//=============================================================================

Moogle_X.AFS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.AFS.DataManager_isDatabaseLoaded.call(this)) return false;
		DataManager.readNotetags_AFS1($dataActors);
    DataManager.readNotetags_AFS2($dataItems);
    DataManager.readNotetags_AFS2($dataSkills);
		return true;
};

DataManager.readNotetags_AFS1 = function(group) {
    var note1 = /<(?:FP EXP):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
    var note2 = /<(?:FP SKILL)[ ](\d+):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
    var note3 = /<(?:FP MAX LEVEL):[ ](\d+)>/i;
  	for (var n = 1; n < group.length; n++) {
        var obj = group[n];
  		  var notedata = obj.note.split(/[\r\n]+/);

        obj.fpExpChart = [];
        obj.fpSkills = {};

        for (var i = 0; i < notedata.length; i++) {
  			    var line = notedata[i];
            if (line.match(note1)) {
                var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                obj.fpExpChart = obj.fpExpChart.concat(array);
            } else if (line.match(note2)) {
                var level = Number(RegExp.$1);
                var list = JSON.parse('[' + RegExp.$2.match(/\d+/g) + ']');
                obj.fpSkills[level] = list;
            } else if (line.match(note3)) {
                var maxLevel = Number(RegExp.$1);
                obj.fpMaxLvl = maxLevel > 0 ? maxLevel : 1;
            }
        }
  	}
};

DataManager.readNotetags_AFS2 = function(group) {
    var note1 = /<(?:FP GAIN)[ ](\d+):[ ](.*)>/i;
    var note2 = /<(?:FP GAIN DEFAULT):[ ](.*)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
  		  var notedata = obj.note.split(/[\r\n]+/);

        obj.fpGain = {};

        for (var i = 0; i < notedata.length; i++) {
  			    var line = notedata[i];
            if (line.match(note1)) {
                var actorId = Number(RegExp.$1);
                var gain = Number(RegExp.$2);
                obj.fpGain[actorId] = gain;
            } else if (line.match(note2)) {
                var defaultGain = Number(RegExp.$1);
                obj.fpGain["default"] = defaultGain;
            }
        }
  	}
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.canChangeFp = function(fpValue) {
    return false; // Initialize value for Game_Enemy.
};

//=============================================================================
// Game_Actor
//=============================================================================

Moogle_X.AFS.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    Moogle_X.AFS.Game_Actor_initMembers.call(this);
    this._fpExp = 0;
    this._fpLvl = 0;
    this._fpExpChart = [];
    this._fpSkills = {};
    this._showFp = false; // Show actor in friendship scene.
};

Moogle_X.AFS.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Moogle_X.AFS.Game_Actor_setup.call(this, actorId);
    this.initFpExpSetup();
    this.initFpSkills();
};

Game_Actor.prototype.initFpExpSetup = function() {
    this._fpLvl = 1;
    this._fpMaxLvl = this.actor().fpMaxLvl || fpDefMaxLvl;
    var expChart = this.actor().fpExpChart;

    // Initialize the friendship experience requirements.
    for (var i = 0; i < this._fpMaxLvl; i++) {
        var n = expChart[i] || fpDefExp;
        this._fpExpChart.push(n);
    }
};

Game_Actor.prototype.initFpSkills = function() {
    this._fpSkills = this.actor().fpSkills;
    this.learnFpSkill(1);
};

Game_Actor.prototype.learnFpSkill = function(fp_level) {
    if (this._fpSkills[fp_level]) {
        this._fpSkills[fp_level].forEach(function(fpSkillId) {
            this.learnSkill(fpSkillId);
        }, this);
    }
};

Game_Actor.prototype.forgetFpSkill = function(fp_level) {
    if (this._fpSkills[fp_level]) {
        this._fpSkills[fp_level].forEach(function(fpSkillId) {
            this.forgetSkill(fpSkillId);
        }, this);
    }
};

Game_Actor.prototype.isMaxFpLevel = function() {
    return this._fpLvl >= this._fpMaxLvl;
};

Game_Actor.prototype.isMinFpLevel = function() {
    return this._fpLvl <= 1;
};

Game_Actor.prototype.fpLevelUp = function() {
    if (!this.isMaxFpLevel()) {
        this._fpLvl++;
        this.learnFpSkill(this._fpLvl);
    }
    this.refresh();
};

// Plugin Command <AFP Actor x Level Up>
Game_Actor.prototype.autoFpLevelUp = function() {
    this.fpLevelUp();
    this._fpExp = this.fpNeedForLevel(this._fpLvl - 1);
};

Game_Actor.prototype.fpLevelDown = function() {
    if (!this.isMinFpLevel() && canLvlDown) {
        this._fpLvl--;
        this.forgetFpSkill(this._fpLvl + 1);
    }
    this.refresh();
};

// Plugin Command <AFP Actor x Level Down>
Game_Actor.prototype.autoFpLevelDown = function() {
    if (canLvlDown) {
        this.fpLevelDown();
        this._fpExp = this.fpNeedForLevel(this._fpLvl - 1);
    }
};

Game_Actor.prototype.gainFp = function(exp) {
    var newExp = this._fpExp + Math.round(exp);
    this._fpExp = Math.max(newExp, 0);
    this._fpExp = Math.min(this._fpExp, this.fpNeedForLevel(this._fpMaxLvl - 1));
    while (!this.isMaxFpLevel() && this._fpExp >= this.nextFpLevelExp()) {
        this.fpLevelUp();
    }
    this.refresh();
};

Game_Actor.prototype.loseFp = function(exp) {
    var newExp = this._fpExp - Math.round(exp);
    if (canLvlDown) {
        this._fpExp = Math.max(newExp, 0);
    } else {
        this._fpExp = Math.max(newExp, this.fpNeedForLevel(this._fpLvl - 1));
    }

    while (!this.isMinFpLevel() && this._fpExp <
        this.fpNeedForLevel(this._fpLvl - 1) && canLvlDown) {
        this.fpLevelDown();
    }
};

Game_Actor.prototype.nextFpLevelExp = function() {
    return this.fpNeedForLevel(this._fpLvl);
};

Game_Actor.prototype.fpNeedForLevel = function(fp_level) {
    var fpChart = this._fpExpChart;
    var totalFp = 0;
    for (var i = 0; i < fp_level; i++) {
        totalFp += fpChart[i];
    }
    return totalFp;
};

Game_Actor.prototype.nextRequiredFp = function() {
    return this.nextFpLevelExp() - this._fpExp;
};

Game_Actor.prototype.canChangeFp = function(fpValue) {
    if (fpValue > 0) {
        return this.isMaxFpLevel() ? false : true;

    } else if (fpValue < 0) {
        if (canLvlDown) {
            return this._fpExp > 0 ? true : false;
        } else {
            var expLeft = this._fpExp - this.fpNeedForLevel(this._fpLvl - 1);
            return expLeft > 0 ? true : false;
        }

    } else {
        return false; // fpValue === 0
    }
};

Game_Actor.prototype.fpRate = function() {
    if (this.isMaxFpLevel()) {
        return 1;
    }
    var exp = this._fpExp;
    var expBefore = this.fpNeedForLevel(this._fpLvl - 1);
    var range = this._fpExpChart[this._fpLvl - 1];
    return (exp - expBefore) / range;
};

Game_Actor.prototype.showFriendship = function() {
    this._showFp = true; // Show this actor in Scene_ActorsFriendship.
};

Game_Actor.prototype.hideFriendship = function() {
    this._showFp = false; // Hide this actor in Scene_ActorsFriendship.
};

//=============================================================================
// Game_Actors
//=============================================================================

Game_Actors.prototype.fpMembers = function() {
    var list = $gameActors._data;
    var fpList = list.filter(function(fpActor) {
        if (fpActor !== null) {
            return fpActor._showFp === true;
        }
    }, this);
    return fpList;
};

Game_Actors.prototype.fpSize = function() {
    return this.fpMembers().length;
};

//=============================================================================
// Game_Action
//=============================================================================

Moogle_X.AFS.Game_Action_testApply = Game_Action.prototype.testApply;
Game_Action.prototype.testApply = function(target) {
    return Moogle_X.AFS.Game_Action_testApply.call(this, target) ||
        this.testFpEffect(target);
};

Game_Action.prototype.testFpEffect = function(target) {
    if (target.isActor()) {
        if (this.isItem() && $gameParty._actors.contains(mainCharId)) {
            var fpValue = this.getFpValue(target);
            return target.canChangeFp(fpValue);
        } else {
            return false; // Action is not item.
        }
    } else {
        return false; // Target is not actor.
    }
};

Game_Action.prototype.getFpValue = function(target) {
    var fpTotal = 0;

    if (target.isActor()) {
        var actorId = target.actorId();
        if (this.item().fpGain[actorId]) {
            fpTotal += this.item().fpGain[actorId];
        } else if (this.item().fpGain["default"]) {
            fpTotal += this.item().fpGain["default"];
        }
    }

    return fpTotal;
};

Moogle_X.AFS.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Moogle_X.AFS.Game_Action_applyItemUserEffect.call(this, target);
    this.preApplyFpGain(target);
};

Game_Action.prototype.preApplyFpGain = function(target) {
    // In battle scenario...
    if ($gameParty.inBattle()) {
        // The user of skill/item is main character...
        if (this.subject().isActor()) {
            if (this.subject().actorId() === mainCharId) {
                this.applyFpGain(target);
            }
        }

    // On map scenario...
    } else {
        // Main character is in the party...
        if ($gameParty._actors.contains(mainCharId)) {
            // Using item...
            if (this.isItem()) {
                this.applyFpGain(target);

            // Using skill...
            } else if (this.isSkill()) {
                // The user of skill is main character...
                if (this.subject().isActor()) {
                    if (this.subject().actorId() === mainCharId) {
                        this.applyFpGain(target);
                    }
                }
            }
        }
    }
};

Game_Action.prototype.applyFpGain = function(target) {
    if (target.isActor()) {
        var fp = this.getFpValue(target);
        if (fp > 0) {
            target.gainFp(fp);
        } else if (fp < 0) {
            target.loseFp(fp * -1);
        }
    }
};

//=============================================================================
// BattleManager
//=============================================================================

Moogle_X.AFS.BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    if ($gameParty.battleMembers().contains($gameActors.actor(mainCharId))) {
        $gameParty.battleMembers().forEach(function(actor) {
            actor.gainFp(battleFp);
        }, this);
    }
    Moogle_X.AFS.BattleManager_endBattle.call(this, result);
};

//=============================================================================
// Scene_ActorsFriendship
//=============================================================================

function Scene_ActorsFriendship() {
    this.initialize.apply(this, arguments);
}

Scene_ActorsFriendship.prototype =
    Object.create(Scene_MenuBase.prototype);
Scene_ActorsFriendship.prototype.constructor = Scene_ActorsFriendship;

Scene_Menu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_ActorsFriendship.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._statusWindow.refresh();
};

Scene_ActorsFriendship.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createStatusWindow();
};

Scene_ActorsFriendship.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
};

Scene_ActorsFriendship.prototype.createHelpWindow = function() {
    Scene_MenuBase.prototype.createHelpWindow.call(this);
    this._helpWindow.setText(helpText);
};

Scene_ActorsFriendship.prototype.createStatusWindow = function() {
    this._statusWindow =
        new Window_ActorsFriendship(0, this._helpWindow.height);
    this._statusWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._statusWindow);
    this._statusWindow.activate();
};

//=============================================================================
// Window_ActorsFriendship
//=============================================================================

function Window_ActorsFriendship() {
    this.initialize.apply(this, arguments);
}

Window_ActorsFriendship.prototype = Object.create(Window_Selectable.prototype);
Window_ActorsFriendship.prototype.constructor = Window_ActorsFriendship;

Window_ActorsFriendship.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height - y);
    this._pendingIndex = -1;
    this.loadImages();
    this.refresh();
};

Window_ActorsFriendship.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_ActorsFriendship.prototype.windowHeight = function() {
    return Graphics.boxHeight;
};

Window_ActorsFriendship.prototype.maxItems = function() {
    return $gameActors.fpSize();
};

Window_ActorsFriendship.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};

Window_ActorsFriendship.prototype.numVisibleRows = function() {
    return 4;
};

Window_ActorsFriendship.prototype.loadImages = function() {
    $gameActors.fpMembers().forEach(function(actor) {
        ImageManager.loadFace(actor.faceName());
    }, this);
};

Window_ActorsFriendship.prototype.drawItem = function(index) {
    this.drawItemBackground(index);
    this.drawItemImage(index);
    this.drawItemStatus(index);
};

Window_ActorsFriendship.prototype.drawItemBackground = function(index) {
    if (index === this._pendingIndex) {
        var rect = this.itemRect(index);
        var color = this.pendingColor();
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this.changePaintOpacity(true);
    }
};

Window_ActorsFriendship.prototype.drawItemImage = function(index) {
    var actor = $gameActors.fpMembers()[index];
    var rect = this.itemRect(index);
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, 144, rect.height - 2);
    this.changePaintOpacity(true);
};

Window_ActorsFriendship.prototype.drawItemStatus = function(index) {
    var actor = $gameActors.fpMembers()[index];
    var rect = this.itemRect(index);
    var x = rect.x + 162;
    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    var width = rect.width - x - this.textPadding();
    this.drawActorFpStatus(actor, x, y, width);
};

Window_ActorsFriendship.prototype.drawActorFpStatus = function(actor, x, y, width) {
    var lineHeight = this.lineHeight();
    var x2 = x + 180;
    var width2 = Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y);
    this.drawActorFpLevel(actor, x2, y);
    this.drawFpGauge(actor, x, y + lineHeight * 1);
    this.drawCurrentFp(actor, x, y);
    this.drawNextFp(actor, x, y);
};

Window_ActorsFriendship.prototype.drawActorName = function(actor, x, y, width) {
    width = width || 168;
    this.changeTextColor(this.normalColor());
    this.drawText(actor.name(), x, y, width);
};

Window_ActorsFriendship.prototype.drawActorFpLevel = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(fpLevelText, x + fpLevelOffsetX, y, 200);
    this.resetTextColor();
    this.drawText(actor._fpLvl, x + 192 + levelNumOffsetX, y, 40, 'right');
};

Window_ActorsFriendship.prototype.drawFpGauge = function(actor, x, y, width) {
    width = fpGaugeWidth || 382;
    var color1 = this.textColor(fpColorOne);
    var color2 = this.textColor(fpColorTwo);
    this.drawGauge(x, y, width, actor.fpRate(), color1, color2);
};

Window_ActorsFriendship.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, fpGaugeHeight, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
};

Window_ActorsFriendship.prototype.drawCurrentFp = function(actor, x, y) {
    var newLineHeight = this.lineHeight() * 3 / 4;
    this.changeTextColor(this.systemColor());
    this.drawText(currentFpText, x + 430 + currentFpOffsetX, y, 200);
    this.resetTextColor();
    this.drawText(actor._fpExp, x + 450 + currentFpNumOffsetX, y +
        newLineHeight, 160, 'right');
};

Window_ActorsFriendship.prototype.drawNextFp = function(actor, x, y) {
    var newLineHeight = this.lineHeight() * 3 / 4;
    this.changeTextColor(this.systemColor());
    this.drawText(nextLevelText, x + 430 + nextLevelOffsetX, y +
        newLineHeight * 2, 200);
    this.resetTextColor();
    if (actor.isMaxFpLevel()) {
        this.drawText("---", x + 450 + nextLevelNumOffsetX, y +
            newLineHeight * 3, 160, 'right');
    } else {
        this.drawText(actor.nextRequiredFp(), x + 450 + nextLevelNumOffsetX,
            y + newLineHeight * 3, 160, 'right');
    }
};

//=============================================================================
// Scene_Menu
//=============================================================================

Moogle_X.AFS.Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    Moogle_X.AFS.Scene_Menu_createCommandWindow.call(this);
    if (showFpMenu) {
        this._commandWindow.setHandler('friendship', this.commandFriendship.bind(this));
    }
};

Scene_Menu.prototype.commandFriendship = function() {
    SceneManager.push(Scene_ActorsFriendship);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Moogle_X.AFS.Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    Moogle_X.AFS.Window_MenuCommand_addOriginalCommands.call(this);
    if (showFpMenu) {
        if (fpMenuSwitch === 0) {
            this.addCommand(fpTitle, 'friendship', true);
        } else if (fpMenuSwitch > 0 && $gameSwitches.value(fpMenuSwitch)) {
            this.addCommand(fpTitle, 'friendship', true);
        }
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'AFP') {
        switch (args[0]) {
        case 'Open':
            SceneManager.push(Scene_ActorsFriendship);
            break;
        case 'Show':
            if (args[1] === "Actor") {
                $gameActors.actor(args[2]).showFriendship();
            }
            break;
        case 'Hide':
            if (args[1] === "Actor") {
                $gameActors.actor(args[2]).hideFriendship();
            }
            break;
        case 'Var':
            if (args[2] === "Level") {
                var fpLevel = $gameActors.actor(args[3])._fpLvl;
                $gameVariables.setValue(args[1], fpLevel);
            } else if (args[2] === "FP") {
                var fpActor = $gameActors.actor(args[3])._fpExp;
                $gameVariables.setValue(args[1], fpActor);
            }
            break;
        case 'Actor':
            if (args[2] === "Level" && args[3] === "Up") {
                $gameActors.actor(args[1]).autoFpLevelUp();
            } else if (args[2] === "Level" && args[3] === "Down") {
                $gameActors.actor(args[1]).autoFpLevelDown();
            } else if (args[2] === "Gain") {
                $gameActors.actor(args[1]).gainFp(args[3]);
            } else if (args[2] === "Lose") {
                $gameActors.actor(args[1]).loseFp(args[3]);
            }
            break;
        }
    }
};

})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
