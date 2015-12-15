//=============================================================================
// Element Booster by Moogle_X
// Moogle_X_ElementBooster.js
// Created on: November 13rd 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_EleBost = true;

var Moogle_X = Moogle_X || {};
Moogle_X.EleBost = Moogle_X.EleBost || {};

//=============================================================================
/*:
 * @plugindesc v1.1 Adds new trait that increase elemental damage output.
 * @author Moogle_X
 *
 * @param Combine Multiple Element Boost
 * @desc Read the help file for more info about this. 1:Yes 0:No
 * @default 0
 *
 * @param Combine Multiple Element Rate
 * @desc Read the help file for more info about this. 1:Yes 0:No
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin gives the ability for actors, classes, enemies, weapons, armors,
 * and states to have special trait that increase or decrease elemental damage
 * output.
 *
 * To add this element boost trait, simply add this notetag into their
 * respective noteboxes.
 *
 * <Element Boost x: y%>              // Multiply elemental damage with ID x
 *                                       by y%.
 * Example:
 * <Element Boost 2: 125%>            // Increase element 2 damage by 25%.
 * <Element Boost 3: 50%>             // Decrease element 3 damage by half.
 * <Element Boost 4: 0%>              // Element 4 will always deal 0 damage.
 *
 * What will happen with "Normal Attack" element?
 *
 * For example, enemy has 200% Fire element rate, 150% Earth element rate, and
 * 50% Ice element rate.
 * Actor has Fire and Earth attack element traits.
 * Actor has 300% Fire Boost, 400% Earth Boost, and 500% Thunder Boost traits.
 * Then, actor use "Attack" skill (which has "Normal Attack" element) on enemy.
 *
 * First, the default engine will check actor's attack element list, which are
 * Fire and Earth.
 *
 * Next, the default engine will check the enemy's element rate from Fire and
 * Earth and return the one with the highest number (in this case 200%).
 *
 * Then my plugin will also do check the actor's element boost traits from Fire
 * and Earth and return the one with the highest number (in this case 400%).
 *
 * The total damage will be multiplied by (200% * 400%) = 800% total multiplier.
 *
 * ============================================================================
 * Combining Multiple Element Rate and Boost
 * ============================================================================
 * The above example will happen if you set "Combine Multiple Element Boost"
 * and "Combine Multiple Element Rate" options to 0 (turn off).
 *
 * What happen if you turn on "Combine Multiple Element Rate"?
 * The default engine will combine enemy's both Fire element rate and Earth
 * element rate. (200% * 150%) = 300%
 * Total damage will be multiplied by (300% * 400%) = 1200%
 *
 * What happen if you turn on "Combine Multiple Element Boost" while keeping
 * above option off?
 * My plugin will combine actor's both Fire and Earth Element Boost rate.
 * (300% * 400%) = 1200%
 * Total damage will be multiplied by (200% * 1200%) = 2400%
 *
 * What will happen if you turn on both options?
 * The game will take into accounts enemy's combined rate and actor's combined
 * boost from Fire and Earth.
 * The total damage will be multiplied by ((200% * 150%) * (300% * 400%))
 * = 3600% !!!
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free to use in both commercial and non-commercial project as long as credit
 * is given.
 *
 * ============================================================================
 * Change log
 * ============================================================================
 * Version 1.1:
 * - Added "Combine Multiple Element Boost" and "Combine Multiple Element Rate"
 *   options.
 *
 * Version 1.0:
 * - Completed plugin.
 *
 */
//=============================================================================

//=============================================================================
// Constant Declaration
//=============================================================================
Game_BattlerBase.TRAIT_ELEMENT_BOOST   = 111; // New trait's "code".

(function() { // IIFE

//=============================================================================
// Parameter Variables
//=============================================================================

Moogle_X.EleBost.parameters = PluginManager.parameters('Moogle_X_ElementBooster');
Moogle_X.EleBost.combineBoost =
    Number(Moogle_X.EleBost.parameters['Combine Multiple Element Boost']) != 0;
Moogle_X.EleBost.combineRate =
    Number(Moogle_X.EleBost.parameters['Combine Multiple Element Rate']) != 0;

//=============================================================================
// DataManager
//=============================================================================

Moogle_X.EleBost.DatabaseLoaded = false;
Moogle_X.EleBost.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.EleBost.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Moogle_X.EleBost.DatabaseLoaded) {
        DataManager.readNotetags_EleBost($dataActors);
        DataManager.readNotetags_EleBost($dataClasses);
        DataManager.readNotetags_EleBost($dataEnemies);
        DataManager.readNotetags_EleBost($dataWeapons);
        DataManager.readNotetags_EleBost($dataArmors);
        DataManager.readNotetags_EleBost($dataStates);
        Moogle_X.EleBost.DatabaseLoaded = true;
    }
		return true;
};

DataManager.readNotetags_EleBost = function(group) {
	var note = /<(?:ELEMENT BOOST)[ ](\d+):[ ](\d+)\%>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		var code = Game_BattlerBase.TRAIT_ELEMENT_BOOST;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note)) {
        var elementId = Number(RegExp.$1);
        var boostValue = Number(RegExp.$2) / 100;
        var elementBoost = [{"code":code,"dataId":elementId,"value":boostValue}];
        obj.traits = obj.traits.concat(elementBoost);
      }
		}
	}
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.elementBoost = function(elementId) {
    return this.traitsPi(Game_BattlerBase.TRAIT_ELEMENT_BOOST, elementId);
};

//=============================================================================
// Game_Action
//=============================================================================

Moogle_X.EleBost.Game_Action_makeDamageValue =
    Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
    var value = Moogle_X.EleBost.Game_Action_makeDamageValue.call(this, target, critical);
    value *= this.calcElementBoost(this.subject());
    value = Math.round(value);
    return value;
};

Game_Action.prototype.calcElementBoost = function(subject) {
    if (this.item().damage.elementId < 0) {
        return this.elementsMaxBoostRate(subject, subject.attackElements());
    } else {
        return subject.elementBoost(this.item().damage.elementId);
    }
};

Game_Action.prototype.elementsMaxBoostRate = function(subject, elements) {
    if (elements.length > 0) {
        if (Moogle_X.EleBost.combineBoost) {
            var boostList = elements.map(function(elementId) {
                return subject.elementBoost(elementId);
            });
            return boostList.reduce(function(r, value) {
                return r * value;
            }, 1);
        } else {
            return Math.max.apply(null, elements.map(function(elementId) {
                return subject.elementBoost(elementId);
            }, this));
        }

    } else {
        return 1;
    }
};

Moogle_X.EleBost.Game_Action_elementsMaxRate =
    Game_Action.prototype.elementsMaxRate;
Game_Action.prototype.elementsMaxRate = function(target, elements) {
    if (Moogle_X.EleBost.combineRate) {
        if (elements.length > 0) {
            var rateList = elements.map(function(elementId) {
                return target.elementRate(elementId);
            });
            return rateList.reduce(function(r, value) {
                return r * value;
            }, 1);
        } else {
            return 1;
        }
    } else {
        return Moogle_X.EleBost.Game_Action_elementsMaxRate.call(this, target, elements);
    }
};

})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
