//=============================================================================
// Equipment Learning by Moogle_X
// Moogle_X_EquipmentLearning.js
// Created on: January 3rd 2016
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_EQL = true;

var Moogle_X = Moogle_X || {};
Moogle_X.EQL = Moogle_X.EQL || {};

//=============================================================================
/*:
 * @plugindesc v1.23 Allows actors to learn skill from equipment.
 * @author Moogle_X
 *
 * @param Allows Instant Mastery
 * @desc Actor can use equipment's skills instantly when equipped? 1:Yes 0:No
 * @default 1
 *
 * @param All Skills Learnable
 * @desc Actor can learn all skills from equipment by default? 1:Yes 0:No
 * @default 1
 *
 * @param AP Text
 * @desc This is the text vocab for AP.
 * @default AP
 *
 * @param AP Gain Per Action
 * @desc This is the AP gain for each battle action.
 * @default 1
 *
 * @param No AP Gain Skill List
 * @desc This is the list of skill id(s) that won't trigger AP Gain. Example: 1 2 48 59
 * @default 0
 *
 * @param Default AP Requirement
 * @desc This is the default AP needed to learn skill from equipment.
 * @default 100
 *
 * @param Default Enemy AP
 * @desc This is the default AP gain from defeating an enemy.
 * @default 10
 *
 * @param Display AP Gain After Battle
 * @desc Display AP gain messages after battle (without Victory Aftermath)? 1:Yes 0:No
 * @default 1
 *
 * @param AP Gain Text In Battle
 * @desc Adjusts how the AP gain text is shown after battle (without Victory Aftermath).
 * %1 - Actor     %2 Value     %3 AP
 * @default %1 gains %2%3!
 *
 * @param ---Window Ability List---
 * @default
 *
 * @param Display Added Skills
 * @desc Equipment also display in the window all added skills from traits? 1:Yes 0:No
 * @default 1
 *
 * @param Ability Title
 * @desc This is the text for "Ability" at the top of Window Ability List.
 * @default Ability
 *
 * @param Ability Title Alignment
 * @desc This is the text alignment for "Ability" at the top of Window Ability List. (left center right)
 * @default center
 *
 * @param No Ability Text
 * @desc This is the text for "- None -" in Window Ability List.
 * @default - None -
 *
 * @param No Ability Text Alignment
 * @desc This is the text alignment for "- None -" in Window Ability List. (left center right)
 * @default left
 *
 * @param Skill's Font Name
 * @desc This is the font name for skills in Window Ability List.
 * @default GameFont
 *
 * @param Skill's Font Size
 * @desc This is the font size for skills in Window Ability List.
 * @default 28
 *
 * @param Skill Name Offset X
 * @desc Change the offset X value of skill name. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Skill Name Offset Y
 * @desc Change the offset Y value of skill name. (Positive: down; Negative: up)
 * @default 0
 *
 * @param AP Text Color
 * @desc This is the text color for "AP" in Window Ability List.
 * @default 2
 *
 * @param AP Text Offset X
 * @desc Change the offset X value of "AP" in Window Ability List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param AP Gauge Color 1
 * @desc This is the first gauge color for "AP Gauge" in Window Ability List.
 * @default 17
 *
 * @param AP Gauge Color 2
 * @desc This is the second gauge color for "AP Gauge" in Window Ability List.
 * @default 14
 *
 * @param AP Gauge Offset X
 * @desc Change the offset X value of "AP Gauge" in Window Ability List. (Positive: right; Negative: left)
 * @default 180
 *
 * @param Mastery Icon
 * @desc This is the icon index for "Mastered Skill" in Window Ability List.
 * @default 87
 *
 * @param Show Skill Icon
 * @desc Do you want to show skill icon in Window Ability List? 1:Yes 0:No
 * @default 1
 *
 * @param ---Victory Aftermath---
 * @default
 *
 * @param Display Aftermath
 * @desc Display Victory Aftermath AP window after battle? 1:Yes 0:No
 * @default 1
 *
 * @param Aftermath Top Text
 * @desc This is the text at the top of Aftermath Window.
 * @default AP Earned
 *
 * @param Aftermath AP Format
 * @desc This is AP gain text format in the Victory Aftermath.
 * %1 - Value     %2 - AP
 * @default \C[0]+%1\C[2]%2
 *
 * @param Aftermath AP Gain Text
 * @desc Describes how much AP is earned per actor.
 * @default AP Earned in Battle
 *
 * @param Show Aftermath New Skill
 * @desc Display new learned skills in Victory Aftermath AP window? 1:Yes 0:No
 * @default 1
 *
 * @param New Skill Offset Y
 * @desc Change the offset Y value of new skill name. (Positive: down; Negative: up)
 * @default 0
 *
 * @param New Skill Display Limit
 * @desc Change maximum number of new skill display in Victory Aftermath.
 * @default 4
 *
 * @param ---Custom Scroll Images---
 * @default
 *
 * @param Use Custom Scroll Images
 * @desc Enable custom left and right scroll images? 1:Yes 0:No
 * @default 0
 *
 * @param Left Scroll Offset X
 * @desc Change the offset X value of Left Scroll Image. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Left Scroll Offset Y
 * @desc Change the offset Y value of Left Scroll Image. (Positive: down; Negative: up)
 * @default 0
 *
 * @param Right Scroll Offset X
 * @desc Change the offset X value of Right Scroll Image. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Right Scroll Offset Y
 * @desc Change the offset Y value of Right Scroll Image. (Positive: down; Negative: up)
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin gives actors the ability to learn new skills from equipment.
 * Each weapons and armors now possess innate ability/skills that can be
 * learned to any actors who equip it.
 *
 * Each weapons and armors contains specific innate ability. Each ability
 * requires certain amount of Ability Point (AP) in order to be learned or
 * mastered.
 *
 * Actors can gain Ability Point (AP) in battle. Each AP gained will be
 * automatically distributed to all innate abilities from the actor's equipment
 * list. Once the required AP is fulfilled, the ability will be permanently
 * learned.
 *
 * ============================================================================
 * How to Set Up Weapons and Armors
 * ============================================================================
 * In order to make a certain weapon or armor hold innate ability, you need
 * to insert this notetag into the weapon/armor's notebox:
 *
 * <EQL Skill: n>                 // This equipment contains skill n.
 *
 * Example:
 * <EQL Skill: 23>                // This equipment contains skill with id 23.
 *
 * If you want to give more than 1 ability, you simply replace the above
 * notetag with this:
 *
 * <EQL Skill: n1, n2, n3>        // This equipment contains skills n1, n2, n3.
 *
 * Example:
 * <EQL Skill: 4, 7, 12>          // This equipment contains skills 4, 7, 12.
 * <EQL Skill: 3, 28, 39, 44, 52> // This equipment contains skills 3, 28, 39,
 *                                // 44, 52.
 *
 * ============================================================================
 * How to Set Up Skill's AP Requirement
 * ============================================================================
 * Every skill will require a certain amount of AP in order to be learned.
 * You can change the default AP requirement by editing "Default AP Requirement"
 * parameter in the plugin configurations.
 *
 * To assign a custom AP requirement, you just need to insert this notetag into
 * the skill's notebox:
 *
 * <EQL AP: x>                    // This skill requires x amount of AP.
 *
 * Example:
 * <EQL AP: 120>                  // This skill requires 120 AP to be learned.
 *
 * NEW Feature! Actor Specific AP Requirement!
 *
 * You can alter how much AP requirement is needed for each actor.
 * You can make certain actor to learn the same skill faster/slower compared to
 * other actors.
 *
 * To do this, just insert this notetag into the actor's notebox:
 *
 * <EQL AP Change x: y%>          // This actor's AP requirement for skill x
 *                                // is multiplied by y%.
 *
 * Example:
 * <EQL AP Change 12: 50%>        // AP requirement for skill 12 will be half
 *                                // the standard amount.
 *
 * <EQL AP Change 18: 200%>       // AP requirement for skill 18 will be twice
 *                                // the standard amount.
 *
 * ============================================================================
 * How to Set Up Enemies' AP "Drop"
 * ============================================================================
 * Actors gain AP by defeating enemy in battle. Each enemy gives a certain
 * amount of AP. You can change the default enemy AP by editing "Default Enemy
 * AP" parameter in the plugin configurations.
 *
 * To assign custom AP "drop" for enemy, insert this notetag into the enemy's
 * notebox:
 *
 * <EQL AP: x>                    // This enemy gives x amount of AP.
 *
 * Example:
 * <EQL AP: 25>                   // This enemy gives 25 AP when defeated.
 *
 * ============================================================================
 * How to Set Up Actors Starting AP
 * ============================================================================
 * You can make certain actor to have initial amount of AP from the start.
 * By default, all actors possess 0 AP in all skills. If you want to give the
 * actor a set amount of starting AP, simply insert this notetag into the
 * actor's notebox:
 *
 * <EQL Starting AP x: y>       // This actor has y AP in skill x.
 *
 * Example:
 * <EQL Starting AP 23: 100>    // This actor starts with 100 AP already
 *                              // "learned" in skill with id 23.
 *
 * ============================================================================
 * NEW Trait! AP Boost
 * ============================================================================
 * This plugin introduces new trait for actors. This trait is called "AP Boost".
 *
 * Any actors that possess this trait will gain extra amount of AP every time
 * they receive AP. This trait can be inserted into Actors, Classes, Weapons,
 * Armors, and States.
 *
 * Just insert this notetag into Actors, Classes, Weapons, Armors, and/or
 * States notebox:
 *
 * <EQL AP Boost: x%>         // AP gain will be multiplied by x%.
 *
 * Example:
 * <EQL AP Boost: 120%>       // AP gain will be increased by 20%.
 * <EQL AP Boost: 50%>        // AP gain will be halved.
 * <EQL AP Boost: 200%>       // Double AP gain!
 *
 * Multiple of this trait will stack. Please use this new trait wisely.
 *
 * ============================================================================
 * Actors and Classes Skills Learning Restriction
 * ============================================================================
 * By default, all actors can learn every skills inside their equipment.
 * You can apply limitation on which skills any actors/classes can learn from
 * their equipment.
 *
 * First, you MUST turn off "All Skills Learnable" parameter in the plugin
 * configurations (just insert "0").
 *
 * Next, insert this notetag into actors and/or classes noteboxes:
 *
 * <EQL Learn Skills: x, y, z>        // This actor/class can learn skill x, y,
 *                                    // and z from equipment.
 *
 * Example:
 * <EQL Learn Skills: 23, 24, 50, 68> // This actor/class can learn skill with
 *                                    // id 23, 24, 50, and 68 from equipment.
 *
 * ============================================================================
 * Miscellaneous - <EQL No Aftermath> Skills Notetag
 * ============================================================================
 * Inserting <EQL No Aftermath> notetag inside skill's notebox will prevent
 * that skill to "show up" in Victory Aftermath and default battle victory
 * "new skills announcement".
 *
 * Use this notetag as you see fit.
 *
 * ============================================================================
 * Miscellaneous - <EQL Show Switch: x> Skills Notetag
 * ============================================================================
 * You can bind the "visibility" of certain skill in Window Ability List with
 * an in-game switch.
 *
 * For example, skill "Heal" that contains notetag <EQL Show Switch: 2> will
 * be hidden/disappear in Window Ability List whenever in-game switch 2 is OFF.
 * Skill "Heal" will reappear again in the Window when switch 2 is ON.
 *
 * ============================================================================
 * Miscellaneous - <EQL AP Gain Eval> Skills Notetag
 * ============================================================================
 * Another miscellaneous feature. You can assign any custom effects to occur
 * whenever an actor gain AP in specific skill.
 *
 * Just insert these notetags inside the skill's notebox:
 *
 * <EQL AP Gain Eval>
 *
 * // Insert your code here...
 *
 * </EQL AP Gain Eval>
 *
 * Tips: "this" will refer to the actor who gain the AP.
 * (I'm not responsible for any destruction these notetags cause to your
 * project. Use them at your own risk.)
 *
 * ============================================================================
 * Miscellaneous - Custom Scroll Images
 * ============================================================================
 * If you wish to disable left and right horizontal arrows and instead use
 * custom scroll images at the left and right bottom corners of the windows,
 * please turn on the parameter "Use Custom Scroll Images" in the Plugin
 * configurations.
 *
 * You will need to put 2 png files named "eqlLeftScroll" and "eqlRightScroll"
 * inside '(Project Folder)/img/system' directory.
 *
 * You can adjust the offset X and offset Y value of both images in the Plugin
 * configurations.
 *
 * ============================================================================
 * Miscellaneous - Custom Skill Icon
 * ============================================================================
 * If you wish some skill to display a different icon when displayed in Item,
 * Equip, or Shop menu scene, you can add <EQL Custom Icon: x> notetag into the
 * skill's notebox.
 *
 * Example:
 * <EQL Custom Icon: 20>          // This skill will use icon 20 in the Item,
 *                                // Equip, or Shop menu scene.
 *
 * ============================================================================
 * Notetags and Plugin Commands List
 * ============================================================================
 * Actors Notetag:
 * <EQL Starting AP x: y>
 * <EQL AP Change x: y%>
 *
 * Actors and Classes Notetags:
 * <EQL Learn Skills: x, y, z>
 *
 * Weapons and Armors Notetags:
 * <EQL Skill: n>
 * <EQL Skill: n1, n2, n3>
 *
 * Skills Notetag:
 * <EQL AP: x>
 * <EQL No Aftermath>
 * <EQL Show Switch: x>
 * <EQL AP Gain Eval>
 * </EQL AP Gain Eval>
 * <EQL Custom Icon: x>
 *
 * Enemies Notetag:
 * <EQL AP: x>
 *
 * Actors, Classes, Weapons, Armors, and States Notetag:
 * <EQL AP Boost: x%>
 *
 * Plugin Command:
 * EQL AP Gain x Actor y        // Actor y will gain x amount of AP.
 *
 * Example:
 * EQL AP Gain 1000 Actor 3     // Actor 3 will receive 1000 AP.
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 * This plugin must be positioned BELOW any of these plugins:
 *
 * YEP_VictoryAftermath
 * YEP_ItemCore
 * YEP_ShopMenuCore
 * YEP_EquipCore
 * YEP_AutoPassiveStates
 * Moogle_X_EquipSkillSystem
 * Moogle_X_PassiveSkill
 *
 * If you use any of the above plugins, please make sure to position Equipment
 * Learning plugin under those plugins.
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
 * Version 1.23:
 * - Added Custom Skill Icon feature.
 *
 * Version 1.22:
 * - Added window compatibility fix with YEP_EquipCore v1.09.
 * - Added "New Skill Offset Y" parameter.
 * - Added "New Skill Display Limit" parameter.
 * - Added touch input for Scene Item (Yanfly's Item Core version).
 *
 * Version 1.21:
 * - Added "Display Added Skills" parameter.
 * - Added "No AP Gain Skill List" parameter.
 *
 * Version 1.2:
 * - Added Custom Scroll Images feature.
 * - Change the drawing order of ability list. Skill name is now drawn last.
 * - Added option to disable/enable skill icon in Window Ability List.
 * - Added offset X and offset Y parameters for skill name in Window Ability List.
 * - Added offset X parameter for "AP" text in Window Ability List.
 *
 * Version 1.13:
 * - Added <EQL AP Change x: y%> actors notetag.
 *
 * Version 1.12:
 * - Fixed Equip Skill System bug (actor can equip "unlearnable" skills).
 * - Fixed Passive Skills bug (added "unlearnable" skills check).
 * - Fixed Yanfly's Auto Passive States bug (added "unlearnable" skills check).
 * - Fixed incorrect icon opacity in Window Ability List.
 *
 * Version 1.1:
 * - Added option to change skill's font name and size in Window Ability List.
 * - Added actors and classes skills learning restriction.
 * - Added <EQL No Aftermath> skills notetag.
 * - Added <EQL Show Switch: x> skills notetag.
 * - Added <EQL AP Gain Eval> skills notetag.
 *
 * Version 1.0:
 * - Completed plugin.
 *
 */
//=============================================================================

(function() { // IIFE

//=============================================================================
// Parameter Variables
//=============================================================================

Moogle_X.EQL.parameters = PluginManager.parameters('Moogle_X_EquipmentLearning');
Moogle_X.EQL.instantMastery = Number(Moogle_X.EQL.parameters['Allows Instant Mastery']) != 0;
Moogle_X.EQL.defApReq = Number(Moogle_X.EQL.parameters['Default AP Requirement'] || 0);
Moogle_X.EQL.defEnemyAp = Number(Moogle_X.EQL.parameters['Default Enemy AP'] || 0);
Moogle_X.EQL.apVocab = String(Moogle_X.EQL.parameters['AP Text'] || '');
Moogle_X.EQL.apPerAction = Number(Moogle_X.EQL.parameters['AP Gain Per Action'] || 0);
Moogle_X.EQL.postBattleMsg = Number(Moogle_X.EQL.parameters['Display AP Gain After Battle']) != 0;
Moogle_X.EQL.battleApFmt = String(Moogle_X.EQL.parameters['AP Gain Text In Battle'] || '');
Moogle_X.EQL.useAft = Number(Moogle_X.EQL.parameters['Display Aftermath']) != 0;
Moogle_X.EQL.aftTopText = String(Moogle_X.EQL.parameters['Aftermath Top Text'] || '');
Moogle_X.EQL.aftApFmt = String(Moogle_X.EQL.parameters['Aftermath AP Format'] || '');
Moogle_X.EQL.aftApGainText = String(Moogle_X.EQL.parameters['Aftermath AP Gain Text'] || '');
Moogle_X.EQL.showAftNewSkill = Number(Moogle_X.EQL.parameters['Show Aftermath New Skill']) != 0;
Moogle_X.EQL.ablTitle = String(Moogle_X.EQL.parameters['Ability Title'] || '');
Moogle_X.EQL.ablTitleAlign = String(Moogle_X.EQL.parameters['Ability Title Alignment'] || 'center');
Moogle_X.EQL.noAblText = String(Moogle_X.EQL.parameters['No Ability Text'] || '');
Moogle_X.EQL.noAblTextAlign = String(Moogle_X.EQL.parameters['No Ability Text Alignment'] || 'left');
Moogle_X.EQL.apTextColor = Number(Moogle_X.EQL.parameters['AP Text Color'] || '0');
Moogle_X.EQL.apColor1 = Number(Moogle_X.EQL.parameters['AP Gauge Color 1'] || '17');
Moogle_X.EQL.apColor2 = Number(Moogle_X.EQL.parameters['AP Gauge Color 2'] || '14');
Moogle_X.EQL.apOffsetX = Number(Moogle_X.EQL.parameters['AP Gauge Offset X'] || '0');
Moogle_X.EQL.masteryIcon = Number(Moogle_X.EQL.parameters['Mastery Icon'] || '0');
Moogle_X.EQL.sklFontName = String(Moogle_X.EQL.parameters["Skill's Font Name"] || 'GameFont');
Moogle_X.EQL.sklFontSize = Number(Moogle_X.EQL.parameters["Skill's Font Size"] || 28);
Moogle_X.EQL.allSklLearn = Number(Moogle_X.EQL.parameters['All Skills Learnable']) != 0;
Moogle_X.EQL.useScrollImages = Number(Moogle_X.EQL.parameters['Use Custom Scroll Images']) != 0;
Moogle_X.EQL.leftScrollX = Number(Moogle_X.EQL.parameters['Left Scroll Offset X'] || 0);
Moogle_X.EQL.leftScrollY = Number(Moogle_X.EQL.parameters['Left Scroll Offset Y'] || 0);
Moogle_X.EQL.rightScrollX = Number(Moogle_X.EQL.parameters['Right Scroll Offset X'] || 0);
Moogle_X.EQL.rightScrollY = Number(Moogle_X.EQL.parameters['Right Scroll Offset Y'] || 0);
Moogle_X.EQL.showSkillIcon = Number(Moogle_X.EQL.parameters['Show Skill Icon']) != 0;
Moogle_X.EQL.skillNameX = Number(Moogle_X.EQL.parameters['Skill Name Offset X'] || 0);
Moogle_X.EQL.skillNameY = Number(Moogle_X.EQL.parameters['Skill Name Offset Y'] || 0);
Moogle_X.EQL.apTextOffsetX = Number(Moogle_X.EQL.parameters['AP Text Offset X'] || 0);
Moogle_X.EQL.showAddedSkills = Number(Moogle_X.EQL.parameters['Display Added Skills']) != 0;
Moogle_X.EQL.noApGainList = String(Moogle_X.EQL.parameters['No AP Gain Skill List'] || 0);
Moogle_X.EQL.newSkillOffsetY = Number(Moogle_X.EQL.parameters['New Skill Offset Y'] || 0);
Moogle_X.EQL.newSkillLimit = Number(Moogle_X.EQL.parameters['New Skill Display Limit'] || 0);

var noApSkillIds = Moogle_X.EQL.noApGainList.split(' ');
Moogle_X.EQL.noApGainList = [];
for (var i = 0; i < noApSkillIds.length; i++) {
    Moogle_X.EQL.noApGainList.push(Number(noApSkillIds[i]));
}

//=============================================================================
// Moogle_X - Window Horizontal Arrows (START)
//=============================================================================

Moogle_X.hArrows = Moogle_X.hArrows || {};

if (!Moogle_X.hArrows.active) {
Moogle_X.hArrows.active = true;

//=============================================================================
// Window
//=============================================================================

Moogle_X.hArrows.Window_initialize = Window.prototype.initialize;
Window.prototype.initialize = function() {
    this._Moogle_X_leftArrowVisible = false;
    this._Moogle_X_rightArrowVisible = false;
    Moogle_X.hArrows.Window_initialize.call(this);
};

Moogle_X.hArrows.Window_createAllParts = Window.prototype._createAllParts;
Window.prototype._createAllParts = function() {
    Moogle_X.hArrows.Window_createAllParts.call(this);
    this._Moogle_X_leftArrowSprite = new Sprite();
    this._Moogle_X_rightArrowSprite = new Sprite();
    this.addChild(this._Moogle_X_leftArrowSprite);
    this.addChild(this._Moogle_X_rightArrowSprite);
};

Moogle_X.hArrows.Window_refreshArrows = Window.prototype._refreshArrows;
Window.prototype._refreshArrows = function() {
    Moogle_X.hArrows.Window_refreshArrows.call(this);
    if (Moogle_X.EQL.useScrollImages) {
        var w = this._width;
        var h = this._height;
        var p = 24;
        var q = p/2;
        var leftOffsetX = Moogle_X.EQL.leftScrollX;
        var leftOffsetY = Moogle_X.EQL.leftScrollY;
        var rightOffsetX = Moogle_X.EQL.rightScrollX;
        var rightOffsetY = Moogle_X.EQL.rightScrollY;
        var leftScroll = Bitmap.load('img/system/eqlLeftScroll.png');
        var rightScroll = Bitmap.load('img/system/eqlRightScroll.png');

        this._Moogle_X_leftArrowSprite.bitmap = leftScroll;
        this._Moogle_X_leftArrowSprite.move(q + leftOffsetX, h-q-29 + leftOffsetY);

        this._Moogle_X_rightArrowSprite.bitmap = rightScroll;
        this._Moogle_X_rightArrowSprite.move(w-q-98 + rightOffsetX, h-q-29 + rightOffsetY);

    } else {
        var w = this._width;
        var h = this._height;
        var p = 24;
        var q = p/2;
        var sx = 96+p;
        var sy = 0+p;
        this._Moogle_X_leftArrowSprite.bitmap = this._windowskin;
        this._Moogle_X_leftArrowSprite.anchor.x = 0.5;
        this._Moogle_X_leftArrowSprite.anchor.y = 0.5;
        this._Moogle_X_leftArrowSprite.setFrame(sx, sy+q, q, p);
        this._Moogle_X_leftArrowSprite.move(q, h/2);
        this._Moogle_X_rightArrowSprite.bitmap = this._windowskin;
        this._Moogle_X_rightArrowSprite.anchor.x = 0.5;
        this._Moogle_X_rightArrowSprite.anchor.y = 0.5;
        this._Moogle_X_rightArrowSprite.setFrame(sx+p+q, sy+q, q, p);
        this._Moogle_X_rightArrowSprite.move(w-q, h/2);
    }

};

Moogle_X.hArrows.Window_updateArrows = Window.prototype._updateArrows;
Window.prototype._updateArrows = function() {
    Moogle_X.hArrows.Window_updateArrows.call(this);
    this._Moogle_X_leftArrowSprite.visible =
        this.isOpen() && this._Moogle_X_leftArrowVisible;
    this._Moogle_X_rightArrowSprite.visible =
        this.isOpen() && this._Moogle_X_rightArrowVisible;
};

//=============================================================================
// Window_Base
//=============================================================================

Moogle_X.hArrows.Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
    Moogle_X.hArrows.Window_Base_initialize.call(this, x, y, width, height);
    this._Moogle_X_hArrowsActive = false;
    this._Moogle_X_hPageNumber = 0;
};

Window_Base.prototype.MoogleXhArrowsActive = function() {
    return this._Moogle_X_hArrowsActive;
};

Window_Base.prototype.MoogleXhPageNumber = function() {
    return this._Moogle_X_hPageNumber;
};

Window_Base.prototype.setMoogleXhPageNumber = function(hPages) {
    this._Moogle_X_hPageNumber = hPages + 1;
    this._Moogle_X_hArrowsActive = true;
};

Window_Base.prototype.updateMoogleXhArrows = function(sceneIndex, scenePages) {
    this._Moogle_X_leftArrowVisible = this.MoogleXhArrowsActive() &&
        this.MoogleXleftArrowVisible(sceneIndex, scenePages);
    this._Moogle_X_rightArrowVisible = this.MoogleXhArrowsActive() &&
        this.MoogleXrightArrowVisible(sceneIndex, scenePages);
};

Window_Base.prototype.MoogleXleftArrowVisible = function(sceneIndex, scenePages) {
    if (this.customMoogleXhArrowsHide()) return false;
    if (!scenePages) return false;
    if (scenePages === 1) return false;
    if (sceneIndex > 1) return true;
    return false;
};

Window_Base.prototype.MoogleXrightArrowVisible = function(sceneIndex, scenePages) {
    if (this.customMoogleXhArrowsHide()) return false;
    if (!scenePages) return false;
    if (scenePages === 1) return false;
    if (sceneIndex < scenePages) return true;
    return false;
};

Window_Base.prototype.updateMoogleXhVisible = function(sceneIndex, scenePages) {
    if (!this.MoogleXhPageNumber()) return;
    if (this.MoogleXhArrowsActive()) {
        if (!sceneIndex) {
            this.visible = false;
            return;
        }
        if (scenePages === 1) {
            this.visible = true;
            return;
        }
        if (sceneIndex === this.MoogleXhPageNumber()) {
            this.visible = true;
        } else if (sceneIndex !== this.MoogleXhPageNumber()) {
            this.visible = false;
        }
    }
};

Window_Base.prototype.customMoogleXhArrowsHide = function() {
    return false;
};

//=============================================================================
// Window_Selectable
//=============================================================================

Moogle_X.hArrows.Window_Selectable_cursorRight =
    Window_Selectable.prototype.cursorRight;
Window_Selectable.prototype.cursorRight = function(wrap) {
    Moogle_X.hArrows.Window_Selectable_cursorRight.call(this, wrap);
    if (SceneManager._scene) {
        if (!SceneManager._scene.MoogleXhRestrict()) {
            SceneManager._scene.goRightMoogleXhPages();
        }
    }
};

Moogle_X.hArrows.Window_Selectable_cursorLeft =
    Window_Selectable.prototype.cursorLeft;
Window_Selectable.prototype.cursorLeft = function(wrap) {
    Moogle_X.hArrows.Window_Selectable_cursorLeft.call(this, wrap);
    if (SceneManager._scene) {
        if (!SceneManager._scene.MoogleXhRestrict()) {
            SceneManager._scene.goLeftMoogleXhPages();
        }
    }
};

//=============================================================================
// Scene_Base
//=============================================================================

Moogle_X.hArrows.Scene_Base_initialize = Scene_Base.prototype.initialize;
Scene_Base.prototype.initialize = function() {
    Moogle_X.hArrows.Scene_Base_initialize.call(this);
    this._Moogle_X_hPages = 0;
    this._Moogle_X_hIndex = 0;
    this._Moogle_X_hWindows = [];
    this._Moogle_X_hRestrict = false;
};

Scene_Base.prototype.MoogleXhPages = function() {
    return this._Moogle_X_hPages;
};

Scene_Base.prototype.MoogleXhIndex = function() {
    return this._Moogle_X_hIndex;
};

Scene_Base.prototype.MoogleXhWindows = function() {
    return this._Moogle_X_hWindows;
};

Scene_Base.prototype.MoogleXhRestrict = function() {
    return this._Moogle_X_hRestrict;
};

Scene_Base.prototype.registerMoogleXhWindow = function(hWindow) {
    if (this.MoogleXhWindows().contains(hWindow)) return;
    hWindow.setMoogleXhPageNumber(this.MoogleXhPages());
    this.addMoogleXhPage();
    this._Moogle_X_hWindows.push(hWindow);
};

Scene_Base.prototype.addMoogleXhPage = function() {
    this._Moogle_X_hPages += 1;
};

Scene_Base.prototype.goLeftMoogleXhPages = function() {
    if (this.MoogleXhIndex() <= 1) return;
    SoundManager.playCursor();
    this._Moogle_X_hIndex -= 1;
};

Scene_Base.prototype.goRightMoogleXhPages = function() {
    if (!this.MoogleXhIndex()) return;
    if (this.MoogleXhIndex() >= this.MoogleXhPages()) return;
    SoundManager.playCursor();
    this._Moogle_X_hIndex += 1;
};

Moogle_X.hArrows.Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    Moogle_X.hArrows.Scene_Base_update.call(this);
    this.updateMoogleXhArrows();
};

Scene_Base.prototype.updateMoogleXhArrows = function() {
    if (!this.MoogleXhWindows()) return;
    if (this.MoogleXhWindows().length > 0) {
        this.MoogleXhWindows().forEach(function(hWindow) {
            hWindow.updateMoogleXhArrows(this.MoogleXhIndex(),
                this.MoogleXhPages());
            hWindow.updateMoogleXhVisible(this.MoogleXhIndex(),
                this.MoogleXhPages());
        }, this);
    }
};

} // !Moogle_X.hArrows.active

//=============================================================================
// Moogle_X - Window Horizontal Arrows (END)
//=============================================================================

//=============================================================================
// Constant Declaration
//=============================================================================
Game_BattlerBase.TRAIT_EQL_AP_BOOST = 114; // New trait code.

//=============================================================================
// DataManager
//=============================================================================

Moogle_X.EQL.DatabaseLoaded = false;
Moogle_X.EQL.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.EQL.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Moogle_X.EQL.DatabaseLoaded) {
        DataManager.readNotetags_EQL1($dataActors);
        DataManager.readNotetags_EQL2($dataWeapons);
        DataManager.readNotetags_EQL2($dataArmors);
        DataManager.readNotetags_EQL3($dataSkills);
        DataManager.readNotetags_EQL4($dataEnemies);
        DataManager.readNotetags_EQL5($dataActors);
        DataManager.readNotetags_EQL5($dataClasses);
        DataManager.readNotetags_EQL5($dataWeapons);
        DataManager.readNotetags_EQL5($dataArmors);
        DataManager.readNotetags_EQL5($dataStates);
        DataManager.readNotetags_EQL6($dataActors);
        DataManager.readNotetags_EQL6($dataClasses);
        Moogle_X.EQL.DatabaseLoaded = true;
    }
		return true;
};

DataManager.readNotetags_EQL1 = function(group) {
    var note1 = /<(?:EQL STARTING AP)[ ](\d+):[ ](\d+)>/i;
    var note2 = /<(?:EQL AP CHANGE)[ ](\d+):[ ](\d+)\%>/i;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.eqlStartingAp = {};
        obj.eqlApChange = {};

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note1)) {
                var skill  = Number(RegExp.$1);
                var initAp = Number(RegExp.$2);
                obj.eqlStartingAp[skill] = initAp;
            } else if (line.match(note2)) {
                var skillId = Number(RegExp.$1);
                var apChange = Number(RegExp.$2) / 100;
                obj.eqlApChange[skillId] = apChange;
            }
		    }
	  }
};

DataManager.readNotetags_EQL2 = function(group) {
    var note = /<(?:EQL SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.eqlSkill = [];

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note)) {
                var list = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                obj.eqlSkill = list;
            }
		    }
	  }
};

DataManager.readNotetags_EQL3 = function(group) {
    var note1 = /<(?:EQL AP):[ ](\d+)>/i;
    var note2 = /<(?:EQL NO AFTERMATH)>/i;
    var note3 = /<(?:EQL SHOW SWITCH):[ ](\d+)>/i;
    var note4a = /<(?:EQL AP GAIN EVAL)>/i;
    var note4b = /<\/(?:EQL AP GAIN EVAL)>/i;
    var note5 = /<(?:EQL CUSTOM ICON):[ ](\d+)>/i;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.eqlAp = Moogle_X.EQL.defApReq;
        obj.eqlNoAft = false;
        obj.eqlShowSwitch = 0;
        obj.eqlApGainEval = '';
        obj.eqlCstIcon = false;
        var evalMode = 'none';

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note1)) {
                var apNeeded  = Number(RegExp.$1);
                obj.eqlAp = apNeeded;
            } else if (line.match(note5)) {
                obj.eqlCstIcon = Number(RegExp.$1);
            } else if (line.match(note2)) {
                obj.eqlNoAft = true;
            } else if (line.match(note3)) {
                obj.eqlShowSwitch = Number(RegExp.$1);
            } else if (line.match(note4a)) {
                evalMode = 'ap gain eval';
            } else if (line.match(note4b)) {
                evalMode = 'none';
            } else if (evalMode === 'ap gain eval') {
                obj.eqlApGainEval = obj.eqlApGainEval + line + '\n';
            }
		    }
	  }
};

DataManager.readNotetags_EQL4 = function(group) {
    var note = /<(?:EQL AP):[ ](\d+)>/i;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.eqlAp = Moogle_X.EQL.defEnemyAp;

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note)) {
                var apDrop  = Number(RegExp.$1);
                obj.eqlAp = apDrop;
            }
		    }
	  }
};

DataManager.readNotetags_EQL5 = function(group) {
    var note = /<(?:EQL AP BOOST):[ ](\d+)\%>/i;
    var code = Game_BattlerBase.TRAIT_EQL_AP_BOOST;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note)) {
                var boostValue = Number(RegExp.$1) / 100;
                var apTrait = [{"code":code,"dataId":0,"value":boostValue}];
                obj.traits = obj.traits.concat(apTrait);
            }
		    }
	  }
};

DataManager.readNotetags_EQL6 = function(group) {
    var note = /<(?:EQL LEARN SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.eqlLearnSkills = [];

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note)) {
                var list = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                obj.eqlLearnSkills = list;
            }
		    }
	  }
};


//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.eqlApBoost = function() {
    return this.traitsPi(Game_BattlerBase.TRAIT_EQL_AP_BOOST, 0);
};

//=============================================================================
// Game_Actor
//=============================================================================

Moogle_X.EQL.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    Moogle_X.EQL.Game_Actor_initMembers.call(this);
    this._eqlAp = {};
    this._eqlBattleAp = 0;
    this._eqlNewSkill = [];
};

Moogle_X.EQL.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Moogle_X.EQL.Game_Actor_setup.call(this, actorId);
    this.initEqlSetup();
};

Game_Actor.prototype.initEqlSetup = function() {
    for (var i = 1; i < $dataSkills.length; i++) {
        this._eqlAp[i] = 0;
        if (this.actor().eqlStartingAp[i]) {
            this._eqlAp[i] += this.actor().eqlStartingAp[i];
            this.eqlCheckMastery(i);
        }
    }
};

Game_Actor.prototype.eqlApNeeded = function(skill) {
    if (!skill) return Moogle_X.EQL.defApReq;
    var baseAp = skill.eqlAp;
    var rate = this.actor().eqlApChange[skill.id] || 1;
    var finalAp = Math.round(baseAp * rate);
    return finalAp;
};

Game_Actor.prototype.eqlCheckMastery = function(skillId) {
    var apNeeded = this.eqlApNeeded($dataSkills[skillId]);
    if (!this._eqlAp[skillId]) {
        this._eqlAp[skillId] = 0;
    }

    var checkSkillPrev = this.isLearnedSkill(skillId);

    if (this.eqlIsMastered(skillId)) {
        this._eqlAp[skillId] = apNeeded;
        this.learnSkill(skillId);
    }

    if ($gameParty.inBattle()) {
        if (this.isLearnedSkill(skillId) && !checkSkillPrev) {
            if (!this._eqlNewSkill.contains(skillId) && !$dataSkills[skillId].eqlNoAft) {
                if (this._eqlNewSkill.length < Moogle_X.EQL.newSkillLimit) {
                    this._eqlNewSkill.push(skillId);
                }
            }
        }
    }
};

Game_Actor.prototype.eqlGainAp = function(value) {
    var total = value * this.eqlApBoost();
    total = Math.round(total);
    if ($gameParty.inBattle()) {
        this._eqlBattleAp += total;
    }
    this.equips().forEach(function(eq) {
        if (eq) {
            eq.eqlSkill.forEach(function(skillId) {
                if (!this._eqlAp[skillId]) this._eqlAp[skillId] = 0;

                // Danger Zone (START)
                if (!this.eqlCantLearnSkill($dataSkills[skillId])) {
                    this._eqlAp[skillId] += total; // Original code.
                    this.eqlCheckMastery(skillId); // Original code.
                    eval($dataSkills[skillId].eqlApGainEval);
                }
                // Danger Zone (END)

            }, this);
        }
    }, this);
};

Game_Actor.prototype.eqlBattleAp = function() {
		return this._eqlBattleAp;
};

Game_Actor.prototype.eqlNewSkill = function() {
    return this._eqlNewSkill;
};

Game_Actor.prototype.eqlIsMastered = function(skillId) {
    var apNeeded = this.eqlApNeeded($dataSkills[skillId]);
    return this._eqlAp[skillId] >= apNeeded || this.isLearnedSkill(skillId);
};

Moogle_X.EQL.Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
Game_Actor.prototype.forgetSkill = function(skillId) {
    Moogle_X.EQL.Game_Actor_forgetSkill.call(this, skillId);
    this.eqlForgetSkill(skillId);
};

Game_Actor.prototype.eqlForgetSkill = function(skillId) {
    this._eqlAp[skillId] = 0;
};

Moogle_X.EQL.Game_Actor_skills = Game_Actor.prototype.skills;
Game_Actor.prototype.skills = function() {
    var list = Moogle_X.EQL.Game_Actor_skills.call(this);
    if (Moogle_X.EQL.instantMastery) {
        var array = this.getEqlObjects();
        array = array.filter(function(skill) {
            return !this.eqlCantLearnSkill(skill);
        }, this);
        if (Imported.Moogle_X_EQS) {
            array = array.filter(function(skill) {
                return skill.isEqsIgnore === true;
            });
        }
        array.forEach(function(skill) {
            if (!list.contains(skill)) {
                list.push(skill);
            }
        });
    }
    return list;
};

Game_Actor.prototype.getEqlObjects = function() {
    var list = [];
    this.equips().forEach(function(eq) {
        if (eq && eq.eqlSkill.length > 0) {
            eq.eqlSkill.forEach(function(skillId) {
                if (!list.contains($dataSkills[skillId])) {
                    list.push($dataSkills[skillId]);
                }
            });
        }
    });
    return list;
};

Game_Actor.prototype.eqlApRate = function(skill) {
    if (this.eqlIsMastered(skill.id)) return 1;
    return this._eqlAp[skill.id] / this.eqlApNeeded(skill);
};

Game_Actor.prototype.eqlCantLearnSkill = function(skill) {
    if (Moogle_X.EQL.allSklLearn) return false;
    if (!skill) return false;
    if (this.actor().eqlLearnSkills) {
        if (!this.actor().eqlLearnSkills.contains(skill.id)) var actorCant = true;
    }
    if (this.currentClass().eqlLearnSkills) {
        if (!this.currentClass().eqlLearnSkills.contains(skill.id)) var classCant = true;
    }
    if (actorCant && classCant) {
        return true;
    }
    return false;
};

// Compatibility with Moogle_X_EquipSkillSystem.
if (Imported.Moogle_X_EQS) {
    Moogle_X.EQL.Game_Actor_getSkillPool = Game_Actor.prototype.getSkillPool;
    Game_Actor.prototype.getSkillPool = function(typeId) {
        var array = Moogle_X.EQL.Game_Actor_getSkillPool.call(this, typeId);
        if (Moogle_X.EQL.instantMastery) {
            var list = this.getEqlObjects();

            list = list.filter(function(skill) {
                return skill.eqsType === typeId;
            });

            list = list.filter(function(skill) {
                return skill.isEqsIgnore === false;
            });

            list = list.filter(function(skill) {
                return !this.eqlCantLearnSkill(skill);
            }, this);

            list.forEach(function(skill) {
                if (!array.contains(skill)) {
                    array.push(skill);
                }
            });
        }

        return array;
    };

    Moogle_X.EQL.Game_Actor_eqsIsLearnedSkill = Game_Actor.prototype.eqsIsLearnedSkill;
    Game_Actor.prototype.eqsIsLearnedSkill = function(skillId) {
        return Moogle_X.EQL.Game_Actor_eqsIsLearnedSkill.call(this, skillId) ||
            (Moogle_X.EQL.instantMastery &&
            this.getEqlObjects().contains($dataSkills[skillId]));
    };

} // Imported.Moogle_X_EQS

// Compatibility with Moogle_X_PassiveSkill.
if (Imported.Moogle_X_PsvSkl) {
    Moogle_X.EQL.Game_Actor_getPsvSkillList = Game_Actor.prototype.getPsvSkillList;
    Game_Actor.prototype.getPsvSkillList = function() {
        var array = Moogle_X.EQL.Game_Actor_getPsvSkillList.call(this);
        if (Moogle_X.EQL.instantMastery) {
            var list = this.getEqlObjects();
            list = list.filter(function(skill) {
                return !this.eqlCantLearnSkill(skill);
            }, this);

            if (Imported.Moogle_X_EQS) {
                list = list.filter(function(skill) {
                    return skill.isEqsIgnore === true;
                });
            };

            list = list.filter(function(skill) {
                return skill.isPassive === true;
            });
            list = list.map(function(skill) {
                return skill.id;
            });
            list.forEach(function(skillId) {
                if (!array.contains(skillId)) {
                    array.push(skillId);
                }
            });
        }
        return array;
    };

} // Imported.Moogle_X_PsvSkl

// Compatibility with YEP_AutoPassiveStates v1.05a.
if (Imported.YEP_AutoPassiveStates) {
    Game_Actor.prototype.passiveStatesRaw = function() {
        if (this._passiveStatesRaw !== undefined) return this._passiveStatesRaw;
        var array = Game_BattlerBase.prototype.passiveStatesRaw.call(this);
        array = array.concat(this.getPassiveStateData(this.actor()));
        array = array.concat(this.getPassiveStateData(this.currentClass()));
        for (var i = 0; i < this.equips().length; ++i) {
            var equip = this.equips()[i];
            array = array.concat(this.getPassiveStateData(equip));
        }

        //for (var i = 0; i < this._skills.length; ++i) {
        //    var skill = $dataSkills[this._skills[i]];
        //    array = array.concat(this.getPassiveStateData(skill));
        //}

        if (Imported.Moogle_X_EQS) {
            var eqsSkills = this.getEqsArray();
            var eqsIgnored = this._skills.filter(function(skillId) {
                return $dataSkills[skillId].isEqsIgnore === true;
            });
            eqsSkills = eqsSkills.concat(eqsIgnored);

            if (Moogle_X.EQL.instantMastery) {
                var eqlSkills = this.getEqlObjects();
                eqlSkills = eqlSkills.filter(function(skill) {
                    return !this.eqlCantLearnSkill(skill);
                }, this);
                eqlSkills = eqlSkills.filter(function(skill) {
                    return skill.isEqsIgnore === true;
                });
                eqlSkills = eqlSkills.map(function(skill) {
                    return skill.id;
                });
                eqsSkills = eqsSkills.concat(eqlSkills);
            }

            for (var i = 0; i < eqsSkills.length; ++i) {
                var skill = $dataSkills[eqsSkills[i]];
                array = array.concat(this.getPassiveStateData(skill));
            }
        } else {
            var defaultSkills = this._skills;
            if (Moogle_X.EQL.instantMastery) {
                var eqlSkills = this.getEqlObjects();
                eqlSkills = eqlSkills.filter(function(skill) {
                    return !this.eqlCantLearnSkill(skill);
                }, this);
                eqlSkills = eqlSkills.map(function(skill) {
                    return skill.id;
                });
                defaultSkills = defaultSkills.concat(eqlSkills);
            }

            for (var i = 0; i < defaultSkills.length; ++i) {
                var skill = $dataSkills[defaultSkills[i]];
                array = array.concat(this.getPassiveStateData(skill));
            }
        }

        this._passiveStatesRaw = array.filter(Yanfly.Util.onlyUnique)
        return this._passiveStatesRaw;
    };

} // Imported.YEP_AutoPassiveStates

//=============================================================================
// Game_Battler
//=============================================================================

Moogle_X.EQL.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
    Moogle_X.EQL.Game_Battler_useItem.call(this, item);
    if (!$gameParty.inBattle()) return;
    if (this.isActor() && item === $dataSkills[item.id]) {
        if (Moogle_X.EQL.noApGainList.contains(item.id)) {
            return;
        }
    }
    if (this.isActor()) this.eqlGainAp(Moogle_X.EQL.apPerAction);
};

Moogle_X.EQL.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Moogle_X.EQL.Game_Battler_onBattleStart.call(this);
		this._eqlBattleAp = 0;
    this._eqlNewSkill = [];
};

//=============================================================================
// BattleManager
//=============================================================================

Moogle_X.EQL.BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    Moogle_X.EQL.BattleManager_makeRewards.call(this);
    this._rewards.eqlAp = $gameTroop.eqlApTotal();
    this.eqlGainAp();
};

BattleManager.eqlGainAp = function() {
		var ap = $gameTroop.eqlApTotal();
		$gameParty.members().forEach(function(actor) {
		    actor.eqlGainAp(ap);
		});
};

Moogle_X.EQL.BattleManager_displayRewards = BattleManager.displayRewards;
BattleManager.displayRewards = function() {
    Moogle_X.EQL.BattleManager_displayRewards.call(this);
    if (Moogle_X.EQL.postBattleMsg) {
        this.eqlDisplayApGain();
        this.eqlDisplayNewMastery();
    }
};

BattleManager.eqlDisplayApGain = function() {
    var ap = $gameTroop.eqlApTotal();
    $gameMessage.newPage();
    $gameParty.members().forEach(function(actor) {
			  var fmt = Moogle_X.EQL.battleApFmt;
			  var text = fmt.format(actor.name(), actor.eqlBattleAp(), Moogle_X.EQL.apVocab);
			  $gameMessage.add('\\.' + text);
		});
};

BattleManager.eqlDisplayNewMastery = function() {
    var anyNewSkill = $gameParty.members().some(function(actor) {
        return actor.eqlNewSkill().length > 0;
    });
    if (!anyNewSkill) return;
    $gameMessage.newPage();
    $gameParty.members().forEach(function(actor) {
			  var newSkills = actor.eqlNewSkill();
        newSkills.forEach(function(skillId) {
            $gameMessage.add(TextManager.obtainSkill.format($dataSkills[skillId].name));
        });
		});
};

//=============================================================================
// Game_Troop
//=============================================================================

Game_Troop.prototype.eqlApTotal = function() {
    return this.deadMembers().reduce(function(r, enemy) {
        return r + enemy.eqlAp();
    }, 0);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.eqlAp = function() {
    return this.enemy().eqlAp;
};

//=============================================================================
// Window_EqlVictoryAp
//=============================================================================

if (Imported.YEP_VictoryAftermath && Moogle_X.EQL.useAft) {

function Window_EqlVictoryAp() {
    this.initialize.apply(this, arguments);
}

Window_EqlVictoryAp.prototype = Object.create(Window_VictoryExp.prototype);
Window_EqlVictoryAp.prototype.constructor = Window_EqlVictoryAp;

Window_EqlVictoryAp.prototype.drawActorGauge = function(actor, index) {
    this.clearGaugeRect(index);
    var rect = this.gaugeRect(index);
    this.changeTextColor(this.normalColor());
    this.drawActorName(actor, rect.x + 2, rect.y);
    this.drawLevel(actor, rect);
    this.drawApGained(actor, rect);
    this.drawGainedSkills(actor, rect);
};

Window_EqlVictoryAp.prototype.drawApGained = function(actor, rect) {
    var wy = rect.y + this.lineHeight() * 1;
    this.changeTextColor(this.systemColor());
    this.drawText(Moogle_X.EQL.aftApGainText, rect.x + 2, wy, rect.width - 4,
        'left');
    var bonusAp = 1.0 * actor.eqlBattleAp() * this._tick /
        Yanfly.Param.VAGaugeTicks;
    var value = Yanfly.Util.toGroup(parseInt(bonusAp));
    var fmt = Moogle_X.EQL.aftApFmt;
    var apText = fmt.format(value, Moogle_X.EQL.apVocab);
    this.changeTextColor(this.normalColor());
    wx = rect.x + rect.width - this.textWidthEx(apText);
    this.drawTextEx(apText, wx, wy);
};

Window_EqlVictoryAp.prototype.drawGainedSkills = function(actor, rect) {
    if (actor.eqlNewSkill().length <= 0) return;
    if (!this.meetDrawGainedSkillsCondition(actor)) return;
    var wy = rect.y + Moogle_X.EQL.newSkillOffsetY;

    for (var i = 0; i < actor.eqlNewSkill().length; ++i) {
        if (wy + this.lineHeight() > rect.y + rect.height) break;
        var skillId = actor.eqlNewSkill()[i];
        var skill = $dataSkills[skillId];
        if (!skill) continue;
        var text = '\\i[' + skill.iconIndex + ']' + skill.name;
        text = TextManager.obtainSkill.format(text);
        var ww = this.textWidthEx(text);
        var wx = rect.x + (rect.width - ww) / 2;
        this.drawTextEx(text, wx, wy);
        wy += this.lineHeight();
    }
};

Window_EqlVictoryAp.prototype.meetDrawGainedSkillsCondition = function(actor) {
    if (!Moogle_X.EQL.showAftNewSkill) return false;
    var bonusAp = 1.0 * actor.eqlBattleAp() * this._tick /
        Yanfly.Param.VAGaugeTicks;
    var fullAp = actor.eqlBattleAp();
    if (bonusAp >= fullAp) {
        return true;
    } else {
        return false;
    }
};

//=============================================================================
// Scene_Battle
//=============================================================================

Moogle_X.EQL.Scene_Battle_addCustomVictorySteps =
    Scene_Battle.prototype.addCustomVictorySteps;
Scene_Battle.prototype.addCustomVictorySteps = function(array) {
    array = Moogle_X.EQL.Scene_Battle_addCustomVictorySteps.call(this, array);
    if (!array.contains('EQL')) array.push('EQL');
    return array;
};

Moogle_X.EQL.Scene_Battle_updateVictorySteps =
    Scene_Battle.prototype.updateVictorySteps;
Scene_Battle.prototype.updateVictorySteps = function() {
    Moogle_X.EQL.Scene_Battle_updateVictorySteps.call(this);
    if (this.isVictoryStep('EQL')) this.eqlUpdateVictoryAp();
};

Scene_Battle.prototype.eqlUpdateVictoryAp = function() {
    if (!this._eqlVictoryApWindow) {
      this.eqlCreateVictoryAp();
    } else if (this._eqlVictoryApWindow.isReady()) {
      if (this.victoryTriggerContinue()) this.eqlFinishVictoryAp();
    }
};

Scene_Battle.prototype.eqlCreateVictoryAp = function() {
    this._victoryTitleWindow.refresh(Moogle_X.EQL.aftTopText);
    this._eqlVictoryApWindow = new Window_EqlVictoryAp();
    this.addWindow(this._eqlVictoryApWindow);
    this._eqlVictoryApWindow.open();
};

Scene_Battle.prototype.eqlFinishVictoryAp = function() {
    SoundManager.playOk();
    this._eqlVictoryApWindow.close();
    this.processNextVictoryStep();
};

}; // Imported.YEP_VictoryAftermath


//=============================================================================
// Scene_Item
//=============================================================================

Moogle_X.EQL.Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function() {
    Moogle_X.EQL.Scene_Item_createItemWindow.call(this);
    this.eqlCreateAbilityWindow();
};

Scene_Item.prototype.eqlCreateAbilityWindow = function() {
    var x = Graphics.boxWidth / 2;
    var y = this._itemWindow.y;
    var w = Graphics.boxWidth / 2;
    var h = this._itemWindow.height;
    this._eqlAbilityWindow = new Window_EqlAbilityList(x, y, w, h);
    this.registerMoogleXhWindow(this._eqlAbilityWindow);
    this._itemWindow.eqlSetAbilityWindow(this._eqlAbilityWindow);
    this.addChild(this._eqlAbilityWindow);
};

Moogle_X.EQL.Scene_Item_onItemCancel = Scene_Item.prototype.onItemCancel;
Scene_Item.prototype.onItemCancel = function() {
    Moogle_X.EQL.Scene_Item_onItemCancel.call(this);
    if (this._eqlAbilityWindow) {
        this._eqlAbilityWindow.eqlSetItem(null);
    }
    if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemSceneItem)) {
        this._Moogle_X_hRestrict = true;
        if (this._infoWindow) this._infoWindow._hArrowsHide = true;
        if (this._eqlAbilityWindow) this._eqlAbilityWindow._hArrowsHide = true;
    }

};

// Yanfly Item Core compatibility.
if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemSceneItem)) {
    Moogle_X.EQL.Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        Moogle_X.EQL.Scene_Item_create.call(this);
        this._Moogle_X_hRestrict = true;
    };

    Moogle_X.EQL.Scene_Item_createInfoWindow =
        Scene_Item.prototype.createInfoWindow;
    Scene_Item.prototype.createInfoWindow = function() {
        Moogle_X.EQL.Scene_Item_createInfoWindow.call(this);
        this.registerMoogleXhWindow(this._infoWindow);
    };

    Moogle_X.EQL.Scene_Item_onCategoryOk = Scene_Item.prototype.onCategoryOk;
    Scene_Item.prototype.onCategoryOk = function() {
        Moogle_X.EQL.Scene_Item_onCategoryOk.call(this);
        if (this._infoWindow) {
            this._infoWindow._Moogle_X_hArrowsActive = true;
            this._infoWindow._hArrowsHide = false;
        }
        if (this._eqlAbilityWindow) this._eqlAbilityWindow._hArrowsHide = false;
        this._Moogle_X_hIndex = this._Moogle_X_hIndex || 1;
        this._Moogle_X_hRestrict = false;
    };

    Moogle_X.EQL.Scene_Item_update = Scene_Item.prototype.update;
    Scene_Item.prototype.update = function() {
        Moogle_X.EQL.Scene_Item_update.call(this);
        this.eqlUpdateLowerRightWindowTouch();
    };

    Scene_Item.prototype.eqlUpdateLowerRightWindowTouch = function() {
        if (this._Moogle_X_hRestrict) return;
        var result = this.eqlIsLowerRightWindowTouched();
        switch (result) {
        case 'left':
          this.goLeftMoogleXhPages();
          break;

        case 'right':
          this.goRightMoogleXhPages();
          break;
        }
    };

    Scene_Item.prototype.eqlIsLowerRightWindowTouched = function() {
        if (!TouchInput.isTriggered()) return false;
        var x = TouchInput.x;
        var y = TouchInput.y;
        var rect = new Rectangle();
        rect.x = this._eqlAbilityWindow.x;
        rect.y = this._eqlAbilityWindow.y;
        rect.width = this._eqlAbilityWindow.x + this._eqlAbilityWindow.width;
        rect.height = this._eqlAbilityWindow.y + this._eqlAbilityWindow.height;
        if (x >= rect.x && y >= rect.y && x < rect.width && y < rect.height) {
            var areaWidth = this._eqlAbilityWindow.x +
                this._eqlAbilityWindow.width / 2;
            if (x < areaWidth) {
                return 'left';
            } else if (x > areaWidth) {
                return 'right';
            } else {
                return false;
            }

        } else {
            return false;
        }
    };

//=============================================================================
// Window_ItemInfo
//=============================================================================

Moogle_X.EQL.Window_ItemInfo_initialize = Window_ItemInfo.prototype.initialize;
Window_ItemInfo.prototype.initialize = function(x, y, width, height) {
    Moogle_X.EQL.Window_ItemInfo_initialize.call(this, x, y, width, height);
    this._hArrowsHide = false;
};

Window_ItemInfo.prototype.customMoogleXhArrowsHide = function() {
    return this._hArrowsHide;
};

Window_ItemInfo.prototype.updateMoogleXhArrows = function(sceneIndex, scenePages) {
    if (Imported.YEP_EquipCore && SceneManager._scene instanceof Scene_Equip) {
        this._Moogle_X_leftArrowVisible = !this.customMoogleXhArrowsHide();
        this._Moogle_X_rightArrowVisible = !this.customMoogleXhArrowsHide();
    } else {
        Window_Base.prototype.updateMoogleXhArrows.call(this, sceneIndex, scenePages);
    }
};

} // Yanfly Item Core compatibility.


//=============================================================================
// Window_ItemList
//=============================================================================

Moogle_X.EQL.Window_ItemList_initialize = Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function(x, y, width, height) {
    Moogle_X.EQL.Window_ItemList_initialize.call(this, x, y, width, height);
    this._eqlMode = false;
};

Window_ItemList.prototype.eqlMode = function() {
    return this._eqlMode;
};

Moogle_X.EQL.Window_ItemList_maxCols = Window_ItemList.prototype.maxCols;
Window_ItemList.prototype.maxCols = function() {
    if (SceneManager._scene instanceof Scene_Item) {
        if (this.eqlMode()) return 1;
    }
    return Moogle_X.EQL.Window_ItemList_maxCols.call(this);
};

Moogle_X.EQL.Window_ItemList_setCategory = Window_ItemList.prototype.setCategory;
Window_ItemList.prototype.setCategory = function(category) {
    if (SceneManager._scene instanceof Scene_Item) { // Just to be safe.

        // Yanfly Item Core scenario.
        if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemSceneItem)) {
            //this._eqlMode = true;
            //this.width = Graphics.boxWidth / 2;
            if (category === 'weapon' || category === 'armor') {
                /*
                if (SceneManager._scene._infoWindow) {
                    SceneManager._scene._infoWindow._Moogle_X_hArrowsActive = true;
                }
                SceneManager._scene._Moogle_X_hIndex =
                    SceneManager._scene._Moogle_X_hIndex || 1;
                */

            } else {
                if (SceneManager._scene._infoWindow) {
                    SceneManager._scene._infoWindow._Moogle_X_hArrowsActive = false;
                    SceneManager._scene._infoWindow.visible = true;
                }
                SceneManager._scene._Moogle_X_hIndex = 0;
            }


        } else {
            // Non-Item Core scenario.
            if (category === 'weapon' || category === 'armor') {
                this._eqlMode = true;
                this.width = Graphics.boxWidth / 2;
                SceneManager._scene._Moogle_X_hIndex =
                    SceneManager._scene._Moogle_X_hIndex || 1;
            } else {
                this._eqlMode = false;
                this.width = Graphics.boxWidth;
                SceneManager._scene._Moogle_X_hIndex = 0;
            }
        }
    }
    Moogle_X.EQL.Window_ItemList_setCategory.call(this, category);
};

Window_ItemList.prototype.eqlSetAbilityWindow = function(abilityWindow) {
    this._eqlAbilityWindow = abilityWindow;
    this.update();
};

Moogle_X.EQL.Window_ItemList_updateHelp = Window_ItemList.prototype.updateHelp;
Window_ItemList.prototype.updateHelp = function() {
    Moogle_X.EQL.Window_ItemList_updateHelp.call(this);
    if (this._eqlAbilityWindow) {
        this._eqlAbilityWindow.eqlSetItem(this.item());
    }
};

//=============================================================================
// Scene_Equip
//=============================================================================

Moogle_X.EQL.Scene_Equip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function() {
    Moogle_X.EQL.Scene_Equip_create.call(this);
    this.eqlCreateAbilityWindow();
    this.refreshActor();
};

if (Imported.YEP_EquipCore) {

Moogle_X.EQL.Scene_Equip_createCompareWindow =
    Scene_Equip.prototype.createCompareWindow;
Scene_Equip.prototype.createCompareWindow = function() {
    Moogle_X.EQL.Scene_Equip_createCompareWindow.call(this);
    var x = Graphics.boxWidth / 2;
    var y = this._itemWindow.y;
    var w = Graphics.boxWidth / 2;
    var h = this._itemWindow.height;
    this._eqlAbilityWindow = new Window_EqlAbilityList(x, y, w, h);
    this._slotWindow.eqlSetAbilityWindow(this._eqlAbilityWindow);
    this._itemWindow.eqlSetAbilityWindow(this._eqlAbilityWindow);
    this.addWindow(this._eqlAbilityWindow);
    this._lowerRightWindows.push(this._eqlAbilityWindow);
};

} // Imported.YEP_EquipCore


Scene_Equip.prototype.eqlCreateAbilityWindow = function() {
    if (Imported.YEP_EquipCore) return; // YEP_EquipCore v1.09 fix.

    var x = Graphics.boxWidth / 2;
    var y = this._itemWindow.y;
    var w = Graphics.boxWidth / 2;
    var h = this._itemWindow.height;
    this._eqlAbilityWindow = new Window_EqlAbilityList(x, y, w, h);

    // Because of YEP_EquipCore v1.09, this part is now disabled.
    /*
    if (Imported.YEP_EquipCore) {
        this.registerMoogleXhWindow(this._compareWindow);
        this._Moogle_X_hIndex = 1;
        this._Moogle_X_hRestrict = true;
        this._compareWindow._hArrowsHide = true;
        this._eqlAbilityWindow._hArrowsHide = true;
    }
    */

    this.registerMoogleXhWindow(this._eqlAbilityWindow);
    this._slotWindow.eqlSetAbilityWindow(this._eqlAbilityWindow);
    this._itemWindow.eqlSetAbilityWindow(this._eqlAbilityWindow);
    this.addChild(this._eqlAbilityWindow);
};

Moogle_X.EQL.Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function() {
    Moogle_X.EQL.Scene_Equip_refreshActor.call(this);
    var actor = this.actor();
    if (this._eqlAbilityWindow) {
        this._eqlAbilityWindow.eqlSetActor(actor);
    }
};

Moogle_X.EQL.Scene_Equip_commandEquip = Scene_Equip.prototype.commandEquip;
Scene_Equip.prototype.commandEquip = function() {
    this._itemWindow.width = Graphics.boxWidth / 2;
    this._Moogle_X_hIndex = this._Moogle_X_hIndex || 1;
    if (Imported.YEP_EquipCore) {
        this._Moogle_X_hIndex = 1;
        this._compareWindow._hArrowsHide = false;
        this._infoWindow._hArrowsHide = false;
        this._eqlAbilityWindow._hArrowsHide = false;
        this._Moogle_X_hRestrict = false;
    }
    Moogle_X.EQL.Scene_Equip_commandEquip.call(this);
};

Moogle_X.EQL.Scene_Equip_onSlotCancel = Scene_Equip.prototype.onSlotCancel;
Scene_Equip.prototype.onSlotCancel = function() {
    this._itemWindow.width = Graphics.boxWidth;
    this._Moogle_X_hIndex = 0;
    if (Imported.YEP_EquipCore) {
        this._Moogle_X_hIndex = 1;
        //this._compareWindow._hArrowsHide = true;
        //this._infoWindow._hArrowsHide = true;
        //this._eqlAbilityWindow._hArrowsHide = true;
        this._Moogle_X_hRestrict = true;
    }
    this._eqlAbilityWindow.eqlSetItem(null);
    Moogle_X.EQL.Scene_Equip_onSlotCancel.call(this);
};

Scene_Equip.prototype.updateMoogleXhArrows = function() {
    if (Imported.YEP_EquipCore) {
        if (!this._lowerRightWindows) return;
        if (this._lowerRightWindows.length > 0) {
            this._lowerRightWindows.forEach(function(hWindow) {
                hWindow.updateMoogleXhArrows(this.MoogleXhIndex(),
                    this.MoogleXhPages());
                hWindow.updateMoogleXhVisible(this.MoogleXhIndex(),
                    this.MoogleXhPages());
            }, this);
        }

    } else {
        Scene_Base.prototype.updateMoogleXhArrows.call(this);
    }
};

//=============================================================================
// Window_EquipItem
//=============================================================================

Window_EquipItem.prototype.maxCols = function() {
    return 1;
};

//=============================================================================
// Window_EquipSlot
//=============================================================================

Window_EquipSlot.prototype.eqlSetAbilityWindow = function(abilityWindow) {
    this._eqlAbilityWindow = abilityWindow;
    this.update();
};

Moogle_X.EQL.Window_EquipSlot_updateHelp = Window_EquipSlot.prototype.updateHelp;
Window_EquipSlot.prototype.updateHelp = function() {
    Moogle_X.EQL.Window_EquipSlot_updateHelp.call(this);
    if (this._eqlAbilityWindow) {
        this._eqlAbilityWindow.eqlSetItem(this.item());
    }
};

// Yanfly Equip Core compatibility.

if (Imported.YEP_EquipCore) {

//=============================================================================
// Window_StatCompare
//=============================================================================

Moogle_X.EQL.Window_StatCompare_initialize =
    Window_StatCompare.prototype.initialize;
Window_StatCompare.prototype.initialize = function(wx, wy, ww, wh) {
    Moogle_X.EQL.Window_StatCompare_initialize.call(this, wx, wy, ww, wh);
    this._hArrowsHide = false;
};

Window_StatCompare.prototype.customMoogleXhArrowsHide = function() {
    return this._hArrowsHide;
};

Window_StatCompare.prototype.updateMoogleXhArrows = function(sceneIndex, scenePages) {
    this._Moogle_X_leftArrowVisible = !this.customMoogleXhArrowsHide();
    this._Moogle_X_rightArrowVisible = !this.customMoogleXhArrowsHide();
};

} // Imported.YEP_EquipCore

// Yanfly Shop Menu Core compatibility.

if (Imported.YEP_ShopMenuCore) {

//=============================================================================
// Window_ShopStatus
//=============================================================================

Moogle_X.EQL.Window_ShopStatus_initialize =
    Window_ShopStatus.prototype.initialize;
Window_ShopStatus.prototype.initialize = function(x, y, width, height) {
    Moogle_X.EQL.Window_ShopStatus_initialize.call(this, x, y, width, height);
    this._maxActorIndex = this._maxActorIndex + 1;
    this._eqlIndex = this._maxActorIndex;
};

Moogle_X.EQL.Window_ShopStatus_drawActorDisplayed =
    Window_ShopStatus.prototype.drawActorDisplayed;
Window_ShopStatus.prototype.drawActorDisplayed = function(actor) {
    if (this._actorIndex === this._eqlIndex) {
        var text = Moogle_X.EQL.ablTitle;
        this.changePaintOpacity(true);
        this.changeTextColor(this.systemColor());
        this.drawText(text, 0, this.lineHeight(), this.contents.width, 'center');
        var text = '<<';
        this.drawText(text, 0, this.lineHeight(), this.contents.width, 'left');
        var text = '>>';
        this.drawText(text, 0, this.lineHeight(), this.contents.width, 'right');
    } else {
        Moogle_X.EQL.Window_ShopStatus_drawActorDisplayed.call(this, actor);
    }
};

Moogle_X.EQL.Window_ShopStatus_drawDarkRectEntries =
    Window_ShopStatus.prototype.drawDarkRectEntries;
Window_ShopStatus.prototype.drawDarkRectEntries = function() {
    if (this._actorIndex === this._eqlIndex) return;
    Moogle_X.EQL.Window_ShopStatus_drawDarkRectEntries.call(this);
};

Moogle_X.EQL.Window_ShopStatus_drawActorStatInfo =
    Window_ShopStatus.prototype.drawActorStatInfo;
Window_ShopStatus.prototype.drawActorStatInfo = function(actor) {
    if (this._actorIndex === this._eqlIndex) {
        var y = this.lineHeight() * 2;
        var w = this.contents.width;

        var skillList = this._item.eqlSkill;
        if (skillList) {
            skillList = skillList.filter(function(id) {
                if ($dataSkills[id] && $dataSkills[id].eqlShowSwitch > 0) {
                    return $gameSwitches.value($dataSkills[id].eqlShowSwitch);
                } else {
                    return true;
                }
            });
        }

        // Display added skills feature.
        if (Moogle_X.EQL.showAddedSkills) {
            var addedSkills = this.getAddedSkills(this._item);
            skillList = addedSkills.concat(skillList);
        }

        if (skillList && skillList.length > 0) {
            this.eqlDrawAbilityList(this._item, 0, y, w);
        } else {
            this.eqlDrawNoAbility(0, y, w);
        }
    } else {
        Moogle_X.EQL.Window_ShopStatus_drawActorStatInfo.call(this, actor);
    }
};

Window_ShopStatus.prototype.eqlDrawAbilityList = function(item, x, y, w) {
    var iconWidth = Window_Base._iconWidth + 4;
    this.changeTextColor(this.normalColor());
    this.changePaintOpacity(true);

    var skillList = item.eqlSkill;
    if (skillList) {
        skillList = skillList.filter(function(id) {
            if ($dataSkills[id] && $dataSkills[id].eqlShowSwitch > 0) {
                return $gameSwitches.value($dataSkills[id].eqlShowSwitch);
            } else {
                return true;
            }
        });
    }

    // Display added skills feature.
    if (Moogle_X.EQL.showAddedSkills) {
        var addedSkills = this.getAddedSkills(item);
        skillList = addedSkills.concat(skillList);
    }

    var offsetX = Moogle_X.EQL.skillNameX;
    var offsetY = Moogle_X.EQL.skillNameY;

    for (var i = 0; i < skillList.length; i++) {
        var dy = y + this.lineHeight() * i;
        var ability = $dataSkills[skillList[i]];
        if (ability) {
            if (Moogle_X.EQL.showSkillIcon) {
                if (ability.eqlCstIcon) {
                    this.drawIcon(ability.eqlCstIcon, x, dy + 2);
                } else {
                    this.drawIcon(ability.iconIndex, x, dy + 2);
                }
            }
            this.resetFontSettings();
            this.eqlDrawApGauge(ability, x, dy, w);
            this.contents.fontFace = Moogle_X.EQL.sklFontName;
            this.contents.fontSize = Moogle_X.EQL.sklFontSize;
            this.drawText(ability.name, x + iconWidth + offsetX, dy + offsetY,
                w, 'left');
            this.resetFontSettings();
        }
    }
};

Window_ShopStatus.prototype.eqlDrawNoAbility = function(x, y, w) {
    this.changePaintOpacity(false);
    this.resetTextColor();
    this.drawText(Moogle_X.EQL.noAblText, x, y, w, Moogle_X.EQL.noAblTextAlign);
    this.changePaintOpacity(true);
};

Window_ShopStatus.prototype.eqlDrawApGauge = function(ability, x, y, width) {
    this.changePaintOpacity(true);

    // Display added skills feature.
    if (Moogle_X.EQL.showAddedSkills) {
        var addedSkills = this.getAddedSkills(this._item);
        if (addedSkills.contains(ability.id)) {
            return;
        }
    }

    var dx = x + Moogle_X.EQL.apOffsetX;
    var iconWidth = Window_Base._iconWidth + 4;
    var color1 = this.textColor(Moogle_X.EQL.apColor1);
    var color2 = this.textColor(Moogle_X.EQL.apColor2);
    var rate = 0;
    this.drawGauge(dx, y, width - dx - iconWidth - 2, rate, color1, color2);
    this.changeTextColor(this.textColor(Moogle_X.EQL.apTextColor));
    this.drawText(Moogle_X.EQL.apVocab, dx + Moogle_X.EQL.apTextOffsetX, y, width);
    this.changeTextColor(this.normalColor());
    this.eqlDrawApNumbers(ability, dx, y, width - dx - iconWidth - 2);
};

Window_ShopStatus.prototype.eqlDrawApNumbers = function(ability, x, y, width) {
    var baseAp = 0;
    var maxAp = ability.eqlAp;
    if (Imported.YEP_CoreEngine) {
        maxAp = Yanfly.Util.toGroup(maxAp);
    }
    var text = baseAp + "/" + maxAp;
    this.drawText(text, x, y, width, 'right');
};

Window_ShopStatus.prototype.getAddedSkills = function(item) {
    var list = [];
    if (!item) return list;
    if (!item.traits) return list;
    var traits = item.traits;
    traits = traits.filter(function(trait) {
        return trait.code === Game_BattlerBase.TRAIT_SKILL_ADD;
    });

    traits = traits.reduce(function(r, trait) {
        return r.concat(trait.dataId);
    }, []);

    return traits;
};

} // Imported.YEP_ShopMenuCore

})(); // IIFE

//=============================================================================
// Window_EqlAbilityList
//=============================================================================

function Window_EqlAbilityList() {
    this.initialize.apply(this, arguments);
}

Window_EqlAbilityList.prototype = Object.create(Window_Base.prototype);
Window_EqlAbilityList.prototype.constructor = Window_EqlAbilityList;

Window_EqlAbilityList.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._eqlItem = null;
    this._actor = null;
    this._hArrowsHide = false;
    this.refresh();
};

Window_EqlAbilityList.prototype.eqlSetItem = function(item) {
    this._eqlItem = item;
    this.refresh();
};

Window_EqlAbilityList.prototype.eqlSetActor = function(actor) {
    this._actor = actor;
    this.refresh();
};

Window_EqlAbilityList.prototype.item = function() {
    return this._eqlItem;
};

Window_EqlAbilityList.prototype.actor = function() {
    return this._actor;
};

Window_EqlAbilityList.prototype.refresh = function() {
    if (this.contents) {
        this.contents.clear();
        this.drawAllItems();
    }
};

Window_EqlAbilityList.prototype.drawAllItems = function() {
    if (!this.item()) return;
    this.resetFontSettings();
    var x = 0;
    var y = this.lineHeight();
    var w = this.contentsWidth();
    this.changeTextColor(this.systemColor());
    this.changePaintOpacity(true);
    this.drawText(Moogle_X.EQL.ablTitle, 0, 0, w, Moogle_X.EQL.ablTitleAlign);
    this.preDrawAbilityList(this.item(), x, y, w);
};

Window_EqlAbilityList.prototype.preDrawAbilityList = function(item, x, y, w) {
    if (item) {
        var skillList = item.eqlSkill;
        if (skillList) {
            skillList = skillList.filter(function(id) {
                if ($dataSkills[id] && $dataSkills[id].eqlShowSwitch > 0) {
                    return $gameSwitches.value($dataSkills[id].eqlShowSwitch);
                } else {
                    return true;
                }
            });
        }

        // Display added skills feature.
        if (Moogle_X.EQL.showAddedSkills) {
            var addedSkills = this.getAddedSkills(item);
            skillList = addedSkills.concat(skillList);
        }

        if (skillList && skillList.length > 0) {
            this.drawAbilityList(item, x, y, w);
        } else {
            this.drawNoAbility(x, y, w);
        }
    } else {
        this.drawNoAbility(x, y, w);
    }
};

Window_EqlAbilityList.prototype.getAddedSkills = function(item) {
    var list = [];
    if (!item) return list;
    if (!item.traits) return list;
    var traits = item.traits;
    traits = traits.filter(function(trait) {
        return trait.code === Game_BattlerBase.TRAIT_SKILL_ADD;
    });

    traits = traits.reduce(function(r, trait) {
        return r.concat(trait.dataId);
    }, []);

    return traits;
};

Window_EqlAbilityList.prototype.drawAbilityList = function(item, x, y, w) {
    var iconWidth = Window_Base._iconWidth + 4;
    this.changeTextColor(this.normalColor());
    this.changePaintOpacity(true);

    var skillList = item.eqlSkill;
    if (skillList) {
        skillList = skillList.filter(function(id) {
            if ($dataSkills[id] && $dataSkills[id].eqlShowSwitch > 0) {
                return $gameSwitches.value($dataSkills[id].eqlShowSwitch);
            } else {
                return true;
            }
        });
    }

    // Display added skills feature.
    if (Moogle_X.EQL.showAddedSkills) {
        var addedSkills = this.getAddedSkills(item);
        skillList = addedSkills.concat(skillList);
    }

    var offsetX = Moogle_X.EQL.skillNameX;
    var offsetY = Moogle_X.EQL.skillNameY;

    for (var i = 0; i < skillList.length; i++) {
        var dy = y + y * i;
        var ability = $dataSkills[skillList[i]];
        if (ability) {
            this.eqlDrawIcon(ability, x, dy + 2);
            this.drawApGauge(ability, x, dy, w);
            this.eqlDrawAbilityName(ability, x + iconWidth + offsetX,
                dy + offsetY, w, 'left');
        }
    }
};

Window_EqlAbilityList.prototype.eqlDrawIcon = function(ability, x, y) {
    if (!Moogle_X.EQL.showSkillIcon) return;
    this.changePaintOpacity(true);
    var eqlActor = this.actor();
    eqlActor = this.eqlAdjustMasteryYanflyItemCore(eqlActor);
    if (eqlActor && eqlActor.eqlCantLearnSkill(ability)) {
        this.changePaintOpacity(false);
    }

    // Display added skills feature.
    if (Moogle_X.EQL.showAddedSkills) {
        var addedSkills = this.getAddedSkills(this.item());
        if (addedSkills.contains(ability.id)) {
            this.changePaintOpacity(true);
        }
    }

    // Display custom skill icon.
    if (ability.eqlCstIcon) {
        this.drawIcon(ability.eqlCstIcon, x, y);
    } else {
        this.drawIcon(ability.iconIndex, x, y);
    }
};

Window_EqlAbilityList.prototype.eqlDrawAbilityName = function(ability, x, y, w, align) {
    this.changePaintOpacity(true);
    this.contents.fontFace = Moogle_X.EQL.sklFontName;
    this.contents.fontSize = Moogle_X.EQL.sklFontSize;
    var eqlActor = this.actor();
    eqlActor = this.eqlAdjustMasteryYanflyItemCore(eqlActor);
    if (eqlActor && eqlActor.eqlCantLearnSkill(ability)) {
        this.changePaintOpacity(false);
    }

    // Display added skills feature.
    if (Moogle_X.EQL.showAddedSkills) {
        var addedSkills = this.getAddedSkills(this.item());
        if (addedSkills.contains(ability.id)) {
            this.changePaintOpacity(true);
        }
    }

    this.drawText(ability.name, x, y, w, align);
    this.resetFontSettings();

};

Window_EqlAbilityList.prototype.drawNoAbility = function(x, y, w) {
    this.changePaintOpacity(false);
    this.resetTextColor();
    this.drawText(Moogle_X.EQL.noAblText, x, y, w, Moogle_X.EQL.noAblTextAlign);
};

Window_EqlAbilityList.prototype.drawApGauge = function(ability, x, y, width) {
    if (this.actor() && this.actor().eqlCantLearnSkill(ability)) return;

    // Display added skills feature.
    if (Moogle_X.EQL.showAddedSkills) {
        var addedSkills = this.getAddedSkills(this.item());
        if (addedSkills.contains(ability.id)) {
            return;
        }
    }

    var eqlActor = this.actor();
    eqlActor = this.eqlAdjustMasteryYanflyItemCore(eqlActor);
    if (eqlActor && eqlActor.eqlCantLearnSkill(ability)) {
        return;
    }
    this.changePaintOpacity(true);
    var dx = x + Moogle_X.EQL.apOffsetX;
    var iconWidth = Window_Base._iconWidth + 4;
    var color1 = this.textColor(Moogle_X.EQL.apColor1);
    var color2 = this.textColor(Moogle_X.EQL.apColor2);
    var rate = this.actor() ? this.actor().eqlApRate(ability) : 0;

    rate = this.eqlAdjustRateYanflyItemCore(rate, ability);

    this.drawGauge(dx, y, width - dx - iconWidth - 2, rate, color1, color2);
    this.changeTextColor(this.textColor(Moogle_X.EQL.apTextColor));
    this.drawText(Moogle_X.EQL.apVocab, dx + Moogle_X.EQL.apTextOffsetX, y, width);
    this.changeTextColor(this.normalColor());
    this.drawApNumbers(ability, dx, y, width - dx - iconWidth - 2);
    this.drawMasteryIcon(ability, width - iconWidth + 2, y + 2);
};

Window_EqlAbilityList.prototype.drawApNumbers = function(ability, x, y, width) {
    var baseAp = this.actor() ? this.actor()._eqlAp[ability.id] : 0;
    baseAp = this.eqlAdjustBaseApIfLearned(baseAp, ability, this.actor());
    baseAp = this.eqlAdjustBaseApYanflyItemCore(baseAp, ability);
    var maxAp = this.actor() ? this.actor().eqlApNeeded(ability) : ability.eqlAp;
    maxAp = this.eqlAdjustMaxApYanflyItemCore(maxAp, ability);
    if (Imported.YEP_CoreEngine) {
        baseAp = Yanfly.Util.toGroup(baseAp);
        maxAp = Yanfly.Util.toGroup(maxAp);
    }
    var text = baseAp + "/" + maxAp;
    this.drawText(text, x, y, width, 'right');
};

Window_EqlAbilityList.prototype.drawMasteryIcon = function(ability, x, y) {
    var actor = this.actor();
    actor = this.eqlAdjustMasteryYanflyItemCore(actor);
    if (!actor) return;
    if (actor.eqlIsMastered(ability.id)) {
        this.drawIcon(Moogle_X.EQL.masteryIcon, x, y);
    }
};

Window_EqlAbilityList.prototype.eqlAdjustBaseApIfLearned = function(baseAp, ability, actor) {
    if (actor) {
        if (actor.isLearnedSkill(ability.id)) {
            baseAp = actor.eqlApNeeded(ability);
        }
    }
    return baseAp;
};

Window_EqlAbilityList.prototype.customMoogleXhArrowsHide = function() {
    return this._hArrowsHide;
};

// Compatibility stuff!

Window_EqlAbilityList.prototype.eqlAdjustRateYanflyItemCore = function(rate, ability) {
    if (SceneManager._scene instanceof Scene_Item) {
        if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemShEquipped)) {
            if (DataManager.isIndependent(this.item())) {

                if (DataManager.isItem(this.item())) {
                    var index = $gameParty.items().indexOf(this.item());
                } else if (DataManager.isWeapon(this.item())) {
                    var index = $gameParty.weapons().indexOf(this.item());
                } else if (DataManager.isArmor(this.item())) {
                    var index = $gameParty.armors().indexOf(this.item());
                }

                if (index < 0) {
                    var carrier = null;
                    for (var a = 0; a < $gameParty.members().length; ++a) {
                        var actor = $gameParty.members()[a];
                        if (!actor) continue;
                        if (actor.equips().contains(this.item())) carrier = actor;
                    }
                }

                if (carrier) {
                    rate = carrier.eqlApRate(ability);
                }
            }
        }
    }

    return rate;
};

Window_EqlAbilityList.prototype.eqlAdjustBaseApYanflyItemCore = function(baseAp, ability) {
    if (SceneManager._scene instanceof Scene_Item) {
        if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemShEquipped)) {
            if (DataManager.isIndependent(this.item())) {

                if (DataManager.isItem(this.item())) {
                    var index = $gameParty.items().indexOf(this.item());
                } else if (DataManager.isWeapon(this.item())) {
                    var index = $gameParty.weapons().indexOf(this.item());
                } else if (DataManager.isArmor(this.item())) {
                    var index = $gameParty.armors().indexOf(this.item());
                }

                if (index < 0) {
                    var carrier = null;
                    for (var a = 0; a < $gameParty.members().length; ++a) {
                        var actor = $gameParty.members()[a];
                        if (!actor) continue;
                        if (actor.equips().contains(this.item())) carrier = actor;
                    }
                }

                if (carrier) {
                    baseAp = carrier._eqlAp[ability.id];
                    baseAp = this.eqlAdjustBaseApIfLearned(baseAp, ability, carrier);
                }
            }
        }
    }

    return baseAp;
};

Window_EqlAbilityList.prototype.eqlAdjustMaxApYanflyItemCore = function(maxAp, ability) {
    if (SceneManager._scene instanceof Scene_Item) {
        if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemShEquipped)) {
            if (DataManager.isIndependent(this.item())) {

                if (DataManager.isItem(this.item())) {
                    var index = $gameParty.items().indexOf(this.item());
                } else if (DataManager.isWeapon(this.item())) {
                    var index = $gameParty.weapons().indexOf(this.item());
                } else if (DataManager.isArmor(this.item())) {
                    var index = $gameParty.armors().indexOf(this.item());
                }

                if (index < 0) {
                    var carrier = null;
                    for (var a = 0; a < $gameParty.members().length; ++a) {
                        var actor = $gameParty.members()[a];
                        if (!actor) continue;
                        if (actor.equips().contains(this.item())) carrier = actor;
                    }
                }

                if (carrier) {
                    maxAp = carrier.eqlApNeeded(ability);
                }
            }
        }
    }

    return maxAp;
};

Window_EqlAbilityList.prototype.eqlAdjustMasteryYanflyItemCore = function(eqlActor) {
    if (SceneManager._scene instanceof Scene_Item) {
        if (Imported.YEP_ItemCore && eval(Yanfly.Param.ItemShEquipped)) {
            if (DataManager.isIndependent(this.item())) {

                if (DataManager.isItem(this.item())) {
                    var index = $gameParty.items().indexOf(this.item());
                } else if (DataManager.isWeapon(this.item())) {
                    var index = $gameParty.weapons().indexOf(this.item());
                } else if (DataManager.isArmor(this.item())) {
                    var index = $gameParty.armors().indexOf(this.item());
                }

                if (index < 0) {
                    var carrier = null;
                    for (var a = 0; a < $gameParty.members().length; ++a) {
                        var actor = $gameParty.members()[a];
                        if (!actor) continue;
                        if (actor.equips().contains(this.item())) carrier = actor;
                    }
                }

                if (carrier) {
                    eqlActor = carrier;
                }
            }
        }
    }

    return eqlActor;
};

Window_EqlAbilityList.prototype.updateMoogleXhArrows = function(sceneIndex, scenePages) {
    if (Imported.YEP_EquipCore && SceneManager._scene instanceof Scene_Equip) {
        this._Moogle_X_leftArrowVisible = !this.customMoogleXhArrowsHide();
        this._Moogle_X_rightArrowVisible = !this.customMoogleXhArrowsHide();
    } else {
        Window_Base.prototype.updateMoogleXhArrows.call(this, sceneIndex, scenePages);
    }
};


(function() { // IIFE

//=============================================================================
// Game_Interpreter
//=============================================================================

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'EQL') {
        switch (args[0]) {
        case 'AP':
            if (args[1] === "Gain" && args[3] === "Actor") {
                $gameActors.actor(Number(args[4])).eqlGainAp(Number(args[2]));
            }
            break;

        }
    }
};


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
