//=============================================================================
// Multiple Elements by Moogle_X
// Moogle_X_MultipleElements.js
// Created on: December 5th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_MultEle = true;

var Moogle_X = Moogle_X || {};
Moogle_X.MultEle = Moogle_X.MultEle || {};

//=============================================================================
/*:
 * @plugindesc v1.0 Allows skills to have pre-defined multiple elements.
 * @author Moogle_X
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This is a special plugin request from Sol Rising.
 *
 * This plugin allows you to make skills with pre-defined multiple elements
 * instead of just 1 regular fixed element per skill.
 *
 * "Technically" this plugin is a standalone plugin. You do not need to use
 * Moogle_X_ElementBooster to use this plugin. But, if you use Element Booster,
 * you must position this plugin below it.
 *
 * Also, It's HIGHLY recommended to turn on "Combine Multiple Element Boost"
 * and "Combine Multiple Element Rate" parameters in Moogle_X_ElementBooster
 * plugin configuration.
 *
 * Not doing so will result in some weird damage calculation...
 *
 * ============================================================================
 * How to Make Multiple Elements Skills
 * ============================================================================
 * In order to make a skill to have multiple elements, you must insert this
 * notetag in the skill's notebox.
 *
 * <Multi Elements: x, y, z>
 *
 * The skill will have elements x, y, z. You can put as many elements as you
 * want. But, please DO NOT put any duplicates in the notetag like...
 *
 * <Multi Elements: 2, 3, 4, 4, 5, 5, 7>    // DON'T DO THIS!
 * <Multi Elements: 2, 3, 4, 5, 7>          // Do this instead.
 *
 * IMPORTANT!
 * If you use the above notetag, the engine will IGNORE any skill element that
 * you set up in the default editor.
 * The engine will only use elements in the "Multi Elements" list instead.
 *
 * ============================================================================
 * Element Absorb?
 * ============================================================================
 * If you use YEP_ElementAbsorb AND turn on the "Multiple Priority" parameter,
 * the enemy will absorb the whole damage even if it's only able to absorb just
 * one element among the Skill's Multiple Elements.
 *
 * ============================================================================
 * Element Reflect?
 * ============================================================================
 * If you use YEP_ElementReflect...
 * I'm sorry Multiple Elements Skill cannot trigger element reflection.
 * This is because Yanfly seems to disable such functionality in the plugin.
 * (You can try testing it with "Normal Attack" element skill + Multi Elements
 * Weapon.)
 *
 * But, it seems that Yanfly will update the plugin later. When that happen,
 * I will update this plugin as well to support element reflection.
 * (Feel free to remind me.)
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 * Position this plugin below Moogle_X_ElementBooster, YEP_ElementAbsorb, and
 * YEP_ElementReflect.
 *
 * Also position Moogle_X_ElementBooster below YEP_DamageCore, YEP_ElementAbsorb,
 * and YEP_ElementReflect.
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
 * Version 1.0:
 * - Completed plugin.
 *
 */
//=============================================================================

(function() { // IIFE

//=============================================================================
// DataManager
//=============================================================================

Moogle_X.MultEle.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.MultEle.DataManager_isDatabaseLoaded.call(this)) return false;
    DataManager.readNotetags_MultEle($dataSkills);
		return true;
};

DataManager.readNotetags_MultEle = function(group) {
    var note = /<(?:MULTI ELEMENTS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.isMultiElements = false;
        obj.multiElements = [];

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note)) {
                obj.isMultiElements = true;
                var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                obj.multiElements = array;
            }
		    }
	  }
};

//=============================================================================
// Game_Action
//=============================================================================

Moogle_X.MultEle.Game_Action_calcElementRate =
    Game_Action.prototype.calcElementRate;
Game_Action.prototype.calcElementRate = function(target) {
    if (this.item().isMultiElements) {
        var multiElements = this.item().multiElements;
        return this.elementsMaxRate(target, multiElements);
    } else {
        return Moogle_X.MultEle.Game_Action_calcElementRate.call(this, target);
    }
};

// Compatibility with Moogle_X_ElementBooster.
if (Imported.Moogle_X_EleBost) {
    Moogle_X.MultEle.Game_Action_calcElementBoost =
        Game_Action.prototype.calcElementBoost;
    Game_Action.prototype.calcElementBoost = function(subject) {
        if (this.item().isMultiElements) {
            var multiElements = this.item().multiElements;
            return this.elementsMaxBoostRate(subject, multiElements);
        } else {
            return Moogle_X.MultEle.Game_Action_calcElementBoost.call(this, subject);
        }
    };
}


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
