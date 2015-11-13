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
 * @plugindesc v1.0 Adds new trait that increase elemental damage output.
 * @author Moogle_X
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
 * If your battler has multiple attack elements (ex: Physical, Fire, and Ice).
 * Physical doesn't have any element boost trait.
 * Fire has 150% total boost rate.
 * Ice has 180% total boost rate.
 * The element with the highest amount of boost rate will be used for damage
 * calculation.
 *
 * In this case, Ice's element boost rate will be used. The total damage will
 * be multiplied by 180%.
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free to use in both commercial and non-commercial project as long as credit
 * is given.
 *
 */
//=============================================================================

//=============================================================================
// Constant Declaration
//=============================================================================
Game_BattlerBase.TRAIT_ELEMENT_BOOST   = 111; // Brand new trait's "code" for
																					  	// element boost effect.

(function() { // IIFE

//=============================================================================
// DataManager
//=============================================================================

Moogle_X.EleBost.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.EleBost.DataManager_isDatabaseLoaded.call(this)) return false;
    DataManager.readNotetags_EleBost($dataActors);
    DataManager.readNotetags_EleBost($dataClasses);
    DataManager.readNotetags_EleBost($dataEnemies);
    DataManager.readNotetags_EleBost($dataWeapons);
    DataManager.readNotetags_EleBost($dataArmors);
    DataManager.readNotetags_EleBost($dataStates);
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
        return Math.max.apply(null, elements.map(function(elementId) {
            return subject.elementBoost(elementId);
        }, this));
    } else {
        return 1;
    }
};

})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
