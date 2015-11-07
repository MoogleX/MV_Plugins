//=============================================================================
// Accuracy Overflow by Moogle_X
// Moogle_X_AccuracyOverflow.js
// Created on: November 6th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_AccFlow = true;

var Moogle_X = Moogle_X || {};
Moogle_X.AccFlow = Moogle_X.AccFlow || {};

//=============================================================================
/*:
 * @plugindesc v1.0 Accuracy formula becomes (Hit Rate - Evasion Rate)%.
 * @author Moogle_X
 *
 * @param Apply Hit Rate on Magical Attack
 * @desc Decide whether user's hit rate affect magical skill's evade
 * calculation. 1:Yes 0:No
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin changes how miss/evade calculation work. By default, hit chance
 * and evade chance are calculated separately. If you have 1000% hit rate and
 * the enemy has 100% evasion rate, the enemy will always dodge your attack.
 *
 * Now, hit chance is calculated only by skill's success rate chance.
 * Ex: "Fire" with 100% success rate will have 100% hit chance.
 *     "Ice" with 70% success rate will have 70% hit chance.
 *
 * The evade chance is calculated by new formula:
 * 1. Hit Type: "Physical Attack"
 * 100% - ((User's Hit Rate) - (Target's Evasion Rate))%
 *
 * 2. Hit Type: "Magical Attack" without <'Apply Hit Rate on Magical Attack'>
 * (Target's Magic Evasion Rate)%
 *
 * 3. Hit Type: "Magical Attack" with <'Apply Hit Rate on Magical Attack'>
 * 100% - ((User's Hit Rate) - (Target's Magic Evasion Rate))%
 *
 * 4. Hit Type: "Certain Hit"
 * Always 0% evade chance.
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

var dummyTarget = null;
var dummyAction = null;

//=============================================================================
// Parameter Variables
//=============================================================================
var parameters = PluginManager.parameters('Moogle_X_AccuracyOverflow');
var applyHitOnMagic = Number(parameters['Apply Hit Rate on Magical Attack']) != 0;

//=============================================================================
// Game_Action
//=============================================================================
Moogle_X.AccFlow.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    dummyTarget = target;
    dummyAction = this;
    Moogle_X.AccFlow.Game_Action_apply.call(this, target);
};

//=============================================================================
// Game_ActionResult
//=============================================================================

Moogle_X.AccFlow.Game_ActionResult_isHit =
    Game_ActionResult.prototype.isHit;
Game_ActionResult.prototype.isHit = function() {
    var target = dummyTarget;
    var action = dummyAction;
    this.missed = false;
    this.evaded = false;

    if (this.used) {
        this.missed = Math.random() >= (action.item().successRate * 0.01);
        if (!this.missed) {
            this.evaded = this.evasionResult(target, action);
        }
    }

    return Moogle_X.AccFlow.Game_ActionResult_isHit.call(this);
};

Game_ActionResult.prototype.evasionResult = function(target, action) {
    if (action.isPhysical()) {
        return Math.random() >= (action.subject().hit - target.eva);
    } else if (action.isMagical()) {
        if (applyHitOnMagic) {
            return Math.random() >= (action.subject().hit - target.mev);
        } else {
            return Math.random() <= target.mev;
        }
    } else {
        return false; // "Certain Hit" skills.
    }
};

})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
