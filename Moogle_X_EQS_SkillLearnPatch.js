//=============================================================================
// Equip Skill System - YEP_SkillLearnSystem Patch by Moogle_X
// Moogle_X_EQS_SkillLearnPatch.js
// Created on: December 11st 2015
//=============================================================================

//=============================================================================
/*:
 * @plugindesc v1.0 Compatibility patch between EQS and YEP_SkillLearnSystem.
 * @author Moogle_X
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * Use this compatibility patch if you use both Moogle_X_EquipSkillSystem and
 * YEP_SkillLearnSystem together in the same project.
 *
 * It's simply fix a minor visual bug (Skill Pool window doesn't get refresh
 * immediately after you learn new skill).
 *
 * Position this plugin below both Moogle_X_EquipSkillSystem plugin and
 * YEP_SkillLearnSystem plugin.
 *
 */
//=============================================================================

(function() { // IIFE

//=============================================================================
// Scene_Skill
//=============================================================================

// Compatibility fpr YEP_SkillLearnSystem. Simply refresh the skill pool window
// after learning new skill.
if (Imported.YEP_SkillLearnSystem && Imported.Moogle_X_EQS) {
  Moogle_X.EQS.Scene_Skill_onLearnOk = Scene_Skill.prototype.onLearnOk;
  Scene_Skill.prototype.onLearnOk = function() {
    Moogle_X.EQS.Scene_Skill_onLearnOk.call(this);
    this._eqsPoolWindow.refresh();
  };
}

})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
