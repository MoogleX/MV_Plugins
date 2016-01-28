//=============================================================================
// Passive Skill by Moogle_X
// Moogle_X_PassiveSkill.js
// Created on: November 20th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_PsvSkl = true;

var Moogle_X = Moogle_X || {};
Moogle_X.PsvSkl = Moogle_X.PsvSkl || {};

//=============================================================================
/*:
 * @plugindesc v1.14 Adds passive skills functionality to actors.
 * @author Moogle_X
 *
 * @param Default Hide in Battle
 * @desc Hide all passive skills in battle by default. 1:Yes 0:No
 * @default 0
 *
 * @param Hidden Skill Type ID in Battle
 * @desc This is the Skill Type ID that you want to hide in battle. Put 0 for none.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin allows actors to learn passive skill. Passive skill is a type
 * of skill that grant certain permanent traits bonus to actor who learn the
 * skill.
 *
 * You are free to decide what kind of traits bonus each passive skill
 * possess. The bonus can be anything from Hp increase, status immunity, or
 * even extra skills. Contrary to the name ("passive"), you can also assign
 * any offensive skill as passive skill.
 *
 * ============================================================================
 * How to Assign Passive Skill
 * ============================================================================
 * First of all, you need to "bind" the skill to a weapon id in your database.
 * Put this notetag inside the passive skill's notebox.
 *
 * <PSV Weapon Id: x>                  // Replace x with Weapon Id.
 *
 * Example:
 * <PSV Weapon Id: 9>
 * <PSV Weapon Id: 54>
 *
 * The skill with <PSV Weapon Id: 9> notetag will inherit all traits bonus that
 * weapon 9 have. If weapon 9 has 0% Fire element rate, the actor who learn
 * the passive skill will also resist Fire damage as well.
 *
 * ============================================================================
 * What does carry over... And what's not.
 * ============================================================================
 * 1. All of the weapon traits will carry over, whether they are positive bonus
 *    or not. That means you can also create a "bad" passive skill if you so
 *    choose.
 *
 * 2. All of the "Parameter Changes" that the weapon has will carry over too.
 *    If the weapon grants 52 ATK increase, the actor's ATK will be increased
 *    by the same amount as well.
 *
 * 3. Some of the special traits from my other plugins like "Element Booster"
 *    or "Die At 0 Mp" will carry over as well (surprisingly!).
 *    Other new traits from other people's plugins may carry over too (or not).
 *
 * 4. THIS IS IMPORTANT! Any skills that the actor got from "Add Skill" traits
 *    will NOT get passive skill benefit! In other words, all of those "added"
 *    skills cannot become passive skill. Only "learned" skills can become
 *    passive skill. This is to prevent potential Game Breaking loop that will
 *    surely crash the game.
 *
 * ============================================================================
 * Hiding Passive Skills in Battle (Also Hide Skill Type)
 * ============================================================================
 * Passive skills always visible on the map. If you want to hide all passive
 * skills during battle, simply turn on the "Default Hide in Battle" option
 * in the plugin configuration.
 *
 * If you prefer to hide only some skills, you can add this notetag inside the
 * skill's notebox.
 *
 * <PSV Hide Battle>
 *
 * Any skills with that notetag will disappear from battle window. But, they
 * are still accessible on the map. Keep in mind that you CAN use that notetag
 * on other skills beside passive skills. It could be useful to hide some
 * "unwanted" skills in battle.
 *
 * You can also hide one (currently) skill type in battle. If you put all of
 * your passive skills inside "Passive" skill type and you don't want this
 * "useless" skill type to appear in battle, simply input the ID of this
 * "Passive" skill type into "Hidden Skill Type ID in Battle" option in the
 * plugin configuration.
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 * If you use Moogle_X_EquipSkillSystem plugin, position this plugin below it.
 * If you use YEP_ClassChangeCore, position this plugin below it.
 * If you use YEP_X_SkillCooldowns, position this plugin below it.
 * If you use Moogle_X_EquipmentLearning, position this plugin above it.
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
 * Version 1.14:
 * - Fixed "Hidden Skill Type ID in Battle" parameter not working in
 *   MOG_BattleHud plugin.
 *
 * Version 1.13:
 * - Added compatibility patch with YEP_X_SkillCooldowns v1.07.
 *
 * Version 1.12:
 * - Added compatibility patch with YEP_ClassChangeCore v1.02.
 *
 * Version 1.1:
 * - Added compatibility patch with YEP_ClassChangeCore.
 *
 * Version 1.0:
 * - Completed plugin.
 *
 */
//=============================================================================

(function() { // IIFE

//=============================================================================
// Parameter Variables
//=============================================================================

Moogle_X.PsvSkl.parameters = PluginManager.parameters('Moogle_X_PassiveSkill');
Moogle_X.PsvSkl.defaultHide =
    Number(Moogle_X.PsvSkl.parameters['Default Hide in Battle']) != 0;
Moogle_X.PsvSkl.hiddenSkillTypeId =
    Number(Moogle_X.PsvSkl.parameters['Hidden Skill Type ID in Battle']) || 0;

//=============================================================================
// DataManager
//=============================================================================

Moogle_X.PsvSkl.DatabaseLoaded = false;
Moogle_X.PsvSkl.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.PsvSkl.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Moogle_X.PsvSkl.DatabaseLoaded) {
        DataManager.readNotetags_PsvSkl($dataSkills);
        Moogle_X.PsvSkl.DatabaseLoaded = true;
    }
		return true;
};

DataManager.readNotetags_PsvSkl = function(group) {
	var note1 = /<(?:PSV WEAPON ID):[ ](\d+)>/i;
  var note2 = /<(?:PSV HIDE BATTLE)>/i;

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.isPassive = false;
    obj.psvWeaponId = 0;
    obj.psvHideBattle = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
        obj.isPassive = true;
        obj.psvHideBattle = Moogle_X.PsvSkl.defaultHide;
        var weaponId = Number(RegExp.$1);
        obj.psvWeaponId = weaponId;

      } else if (line.match(note2)) {
        obj.psvHideBattle = true;
      }
		}
	}
};

//=============================================================================
// Game_Actor
//=============================================================================

/*
Moogle_X.PsvSkl.Game_Actor_allTraits = Game_Actor.prototype.allTraits;
Game_Actor.prototype.allTraits = function() {
    var list = Moogle_X.PsvSkl.Game_Actor_allTraits.call(this);
    return list.concat(this.passiveTraits());
};
*/

Moogle_X.PsvSkl.Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
Game_Actor.prototype.traitObjects = function() {
    var objects = Moogle_X.PsvSkl.Game_Actor_traitObjects.call(this);
    return objects.concat(this.passiveTraits());
};

Game_Actor.prototype.passiveTraits = function() {
    var array = this.getPsvSkillList();
    array = this.getPsvWeaponList(array);
    array = this.convertPsvTraits(array);
    return array;
};

Game_Actor.prototype.getPsvSkillList = function() {
	 if (Imported.Moogle_X_EQS) { // Compatibility with Equip Skill System.
        var list = this.getEqsArray();
        list = list.filter(function(id) {
            return id !== 0;
        });

        var array = [];

        list.forEach(function(id) {
            if (!array.contains(id)) {
                array.push(id);
            }
        });

        this._skills.forEach(function(id) {
            if (!array.contains(id) && $dataSkills[id].isEqsIgnore) {
                array.push(id);
            }
        });

	  } else { // Normal scenario.
		    var array = this._skills;
	  }

    // It's unfortunate that I cannot use these codes below because of Maximum
    // Stack Size error issue.
    /*
	  this.addedSkills().forEach(function(id) {
		    if (!array.contains(id)) {
			       array.push(id);
		    }
	  });
    */

	  array = array.filter(function(id) {
		    return $dataSkills[id].isPassive === true;
	  });
	  return array;
};

Game_Actor.prototype.getPsvWeaponList = function(array) {
    array = array.map(function(id) {
		    return $dataSkills[id].psvWeaponId;
    });
    array = array.filter(function(id) {
        return id !== 0;
    });
	  return array;
};

Game_Actor.prototype.convertPsvTraits = function(array) {
    array = array.map(function(id) {
		    return $dataWeapons[id];
	  });
    return array;
};

// Param Plus part.

Moogle_X.PsvSkl.Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function(paramId) {
    var value = Moogle_X.PsvSkl.Game_Actor_paramPlus.call(this, paramId);
    var value2 = this.passiveParamPlus(paramId);
    return value + value2;
};
Game_Actor.prototype.passiveParamPlus = function(paramId) {
    var array = this.getPsvSkillList();
    array = this.getPsvWeaponList(array);
    var total = this.convertPsvParamPlus(array, paramId);
    return total;
};

Game_Actor.prototype.convertPsvParamPlus = function(array, paramId) {
    array = array.map(function(id) {
        return $dataWeapons[id].params[paramId];
    });
    return array.reduce(function(r, value) {
        return r + value;
    }, 0);
};

Moogle_X.PsvSkl.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    Moogle_X.PsvSkl.Game_Actor_learnSkill.call(this, skillId);
    this.refresh();
};

Moogle_X.PsvSkl.Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
Game_Actor.prototype.forgetSkill = function(skillId) {
    Moogle_X.PsvSkl.Game_Actor_forgetSkill.call(this, skillId);
    this.refresh();
};

// Compatibility for YEP_ClassChangeCore. Prevent refresh loop.
if (Imported.YEP_ClassChangeCore) {
    Game_Actor.prototype.updateLearnedSkills = function(classId) {
        if (!$dataClasses[classId]) return;
        $dataClasses[classId].learnings.forEach(function(learning) {
            if (this.classLevel(classId) >= learning.level) {
                //this.learnSkill(learning.skillId);

                if (!this.isLearnedSkill(learning.skillId)) {
                    this._skills.push(learning.skillId);
                    this._skills.sort(function(a, b) {
                        return a - b;
                    });
                    Game_Battler.prototype.refresh.call(this);
                }
            }
        }, this);
    };
}

//=============================================================================
// Window_BattleSkill
//=============================================================================

Moogle_X.PsvSkl.Window_BattleSkill_includes =
    Window_BattleSkill.prototype.includes;
Window_BattleSkill.prototype.includes = function(item) {
    return Moogle_X.PsvSkl.Window_BattleSkill_includes.call(this, item) &&
        item.psvHideBattle === false;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Moogle_X.PsvSkl.Game_BattlerBase_addedSkillTypes =
    Game_BattlerBase.prototype.addedSkillTypes;
Game_BattlerBase.prototype.addedSkillTypes = function() {
    //if ($gameParty.inBattle()) {
    if (SceneManager._scene instanceof Scene_Battle) {
        var types = Moogle_X.PsvSkl.Game_BattlerBase_addedSkillTypes.call(this)
        var passiveId = Moogle_X.PsvSkl.hiddenSkillTypeId;
        types = types.filter(function(stypeId) {
            return stypeId !== passiveId;
        });
        return types;
    } else {
        return Moogle_X.PsvSkl.Game_BattlerBase_addedSkillTypes.call(this);
    }
};


})(); // IIFE

// Compatibility with Yanfly's Skill Cooldowns.
if (Imported.YEP_X_SkillCooldowns) {

//=============================================================================
// Constant Declaration
//=============================================================================

Game_BattlerBase.TRAIT_PSV_COOLDOWN_DURATION = 115; // New trait code.
Game_BattlerBase.TRAIT_PSV_STYPE_COOLDOWN_DURATION = 116; // New trait code.
Game_BattlerBase.TRAIT_PSV_GLOBAL_COOLDOWN_DURATION = 117; // New trait code.
Game_BattlerBase.TRAIT_PSV_COOLDOWN_RATE = 118; // New trait code.
Game_BattlerBase.TRAIT_PSV_STYPE_COOLDOWN_RATE = 119; // New trait code.
Game_BattlerBase.TRAIT_PSV_GLOBAL_COOLDOWN_RATE = 120; // New trait code.
Game_BattlerBase.TRAIT_PSV_COOLDOWN_CHANGE = 121; // New trait code.
Game_BattlerBase.TRAIT_PSV_STYPE_COOLDOWN_CHANGE = 122; // New trait code.
Game_BattlerBase.TRAIT_PSV_GLOBAL_COOLDOWN_CHANGE = 123; // New trait code.
Game_BattlerBase.TRAIT_PSV_WARMUP_CHANGE = 124; // New trait code.
Game_BattlerBase.TRAIT_PSV_STYPE_WARMUP_CHANGE = 125; // New trait code.
Game_BattlerBase.TRAIT_PSV_GLOBAL_WARMUP_CHANGE = 126; // New trait code.

//=============================================================================
// DataManager
//=============================================================================

DataManager.processSCDNotetags2 = function(group) {
	var note1 = /<(?:SKILL)[ ](\d+)[ ](?:COOLDOWN):[ ]([\+\-]\d+)>/i;
  var note1a = /<(?:SKILL)[ ](.*)[ ](?:COOLDOWN):[ ]([\+\-]\d+)>/i;
	var note2 = /<(?:STYPE)[ ](\d+)[ ](?:COOLDOWN):[ ]([\+\-]\d+)>/i;
	var note3 = /<(?:GLOBAL COOLDOWN):[ ]([\+\-]\d+)>/i;
	var note4 = /<(?:SKILL)[ ](\d+)[ ](?:WARMUP):[ ]([\+\-]\d+)>/i;
  var note4a = /<(?:SKILL)[ ](.*)[ ](?:WARMUP):[ ]([\+\-]\d+)>/i;
	var note5 = /<(?:STYPE)[ ](\d+)[ ](?:WARMUP):[ ]([\+\-]\d+)>/i;
	var note6 = /<(?:GLOBAL WARMUP):[ ]([\+\-]\d+)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.cooldownChange = {};
		obj.stypeCooldownChange = {};
		obj.globalCooldownChange = 0;
		obj.warmupChange = {};
		obj.stypeWarmupChange = {};
		obj.globalWarmupChange = 0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.cooldownChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_COOLDOWN_CHANGE;
          var dataId = parseInt(RegExp.$1);
          var value = parseInt(RegExp.$2);
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			} else if (line.match(note1a)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.SkillIdRef[name]) {
          var id = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.cooldownChange[id] = parseInt(RegExp.$2);
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_COOLDOWN_CHANGE;
          var dataId = id;
          var value = parseInt(RegExp.$2);
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

      } else if (line.match(note2)) {
				obj.stypeCooldownChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_STYPE_COOLDOWN_CHANGE;
          var dataId = parseInt(RegExp.$1);
          var value = parseInt(RegExp.$2);
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			} else if (line.match(note3)) {
				obj.globalCooldownChange = parseInt(RegExp.$1);
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_GLOBAL_COOLDOWN_CHANGE;
          var dataId = 0;
          var value = parseInt(RegExp.$1);
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			} else if (line.match(note4)) {
				obj.warmupChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_WARMUP_CHANGE;
          var dataId = parseInt(RegExp.$1);
          var value = parseInt(RegExp.$2);
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			} else if (line.match(note4a)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.SkillIdRef[name]) {
          var id = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.warmupChange[id] = parseInt(RegExp.$2);
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_WARMUP_CHANGE;
          var dataId = id;
          var value = parseInt(RegExp.$2);
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

      } else if (line.match(note5)) {
				obj.stypeWarmupChange[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_STYPE_WARMUP_CHANGE;
          var dataId = parseInt(RegExp.$1);
          var value = parseInt(RegExp.$2);
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			} else if (line.match(note6)) {
				obj.globalWarmupChange = parseInt(RegExp.$1);
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_GLOBAL_WARMUP_CHANGE;
          var dataId = 0;
          var value = parseInt(RegExp.$1);
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			}
		}
	}
};

DataManager.processSCDNotetags3 = function(group) {
	var note1 = /<(?:SKILL)[ ](\d+)[ ](?:COOLDOWN DURATION):[ ](\d+)([%％])>/i;
  var note1a = /<(?:SKILL)[ ](.*)[ ](?:COOLDOWN DURATION):[ ](\d+)([%％])>/i;
	var note2 = /<(?:STYPE)[ ](\d+)[ ](?:COOLDOWN DURATION):[ ](\d+)([%％])>/i;
	var note3 = /<(?:GLOBAL COOLDOWN DURATION):[ ](\d+)([%％])>/i;
	var note4 = /<(?:SKILL)[ ](\d+)[ ](?:COOLDOWN RATE):[ ](\d+)([%％])>/i;
  var note4a = /<(?:SKILL)[ ](.*)[ ](?:COOLDOWN RATE):[ ](\d+)([%％])>/i;
	var note5 = /<(?:STYPE)[ ](\d+)[ ](?:COOLDOWN RATE):[ ](\d+)([%％])>/i;
	var note6 = /<(?:GLOBAL COOLDOWN RATE):[ ](\d+)([%％])>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.cooldownDuration = {};
		obj.stypeCooldownDuration = {};
		obj.globalCooldownDuration = 1.0;
		obj.cooldownRate = {};
		obj.stypeCooldownRate = {};
		obj.globalCooldownRate = 1.0;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.cooldownDuration[parseInt(RegExp.$1)] =
          parseFloat(RegExp.$2) * 0.01;
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_COOLDOWN_DURATION;
          var dataId = parseInt(RegExp.$1);
          var value = parseFloat(RegExp.$2) * 0.01;
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			} else if (line.match(note1a)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.SkillIdRef[name]) {
          var id = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.cooldownDuration[id] = parseFloat(RegExp.$2) * 0.01;
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_COOLDOWN_DURATION;
          var dataId = id;
          var value = parseFloat(RegExp.$2) * 0.01;
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

      } else if (line.match(note2)) {
				obj.stypeCooldownDuration[parseInt(RegExp.$1)] =
          parseFloat(RegExp.$2) * 0.01;
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_STYPE_COOLDOWN_DURATION;
          var dataId = parseInt(RegExp.$1);
          var value = parseFloat(RegExp.$2) * 0.01;
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			} else if (line.match(note3)) {
				obj.globalCooldownDuration = parseFloat(RegExp.$1 * 0.01);
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_GLOBAL_COOLDOWN_DURATION;
          var dataId = 0;
          var value = parseFloat(RegExp.$1) * 0.01;
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			} else if (line.match(note4)) {
				obj.cooldownRate[parseInt(RegExp.$1)] = parseFloat(RegExp.$2) * 0.01;
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_COOLDOWN_RATE;
          var dataId = parseInt(RegExp.$1);
          var value = parseFloat(RegExp.$2) * 0.01;
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			} else if (line.match(note4a)) {
        var name = String(RegExp.$1).toUpperCase();
        if (Yanfly.SkillIdRef[name]) {
          var id = Yanfly.SkillIdRef[name];
        } else {
          continue;
        }
        obj.cooldownRate[id] = parseFloat(RegExp.$2) * 0.01;
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_COOLDOWN_RATE;
          var dataId = id;
          var value = parseFloat(RegExp.$2) * 0.01;
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

      } else if (line.match(note5)) {
				obj.stypeCooldownRate[parseInt(RegExp.$1)] = parseFloat(RegExp.$2) * 0.01;
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_STYPE_COOLDOWN_RATE;
          var dataId = parseInt(RegExp.$1);
          var value = parseFloat(RegExp.$2) * 0.01;
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			} else if (line.match(note6)) {
				obj.globalCooldownRate = parseFloat(RegExp.$1 * 0.01);
        if (obj.traits) {
          var code = Game_BattlerBase.TRAIT_PSV_GLOBAL_COOLDOWN_RATE;
          var dataId = 0;
          var value = parseFloat(RegExp.$1 * 0.01);
          var trait = [{"code":code,"dataId":dataId,"value":value}];
          obj.traits = obj.traits.concat(trait);
        }

			}
		}
	}
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.psvCooldownDuration = function(skillId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_PSV_COOLDOWN_DURATION, skillId);
};

Game_Battler.prototype.psvStypeCooldownDuration = function(stypeId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_PSV_STYPE_COOLDOWN_DURATION, stypeId);
};

Game_Battler.prototype.psvGlobalCooldownDuration = function() {
    return this.traitsPi(Game_BattlerBase.TRAIT_PSV_GLOBAL_COOLDOWN_DURATION, 0);
};

Game_Battler.prototype.psvCooldownRate = function(skillId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_PSV_COOLDOWN_RATE, skillId);
};

Game_Battler.prototype.psvStypeCooldownRate = function(stypeId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_PSV_STYPE_COOLDOWN_RATE, stypeId);
};

Game_Battler.prototype.psvGlobalCooldownRate = function() {
    return this.traitsPi(Game_BattlerBase.TRAIT_PSV_GLOBAL_COOLDOWN_RATE, 0);
};

Game_Battler.prototype.psvCooldownChange = function(skillId) {
    return this.traitsSum(Game_BattlerBase.TRAIT_PSV_COOLDOWN_CHANGE, skillId);
};

Game_Battler.prototype.psvStypeCooldownChange = function(stypeId) {
    return this.traitsSum(Game_BattlerBase.TRAIT_PSV_STYPE_COOLDOWN_CHANGE, stypeId);
};

Game_Battler.prototype.psvGlobalCooldownChange = function() {
    return this.traitsSum(Game_BattlerBase.TRAIT_PSV_GLOBAL_COOLDOWN_CHANGE, 0);
};

Game_Battler.prototype.psvWarmupChange = function(skillId) {
    return this.traitsSum(Game_BattlerBase.TRAIT_PSV_WARMUP_CHANGE, skillId);
};

Game_Battler.prototype.psvStypeWarmupChange = function(stypeId) {
    return this.traitsSum(Game_BattlerBase.TRAIT_PSV_STYPE_WARMUP_CHANGE, stypeId);
};

Game_Battler.prototype.psvGlobalWarmupChange = function() {
    return this.traitsSum(Game_BattlerBase.TRAIT_PSV_GLOBAL_WARMUP_CHANGE, 0);
};

Game_Battler.prototype.cooldownDuration = function(skill) {
		var skillId = skill.id;
		var stypeId = skill.stypeId;
		var value = 1.0;
		value *= this.psvCooldownDuration(skillId);
		value *= this.psvStypeCooldownDuration(stypeId);
		value *= this.psvGlobalCooldownDuration();
		return value;
};

Game_Battler.prototype.cooldownRate = function(skill) {
		var skillId = skill.id;
		var stypeId = skill.stypeId;
		var value = 1;
		value *= this.psvCooldownRate(skillId);
		value *= this.psvStypeCooldownRate(stypeId);
		value *= this.psvGlobalCooldownRate();
		return value;
};

Game_Battler.prototype.flatCooldownChange = function(skill) {
		var skillId = skill.id;
		var stypeId = skill.stypeId;
		var value = 0;
		value += this.psvCooldownChange(skillId);
    value += this.psvStypeCooldownChange(stypeId);
    value += this.psvGlobalCooldownChange();
    return value;
};

Game_Battler.prototype.flatWarmupChange = function(skill) {
		var skillId = skill.id;
		var stypeId = skill.stypeId;
		var value = 0;
		value += this.psvWarmupChange(skillId);
		value += this.psvStypeWarmupChange(stypeId);
		value += this.psvGlobalWarmupChange();
		return value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.cooldownDuration = function(skill) {
    return Game_Battler.prototype.cooldownDuration.call(this, skill);
};

Game_Actor.prototype.cooldownRate = function(skill) {
		return Game_Battler.prototype.cooldownRate.call(this, skill);
};

Game_Actor.prototype.flatCooldownChange = function(skill) {
		return Game_Battler.prototype.flatCooldownChange.call(this, skill);
};

Game_Actor.prototype.flatWarmupChange = function(skill) {
		return Game_Battler.prototype.flatWarmupChange.call(this, skill);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.cooldownDuration = function(skill) {
		return Game_Battler.prototype.cooldownDuration.call(this, skill);
};

Game_Enemy.prototype.cooldownRate = function(skill) {
		return Game_Battler.prototype.cooldownRate.call(this, skill);
};

Game_Enemy.prototype.flatCooldownChange = function(skill) {
		return Game_Battler.prototype.flatCooldownChange.call(this, skill);
};

Game_Enemy.prototype.flatWarmupChange = function(skill) {
		return Game_Battler.prototype.flatWarmupChange.call(this, skill);
};

} // Imported.YEP_X_SkillCooldowns

//=============================================================================
// End of File
//=============================================================================
