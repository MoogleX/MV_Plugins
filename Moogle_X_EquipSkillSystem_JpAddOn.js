//=============================================================================
// Equip Skill System - JP Add-On by Moogle_X
// Moogle_X_EquipSkillSystem_JpAddOn.js
// Created on: November 19th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_EQS_JP = true;

var Moogle_X = Moogle_X || {};
Moogle_X.EQS_JP = Moogle_X.EQS_JP || {};

//=============================================================================
/*:
 * @plugindesc v1.2 Replace Equip Limit with Job Points.
 * @author Moogle_X
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin is an add-on for Equip Skill System plugin. You must put this
 * plugin below both "Moogle_X_EquipSkillSystem" and "YEP_JobPoints".
 *
 * What this plugin does is replacing actor's Equip Limit parameter with their
 * total Job Points. More Job Points means more access to skills with higher
 * Equip Cost.
 *
 * Some of the original functions from "Moogle_X_EquipSkillSystem" are removed.
 * Here is the list of removed features:
 *
 * 1. Notetags
 * <EQS Max Limit x: n>
 * <EQS Max Limit x to y: n>
 * <EQS Limit Plus: x>
 * <EQS Limit Grow: x>
 *
 * 2. Plugin Command
 * EQS Actor x Limit Grow y
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
 * Version 1.2:
 * - Compatibility with Equip Skill System plugin v1.4.
 *
 * Version 1.0:
 * - Completed plugin.
 *
 *
 */
//=============================================================================

(function() { // IIFE

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.totalEqsLimit = function() {
    return this.jp();
};

Game_Actor.prototype.addEqsLimit = function(limitIncrease) {
    // Empty.
};

Moogle_X.EQS_JP.Game_Actor_setJp = Game_Actor.prototype.setJp;
Game_Actor.prototype.setJp = function(value, classId) {
    Moogle_X.EQS_JP.Game_Actor_setJp.call(this, value, classId);
    this.refresh();
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.canGrowEqs = function(target) {
    if (target.isActor()) {
        var slotGrow = this.item().eqsSlotGrow.grow;
        var limitGrow = 0; // Changed to 0 for JP compatibility purpose.
        return (slotGrow > 0 || limitGrow > 0) ? true : false;
    } else {
        return false; // Target is not actor.
    }
};

Game_Action.prototype.applyEqsLimitGrow = function(target) {
    // Empty.
};

//=============================================================================
// Window_EquipSkillPool
//=============================================================================

Window_EquipSkillPool.prototype.drawEquipCost = function(skill, x, y, width) {
    if (skill.eqsCost > 0) {
        this.drawEquipJpCost(skill, x, y, width, 'right');
    }
};

Window_EquipSkillPool.prototype.drawEquipJpCost = function(skill, wx, wy, ww, align) {
    var jp = skill.eqsCost;
    var icon = '\\i[' + Yanfly.Icon.Jp + ']';
    var fmt = Yanfly.Param.JpMenuFormat;
    var text = fmt.format(Yanfly.Util.toGroup(jp), Yanfly.Param.Jp, icon);
    if (align === 'left') {
      wx = 0;
    } else if (align === 'center') {
      wx += (ww - this.textWidthEx(text)) / 2;
    } else {
      wx += ww - this.textWidthEx(text);
    }
    this.drawTextEx(text, wx, wy);
};

//=============================================================================
// Window_EqsLimit
//=============================================================================

Window_EqsLimit.prototype.drawCurrentEqsLimit = function() {
    if (this._actor) {
        var rect = this.itemRectForText(0);
        var wx = rect.width / 2;
        this.changeTextColor(this.textColor(Moogle_X.EQS.limitColor));
        this.changePaintOpacity(true);
        this.drawText(Moogle_X.EQS.limitText, rect.x, rect.y, rect.width);
        //this.changeTextColor(this.textColor(Moogle_X.EQS.limitNumberColor))
        //var text = this._actor.currentEqsLimit() + "/" + this._actor._eqsMaxLimit;
        //this.drawText(text, wx, rect.y, rect.width - wx, 'right');
        this.drawCurrentJpLimit(wx, rect.y, rect.width - wx, 'right')

    }
};

Window_EqsLimit.prototype.drawCurrentJpLimit = function(wx, wy, ww, align) {
    var jp1 = this._actor.currentEqsLimit();
    var jp2 = this._actor._eqsMaxLimit;
    var jp = jp1 + "/" + jp2;
    var icon = '\\i[' + Yanfly.Icon.Jp + ']';
    var fmt = Yanfly.Param.JpMenuFormat;
    var text = fmt.format(Yanfly.Util.toGroup(jp), Yanfly.Param.Jp, icon);
    if (align === 'left') {
      wx = 0;
    } else if (align === 'center') {
      wx += (ww - this.textWidthEx(text)) / 2;
    } else {
      wx += ww - this.textWidthEx(text);
    }
    this.drawTextEx(text, wx, wy);
};


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
