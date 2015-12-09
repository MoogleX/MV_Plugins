//=============================================================================
// Sick State by Moogle_X
// Moogle_X_SickState.js
// Created on: November 30th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_SickState = true;

var Moogle_X = Moogle_X || {};
Moogle_X.SickState = Moogle_X.SickState || {};

//=============================================================================
/*:
 * @plugindesc v1.0 Adds item usage prevention state on actors.
 * @author Moogle_X
 *
 * @param Sick State ID
 * @desc This is state ID of nauseous state.
 * @default 0
 *
 * @param Show Sick Message
 * @desc Show sick message during battle? 1:Yes 0:No
 * @default 1
 *
 * @param Sick Message
 * @desc This is the text for Sick Message. %1 = Target name; %2 = Item name.
 * @default %1 is sick. %1 cannot consume %2.
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This is a special plugin request from Iliketea.
 *
 * First, you need to add this notetag for any items/foods/potions in your item
 * database.
 *
 * Items Notetags:
 * <Non-Sick Item>          // This item cannot be used for any actors with
 *                          // Sick State.
 *
 * Next, edit the plugin configuration. Change "Sick State ID" to your nauseous
 * state ID number.
 *
 * ============================================================================
 * How This Plugin Works
 * ============================================================================
 * On map scenario...
 *    If the target actor has nauseous state and you try to use item with
 * <Non-Sick Item> notetag, you will get "buzzer" sound. The item cannot be
 * used. The item is not consumed.
 *
 * In battle scenario...
 *    If the target actor has nauseous state and you try to use item with
 * <Non-Sick Item> notetag, Sick Message will be shown, the item IS consumed.
 * But, there is no effect whatsoever, including any FP gain.
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 * If you use Moogle_X_ActorsFriendshipSystem, you MUST put this plugin lower
 * than Moogle_X_ActorsFriendshipSystem.
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
// Parameter Variables
//=============================================================================

Moogle_X.SickState.parameters = PluginManager.parameters('Moogle_X_SickState');
Moogle_X.SickState.nauseousId = Number(Moogle_X.SickState.parameters['Sick State ID'] || 0);
Moogle_X.SickState.showMessage = Number(Moogle_X.SickState.parameters['Show Sick Message']) != 0;
Moogle_X.SickState.sickMessage = String(Moogle_X.SickState.parameters['Sick Message'] || '');

//=============================================================================
// DataManager
//=============================================================================

Moogle_X.SickState.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.SickState.DataManager_isDatabaseLoaded.call(this)) return false;
    DataManager.readNotetags_SickState($dataItems);
		return true;
};

DataManager.readNotetags_SickState = function(group) {
	var note = /<(?:Non-Sick Item)>/i;

	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.isNonSickItem = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note)) {
        obj.isNonSickItem = true;
      }
		}
	}
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

/*
Moogle_X.SickState.Game_BattlerBase_meetsUsableItemConditions =
    Game_BattlerBase.prototype.meetsUsableItemConditions;
Game_BattlerBase.prototype.meetsUsableItemConditions = function(item) {
    return Moogle_X.SickState.Game_BattlerBase_meetsUsableItemConditions.call(this, item) &&
        this.canUseNonSickItem(item);
};

Game_BattlerBase.prototype.canUseNonSickItem = function(item) {
    if (!item.isNonSickItem) return true;
    if (this.isStateAffected(Moogle_X.SickState.nauseousId)) {
        if ($gameParty.inBattle()) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
};
*/

//=============================================================================
// Game_Action
//=============================================================================

Moogle_X.SickState.Game_Action_testApply = Game_Action.prototype.testApply;
Game_Action.prototype.testApply = function(target) {
    return Moogle_X.SickState.Game_Action_testApply.call(this, target) &&
        this.testSickStateEffect(target);
};

Game_Action.prototype.testSickStateEffect = function(target) {
    if (this.isItem()) {
        if (this.item().isNonSickItem) {
            if (target.isStateAffected(Moogle_X.SickState.nauseousId)) {
                if ($gameParty.inBattle()) {
                    if (Moogle_X.SickState.showMessage) {
                        var fmt = Moogle_X.SickState.sickMessage
                  			var text = fmt.format(target.name(), this.item().name);
                        $gameMessage.newPage();
                        $gameMessage.add(text);
                    }
                }
                return false; // Target is sick.
            } else {
                return true; // Target is not sick.
            }
        } else {
            return true; // Item is not Non-Sick Item.
        }

    } else {
        return true; // Action is not item.
    }
};

// Compatibility with Actors Friendship System plugin.
if (Imported.Moogle_X_AFS) {
    Moogle_X.SickState.Game_Action_preApplyAfsGain =
        Game_Action.prototype.preApplyAfsGain;
    Game_Action.prototype.preApplyAfsGain = function(target) {
        if (this.item().isNonSickItem) {
            if (!this.subject().isAfsLeader()) return;
            if (this.subject().isStateAffected(Moogle_X.SickState.nauseousId)) {
                return;
            } else {
                if (target.isStateAffected(Moogle_X.SickState.nauseousId)) return;
            }
            Moogle_X.SickState.Game_Action_preApplyAfsGain.call(this, target);
        } else {
            Moogle_X.SickState.Game_Action_preApplyAfsGain.call(this, target);
        }
    }
}


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
