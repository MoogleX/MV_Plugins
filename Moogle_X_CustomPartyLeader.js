//=============================================================================
// Custom Party Leader by Moogle_X
// Moogle_X_CustomPartyLeader.js
// Created on: November 6th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_CstPrtLdr = true;

var Moogle_X = Moogle_X || {};
Moogle_X.CstPrtLdr = Moogle_X.CstPrtLdr || {};

//=============================================================================
/*:
 * @plugindesc v1.0 Make certain actor to always show up on map as party leader.
 * @author Moogle_X
 *
 * @param Leader ID
 * @desc Decide who is the permanent party leader. Insert the actor ID here.
 * @default 1
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin changes the party leader character on the map. By default, the
 * first party member is always the party leader. The second, third, and so on
 * members become the followers.
 *
 * Now, you can decide a certain actor to always lead the party on map.
 * That actor will always show up on map as the front character even if he/she
 * is currently NOT in the party.
 *
 * If that character is not in the party, he/she will not show up in menu and
 * battle. The character only shows up on map as front character.
 * If you add that character in the party, you will see the duplicate of that
 * character's sprite as one of the followers.
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

//=============================================================================
// Parameter Variables
//=============================================================================
var parameters = PluginManager.parameters('Moogle_X_CustomPartyLeader');
var permaLeaderId = Number(parameters['Leader ID']) || 1;

//=============================================================================
// Game_Party
//=============================================================================
Game_Party.prototype.leader = function() {
    return $gameActors.actor(permaLeaderId);
};

//=============================================================================
// Game_Followers
//=============================================================================
Moogle_X.CstPrtLdr.Game_Followers_initialize =
    Game_Followers.prototype.initialize;
Game_Followers.prototype.initialize = function() {
    Moogle_X.CstPrtLdr.Game_Followers_initialize.call(this);
    this._data = []; // Reset followers data.
    for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
        this._data.push(new Game_Follower(i));
    }
};


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
