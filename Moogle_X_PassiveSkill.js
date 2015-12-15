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
 * @plugindesc v1.12 Adds passive skills functionality to actors.
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
    if ($gameParty.inBattle()) {
        var types = Moogle_X.PsvSkl.Game_BattlerBase_addedSkillTypes.call(this)
        var index = types.indexOf(Moogle_X.PsvSkl.hiddenSkillTypeId);
        if (index >= 0) {
            types.splice(index, 1);
        }
        return types;
    } else {
        return Moogle_X.PsvSkl.Game_BattlerBase_addedSkillTypes.call(this);
    }
};


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
