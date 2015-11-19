//=============================================================================
// Equip Skill System by Moogle_X
// Moogle_X_EquipSkillSystem.js
// Created on: November 18th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_EQS = true;

var Moogle_X = Moogle_X || {};
Moogle_X.EQS = Moogle_X.EQS || {};

//=============================================================================
/*:
 * @plugindesc v1.1 Adds equip skill system mechanic to actors.
 * @author Moogle_X
 *
 * @param Default Max Slots
 * @desc This is the default max skill equip slots for all actors.
 * @default 5
 *
 * @param Default Max Limit
 * @desc This is the default max skill equip limit for all actors.
 * @default 10
 *
 * @param Default Equip Cost
 * @desc This is the default skill equip cost for all skills.
 * @default 1
 *
 * @param ---Scene---
 * @default
 *
 * @param Equip Skill Command Name
 * @desc This is the "Equip" skill command name in Scene Skill.
 * @default Equip
 *
 * @param Empty Slot Text
 * @desc This is the text shown when the skill slot is empty.
 * @default <Empty>
 *
 * @param Empty Icon Index
 * @desc This is the index of icon shown when the skill slot is empty.
 * @default 16
 *
 * @param Remove Slot Text
 * @desc This is the text shown for "remove" skill command.
 * @default Remove
 *
 * @param Remove Icon Index
 * @desc This is the index of icon shown for "remove" skill command.
 * @default 16
 *
 * @param ---Equip Limit---
 * @default
 *
 * @param Equip Limit Text
 * @desc This is the text shown for "Equip Limit:" above all skill slots.
 * @default Equip Limit:
 *
 * @param Equip Limit Text Color
 * @desc This is the text color for "Equip Limit:" above all skill slots.
 * @default 16
 *
 * @param Equip Limit Number Color
 * @desc This is the number color for actor's equip limit above all skill slots.
 * @default 0
 *
 * @param ---Skill Pool---
 * @default
 *
 * @param Skill Pool Text
 * @desc This is the text shown for "Skill Pool" above all skill list.
 * @default Skill Pool
 *
 * @param Skill Pool Text Color
 * @desc This is the text color for "Skill Pool" above all skill list.
 * @default 16
 *
 * @param ---Equip Cost---
 * @default
 *
 * @param Equip Cost Text
 * @desc This is the text shown for "Equip Cost" above all skill list.
 * @default Equip Cost
 *
 * @param Equip Cost Text Color
 * @desc This is the text color for "Equip Cost" above all skill list.
 * @default 17
 *
 * @param Equip Cost Number Color
 * @desc This is the number color for skill equip cost.
 * @default 17
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin adds equip skill mechanic to all actors. Each time an actor
 * learn a new skill, that skill will be added to his/her "Skill Pool".
 * That actor can access all the skills in their Skill Pool and equip some of
 * those skills into their "Skill Slots".
 *
 * All actors can only use the skills equipped in their own Skill Slots.
 * Also, only those equipped skills will show up in their batlle skill window.
 *
 * ============================================================================
 * How to Equip Skills
 * ============================================================================
 * There are two methods to equip skills. The first one is equipping the skill
 * directly in the Skill menu scene. There are multiple requirements to equip
 * skill:
 *
 * 1. Actor must first learn the skill (NOT "add" the skill directly using
 * trait!). All learned skills will be put inside Actor's Skill Pool for equip
 * access.
 *
 * NOTE: Skills added by trait can be used directly without the need to
 * equip them first.
 *
 * 2. Actor must have at least 1 free Skill Slot available. Each individual
 * skill takes 1 Skill Slot from the actor's maximum Skill Slots. An actor
 * with 5 maximum Skill Slots can equip up to 5 different skills.
 *
 * 3. Actor must be able to "pay" the skill's Equip Cost. It means that actor's
 * remaining Equip Limit must be equal or greater than the skill's Equip Cost.
 * Each skill has their own different Equip Cost that you can customize to your
 * liking.
 *
 * 4. No duplicate skills are allowed! An actor cannot equip 2 of the same
 * skills at the same time.
 *
 * The second method to equip skills is by using a plugin command:
 *
 * EQS Actor x Slot y Skill z          // Equip skill with id z to Actor x's
 *                                     // Slot number y.
 *
 * Keep in mind that any skill that you try to equip with this plugin command
 * must follow ALL of the 4 rules above. Otherwise, nothing happens.
 *
 * ============================================================================
 * Maximum Skill Slots and Maximum Equip Limit
 * ============================================================================
 * All actors now possess 2 new parameters, Maximum Skill Slots and Maximum
 * Equip Limit. Both parameters are assigned by writing notetags into Actors
 * noteboxes.
 *
 * <EQS Max Slots x: n>               // Maximum Skill Slots at level x is n.
 * <EQS Max Slots x to y: n>          // Maximum Skill Slots from level x to
 *                                       level y is n.
 * <EQS Max Limit x: n>               // Maximum Equip Limit at level x is n.
 * <EQS Max Limit x to y: n>          // Maximum Equip Limit at level x to
 *                                       level y is n.
 *
 * With above notetags, you can decide how many Skill Slots and Equip Limit
 * that each actor has at certain level. If you do not input those notetags,
 * the value of those 2 parameters will be automatically set to default value
 * (check the plugin configurations for detail).
 *
 * There are 2 other ways to increase the number of Skill Slots and Equip Limit.
 * The first one is by equipping "Slot Plus" and/or "Limit Plus" traits to the
 * actor. "Slot Plus" will increase maximum Skill Slots while "Limit Plus" will
 * increase maximum Equip Limit.
 *
 * You can add these 2 new traits to Actors, Classes, Weapons, Armors, and
 * States by using notetags:
 *
 * <EQS Slot Plus: x>                // Increase maximum Skill Slots by x.
 * <EQS Limit Plus: x>               // Increase maximum Equip Limit by x.
 *
 * For example, if you put <EQS Slot Plus: 2> to "Short Sword". Any actor that
 * equips the "Short Sword" will receive 2 extra Skill Slots. If that actor
 * unequips the sword, he/she will lose 2 extra Skill Slots again.
 *
 * The other way to increase maximum Skill Slots and maximum Equip Limit is by
 * using "Slot Grow" and/or "Limit Grow" effects. Both effects will increase
 * maximum Skill Slots and maximum Equip Limit parameters permanently.
 *
 * Both effects can be assigned to Items and Skills by using notetags:
 *
 * <EQS Slot Grow: x>               // Permanently increase maximum Skill Slots
 *                                  // of Item/Skill's target by x.
 * <EQS Limit Grow: x>              // Permanently increase maximum Equip Limit
 *                                  // of Item/Skill's target by x.
 *
 * You can use this notetag on some rare "one and only" item in the game to
 * increase an actor's Skill Slots and/or Equip Limit.
 *
 * Grow effects can be applied by using plugin command too!
 *
 * EQS Actor x Slot Grow y         // Permanently increase Actor x's maximum
 *                                 // Skill Slots by y.
 * EQS Actor x Limit Grow y        // Permanently Increase Actor x's maximum
 *                                 // Equip Limit by y.
 *
 * Use above plugin commands wisely.
 *
 * ============================================================================
 * Skill Equip Cost
 * ============================================================================
 * Each skill can have different (or same) Equip Cost. You can assigned the
 * skill's Equip Cost by adding this notetag into the skill's notebox:
 *
 * <EQS Cost: x>                   // Skill Equip Cost will be x.
 *
 * If you don't add this notetag, the Equip Cost will use the default value in
 * plugin configurations.
 *
 * ============================================================================
 * Notetags and Plugin Commands Example
 * ============================================================================
 * Actors Notetags:
 * <EQS Max Slots 1: 3>
 * <EQS Max Slots 2 to 10: 4>
 * <EQS Max Limit 1: 10>
 * <EQS Max Limit 2 to 5: 20>
 *
 * Actors, Classes, Weapons, Armors, and States Notetags:
 * <EQS Slot Plus: 3>
 * <EQS Limit Plus: 5>
 *
 * Skills Notetags:
 * <EQS Cost: 2>
 *
 * Items and Skills Notetags:
 * <EQS Slot Grow: 1>
 * <EQS Limit Grow: 15>
 *
 * Plugin Command:
 * EQS Actor 1 Slot 2 Skill 23
 * EQS Actor 3 Slot Grow 2
 * EQS Actor 4 Limit Grow 5
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

var parameters = PluginManager.parameters('Moogle_X_EquipSkillSystem');
var defMaxSlots = Number(parameters['Default Max Slots'] || 5);
var defMaxLimit = Number(parameters['Default Max Limit'] || 10);
var defEquipCost = Number(parameters['Default Equip Cost'] || 0);
var eqsVocab = String(parameters['Equip Skill Command Name'] || 'Equip');
var emptyText = String(parameters['Empty Slot Text'] || '');
var emptyIcon = Number(parameters['Empty Icon Index'] || 0);
var removeText = String(parameters['Remove Slot Text'] || '');
var removeIcon = Number(parameters['Remove Icon Index'] || 0);
var limitText = String(parameters['Equip Limit Text'] || '');
var limitColor = Number(parameters['Equip Limit Text Color'] || 0);
var limitNumberColor = Number(parameters['Equip Limit Number Color'] || 0);
var poolText = String(parameters['Skill Pool Text'] || '');
var poolColor = Number(parameters['Skill Pool Text Color'] || 0);
var eqsCostText = String(parameters['Equip Cost Text'] || '');
var eqsCostColor = Number(parameters['Equip Cost Text Color'] || 0);
var eqsCostNumberColor = Number(parameters['Equip Cost Number Color'] || 0);

//=============================================================================
// Constant Declaration
//=============================================================================
Game_BattlerBase.TRAIT_SLOT_PLUS   = 112; // New trait code.
Game_BattlerBase.TRAIT_LIMIT_PLUS  = 113; // New trait code.

//=============================================================================
// DataManager
//=============================================================================

Moogle_X.EQS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.EQS.DataManager_isDatabaseLoaded.call(this)) return false;
    DataManager.readNotetags_EQS1($dataActors);
    DataManager.readNotetags_EQS2($dataActors);
    DataManager.readNotetags_EQS2($dataClasses);
    DataManager.readNotetags_EQS2($dataWeapons);
    DataManager.readNotetags_EQS2($dataArmors);
    DataManager.readNotetags_EQS2($dataStates);
    DataManager.readNotetags_EQS3($dataSkills);
    DataManager.readNotetags_EQS4($dataItems);
    DataManager.readNotetags_EQS4($dataSkills);
		return true;
};

DataManager.readNotetags_EQS1 = function(group) {
	var note1 = /<(?:EQS MAX SLOTS)[ ](\d+):[ ](\d+)>/i;
  var note2 = /<(?:EQS MAX SLOTS)[ ](\d+)[ ]to[ ](\d+):[ ](\d+)>/i;
	var note3 = /<(?:EQS MAX LIMIT)[ ](\d+):[ ](\d+)>/i;
	var note4 = /<(?:EQS MAX LIMIT)[ ](\d+)[ ]to[ ](\d+):[ ](\d+)>/i;

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.eqsMaxSlots = {};
    obj.eqsMaxLimit = {};

    // Initialize both max slots and max limit with default value.
    var maxLevel = obj.maxLevel;
    for (var z = 1; z <= maxLevel; z++) {
      obj.eqsMaxSlots[z] = defMaxSlots;
      obj.eqsMaxLimit[z] = defMaxLimit;
    }

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
        var level = Number(RegExp.$1);
        var slots = Number(RegExp.$2);
        obj.eqsMaxSlots[level] = slots;

      } else if (line.match(note2)) {
        var levelBegin = Number(RegExp.$1);
        var levelLast = Number(RegExp.$2);
        var slots2 = Number(RegExp.$3);
        for (var x = levelBegin; x <= levelLast; x++) {
          obj.eqsMaxSlots[x] = slots2;
        }

      } else if (line.match(note3)) {
        var level2 = Number(RegExp.$1);
        var limit = Number(RegExp.$2);
        obj.eqsMaxLimit[level2] = limit;

      } else if (line.match(note4)) {
        var levelBegin2 = Number(RegExp.$1);
        var levelLast2 = Number(RegExp.$2);
        var limit2 = Number(RegExp.$3);
        for (var y = levelBegin2; y <= levelLast2; y++) {
          obj.eqsMaxLimit[y] = limit2;
        }
      }
		}
	}
};

DataManager.readNotetags_EQS2 = function(group) {
	var note1 = /<(?:EQS SLOT PLUS):[ ](\d+)>/i;
	var note2 = /<(?:EQS LIMIT PLUS):[ ](\d+)>/i;

  var codeSlot = Game_BattlerBase.TRAIT_SLOT_PLUS;
  var codeLimit = Game_BattlerBase.TRAIT_LIMIT_PLUS;

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
        var slotValue = Number(RegExp.$1);
        var slotTrait = [{"code":codeSlot,"dataId":0,"value":slotValue}];
        obj.traits = obj.traits.concat(slotTrait);

      } else if (line.match(note2)) {
        var limitValue = Number(RegExp.$1);
        var limitTrait = [{"code":codeLimit,"dataId":0,"value":limitValue}];
        obj.traits = obj.traits.concat(limitTrait);
      }

		}
	}
};

DataManager.readNotetags_EQS3 = function(group) {
	var note = /<(?:EQS COST):[ ](\d+)>/i;

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.eqsCost = defEquipCost;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note)) {
        var cost = Number(RegExp.$1);
        obj.eqsCost = cost;
      }
		}
	}
};

DataManager.readNotetags_EQS4 = function(group) {
	var note1 = /<(?:EQS SLOT GROW):[ ](\d+)>/i;
	var note2 = /<(?:EQS LIMIT GROW):[ ](\d+)>/i;

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.eqsSlotGrow = 0;
    obj.eqsLimitGrow = 0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
        var slotIncrease = Number(RegExp.$1);
        obj.eqsSlotGrow = slotIncrease;

      } else if (line.match(note2)) {
        var limitIncrease = Number(RegExp.$1);
        obj.eqsLimitGrow = limitIncrease;
      }

		}
	}
};

//=============================================================================
// Game_Actor
//=============================================================================

Moogle_X.EQS.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    Moogle_X.EQS.Game_Actor_initMembers.call(this);
    this._eqsMaxSlots = 0;
    this._eqsMaxLimit = 0;
    this._eqsSlots = {};
    this._eqsAddedSlots = 0;
    this._eqsAddedLimit = 0;
};

Moogle_X.EQS.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Moogle_X.EQS.Game_Actor_setup.call(this, actorId);
    this.updateEqsParams();
    this.clearEqsSlots();
};

Game_Actor.prototype.updateEqsParams = function() {
    this._eqsMaxSlots = this.totalEqsSlots();
    this._eqsMaxLimit = this.totalEqsLimit();
};

Game_Actor.prototype.totalEqsSlots = function() {
    var baseValue = this.baseEqsSlots();
    var plusValue = this.eqsSlotsPlus();
    return baseValue + plusValue + this._eqsAddedSlots;
};

Game_Actor.prototype.totalEqsLimit = function() {
    var baseValue = this.baseEqsLimit();
    var plusValue = this.eqsLimitPlus();
    return baseValue + plusValue + this._eqsAddedLimit;
};

Game_Actor.prototype.baseEqsSlots = function() {
    return this.actor().eqsMaxSlots[this._level];
};

Game_Actor.prototype.baseEqsLimit = function() {
    return this.actor().eqsMaxLimit[this._level];
};

Game_Actor.prototype.eqsSlotsPlus = function() {
    return Math.max(this.traitsSumAll(Game_BattlerBase.TRAIT_SLOT_PLUS), 0);
};

Game_Actor.prototype.eqsLimitPlus = function() {
    return Math.max(this.traitsSumAll(Game_BattlerBase.TRAIT_LIMIT_PLUS), 0);
};

Game_Actor.prototype.clearEqsSlots = function() {
    this._eqsSlots = {};
    for (var i = 1; i <= this._eqsMaxSlots; i++) {
        this._eqsSlots[i] = 0;
    }
};

// The most important function of this plugin. I'm overwriting this.
Game_Actor.prototype.skills = function() {
    var list = this.getEqsArray();
    list = list.filter(function(id) {
        return id !== 0;
    });

    list.concat(this.addedSkills());

    var list2 = [];
    list.forEach(function(id) {
        if (!list2.contains($dataSkills[id])) {
            list2.push($dataSkills[id]);
        }
    });
    return list2;
};

Game_Actor.prototype.getSkillPool = function() {
    var array = this._skills;
    return array.map(function(skillId) {
        return $dataSkills[skillId];
    });
};

Game_Actor.prototype.equipSkill = function(skill, slotId) {
    if (!this.canEquipSkill(skill)) return;
    if (this._eqsSlots[slotId] !== undefined) {
        if (skill === null) {
            this._eqsSlots[slotId] = 0;
        } else {
            this._eqsSlots[slotId] = skill.id;
        }
    }
    this.refresh();
};

Game_Actor.prototype.canEquipSkill = function(skill) {
    //if (skill === undefined) {
    //  return true;
    //}
    if (skill === null) {
        return true;
    }
    if (this.canPayEqsCost(skill) && !this.eqsSkillEquipped(skill) &&
        this.isLearnedSkill(skill.id)) {
        return true;
    } else {
        return false;
    }
};

Game_Actor.prototype.canPayEqsCost = function(skill) {
    if (skill === undefined) return false; // A super important line!
    var cost = skill.eqsCost || 0;
    var leftover = this._eqsMaxLimit - this.currentEqsLimit();
    return leftover >= cost ? true : false;
};

Game_Actor.prototype.currentEqsLimit = function() {
    var list = this.getEqsArray();
    var total = 0;
    list.forEach(function(id) {
        if (id !== 0) {
            total += $dataSkills[id].eqsCost;
        }
    });
    return total;
};

Game_Actor.prototype.eqsSkillEquipped = function(skill) {
    if (skill === null) {
        return false;
    }
    var list = this.getEqsArray();
    return list.contains(skill.id) ? true : false;
};

// Convert this._eqsSlots into array for easier data manipulation.
Game_Actor.prototype.getEqsArray = function() {
    var list = [];
    for (var i = 1; i <= this._eqsMaxSlots; i++) {
        //if (this._eqsSlots[i]) {
            list.push(this._eqsSlots[i] || 0);
        //}
    }
    return list;
};

Moogle_X.EQS.Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    this.eqsRefresh();
    Moogle_X.EQS.Game_Actor_refresh.call(this);
};

Game_Actor.prototype.eqsRefresh = function() {
    var array = this.eqsObject();
    this.updateEqsParams();
    this.clearEqsSlots();
    this.eqsReequip(array);
};

Game_Actor.prototype.eqsReequip = function(array) {
    for (var i = 1; i <= this._eqsMaxSlots; i++) {
        var skill = array[i-1];
        if (this.canEquipSkill(skill) && skill !== null) {
            this._eqsSlots[i] = skill.id || 0;
        } else {
            this._eqsSlots[i] = 0;
        }
    }
};

Game_Actor.prototype.eqsObject = function() {
    var array = this.getEqsArray();
    return array.map(function(skillId) {
        return $dataSkills[skillId];
    });
};

Moogle_X.EQS.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    Moogle_X.EQS.Game_Actor_levelUp.call(this);
    this.eqsRefresh();
};

Moogle_X.EQS.Game_Actor_levelDown = Game_Actor.prototype.levelDown;
Game_Actor.prototype.levelDown = function() {
    Moogle_X.EQS.Game_Actor_levelDown.call(this);
    this.eqsRefresh();
};

Game_Actor.prototype.addEqsSlots = function(slotIncrease) {
    if (slotIncrease < 0) return;
    this._eqsAddedSlots += slotIncrease;
    this.eqsRefresh();
};

Game_Actor.prototype.addEqsLimit = function(limitIncrease) {
    if (limitIncrease < 0) return;
    this._eqsAddedLimit += limitIncrease;
    this.eqsRefresh();
};

//=============================================================================
// Game_Action
//=============================================================================

Moogle_X.EQS.Game_Action_testApply = Game_Action.prototype.testApply;
Game_Action.prototype.testApply = function(target) {
    return Moogle_X.EQS.Game_Action_testApply.call(this, target) ||
        this.testEqsEffect(target);
};

Game_Action.prototype.testEqsEffect = function(target) {
    if (target.isActor()) {
        return this.canGrowEqs(target);
    } else {
        return false; // Target is not actor.
    }
};

Game_Action.prototype.canGrowEqs = function(target) {
    if (target.isActor()) {
        var slotGrow = this.item().eqsSlotGrow;
        var limitGrow = this.item().eqsLimitGrow;
        return (slotGrow > 0 || limitGrow > 0) ? true : false;
    } else {
        return false; // Target is not actor.
    }
};

Moogle_X.EQS.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Moogle_X.EQS.Game_Action_applyItemUserEffect.call(this, target);
    this.applyEqsSlotGrow(target);
    this.applyEqsLimitGrow(target);
};

Game_Action.prototype.applyEqsSlotGrow = function(target) {
    if (target.isEnemy()) return;
    var slotIncrease = this.item().eqsSlotGrow || 0;
    if (slotIncrease > 0) {
        target.addEqsSlots(slotIncrease);
    }
};

Game_Action.prototype.applyEqsLimitGrow = function(target) {
    if (target.isEnemy()) return;
    var limitIncrease = this.item().eqsLimitGrow || 0;
    if (limitIncrease > 0) {
        target.addEqsLimit(limitIncrease);
    }
};

//=============================================================================
// Scene_Skill
//=============================================================================

Moogle_X.EQS.Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
    Moogle_X.EQS.Scene_Skill_create.call(this);
    this.createEquipLimitWindow();
    this.createEquipCostWindow();
    this.createEquipSkillWindow();
    this.createEquipSkillPool();
    this.refreshActor();
};

Moogle_X.EQS.Scene_Skill_createSkillTypeWindow =
    Scene_Skill.prototype.createSkillTypeWindow;
Scene_Skill.prototype.createSkillTypeWindow = function() {
    Moogle_X.EQS.Scene_Skill_createSkillTypeWindow.call(this);
    this._skillTypeWindow.setHandler('eqsEquip', this.commandEqs.bind(this));
};

Scene_Skill.prototype.createEquipLimitWindow = function() {
    var wy = this._skillTypeWindow.y + this._skillTypeWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = this._skillTypeWindow.lineHeight() +
        this._skillTypeWindow.padding * 2;
    this._eqsLimitWindow = new Window_EqsLimit(0, wy, ww, wh);
    this._skillTypeWindow.setEqsLimitWindow(this._eqsLimitWindow);
    this.addWindow(this._eqsLimitWindow);
};

Scene_Skill.prototype.createEquipCostWindow = function() {
    var wy = this._skillTypeWindow.y + this._skillTypeWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = this._skillTypeWindow.lineHeight() +
        this._skillTypeWindow.padding * 2;
    this._eqsCostWindow = new Window_EqsCost(ww, wy, ww, wh);
    this._skillTypeWindow.setEqsCostWindow(this._eqsCostWindow);
    this.addWindow(this._eqsCostWindow);
};

Scene_Skill.prototype.createEquipSkillWindow = function() {
    var wy = this._eqsLimitWindow.y + this._eqsLimitWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._eqsSlotWindow = new Window_EquipSkillSlot(0, wy, ww, wh);
    this._eqsSlotWindow.setHelpWindow(this._helpWindow);
    this._eqsSlotWindow.setHandler('ok',     this.onEqsSlotOk.bind(this));
    this._eqsSlotWindow.setHandler('cancel', this.onEqsSlotCancel.bind(this));
    //this._eqsSlotWindow.setHandler('pagedown', this.nextActor.bind(this));
    //this._eqsSlotWindow.setHandler('pageup',   this.previousActor.bind(this));
    this._skillTypeWindow.setEqsSlotWindow(this._eqsSlotWindow);
    this.addWindow(this._eqsSlotWindow);
};

Scene_Skill.prototype.createEquipSkillPool = function() {
    var wy = this._eqsCostWindow.y + this._eqsCostWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._eqsPoolWindow = new Window_EquipSkillPool(ww, wy, ww, wh);
    this._eqsPoolWindow.setHelpWindow(this._helpWindow);
    this._eqsPoolWindow.setHandler('ok',     this.onEqsItemOk.bind(this));
    this._eqsPoolWindow.setHandler('cancel', this.onEqsItemCancel.bind(this));
    this._skillTypeWindow.setEqsPoolWindow(this._eqsPoolWindow);
    this._eqsSlotWindow.setItemWindow(this._eqsPoolWindow);
    this.addWindow(this._eqsPoolWindow);
};

Moogle_X.EQS.Scene_Skill_refreshActor = Scene_Skill.prototype.refreshActor;
Scene_Skill.prototype.refreshActor = function() {
    Moogle_X.EQS.Scene_Skill_refreshActor.call(this);
    var actor = this.actor();
    if (this._eqsSlotWindow) {
        this._eqsSlotWindow.setActor(actor);
    }
    if (this._eqsPoolWindow) {
        this._eqsPoolWindow.setActor(actor);
    }
    if (this._eqsLimitWindow) {
        this._eqsLimitWindow.setActor(actor);
    }
    if (this._eqsCostWindow) {
        this._eqsCostWindow.setActor(actor);
    }
};

Scene_Skill.prototype.commandEqs = function() {
    this._eqsSlotWindow.activate();
    this._eqsSlotWindow.select(0);
};

Scene_Skill.prototype.onEqsSlotOk = function() {
    this._eqsPoolWindow.activate();
    this._eqsPoolWindow.select(0);
};

Scene_Skill.prototype.onEqsSlotCancel = function() {
    this._eqsSlotWindow.deselect();
    this._skillTypeWindow.activate();
};

Scene_Skill.prototype.onEqsItemOk = function() {
    SoundManager.playEquip();
    this.actor().equipSkill(this._eqsPoolWindow.item(), this._eqsSlotWindow.index() + 1);
    this._eqsSlotWindow.activate();
    this._eqsSlotWindow.refresh();
    this._eqsPoolWindow.deselect();
    this._eqsPoolWindow.refresh();
    this._eqsLimitWindow.refresh();
    this._statusWindow.refresh();
};

Scene_Skill.prototype.onEqsItemCancel = function() {
    this._eqsSlotWindow.activate();
    this._eqsPoolWindow.deselect();
};

//=============================================================================
// Window_SkillType
//=============================================================================

Moogle_X.EQS.Window_SkillType_makeCommandList =
    Window_SkillType.prototype.makeCommandList;
Window_SkillType.prototype.makeCommandList = function() {
    Moogle_X.EQS.Window_SkillType_makeCommandList.call(this);
    this.addCommand(eqsVocab, 'eqsEquip', true);
};

Window_SkillType.prototype.setEqsLimitWindow = function(eqsWindow) {
    this._eqsLimitWindow = eqsWindow;
    this.update();
};

Window_SkillType.prototype.setEqsCostWindow = function(eqsWindow) {
    this._eqsCostWindow = eqsWindow;
    this.update();
};

Window_SkillType.prototype.setEqsSlotWindow = function(eqsWindow) {
    this._eqsSlotWindow = eqsWindow;
    this.update();
};

Window_SkillType.prototype.setEqsPoolWindow = function(eqsWindow) {
    this._eqsPoolWindow = eqsWindow;
    this.update();
};

Moogle_X.EQS.Window_SkillType_update = Window_SkillType.prototype.update;
Window_SkillType.prototype.update = function() {
    Moogle_X.EQS.Window_SkillType_update.call(this);
    if (this._eqsSlotWindow && this._eqsPoolWindow && this._eqsLimitWindow
        && this._eqsCostWindow) {
        this.updateEqsShowHide();
    }
};

Window_SkillType.prototype.updateEqsShowHide = function() {
    if (this.currentSymbol() === 'eqsEquip') {
        this._eqsSlotWindow.show();
        this._eqsPoolWindow.show();
        this._eqsLimitWindow.show();
        this._eqsCostWindow.show();
    } else {
        this._eqsSlotWindow.hide();
        this._eqsPoolWindow.hide();
        this._eqsLimitWindow.hide();
        this._eqsCostWindow.hide();
    }
};

//=============================================================================
// Window_EquipSkillSlot
//=============================================================================

function Window_EquipSkillSlot() {
    this.initialize.apply(this, arguments);
}

Window_EquipSkillSlot.prototype = Object.create(Window_Selectable.prototype);
Window_EquipSkillSlot.prototype.constructor = Window_EquipSkillSlot;

Window_EquipSkillSlot.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this.refresh();
};

Window_EquipSkillSlot.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_EquipSkillSlot.prototype.maxItems = function() {
    return this._actor ? this._actor._eqsMaxSlots : 0;
};

Window_EquipSkillSlot.prototype.item = function(index) {
    return this._actor ? $dataSkills[this._actor._eqsSlots[index + 1]] : null;
};

Window_EquipSkillSlot.prototype.drawItem = function(index) {
    if (this._actor) {
        var rect = this.itemRectForText(index);
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(true);
        var skill = this.item(index);
        if (skill) {
          this.drawItemName(skill, rect.x, rect.y, rect.width);
        } else {
          this.drawEmptySlot(rect.x, rect.y, rect.width);
        }
        this.changePaintOpacity(true);
    }
};

Window_EquipSkillSlot.prototype.drawEmptySlot = function(x, y, width) {
    this.changePaintOpacity(false);
    var iconWidth = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(emptyIcon, x + 2, y + 2);
    this.drawText(emptyText, x + iconWidth, y, width - iconWidth);
};

Window_EquipSkillSlot.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_EquipSkillSlot.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
    this.update();
};

Window_EquipSkillSlot.prototype.updateHelp = function() {
    Window_Selectable.prototype.updateHelp.call(this);
    this.setHelpWindowItem(this.item(this.index()));
    if (this._statusWindow) {
        this._statusWindow.setTempActor(null);
    }
};

//=============================================================================
// Window_EquipSkillPool
//=============================================================================

function Window_EquipSkillPool() {
    this.initialize.apply(this, arguments);
}

Window_EquipSkillPool.prototype = Object.create(Window_Selectable.prototype);
Window_EquipSkillPool.prototype.constructor = Window_EquipSkillPool;

Window_EquipSkillPool.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this._data = [];
    this._slotId = 0;
};

Window_EquipSkillPool.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
        this.resetScroll();
    }
};

Window_EquipSkillPool.prototype.maxCols = function() {
    return 1;
};

Window_EquipSkillPool.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_EquipSkillPool.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_EquipSkillPool.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_EquipSkillPool.prototype.includes = function(item) {
    return true;
};

Window_EquipSkillPool.prototype.isEnabled = function(item) {
    return this._actor && this._actor.canEquipSkill(item);
};

Window_EquipSkillPool.prototype.makeItemList = function() {
    if (this._actor) {
        this._data = this._actor.getSkillPool();
        this._data.push(null);
    } else {
        this._data = [];
    }
};

Window_EquipSkillPool.prototype.drawItem = function(index) {
    var skill = this._data[index];
    var costWidth = this.costWidth();
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    if (skill !== null) {
        this.changePaintOpacity(this.isEnabled(skill));
        this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
        this.drawEquipCost(skill, rect.x, rect.y, rect.width);
    } else {
        this.drawEmptySlot(rect.x, rect.y, rect.width);
    }
    this.changePaintOpacity(1);
};

Window_EquipSkillPool.prototype.drawEmptySlot = function(x, y, width) {
    this.changePaintOpacity(false);
    var iconWidth = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(removeIcon, x + 2, y + 2);
    this.drawText(removeText, x + iconWidth, y, width - iconWidth);
};

Window_EquipSkillPool.prototype.costWidth = function() {
    return this.textWidth('000');
};

Window_EquipSkillPool.prototype.drawEquipCost = function(skill, x, y, width) {
    this.changeTextColor(this.textColor(eqsCostNumberColor));
    if (skill.eqsCost > 0) {
        this.drawText(skill.eqsCost, x, y, width, 'right');
    }
};

Window_EquipSkillPool.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_EquipSkillPool.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

//=============================================================================
// Window_EqsLimit
//=============================================================================

function Window_EqsLimit() {
    this.initialize.apply(this, arguments);
}

Window_EqsLimit.prototype = Object.create(Window_Selectable.prototype);
Window_EqsLimit.prototype.constructor = Window_EqsLimit;

Window_EqsLimit.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this.refresh();
};

Window_EqsLimit.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_EqsLimit.prototype.maxItems = function() {
    return this._actor ? 1 : 0;
};

Window_EqsLimit.prototype.drawItem = function(index) {
    this.drawCurrentEqsLimit();
};

Window_EqsLimit.prototype.drawCurrentEqsLimit = function() {
    if (this._actor) {
        var rect = this.itemRectForText(0);
        var wx = rect.width / 2;
        this.changeTextColor(this.textColor(limitColor));
        this.changePaintOpacity(true);
        this.drawText(limitText, rect.x, rect.y, rect.width);
        this.changeTextColor(this.textColor(limitNumberColor))
        var text = this._actor.currentEqsLimit() + "/" + this._actor._eqsMaxLimit;
        this.drawText(text, wx, rect.y, rect.width - wx, 'right');
    }
};

//=============================================================================
// Window_EqsCost
//=============================================================================

function Window_EqsCost() {
    this.initialize.apply(this, arguments);
}

Window_EqsCost.prototype = Object.create(Window_Selectable.prototype);
Window_EqsCost.prototype.constructor = Window_EqsLimit;

Window_EqsCost.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this.refresh();
};

Window_EqsCost.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_EqsCost.prototype.maxItems = function() {
    return this._actor ? 1 : 0;
};

Window_EqsCost.prototype.drawItem = function(index) {
    this.drawEqsCostText();
};

Window_EqsCost.prototype.drawEqsCostText = function() {
    if (this._actor) {
        var rect = this.itemRectForText(0);
        var wx = rect.width / 2;
        this.changeTextColor(this.textColor(poolColor));
        this.changePaintOpacity(true);
        this.drawText(poolText, rect.x, rect.y, rect.width);
        this.changeTextColor(this.textColor(eqsCostColor));
        this.drawText(eqsCostText, wx, rect.y, rect.width - wx, 'right');
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'EQS') {
        switch (args[0]) {
        case 'Actor':
            if (args[2] === "Slot" && args[4] === "Skill") {
                $gameActors.actor(args[1]).equipSkill($dataSkills[args[5]],
                    args[3]);
            } else if (args[2] === "Slot" && args[3] === "Grow") {
                $gameActors.actor(args[1]).addEqsSlots(Number(args[4]));
            } else if (args[2] === "Limit" && args[3] === "Grow") {
                $gameActors.actor(args[1]).addEqsLimit(Number(args[4]));
            }
            break;
        }
    }
};


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
