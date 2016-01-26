//=============================================================================
// Skill Replace Skill by Moogle_X
// Moogle_X_SkillReplaceSkill.js
// Created on: January 27th 2016
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_SkillReplaceSkill = true;

var Moogle_X = Moogle_X || {};
Moogle_X.SkillReplace = Moogle_X.SkillReplace || {};

//=============================================================================
/*:
 * @plugindesc v1.0 Automatically forget skill when certain skill is learned.
 * @author Moogle_X
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * Just insert this notetag into the skill's notebox:
 * <Replace Skill: x>           // Automatically forget skill x when this skill
 *                              // is learned.
 *
 * Example:
 * <Replace Skill: 23>          // When this skill is learned, this actor will
 *                              // automatically forget skill 23.
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
// DataManager
//=============================================================================

Moogle_X.SkillReplace.DatabaseLoaded = false;
Moogle_X.SkillReplace.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.SkillReplace.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Moogle_X.SkillReplace.DatabaseLoaded) {
        DataManager.readNotetags_SkillReplace($dataSkills);
        Moogle_X.SkillReplace.DatabaseLoaded = true;
    }
		return true;
};

DataManager.readNotetags_SkillReplace = function(group) {
    var note = /<(?:Replace Skill):[ ](\d+)>/i;
	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.replaceSkill = 0;

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
            if (line.match(note)) {
                var skillId = Number(RegExp.$1);
                obj.replaceSkill = skillId;
            }
		    }
	  }
};


//=============================================================================
// Game_Actor
//=============================================================================

Moogle_X.SkillReplace.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    this._replacedSkill = [];
    Moogle_X.SkillReplace.Game_Actor_setup.call(this, actorId);
};

Moogle_X.SkillReplace.Game_Actor_isLearnedSkill =
    Game_Actor.prototype.isLearnedSkill;
Game_Actor.prototype.isLearnedSkill = function(skillId) {
    return Moogle_X.SkillReplace.Game_Actor_isLearnedSkill.call(this, skillId) ||
        this._replacedSkill.contains(skillId);
};

Moogle_X.SkillReplace.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    Moogle_X.SkillReplace.Game_Actor_learnSkill.call(this, skillId);
    if (!$dataSkills[skillId]) return;
    var forgetSkillId = $dataSkills[skillId].replaceSkill;
    if (forgetSkillId) {
        this.forgetSkill(forgetSkillId);
        if (!this._replacedSkill.contains(forgetSkillId)) {
            this._replacedSkill.push(forgetSkillId);
        }
    }
};


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
