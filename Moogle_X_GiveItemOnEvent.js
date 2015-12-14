//=============================================================================
// Give Item On Event by Moogle_X
// Moogle_X_GiveItemOnEvent.js
// Created on: December 14th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_GIOE = true;

var Moogle_X = Moogle_X || {};
Moogle_X.GIOE = Moogle_X.GIOE || {};

//=============================================================================
/*:
 * @plugindesc v1.0 Allows you to use/give item on event.
 * @author Moogle_X
 *
 * @param Category Variable ID
 * @desc This is in-game variable ID for storing chosen item category.
 * @default 1
 *
 * @param Item Variable ID
 * @desc This is in-game variable ID for storing chosen item ID.
 * @default 2
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This is a special plugin request from Iliketea.
 *
 * This plugin allows you to use a special plugin command during an event to
 * open a custom (yet similar looking) item menu. This item menu has different
 * rule on which item become enabled or not.
 *
 * The list of allowed items, weapons, and armors are defined using Script Call.
 *
 * GIOE_Items = [];           // This is the list of allowed items.
 * GIOE_Weapons = [];         // This is the list of allowed weapons.
 * GIOE_Armors = [];          // This is the list of allowed armors.
 *
 * So, basically you insert the list of allowed items' ID inside the bracket
 * separated by comma.
 *
 * Example:
 *
 * GIOE_Items = [2,4,5,34,79];      // Five items are allowed to be used.
 * GIOE_Weapons = [5];              // Only one weapon is allowed.
 * GIOE_Armors = [];                // No armor is allowed.
 *
 * You need to call the above Script Call before you open the custom item menu.
 *
 * When you are ready to use/give an item, use this plugin command to open the
 * custom item menu:
 *
 * GIOE Open                // Open the "Give Item On Event" menu.
 *
 * In this menu, all of allowed items above will be enabled (highlighted) while
 * the rest will be "grey out" or disabled.
 *
 * There are 2 possible outcomes inside this menu:
 * 1. You choose one of the enabled items.
 * 2. You "exit" the menu by using cancel button.
 *
 * In the first scenario, 2 of the in-game variables will be changed.
 * I called them "Category Variable" and "Item Variable".
 *
 * You must first edit the plugin configuration to decide which variables will
 * be your "Category Variable" and "Item Variable" in the game. Be default,
 * they are Variable 1 and Variable 2.
 *
 * After an item is chosen in the menu, "Category Variable" will be changed to
 * either of the following:
 *
 * 1        // If the chosen item belong to "Item" category.
 * 2        // If the chosen item belong to "Weapon" category.
 * 3        // If the chosen item belong to "Armor" category.
 *
 * Next, "Item Variable" will be changed to the ID number of chosen item.
 * If you choose "Hi-Potion" and that item's ID is 2, then "Item Variable" value
 * will be 2 as well.
 *
 * And then your chosen item's total amount will be subtracted by 1.
 *
 * What happen if you "exit" the item menu?
 * Both "Category Variable" and "Item Variable" will be 0.
 *
 * The rest is simply writing your list of conditional branches involving those
 * variables.
 *
 * IMPORTANT!
 * GIOE_Items, GIOE_Weapons, GIOE_Armors, "Category Variable", and "Item Variable"
 * will be reseted to empty/0 when...
 * 1. The event switch/change its page.
 * 2. The moment you "exit" the custom item menu with cancel button.
 * 3. When the game decides to perform "event refresh" for one reason or another.
 *
 * Don't worry, those values won't be reseted in the middle of event page.
 *
 * But, if for some reason you want to reset those values in the middle of event
 * page, you can simply use this plugin command:
 *
 * GIOE Refresh         // Reset those 5 values to empty and 0.
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 * Try position this plugin below anything that alter/modify item menu.
 * Just to be safe... ^_^
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

//=============================================================================
// Global Variables
//=============================================================================

var GIOE_Items = [];
var GIOE_Weapons = [];
var GIOE_Armors = [];

(function() { // IIFE

//=============================================================================
// Parameter Variables
//=============================================================================

Moogle_X.GIOE.parameters = PluginManager.parameters('Moogle_X_GiveItemOnEvent');
Moogle_X.GIOE.categoryVar = Number(Moogle_X.GIOE.parameters['Category Variable ID'] || 0);
Moogle_X.GIOE.itemVar = Number(Moogle_X.GIOE.parameters['Item Variable ID'] || 0);

//=============================================================================
// Game_Event
//=============================================================================

Moogle_X.GIOE.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    Moogle_X.GIOE.Game_Event_setupPage.call(this);
    this.refreshGioe();
};

Game_Event.prototype.refreshGioe = function() {
    GIOE_Items = [];
    GIOE_Weapons = [];
    GIOE_Armors = [];
    $gameVariables.setValue(Moogle_X.GIOE.categoryVar, 0);
    $gameVariables.setValue(Moogle_X.GIOE.itemVar, 0);
};


})(); // IIFE

//=============================================================================
// Scene_GiveItemOnEvent
//=============================================================================

function Scene_GiveItemOnEvent() {
    this.initialize.apply(this, arguments);
}

Scene_GiveItemOnEvent.prototype = Object.create(Scene_Item.prototype);
Scene_GiveItemOnEvent.prototype.constructor = Scene_GiveItemOnEvent;

Scene_GiveItemOnEvent.prototype.initialize = function() {
    Scene_Item.prototype.initialize.call(this);
};

Scene_GiveItemOnEvent.prototype.onItemOk = function() {
    this._itemWindow.updateGioe();
    this.popScene();
};

Scene_GiveItemOnEvent.prototype.createCategoryWindow = function() {
    Scene_Item.prototype.createCategoryWindow.call(this);
    this._categoryWindow.setHandler('cancel', this.exitGioe.bind(this));
};

Scene_GiveItemOnEvent.prototype.exitGioe = function() {
    GIOE_Items = [];
    GIOE_Weapons = [];
    GIOE_Armors = [];
    $gameVariables.setValue(Moogle_X.GIOE.categoryVar, 0);
    $gameVariables.setValue(Moogle_X.GIOE.itemVar, 0);
    this.popScene();
};

//=============================================================================
// Window_ItemList
//=============================================================================

Window_ItemList.prototype.updateGioe = function() {
    if (this.item()) {
        var category = 0;
        var id = 0;
        if (DataManager.isItem(this.item())) category = 1;
        if (DataManager.isWeapon(this.item())) category = 2;
        if (DataManager.isArmor(this.item())) category = 3;
        id = this.item().id;
        $gameVariables.setValue(Moogle_X.GIOE.categoryVar, category);
        $gameVariables.setValue(Moogle_X.GIOE.itemVar, id);
        $gameParty.loseItem(this.item(), 1, false);
    }
};

Moogle_X.GIOE.Window_ItemList_isEnabled = Window_ItemList.prototype.isEnabled;
Window_ItemList.prototype.isEnabled = function(item) {
    if (SceneManager._scene.constructor === Scene_GiveItemOnEvent) {
        return this.isGioeEnabled(item);
    } else {
        return Moogle_X.GIOE.Window_ItemList_isEnabled.call(this, item);
    }
};

Window_ItemList.prototype.isGioeEnabled = function(item) {
    if (DataManager.isItem(item)) {
        return GIOE_Items.contains(item.id);
    } else if (DataManager.isWeapon(item)) {
        return GIOE_Weapons.contains(item.id);
    } else if (DataManager.isArmor(item)) {
        return GIOE_Armors.contains(item.id);
    } else {
        return false;
    }
};

(function() { // IIFE

//=============================================================================
// Game_Interpreter
//=============================================================================

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'GIOE') {
        switch (args[0]) {
        case 'Open':
            SceneManager.push(Scene_GiveItemOnEvent);
            break;
        case 'Refresh':
            GIOE_Items = [];
            GIOE_Weapons = [];
            GIOE_Armors = [];
            $gameVariables.setValue(Moogle_X.GIOE.categoryVar, 0);
            $gameVariables.setValue(Moogle_X.GIOE.itemVar, 0);
            break;
        }
    }
};


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
