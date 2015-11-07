//=============================================================================
// Constant MP Cost by Moogle_X
// Moogle_X_ConstantMpCost.js
// Created on: October 30th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_ConstantMpCost = true;

var Moogle_X = Moogle_X || {};
Moogle_X.ConstMp = Moogle_X.ConstMp || {};

//=============================================================================
/*:
 * @plugindesc v1.00 All skills have constant MP cost whenever a certain
 * in-game switch is ON.
 * @author Moogle_X
 *
 * @param Constant MP Cost
 * @desc Whenever the predetermined in-game switch is ON. All skills's MP Cost
 * becomes this number.
 * @default 0
 *
 * @param Special Switch ID
 * @desc Decide on your in-game switch id number here.
 * @default 1
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This is pretty much my first JS plugin attempt.
 * What it does is pretty simple. You can create some sort of common event
 * that turn on the special in-game switch. As long as that switch is ON,
 * all skills' MP cost become a certain amount (you decide).
 * This could be useful for some unique and creative skills like field effect
 * or something.
 *
 * IMPORTANT NOTE!
 * It doesn't affect normal attack's MP cost (skill #1 in database).
 * It doesn't affect guard's MP cost (skill #2 in database).
 * Enemy skills' MP cost are affected too.
 */
//=============================================================================

(function() { // IIFE

//=============================================================================
// Parameter Variables
//=============================================================================
var parameters = PluginManager.parameters('Moogle_X_ConstantMpCost');
var constantMpCost = Number(parameters['Constant MP Cost'] || '0');
var specialSwitchID = Number(parameters['Special Switch ID'] || '0');

//=============================================================================
// Game_BattlerBase
//=============================================================================

Moogle_X.ConstMp.Game_BattlerBase_skillMpCost =
		Game_BattlerBase.prototype.skillMpCost;
Game_BattlerBase.prototype.skillMpCost = function(skill) {
  if ($gameSwitches.value(specialSwitchID) && skill.id !== 1 && skill.id !== 2) {
    return constantMpCost;
  } else { // if
    return Moogle_X.ConstMp.Game_BattlerBase_skillMpCost.call(this,skill);
  } // else
};

})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
