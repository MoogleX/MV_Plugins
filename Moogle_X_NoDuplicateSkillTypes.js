//=============================================================================
// No Duplicate Skill Types by Moogle_X
// Moogle_X_NoDuplicateSkillTypes.js
// Created on: December 30th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_NoDuplicateSkillTypes = true;

var Moogle_X = Moogle_X || {};
Moogle_X.NoDupStype = Moogle_X.NoDupStype || {};

//=============================================================================
/*:
 * @plugindesc v1.0 Remove any duplicate skill types from skill types list.
 * @author Moogle_X
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This is a simple patch that pretty much prevent any actors to have duplicate
 * skill types from their skill types list.
 *
 * This plugin is plug and play.
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

(function() { // IIFE

//=============================================================================
// Game_BattlerBase
//=============================================================================

Moogle_X.NoDupStype.Game_BattlerBase_addedSkillTypes =
    Game_BattlerBase.prototype.addedSkillTypes;
Game_BattlerBase.prototype.addedSkillTypes = function() {
    var list = Moogle_X.NoDupStype.Game_BattlerBase_addedSkillTypes.call(this);
    var list2 = [];
    list.forEach(function(stypeId) {
        if (!list2.contains(stypeId)) {
            list2.push(stypeId);
        }
    });
    return list2;
};


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
