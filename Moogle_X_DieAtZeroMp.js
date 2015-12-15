//=============================================================================
// Die At Zero MP by Moogle_X
// Moogle_X_DieAtZeroMp.js
// Created on: November 5th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_DieAtZeroMp = true;

var Moogle_X = Moogle_X || {};
Moogle_X.DieZeroMp = Moogle_X.DieZeroMp || {};

//=============================================================================
/*:
 * @plugindesc v1.1 Actors or Enemies will automatically die at 0 MP.
 * @author Moogle_X
 *
 * @param All Actors
 * @desc Decide whether all Actors will die at 0 MP by default. 1:Yes 0:No
 * @default 0
 *
 * @param All Enemies
 * @desc Decide whether all Enemies will die at 0 MP by default. 1:Yes 0:No
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin gives the ability for actors, classes, enemies, weapons, armors,
 * and states to have a special trait that will make any actors or enemies
 * automatically die if they have 0 MP.
 *
 * You can make this effect to apply to all actors and/or enemies by default
 * simply by editting the plugin configuration.
 *
 * All Actors: 1 (for default) / 0 (for not default)
 * All Enemies: 1 (for default) / 0 (for not default)
 *
 * If you do not set this effect as default, you are free to apply this effect
 * "manually" to certain actors or enemies by adding this notetag.
 *
 * <Die At Zero MP>
 *
 * The above notetag can be applied to actors, classes, enemies, weapons,
 * armors, and states.
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
Game_BattlerBase.TRAIT_DIE_ZERO_MP   = 110; // Brand new trait's "code" for
																						// die at zero MP effect.

(function() { // IIFE

//=============================================================================
// Parameter Variables
//=============================================================================
var parameters = PluginManager.parameters('Moogle_X_DieAtZeroMp');
var defaultActorsDead = Number(parameters['All Actors']) != 0;
var defaultEnemiesDead = Number(parameters['All Enemies']) != 0;

//=============================================================================
// DataManager
//=============================================================================

Moogle_X.DieZeroMp.DatabaseLoaded = false;
Moogle_X.DieZeroMp.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.DieZeroMp.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Moogle_X.DieZeroMp.DatabaseLoaded) {
        DataManager.readNotetags_dieZeroMp($dataActors);
        DataManager.readNotetags_dieZeroMp($dataClasses);
        DataManager.readNotetags_dieZeroMp($dataEnemies);
        DataManager.readNotetags_dieZeroMp($dataWeapons);
        DataManager.readNotetags_dieZeroMp($dataArmors);
        DataManager.readNotetags_dieZeroMp($dataStates);
        Moogle_X.DieZeroMp.DatabaseLoaded = true;
    }
		return true;
};

DataManager.readNotetags_dieZeroMp = function(group) {
	var note = /<(?:DIE AT ZERO MP)>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

		var code = Game_BattlerBase.TRAIT_DIE_ZERO_MP;
		var dieZeroMpTrait = [{"code":code,"dataId":0,"value":0}];

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note)) {
        obj.traits = obj.traits.concat(dieZeroMpTrait);
      }
		}
	}
};

//=============================================================================
// Game_BattlerBase
//=============================================================================
Game_BattlerBase.prototype.canDieAtZeroMp = function() {
		if (this.traits(Game_BattlerBase.TRAIT_DIE_ZERO_MP).length > 0) {
				return true;
    } else if (this.isActor() && defaultActorsDead) {
        return true;
    } else if (this.isEnemy() && defaultEnemiesDead) {
        return true;
		} else {
				return false;
		}
};

Moogle_X.DieZeroMp.Game_BattlerBase_refresh =
		Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
		Moogle_X.DieZeroMp.Game_BattlerBase_refresh.call(this);
		if (this._mp === 0 && this.canDieAtZeroMp()) {
				this.addState(this.deathStateId());
		}
};

//=============================================================================
// Game_Battler
//=============================================================================

Moogle_X.DieZeroMp.Game_Battler_removeState =
    Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    Moogle_X.DieZeroMp.Game_Battler_removeState.call(this, stateId);
    if (this._mp === 0 && this.canDieAtZeroMp()) {
        this.addNewState(this.deathStateId()); // Anti revival bug fix.
    }
};

})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
