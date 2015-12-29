//=============================================================================
// Equip Skill System - killerfer Patch by Moogle_X
// Moogle_X_EQS_killerferPatch.js
// Created on: December 29th 2015
//=============================================================================

//=============================================================================
/*:
 * @plugindesc v1.0 Remove Window_EqsLimit and Window_EqsCost.
 * @author Moogle_X
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This is a "plug and play" plugin patch request from killerfer. :)
 *
 * This patch is made specifically for Equip Skill System plugin.
 * What it does is simply removing Window_EqsLimit and Window_EqsCost from
 * the "Equip Skill" scene.
 *
 * Please position this plugin below Equip Skill System plugin.
 * Otherwise, the patch won't work.
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

if (Imported.Moogle_X_EQS) {

//=============================================================================
// Scene_Skill
//=============================================================================

Scene_Skill.prototype.createEquipSkillWindow = function() {
    var wy = this._eqsLimitWindow.y; //+ this._eqsLimitWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._eqsSlotWindow = new Window_EquipSkillSlot(0, wy, ww, wh);
    this._eqsSlotWindow.setHelpWindow(this._helpWindow);
    this._eqsSlotWindow.setHandler('ok',     this.onEqsSlotOk.bind(this));
    this._eqsSlotWindow.setHandler('cancel', this.onEqsSlotCancel.bind(this));
    //this._eqsSlotWindow.setHandler('pagedown', this.nextActor.bind(this));
    //this._eqsSlotWindow.setHandler('pageup',   this.previousActor.bind(this));
    this._skillTypeWindow.setEqsSlotWindow(this._eqsSlotWindow);
    this.addWindow(this._eqsSlotWindow);
};

Scene_Skill.prototype.createEquipSkillPool = function() {
    var wy = this._eqsCostWindow.y; //+ this._eqsCostWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._eqsPoolWindow = new Window_EquipSkillPool(ww, wy, ww, wh);
    this._eqsPoolWindow.setHelpWindow(this._helpWindow);
    this._eqsPoolWindow.setHandler('ok',     this.onEqsItemOk.bind(this));
    this._eqsPoolWindow.setHandler('cancel', this.onEqsItemCancel.bind(this));
    this._skillTypeWindow.setEqsPoolWindow(this._eqsPoolWindow);
    this._eqsSlotWindow.setItemWindow(this._eqsPoolWindow);
    this.addWindow(this._eqsPoolWindow);
};

//=============================================================================
// Window_SkillType
//=============================================================================

Window_SkillType.prototype.updateEqsShowHide = function() {
    if (this.currentSymbol() === 'eqsEquip') {
        this._eqsSlotWindow.show();
        this._eqsPoolWindow.show();
        //this._eqsLimitWindow.show();
        //this._eqsCostWindow.show();
    } else {
        this._eqsSlotWindow.hide();
        this._eqsPoolWindow.hide();
        this._eqsLimitWindow.hide();
        this._eqsCostWindow.hide();
    }
};

//=============================================================================
// Scene_EQS
//=============================================================================

Scene_EQS.prototype.createEquipSkillWindow = function() {
    var wy = this._eqsLimitWindow.y; //+ this._eqsLimitWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._eqsSlotWindow = new Window_EquipSkillSlot(0, wy, ww, wh);
    this._eqsSlotWindow.setHelpWindow(this._helpWindow);
    this._eqsSlotWindow.setHandler('ok',     this.onEqsSlotOk.bind(this));
    this._eqsSlotWindow.setHandler('cancel', this.onEqsSlotCancel.bind(this));
    this._eqsSlotWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._eqsSlotWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(this._eqsSlotWindow);
};

Scene_EQS.prototype.createEquipSkillPool = function() {
    var wy = this._eqsCostWindow.y; //+ this._eqsCostWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._eqsPoolWindow = new Window_EquipSkillPool(ww, wy, ww, wh);
    this._eqsPoolWindow.setHelpWindow(this._helpWindow);
    this._eqsPoolWindow.setHandler('ok',     this.onEqsItemOk.bind(this));
    this._eqsPoolWindow.setHandler('cancel', this.onEqsItemCancel.bind(this));
    this._eqsSlotWindow.setItemWindow(this._eqsPoolWindow);
    this.addWindow(this._eqsPoolWindow);
    this._eqsSlotWindow.activate();
    this._eqsSlotWindow.select(0);
    this._eqsLimitWindow.hide(); // NEW!
    this._eqsCostWindow.hide();  // NEW!
};


} // Imported.Moogle_X_EQS

})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
