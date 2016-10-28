//=============================================================================
// Equip Skill System by Moogle_X
// Moogle_X_EquipSkillSystem.js
// Created on: November 18th 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_EQS = true;

var Moogle_X = Moogle_X || {};
Moogle_X.EQS = Moogle_X.EQS || {};

//=============================================================================
/*:
 * @plugindesc v1.46 Adds equip skill system mechanic to actors.
 * @author Moogle_X
 *
 * @param Default Max Limit
 * @desc This is the default max skill equip limit for all actors.
 * @default 10
 *
 * @param Default Equip Cost
 * @desc This is the default skill equip cost for all skills.
 * @default 1
 *
 * @param Party Based Skill Pool
 * @desc Skill pool will show all party's skills instead of user's skills only. 1:Yes 0:No
 * @default 0
 *
 * @param ---EQS Class Restriction---
 * @default
 *
 * @param Apply EQS Class Restriction
 * @desc Apply additional skill equip restriction based on class/subclass? 1:Yes 0:No
 * @default 0
 *
 * @param Legal Skill List
 * @desc This is the list of skill id(s) that always be "legal" for all classes. Example: 16 20 48 59
 * @default 0
 *
 * @param ---Scene---
 * @default
 *
 * @param Show in Skill Menu
 * @desc Put "Equip Skill" command in skill menu. 1:Yes 0:No
 * @default 1
 *
 * @param Skill Menu Switch ID
 * @desc Turning on the in-game switch with this ID will put "Equip" command in skill menu. Put 0 to ignore this feature.
 * @default 0
 *
 * @param Equip Skill Command Name
 * @desc This is the "Equip" skill command name in Scene Skill.
 * @default Equip
 *
 * @param Show in Main Menu
 * @desc Put "Equip Skill" scene command in main menu. 1:Yes 0:No
 * @default 0
 *
 * @param Main Menu Switch ID
 * @desc Turning on the in-game switch with this ID will put scene command in main menu. Put 0 to ignore this feature.
 * @default 0
 *
 * @param Menu Vocab
 * @desc Change the "Equip Skill" command name in main menu.
 * @default Equip Skill
 *
 * @param Empty Slot Text
 * @desc This is the text shown when the skill slot is empty.
 * @default <Empty>
 *
 * @param Empty Icon Index
 * @desc This is the index of icon shown when the skill slot is empty.
 * @default 16
 *
 * @param Remove Slot Text
 * @desc This is the text shown for "remove" skill command.
 * @default Remove
 *
 * @param Remove Icon Index
 * @desc This is the index of icon shown for "remove" skill command.
 * @default 16
 *
 * @param ---Equip Limit---
 * @default
 *
 * @param Equip Limit Text
 * @desc This is the text shown for "Equip Limit:" above all skill slots.
 * @default Equip Limit:
 *
 * @param Equip Limit Text Color
 * @desc This is the text color for "Equip Limit:" above all skill slots.
 * @default 16
 *
 * @param Equip Limit Number Color
 * @desc This is the number color for actor's equip limit above all skill slots.
 * @default 0
 *
 * @param ---Skill Pool---
 * @default
 *
 * @param Skill Pool Text
 * @desc This is the text shown for "Skill Pool" above all skill list.
 * @default Skill Pool
 *
 * @param Skill Pool Text Color
 * @desc This is the text color for "Skill Pool" above all skill list.
 * @default 16
 *
 * @param ---Equip Cost---
 * @default
 *
 * @param Equip Cost Text
 * @desc This is the text shown for "Equip Cost" above all skill list.
 * @default Equip Cost
 *
 * @param Equip Cost Text Color
 * @desc This is the text color for "Equip Cost" above all skill list.
 * @default 17
 *
 * @param Equip Cost Number Color
 * @desc This is the number color for skill equip cost.
 * @default 17
 *
 * @param ---Equip Sound---
 * @default
 *
 * @param Equip SE Name
 * @desc This is the sound's file name when equipping skill.
 * @default Equip1
 *
 * @param Equip SE Volume
 * @desc This will be the volume of the SE played.
 * @default 90
 *
 * @param Equip SE Pitch
 * @desc This will be the pitch of the SE played.
 * @default 100
 *
 * @param Equip SE Pan
 * @desc This will be the pan of the SE played.
 * @default 0
 *
 * @param ---Slot Types---
 * @default
 *
 * @param Slot Type Name Rectangle Width
 * @desc This is the rectangle width for slot type name.
 * @default 120
 *
 * @param ---Slot Type 1---
 * @default
 *
 * @param Slot Type 1 Name
 * @desc This is the name for Slot Type 1.
 * @default Type 1
 *
 * @param Slot Type 1 Color
 * @desc This is the color for Slot Type 1 name.
 * @default 16
 *
 * @param ---Slot Type 2---
 * @default
 *
 * @param Slot Type 2 Name
 * @desc This is the name for Slot Type 2.
 * @default Type 2
 *
 * @param Slot Type 2 Color
 * @desc This is the color for Slot Type 2 name.
 * @default 16
 *
 * @param ---Slot Type 3---
 * @default
 *
 * @param Slot Type 3 Name
 * @desc This is the name for Slot Type 3.
 * @default Type 3
 *
 * @param Slot Type 3 Color
 * @desc This is the color for Slot Type 3 name.
 * @default 16
 *
 * @param ---Slot Type 4---
 * @default
 *
 * @param Slot Type 4 Name
 * @desc This is the name for Slot Type 4.
 * @default Type 4
 *
 * @param Slot Type 4 Color
 * @desc This is the color for Slot Type 4 name.
 * @default 16
 *
 * @param ---Slot Type 5---
 * @default
 *
 * @param Slot Type 5 Name
 * @desc This is the name for Slot Type 5.
 * @default Type 5
 *
 * @param Slot Type 5 Color
 * @desc This is the color for Slot Type 5 name.
 * @default 16
 *
 * @param ---Slot Type 6---
 * @default
 *
 * @param Slot Type 6 Name
 * @desc This is the name for Slot Type 6.
 * @default Type 6
 *
 * @param Slot Type 6 Color
 * @desc This is the color for Slot Type 6 name.
 * @default 16
 *
 * @param ---Slot Type 7---
 * @default
 *
 * @param Slot Type 7 Name
 * @desc This is the name for Slot Type 7.
 * @default Type 7
 *
 * @param Slot Type 7 Color
 * @desc This is the color for Slot Type 7 name.
 * @default 16
 *
 * @param ---Slot Type 8---
 * @default
 *
 * @param Slot Type 8 Name
 * @desc This is the name for Slot Type 8.
 * @default Type 8
 *
 * @param Slot Type 8 Color
 * @desc This is the color for Slot Type 8 name.
 * @default 16
 *
 * @param ---Slot Type 9---
 * @default
 *
 * @param Slot Type 9 Name
 * @desc This is the name for Slot Type 9.
 * @default Type 9
 *
 * @param Slot Type 9 Color
 * @desc This is the color for Slot Type 9 name.
 * @default 16
 *
 * @param ---Slot Type 10---
 * @default
 *
 * @param Slot Type 10 Name
 * @desc This is the name for Slot Type 10.
 * @default Type 10
 *
 * @param Slot Type 10 Color
 * @desc This is the color for Slot Type 10 name.
 * @default 16
 *
 * @param ---Slot Type 11---
 * @default
 *
 * @param Slot Type 11 Name
 * @desc This is the name for Slot Type 11.
 * @default Type 11
 *
 * @param Slot Type 11 Color
 * @desc This is the color for Slot Type 11 name.
 * @default 16
 *
 * @param ---Slot Type 12---
 * @default
 *
 * @param Slot Type 12 Name
 * @desc This is the name for Slot Type 12.
 * @default Type 12
 *
 * @param Slot Type 12 Color
 * @desc This is the color for Slot Type 12 name.
 * @default 16
 *
 * @param ---Slot Type 13---
 * @default
 *
 * @param Slot Type 13 Name
 * @desc This is the name for Slot Type 13.
 * @default Type 13
 *
 * @param Slot Type 13 Color
 * @desc This is the color for Slot Type 13 name.
 * @default 16
 *
 * @param ---Slot Type 14---
 * @default
 *
 * @param Slot Type 14 Name
 * @desc This is the name for Slot Type 14.
 * @default Type 14
 *
 * @param Slot Type 14 Color
 * @desc This is the color for Slot Type 14 name.
 * @default 16
 *
 * @param ---Slot Type 15---
 * @default
 *
 * @param Slot Type 15 Name
 * @desc This is the name for Slot Type 15.
 * @default Type 15
 *
 * @param Slot Type 15 Color
 * @desc This is the color for Slot Type 15 name.
 * @default 16
 *
 * @param ---Slot Type 16---
 * @default
 *
 * @param Slot Type 16 Name
 * @desc This is the name for Slot Type 16.
 * @default Type 16
 *
 * @param Slot Type 16 Color
 * @desc This is the color for Slot Type 16 name.
 * @default 16
 *
 * @param ---Slot Type 17---
 * @default
 *
 * @param Slot Type 17 Name
 * @desc This is the name for Slot Type 17.
 * @default Type 17
 *
 * @param Slot Type 17 Color
 * @desc This is the color for Slot Type 17 name.
 * @default 16
 *
 * @param ---Slot Type 18---
 * @default
 *
 * @param Slot Type 18 Name
 * @desc This is the name for Slot Type 18.
 * @default Type 18
 *
 * @param Slot Type 18 Color
 * @desc This is the color for Slot Type 18 name.
 * @default 16
 *
 * @param ---Slot Type 19---
 * @default
 *
 * @param Slot Type 19 Name
 * @desc This is the name for Slot Type 19.
 * @default Type 19
 *
 * @param Slot Type 19 Color
 * @desc This is the color for Slot Type 19 name.
 * @default 16
 *
 * @param ---Slot Type 20---
 * @default
 *
 * @param Slot Type 20 Name
 * @desc This is the name for Slot Type 20.
 * @default Type 20
 *
 * @param Slot Type 20 Color
 * @desc This is the color for Slot Type 20 name.
 * @default 16
 *
 * @param ---Slot Type 21---
 * @default
 *
 * @param Slot Type 21 Name
 * @desc This is the name for Slot Type 21.
 * @default Type 21
 *
 * @param Slot Type 21 Color
 * @desc This is the color for Slot Type 21 name.
 * @default 16
 *
 * @param ---Slot Type 22---
 * @default
 *
 * @param Slot Type 22 Name
 * @desc This is the name for Slot Type 22.
 * @default Type 22
 *
 * @param Slot Type 22 Color
 * @desc This is the color for Slot Type 22 name.
 * @default 16
 *
 * @param ---Slot Type 23---
 * @default
 *
 * @param Slot Type 23 Name
 * @desc This is the name for Slot Type 23.
 * @default Type 23
 *
 * @param Slot Type 23 Color
 * @desc This is the color for Slot Type 23 name.
 * @default 16
 *
 * @param ---Slot Type 24---
 * @default
 *
 * @param Slot Type 24 Name
 * @desc This is the name for Slot Type 24.
 * @default Type 24
 *
 * @param Slot Type 24 Color
 * @desc This is the color for Slot Type 24 name.
 * @default 16
 *
 * @param ---Slot Type 25---
 * @default
 *
 * @param Slot Type 25 Name
 * @desc This is the name for Slot Type 25.
 * @default Type 25
 *
 * @param Slot Type 25 Color
 * @desc This is the color for Slot Type 25 name.
 * @default 16
 *
 * @param ---Slot Type 26---
 * @default
 *
 * @param Slot Type 26 Name
 * @desc This is the name for Slot Type 26.
 * @default Type 26
 *
 * @param Slot Type 26 Color
 * @desc This is the color for Slot Type 26 name.
 * @default 16
 *
 * @param ---Slot Type 27---
 * @default
 *
 * @param Slot Type 27 Name
 * @desc This is the name for Slot Type 27.
 * @default Type 27
 *
 * @param Slot Type 27 Color
 * @desc This is the color for Slot Type 27 name.
 * @default 16
 *
 * @param ---Slot Type 28---
 * @default
 *
 * @param Slot Type 28 Name
 * @desc This is the name for Slot Type 28.
 * @default Type 28
 *
 * @param Slot Type 28 Color
 * @desc This is the color for Slot Type 28 name.
 * @default 16
 *
 * @param ---Slot Type 29---
 * @default
 *
 * @param Slot Type 29 Name
 * @desc This is the name for Slot Type 29.
 * @default Type 29
 *
 * @param Slot Type 29 Color
 * @desc This is the color for Slot Type 29 name.
 * @default 16
 *
 * @param ---Slot Type 30---
 * @default
 *
 * @param Slot Type 30 Name
 * @desc This is the name for Slot Type 30.
 * @default Type 30
 *
 * @param Slot Type 30 Color
 * @desc This is the color for Slot Type 30 name.
 * @default 16
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin adds equip skill mechanic to all actors. Each time an actor
 * learn a new skill, that skill will be added to his/her "Skill Pool".
 * That actor can access all the skills in their Skill Pool and equip some of
 * those skills into their "Skill Slots".
 *
 * All actors can only use the skills equipped in their own Skill Slots.
 * Also, only those equipped skills will show up in their batlle skill window.
 *
 * ============================================================================
 * Slot Types
 * ============================================================================
 * Each skill has their own Slot Type that decide the skill placement in the
 * Equip Skill menu. Skill can only be equipped in the actor's Skill Slot with
 * same Slot Type as the skill's Slot Type.
 *
 * There are 31 different Slot Types available in this plugin.
 * It starts from Slot Type 0 to Slot Type 30.
 * Each Slot Type has its own different name and color that you can customize
 * in the plugin configuration.
 *
 * You must assign every skill in your database into a Slot Type.
 * Simply insert this notetag into the skill's notebox.
 *
 * <EQS Type: x>      // This skill's Slot Type will be x.
 *
 * Example:
 * <EQS Type: 2>      // This skill's Slot Type is Slot Type 2.
 * <EQS Type: 30>     // This skill's Slot Type is Slot Type 30.
 *
 * IMPORTANT!
 * Slot Type 0 is a very special type!
 * This is pretty much the default Slot Type for the skill if you do not use
 * the above notetag. Also this Slot Type doesn't have a name.
 * Any skill with Slot Type 0 will be shown differently in the scene compare to
 * Slot Type 1 to 30. The skill will not show its Slot Type name (because it
 * doesn't have any). The skill's name will be adjusted to the very left.
 *
 * ============================================================================
 * Maximum Skill Slots and Maximum Equip Limit
 * ============================================================================
 * All actors now possess 2 new parameters, Maximum Skill Slots and Maximum
 * Equip Limit.
 *
 * Maximum Skill Slots is the maximum amount of Skills that can be equipped by
 * the actor. Each actor can have different Maximum Skill Slots for each Slot
 * Types. Maximum Skill Slots is also level dependent. You can set up Maximum
 * Skill Slots to increase alongside actor's level.
 *
 * To set up actor's Maximum Skill Slots, insert these notetags into actor's
 * respective notebox:
 *
 * <EQS Max Slots x Level y: n>       // Maximum Skill Slots for Slot Type x
 *                                    // during level y is n.
 * <EQS Max Slots x Level y to z: n>  // Maximum Skill Slots for Slot Type x
 *                                    // during level y to z is n.
 *
 * Example:
 * <EQS Max Slots 12 Level 1: 4>        // Maximum Skill Slots for Slot Type 12
 *                                      // during level 1 is 4.
 * <EQS Max Slots 12 Level 2 to 99: 6>  // Maximum Skill Slots for Slot Type 12
 *                                      // during level 2 until level 99 is 6.
 *
 * If you don't use any of those notetags, the actor won't have any Skill Slots
 * available. Therefore, the actor cannot equip any skill.
 *
 * The next parameter is Maximum Equip Limit. Every skill has a special equip
 * cost. In order to equip a skill, the actor's Maximum Equip Limit must be
 * equal or greater than the skill's Equip Cost.
 *
 * The higher actor's Maximum Equip Limit means the actor is able to equip skill
 * with higher Equip Cost.
 *
 * Similar to Maximum Skill Slots, Maximum Equip Limit is also level dependent.
 * You can set up actor's Maximum Equip Limit to increase alongside actor's
 * level.
 *
 * To set up actor's Maximum Equip Limit, insert these notetags into actor's
 * respective notebox:
 *
 * <EQS Max Limit x: n>              // Maximum Equip Limit at level x is n.
 * <EQS Max Limit x to y: n>         // Maximum Equip Limit at level x to
 *                                   // level y is n.
 *
 * Example:
 * <EQS Max Limit 1: 10>             // Maximum Equip Limit at level 1 is 10.
 * <EQS Max Limit 2 to 5: 20>        // Maximum Equip limit at level 2 to
 *                                   // level 5 is 20.
 *
 * If you don't use the above notetags (or there is incomplete data for certain
 * levels), actor's Maximum Equip Limit will use the default value in the
 * "Default Max Limit" plugin configuration.
 *
 * There are 2 other ways to increase the number of Skill Slots and Equip Limit.
 * The first one is by equipping "Slot Plus" and/or "Limit Plus" traits to the
 * actor. "Slot Plus" will increase Maximum Skill Slots while "Limit Plus" will
 * increase Maximum Equip Limit.
 *
 * You can add these 2 new traits to Actors, Classes, Weapons, Armors, and
 * States by using notetags:
 *
 * <EQS Slot Plus x: y>         // Increase Maximum Skill Slots for Slot Type x
 *                              // by y amount.
 * <EQS Limit Plus: x>          // Increase Maximum Equip Limit by x amount.
 *
 * Example:
 * <EQS Slot Plus 3: 1>         // Increase Maximum Skill Slots for Slot Type 3
 *                              // by 1.
 * <EQS Limit Plus: 5>          // Increase Maximum Equip Limit by 5.
 *
 * For example, if you put <EQS Slot Plus 4: 2> to "Short Sword". Any actor that
 * equips the "Short Sword" will receive 2 extra Skill Slots for Slot Type 4.
 * If that actor unequips the sword, he/she will lose the 2 extra Skill Slots
 * again.
 *
 * The other way to increase Maximum Skill Slots and Maximum Equip Limit is by
 * using "Slot Grow" and/or "Limit Grow" effects. Both effects will increase
 * Maximum Skill Slots and Maximum Equip Limit parameters permanently.
 *
 * Both effects can be assigned to Items and Skills by using notetags:
 *
 * <EQS Slot Grow x: y>       // Permanently increase Maximum Skill Slots for
 *                            // Slot Type x of Item/Skill's target by y.
 * <EQS Limit Grow: x>        // Permanently increase Maximum Equip Limit
 *                            // of Item/Skill's target by x.
 *
 * Example:
 * <EQS Slot Grow 0: 1>       // The target of this Item/Skill will get 1 extra
 *                            // slot for Slot Type 0. This effect is permanent.
 * <EQS Limit Grow: 10>       // The target of this Item/Skill will get 10 extra
 *                            // Maximum Equip Limit permanently.
 *
 * You can use this notetag on some rare "one and only" item in the game to
 * increase an actor's Maximum Skill Slots and/or Equip Limit.
 *
 * IMPORTANT!
 * Each skill/item can only have 1 slot grow effect!
 * Currently, you cannot make a skill/item have 2 or more <EQS Slot Grow x: y>
 * notetags.
 *
 * Both above grow effects can be applied by using plugin command too!
 *
 * EQS Actor x Type y Grow n      // Permanently increase Actor x's Maximum
 *                                // Skill Slots for Slot Type y by n.
 * EQS Actor x Limit Grow n       // Permanently Increase Actor x's Maximum
 *                                // Equip Limit by n.
 * Example:
 * EQS Actor 5 Type 3 Grow 2      // Actor 5 will get 2 extra slots for Slot
 *                                // Type 3. This effect is permanent.
 * EQS Actor 4 Limit Grow 5       // Actor 4 will get 5 extra Maximum Equip
 *                                // Limit permanently.
 *
 * Use above plugin commands wisely.
 *
 * ============================================================================
 * How to Equip Skills
 * ============================================================================
 * There are two methods to equip skills. The first one is equipping the skill
 * directly in the Skill menu scene. There are multiple requirements to equip
 * skill:
 *
 * 1. Actor must first learn the skill (NOT "add" the skill directly using
 * trait!). All learned skills will be put inside Actor's Skill Pool for equip
 * access.
 *
 * NOTE: Skills added by trait can be used directly without the need to
 * equip them first.
 *
 * 2. Actor must have at least 1 free Skill Slot available. Each individual
 * skill takes 1 Skill Slot from the actor's Maximum Skill Slots. An actor
 * with 5 Maximum Skill Slots can equip up to 5 different skills.
 *
 * 3. Actor must be able to "pay" the skill's Equip Cost. It means that actor's
 * remaining Equip Limit must be equal or greater than the skill's Equip Cost.
 * Each skill has their own different Equip Cost that you can customize to your
 * liking.
 *
 * 4. No duplicate skills are allowed! An actor cannot equip 2 of the same
 * skills at the same time.
 *
 * The second method to equip skills is by using a plugin command:
 *
 * EQS Actor x Type y Slot z Skill n    // Equip skill with id n to Actor x's
 *                                      // Slot number z of Slot Type y.
 *
 * Example:
 * EQS Actor 6 Type 14 Slot 2 Skill 23  // Actor 6 will equip Skill 23 to his/her
 *                                      // Skill Slot of Slot Type 14 (at second
 *                                      // position).
 *
 * Keep in mind that any skill that you try to equip with this plugin command
 * must follow ALL of the 4 rules above. Otherwise, nothing happens.
 *
 * ============================================================================
 * Equip Cost
 * ============================================================================
 * Each skill can have different (or same) Equip Cost. You can assigned the
 * skill's Equip Cost by adding this notetag into the skill's notebox:
 *
 * <EQS Cost: x>          // Skill Equip Cost will be x.
 *
 * Example:
 * <EQS Cost: 70>         // This skill's Equip Cost is 70.
 *
 * If you don't add this notetag, the Equip Cost will use the default value in
 * "Default Equip Cost" plugin configuration.
 *
 * ============================================================================
 * Equip Skill Exception
 * ============================================================================
 * What if you want a certain skill to be able to be used freely without the
 * need to equip it first? Yes, you can.
 *
 * You can make certain skill to be "immune" to the "must be equip first" rule
 * of this plugin by inserting this notetag into the skill's notebox:
 *
 * <EQS Ignore>      // This skill doesn't need to be equip.
 *
 * That skill can be used immediately after it is learned without the need to
 * equip it. Also, you will not see that skill show up in the Skill Pool window.
 *
 * ============================================================================
 * Hiding Equip Skill Menu
 * ============================================================================
 * If for some reason you want the Equip Skill menu to be hidden for certain
 * actor or class, simply put this notetag into Actors or Classes notebox:
 *
 * <EQS Hide>      // The Equip Skill Menu will be hidden for this actor/class.
 *
 * IMPORTANT!
 * Hiding is NOT the same as disabling/removing/erasing!
 * That actor/class is still "affected" by this plugin's "Equip Skill Rule".
 * So, it's best to combine this notetag with <EQS Ignore> notetag for their
 * skills.
 *
 * ============================================================================
 * Unequipping Skill(s) Using Plugin Commands
 * ============================================================================
 * You can use plugin command to unequip some skills from certain actor.
 * If you want to simply unequip every skills in actor's skill slots, simply
 * use this plugin command:
 *
 * EQS Actor x Unequip All              // Unequip all skills in actor x's
 *                                      // Skill Slots.
 * Example:
 * EQS Actor 6 Unequip All              // Remove all skills in Actor 6's Skill
 *                                      // Slots.
 *
 * On the other hand, if you want to unequip skill from specific slot, you need
 * to use this plugin command instead:
 *
 * EQS Actor x Type y Slot z Unequip    // Unequip skill from Actor x's Slot
 *                                      // number z of Slot Type y.
 *
 * Example:
 * EQS Actor 6 Type 14 Slot 2 Unequip   // Actor 6 will unequip any skill in
 *                                      // his/her second (2nd) Skill Slot of
 *                                      // Slot Type 14.
 *
 * ============================================================================
 * NEW Feature! "EQS Block"
 * ============================================================================
 * Let's say you want prevent the actor to equip skill A whenever they have
 * skill B already equipped inside their Skill Slots.
 *
 * For example skill "Fire" (ID: 10) and skill "Blizzard" (ID: 20).
 * Let's say you don't want the actor to be able to equip both of these at the
 * same time.
 *
 * All you need to do is simply insert this notetag inside both "Fire" and
 * "Blizzard" noteboxes:
 *
 * <EQS Block: x>               // Actors cannot equip skill x whenever they
 *                              // have this skill already equipped.
 *
 * In this case, you put <EQS Block: 20> inside "Fire" notebox. And then, you
 * put <EQS Block: 10> inside "Blizzard" notebox.
 *
 * If you want to block multiple skills at the same time, simply use this
 * notetag instead:
 *
 * <EQS Block: x, y, z>         // Actors cannot equip skills x, y, z whenever
 *                              // they have this skill already equipped.
 *
 * Example:
 * <EQS Block: 5, 7, 8, 36, 90> // Actors cannot equip skills 5, 7, 8, 36, 90
 *                              // whenever they have this skill already
 *                              // equipped in one of their Skill Slots.
 *
 * ============================================================================
 * NEW Feature! "EQS Class Restriction"
 * ============================================================================
 * Do you want to limit which skills can be equipped based on class/subclasses?
 * With "EQS Class Restriction" feature, you can add extra layer of restriction
 * on actor's skill equip.
 *
 * First, you need to turn on the plugin parameter "Apply EQS Class Restriction"
 * before anything else. "EQS Class Restriction" cannot co-exist with parameter
 * "Party Based Skill Pool"! If you turn on "Party Based Skill Pool" parameter,
 * you cannot use "EQS Class Restriction" feature at all.
 *
 * Next, you need to define the list of Legal Skills for each available class.
 * Legal Skills are the only skills that can be equipped at any given time
 * when particular class is active.
 *
 * If you use YEP_X_Subclass plugin, Legal Skills from actor's main class will
 * be "combined" with the actor's subclass.
 *
 * Only Legal Skills will show up on the Skill Pool Window. Any "illegal" skills
 * will simply be hidden.
 *
 * Whenever the actor changes their main class or subclass, the actor will
 * automatically unequip any "illegal" skills from their Skill Slots.
 *
 * To define class/subclass' Legal Skills, insert this notetag into the classes'
 * notebox:
 *
 * <EQS Skills: x, y, z>            // This class's Legal Skills are x, y, z.
 *
 * Example:
 * <EQS Skills: 8, 35, 52, 80, 99>  // The Legal Skills for this class/subclass
 *                                  // are skills 8, 35, 52, 80, 99.
 *
 * What if you want some skills to be always "legal" for all classes/subclasses?
 * Just insert the skill id(s) into "Legal Skill List" parameter in the plugin
 * configuration. Any skills inside that parameter will not be affected by
 * "EQS Class Restriction".
 *
 * ============================================================================
 * Notetags and Plugin Commands List
 * ============================================================================
 * Actors Notetags:
 * <EQS Max Slots x Level y: n>
 * <EQS Max Slots x Level y to z: n>
 * <EQS Max Limit x: n>
 * <EQS Max Limit x to y: n>
 *
 * Actors, Classes, Weapons, Armors, and States Notetags:
 * <EQS Slot Plus x: y>
 * <EQS Limit Plus: x>
 *
 * Skills Notetags:
 * <EQS Cost: x>
 * <EQS Type: x>
 * <EQS Ignore>
 * <EQS Block: x>
 * <EQS Block: x, y, z>
 *
 * Items and Skills Notetags:
 * <EQS Slot Grow x: y>
 * <EQS Limit Grow: x>
 *
 * Actors and Classes Notetag:
 * <EQS Hide>
 *
 * Classes Notetag:
 * <EQS Skills: x, y, z>
 *
 * Plugin Commands:
 * EQS Actor x Type y Slot z Skill n
 * EQS Actor x Type y Slot z Unequip
 * EQS Actor x Unequip All
 * EQS Actor x Type y Grow n
 * EQS Actor x Limit Grow n
 * EQS Open                    // Open "Equip Skill" scene (Main Menu version).
 *
 * SPECIAL Plugin Command!
 *
 * EQS Switch x Actor y Skill z
 * "The engine will check Actor y's Skill Slots for any skill z. If skill z is
 * equipped, in-game switch with ID x will be ON, otherwise the switch will be
 * OFF instead. This is useful if you want to check whether actor has certain
 * skill equipped or not."
 *
 * ============================================================================
 * Compatibility
 * ============================================================================
 * If you use Moogle_X_EquipSkillSystem_JpAddOn plugin, position this plugin
 * above it.
 * If you use Moogle_X_PassiveSkill plugin, position this plugin above it.
 * If you use YEP_AutoPassiveStates, position this plugin below it.
 * If you use Moogle_X_EquipmentLearning, position this plugin above it.
 * If you use YEP_ClassChangeCore or YEP_X_Subclass, position this plugin below
 * those plugins.
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
 * Version 1.46:
 * - Added waynee95's bug fix for crashing during skill equip.
 *
 * Version 1.45:
 * - Added optional "EQS Class Restriction" feature.
 *
 * Version 1.44:
 * - Added "Party Based Skill Pool" parameter.
 *
 * Version 1.43:
 * - Added "blocked skills" feature.
 * - Added new plugin commands for unequipping skill(s).
 *
 * Version 1.42:
 * - Added compatibility with Moogle_X_EquipmentLearning.
 * - Fixed <EQS Ignore> bug regarding YEP_AutoPassiveStates compatibility.
 * - Fixed bug regarding skill type window not refreshing after equipping skill.
 * - Added standalone EQS scene just for equipping skill.
 * - Added option to change equip skill sound effect.
 *
 * Version 1.41:
 * - Added compatibility with YEP_AutoPassiveStates v1.05a.
 *
 * Version 1.4:
 * - Added equip slot types functionality.
 * - Added option to hide Equip Skill menu for certain actor/class.
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

Moogle_X.EQS.parameters = PluginManager.parameters('Moogle_X_EquipSkillSystem');
Moogle_X.EQS.defMaxLimit = Number(Moogle_X.EQS.parameters['Default Max Limit'] || 10);
Moogle_X.EQS.defEquipCost = Number(Moogle_X.EQS.parameters['Default Equip Cost'] || 0);
Moogle_X.EQS.eqsVocab = String(Moogle_X.EQS.parameters['Equip Skill Command Name'] || 'Equip');
Moogle_X.EQS.emptyText = String(Moogle_X.EQS.parameters['Empty Slot Text'] || '');
Moogle_X.EQS.emptyIcon = Number(Moogle_X.EQS.parameters['Empty Icon Index'] || 0);
Moogle_X.EQS.removeText = String(Moogle_X.EQS.parameters['Remove Slot Text'] || '');
Moogle_X.EQS.removeIcon = Number(Moogle_X.EQS.parameters['Remove Icon Index'] || 0);
Moogle_X.EQS.limitText = String(Moogle_X.EQS.parameters['Equip Limit Text'] || '');
Moogle_X.EQS.limitColor = Number(Moogle_X.EQS.parameters['Equip Limit Text Color'] || 0);
Moogle_X.EQS.limitNumberColor = Number(Moogle_X.EQS.parameters['Equip Limit Number Color'] || 0);
Moogle_X.EQS.poolText = String(Moogle_X.EQS.parameters['Skill Pool Text'] || '');
Moogle_X.EQS.poolColor = Number(Moogle_X.EQS.parameters['Skill Pool Text Color'] || 0);
Moogle_X.EQS.eqsCostText = String(Moogle_X.EQS.parameters['Equip Cost Text'] || '');
Moogle_X.EQS.eqsCostColor = Number(Moogle_X.EQS.parameters['Equip Cost Text Color'] || 0);
Moogle_X.EQS.eqsCostNumberColor = Number(Moogle_X.EQS.parameters['Equip Cost Number Color'] || 0);
Moogle_X.EQS.slotTypeRectWidth = Number(Moogle_X.EQS.parameters['Slot Type Name Rectangle Width'] || 120);
Moogle_X.EQS.showEqsMenuSkill = Number(Moogle_X.EQS.parameters['Show in Skill Menu']) != 0;
Moogle_X.EQS.eqsMenuSwitchSkill = Number(Moogle_X.EQS.parameters['Skill Menu Switch ID'] || 0);
Moogle_X.EQS.showEqsMenu = Number(Moogle_X.EQS.parameters['Show in Main Menu']) != 0;
Moogle_X.EQS.eqsTitle = String(Moogle_X.EQS.parameters['Menu Vocab'] || '');
Moogle_X.EQS.eqsMenuSwitch = Number(Moogle_X.EQS.parameters['Main Menu Switch ID'] || 0);
Moogle_X.EQS.eqSeName = String(Moogle_X.EQS.parameters['Equip SE Name'] || 'Equip1');
Moogle_X.EQS.eqSeVolume = Number(Moogle_X.EQS.parameters['Equip SE Volume'] || 0);
Moogle_X.EQS.eqSePitch = Number(Moogle_X.EQS.parameters['Equip SE Pitch'] || 0);
Moogle_X.EQS.eqSePan = Number(Moogle_X.EQS.parameters['Equip SE Pan'] || 0);
Moogle_X.EQS.partySkillPool = Number(Moogle_X.EQS.parameters['Party Based Skill Pool']) != 0;
Moogle_X.EQS.classRestrict = Number(Moogle_X.EQS.parameters['Apply EQS Class Restriction']) != 0;
Moogle_X.EQS.legalSkills = String(Moogle_X.EQS.parameters['Legal Skill List'] || 0);

if (Moogle_X.EQS.partySkillPool) {
    // "Party Based Skill Pool" cannot co-exist with "EQS Class Restriction".
    Moogle_X.EQS.classRestrict = false;
}

var legalSkillIds = Moogle_X.EQS.legalSkills.split(' ');
Moogle_X.EQS.legalSkills = [];
for (var i = 0; i < legalSkillIds.length; i++) {
    Moogle_X.EQS.legalSkills.push(Number(legalSkillIds[i]));
}

// Slot Types variables.

Moogle_X.EQS.slotTypes = [];
Moogle_X.EQS.slotTypes.push(null); // Slot Type 0

// Slot Type 1
var paramType1Name = String(Moogle_X.EQS.parameters['Slot Type 1 Name'] || '');
var paramType1Color = Number(Moogle_X.EQS.parameters['Slot Type 1 Color'] || 0);
var paramType1 = {"name":paramType1Name,"color":paramType1Color};
Moogle_X.EQS.slotTypes.push(paramType1);

// Slot Type 2
var paramType2Name = String(Moogle_X.EQS.parameters['Slot Type 2 Name'] || '');
var paramType2Color = Number(Moogle_X.EQS.parameters['Slot Type 2 Color'] || 0);
var paramType2 = {"name":paramType2Name,"color":paramType2Color};
Moogle_X.EQS.slotTypes.push(paramType2);

// Slot Type 3
var paramType3Name = String(Moogle_X.EQS.parameters['Slot Type 3 Name'] || '');
var paramType3Color = Number(Moogle_X.EQS.parameters['Slot Type 3 Color'] || 0);
var paramType3 = {"name":paramType3Name,"color":paramType3Color};
Moogle_X.EQS.slotTypes.push(paramType3);

// Slot Type 4
var paramType4Name = String(Moogle_X.EQS.parameters['Slot Type 4 Name'] || '');
var paramType4Color = Number(Moogle_X.EQS.parameters['Slot Type 4 Color'] || 0);
var paramType4 = {"name":paramType4Name,"color":paramType4Color};
Moogle_X.EQS.slotTypes.push(paramType4);

// Slot Type 5
var paramType5Name = String(Moogle_X.EQS.parameters['Slot Type 5 Name'] || '');
var paramType5Color = Number(Moogle_X.EQS.parameters['Slot Type 5 Color'] || 0);
var paramType5 = {"name":paramType5Name,"color":paramType5Color};
Moogle_X.EQS.slotTypes.push(paramType5);

// Slot Type 6
var paramType6Name = String(Moogle_X.EQS.parameters['Slot Type 6 Name'] || '');
var paramType6Color = Number(Moogle_X.EQS.parameters['Slot Type 6 Color'] || 0);
var paramType6 = {"name":paramType6Name,"color":paramType6Color};
Moogle_X.EQS.slotTypes.push(paramType6);

// Slot Type 7
var paramType7Name = String(Moogle_X.EQS.parameters['Slot Type 7 Name'] || '');
var paramType7Color = Number(Moogle_X.EQS.parameters['Slot Type 7 Color'] || 0);
var paramType7 = {"name":paramType7Name,"color":paramType7Color};
Moogle_X.EQS.slotTypes.push(paramType7);

// Slot Type 8
var paramType8Name = String(Moogle_X.EQS.parameters['Slot Type 8 Name'] || '');
var paramType8Color = Number(Moogle_X.EQS.parameters['Slot Type 8 Color'] || 0);
var paramType8 = {"name":paramType8Name,"color":paramType8Color};
Moogle_X.EQS.slotTypes.push(paramType8);

// Slot Type 9
var paramType9Name = String(Moogle_X.EQS.parameters['Slot Type 9 Name'] || '');
var paramType9Color = Number(Moogle_X.EQS.parameters['Slot Type 9 Color'] || 0);
var paramType9 = {"name":paramType9Name,"color":paramType9Color};
Moogle_X.EQS.slotTypes.push(paramType9);

// Slot Type 10
var paramType10Name = String(Moogle_X.EQS.parameters['Slot Type 10 Name'] || '');
var paramType10Color = Number(Moogle_X.EQS.parameters['Slot Type 10 Color'] || 0);
var paramType10 = {"name":paramType10Name,"color":paramType10Color};
Moogle_X.EQS.slotTypes.push(paramType10);

// Slot Type 11
var paramType11Name = String(Moogle_X.EQS.parameters['Slot Type 11 Name'] || '');
var paramType11Color = Number(Moogle_X.EQS.parameters['Slot Type 11 Color'] || 0);
var paramType11 = {"name":paramType11Name,"color":paramType11Color};
Moogle_X.EQS.slotTypes.push(paramType11);

// Slot Type 12
var paramType12Name = String(Moogle_X.EQS.parameters['Slot Type 12 Name'] || '');
var paramType12Color = Number(Moogle_X.EQS.parameters['Slot Type 12 Color'] || 0);
var paramType12 = {"name":paramType12Name,"color":paramType12Color};
Moogle_X.EQS.slotTypes.push(paramType12);

// Slot Type 13
var paramType13Name = String(Moogle_X.EQS.parameters['Slot Type 13 Name'] || '');
var paramType13Color = Number(Moogle_X.EQS.parameters['Slot Type 13 Color'] || 0);
var paramType13 = {"name":paramType13Name,"color":paramType13Color};
Moogle_X.EQS.slotTypes.push(paramType13);

// Slot Type 14
var paramType14Name = String(Moogle_X.EQS.parameters['Slot Type 14 Name'] || '');
var paramType14Color = Number(Moogle_X.EQS.parameters['Slot Type 14 Color'] || 0);
var paramType14 = {"name":paramType14Name,"color":paramType14Color};
Moogle_X.EQS.slotTypes.push(paramType14);

// Slot Type 15
var paramType15Name = String(Moogle_X.EQS.parameters['Slot Type 15 Name'] || '');
var paramType15Color = Number(Moogle_X.EQS.parameters['Slot Type 15 Color'] || 0);
var paramType15 = {"name":paramType15Name,"color":paramType15Color};
Moogle_X.EQS.slotTypes.push(paramType15);

// Slot Type 16
var paramType16Name = String(Moogle_X.EQS.parameters['Slot Type 16 Name'] || '');
var paramType16Color = Number(Moogle_X.EQS.parameters['Slot Type 16 Color'] || 0);
var paramType16 = {"name":paramType16Name,"color":paramType16Color};
Moogle_X.EQS.slotTypes.push(paramType16);

// Slot Type 17
var paramType17Name = String(Moogle_X.EQS.parameters['Slot Type 17 Name'] || '');
var paramType17Color = Number(Moogle_X.EQS.parameters['Slot Type 17 Color'] || 0);
var paramType17 = {"name":paramType17Name,"color":paramType17Color};
Moogle_X.EQS.slotTypes.push(paramType17);

// Slot Type 18
var paramType18Name = String(Moogle_X.EQS.parameters['Slot Type 18 Name'] || '');
var paramType18Color = Number(Moogle_X.EQS.parameters['Slot Type 18 Color'] || 0);
var paramType18 = {"name":paramType18Name,"color":paramType18Color};
Moogle_X.EQS.slotTypes.push(paramType18);

// Slot Type 19
var paramType19Name = String(Moogle_X.EQS.parameters['Slot Type 19 Name'] || '');
var paramType19Color = Number(Moogle_X.EQS.parameters['Slot Type 19 Color'] || 0);
var paramType19 = {"name":paramType19Name,"color":paramType19Color};
Moogle_X.EQS.slotTypes.push(paramType19);

// Slot Type 20
var paramType20Name = String(Moogle_X.EQS.parameters['Slot Type 20 Name'] || '');
var paramType20Color = Number(Moogle_X.EQS.parameters['Slot Type 20 Color'] || 0);
var paramType20 = {"name":paramType20Name,"color":paramType20Color};
Moogle_X.EQS.slotTypes.push(paramType20);

// Slot Type 21
var paramType21Name = String(Moogle_X.EQS.parameters['Slot Type 21 Name'] || '');
var paramType21Color = Number(Moogle_X.EQS.parameters['Slot Type 21 Color'] || 0);
var paramType21 = {"name":paramType21Name,"color":paramType21Color};
Moogle_X.EQS.slotTypes.push(paramType21);

// Slot Type 22
var paramType22Name = String(Moogle_X.EQS.parameters['Slot Type 22 Name'] || '');
var paramType22Color = Number(Moogle_X.EQS.parameters['Slot Type 22 Color'] || 0);
var paramType22 = {"name":paramType22Name,"color":paramType22Color};
Moogle_X.EQS.slotTypes.push(paramType22);

// Slot Type 23
var paramType23Name = String(Moogle_X.EQS.parameters['Slot Type 23 Name'] || '');
var paramType23Color = Number(Moogle_X.EQS.parameters['Slot Type 23 Color'] || 0);
var paramType23 = {"name":paramType23Name,"color":paramType23Color};
Moogle_X.EQS.slotTypes.push(paramType23);

// Slot Type 24
var paramType24Name = String(Moogle_X.EQS.parameters['Slot Type 24 Name'] || '');
var paramType24Color = Number(Moogle_X.EQS.parameters['Slot Type 24 Color'] || 0);
var paramType24 = {"name":paramType24Name,"color":paramType24Color};
Moogle_X.EQS.slotTypes.push(paramType24);

// Slot Type 25
var paramType25Name = String(Moogle_X.EQS.parameters['Slot Type 25 Name'] || '');
var paramType25Color = Number(Moogle_X.EQS.parameters['Slot Type 25 Color'] || 0);
var paramType25 = {"name":paramType25Name,"color":paramType25Color};
Moogle_X.EQS.slotTypes.push(paramType25);

// Slot Type 26
var paramType26Name = String(Moogle_X.EQS.parameters['Slot Type 26 Name'] || '');
var paramType26Color = Number(Moogle_X.EQS.parameters['Slot Type 26 Color'] || 0);
var paramType26 = {"name":paramType26Name,"color":paramType26Color};
Moogle_X.EQS.slotTypes.push(paramType26);

// Slot Type 27
var paramType27Name = String(Moogle_X.EQS.parameters['Slot Type 27 Name'] || '');
var paramType27Color = Number(Moogle_X.EQS.parameters['Slot Type 27 Color'] || 0);
var paramType27 = {"name":paramType27Name,"color":paramType27Color};
Moogle_X.EQS.slotTypes.push(paramType27);

// Slot Type 28
var paramType28Name = String(Moogle_X.EQS.parameters['Slot Type 28 Name'] || '');
var paramType28Color = Number(Moogle_X.EQS.parameters['Slot Type 28 Color'] || 0);
var paramType28 = {"name":paramType28Name,"color":paramType28Color};
Moogle_X.EQS.slotTypes.push(paramType28);

// Slot Type 29
var paramType29Name = String(Moogle_X.EQS.parameters['Slot Type 29 Name'] || '');
var paramType29Color = Number(Moogle_X.EQS.parameters['Slot Type 29 Color'] || 0);
var paramType29 = {"name":paramType29Name,"color":paramType29Color};
Moogle_X.EQS.slotTypes.push(paramType29);

// Slot Type 30
var paramType30Name = String(Moogle_X.EQS.parameters['Slot Type 30 Name'] || '');
var paramType30Color = Number(Moogle_X.EQS.parameters['Slot Type 30 Color'] || 0);
var paramType30 = {"name":paramType30Name,"color":paramType30Color};
Moogle_X.EQS.slotTypes.push(paramType30);

//=============================================================================
// Constant Declaration
//=============================================================================
Game_BattlerBase.TRAIT_EQS_SLOT_PLUS = 112; // New trait code.
Game_BattlerBase.TRAIT_EQS_LIMIT_PLUS = 113; // New trait code.
Game_BattlerBase.MAX_EQS_SLOT_TYPES = 30;  // Maximum number of equip slot types.

//=============================================================================
// DataManager
//=============================================================================

Moogle_X.EQS.DatabaseLoaded = false;
Moogle_X.EQS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.EQS.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Moogle_X.EQS.DatabaseLoaded) {
        DataManager.readNotetags_EQS1($dataActors);
        DataManager.readNotetags_EQS2($dataActors);
        DataManager.readNotetags_EQS2($dataClasses);
        DataManager.readNotetags_EQS2($dataWeapons);
        DataManager.readNotetags_EQS2($dataArmors);
        DataManager.readNotetags_EQS2($dataStates);
        DataManager.readNotetags_EQS3($dataSkills);
        DataManager.readNotetags_EQS4($dataItems);
        DataManager.readNotetags_EQS4($dataSkills);
        DataManager.readNotetags_EQS5($dataActors);
        DataManager.readNotetags_EQS5($dataClasses);
        DataManager.readNotetags_EQS6($dataClasses);
        Moogle_X.EQS.DatabaseLoaded = true;
    }
		return true;
};

DataManager.readNotetags_EQS1 = function(group) {
    var note1 = /<(?:EQS MAX SLOTS)[ ](\d+)[ ](?:LEVEL)[ ](\d+):[ ](\d+)>/i;
    var note2 = /<(?:EQS MAX SLOTS)[ ](\d+)[ ](?:LEVEL)[ ](\d+)[ ]to[ ](\d+):[ ](\d+)>/i;
	  var note3 = /<(?:EQS MAX LIMIT)[ ](\d+):[ ](\d+)>/i;
	  var note4 = /<(?:EQS MAX LIMIT)[ ](\d+)[ ]to[ ](\d+):[ ](\d+)>/i;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.eqsMaxSlots = {};
        obj.eqsMaxLimit = {};

        // Initialize both max slots and max limit with default value.
        var maxLevel = obj.maxLevel;
        for (var s = 0; s <= Game_BattlerBase.MAX_EQS_SLOT_TYPES; s++) {
            var newSlotData = {};
            for (var z = 0; z <= maxLevel; z++) {
                newSlotData[z] = 0;
            }
            obj.eqsMaxSlots[s] = newSlotData;
        }

        for (var m = 0; m <= maxLevel; m++) {
            obj.eqsMaxLimit[m] = Moogle_X.EQS.defMaxLimit;
        }

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note1)) {
                var type  = Number(RegExp.$1);
                var level = Number(RegExp.$2);
                var slots = Number(RegExp.$3);
                if (type <= Game_BattlerBase.MAX_EQS_SLOT_TYPES) {
                    obj.eqsMaxSlots[type][level] = slots;
                }

            } else if (line.match(note2)) {
                var type2 = Number(RegExp.$1);
                var levelBegin = Number(RegExp.$2);
                var levelLast = Number(RegExp.$3);
                var slots2 = Number(RegExp.$4);
                if (type2 <= Game_BattlerBase.MAX_EQS_SLOT_TYPES) {
                    for (var x = levelBegin; x <= levelLast; x++) {
                        obj.eqsMaxSlots[type2][x] = slots2;
                    }
                }

            } else if (line.match(note3)) {
                var level2 = Number(RegExp.$1);
                var limit = Number(RegExp.$2);
                obj.eqsMaxLimit[level2] = limit;

            } else if (line.match(note4)) {
                var levelBegin2 = Number(RegExp.$1);
                var levelLast2 = Number(RegExp.$2);
                var limit2 = Number(RegExp.$3);
                for (var y = levelBegin2; y <= levelLast2; y++) {
                    obj.eqsMaxLimit[y] = limit2;
                }
            }
		    }
	  }
};

DataManager.readNotetags_EQS2 = function(group) {
	  var note1 = /<(?:EQS SLOT PLUS)[ ](\d+):[ ](\d+)>/i;
	  var note2 = /<(?:EQS LIMIT PLUS):[ ](\d+)>/i;

    var codeSlot = Game_BattlerBase.TRAIT_EQS_SLOT_PLUS;
    var codeLimit = Game_BattlerBase.TRAIT_EQS_LIMIT_PLUS;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note1)) {
                var slotType = Number(RegExp.$1);
                var slotValue = Number(RegExp.$2);
                var slotTrait = [{"code":codeSlot,"dataId":slotType,"value":slotValue}];
                obj.traits = obj.traits.concat(slotTrait);

            } else if (line.match(note2)) {
                var limitValue = Number(RegExp.$1);
                var limitTrait = [{"code":codeLimit,"dataId":0,"value":limitValue}];
                obj.traits = obj.traits.concat(limitTrait);
            }

		    }
	  }
};

DataManager.readNotetags_EQS3 = function(group) {
    var note1 = /<(?:EQS COST):[ ](\d+)>/i;
    var note2 = /<(?:EQS IGNORE)>/i;
    var note3 = /<(?:EQS TYPE):[ ](\d+)>/i;
    var note4 = /<(?:EQS BLOCK):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.eqsCost = Moogle_X.EQS.defEquipCost;
        obj.isEqsIgnore = false;
        obj.eqsType = 0;
        obj.eqsBlock = [];

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note1)) {
                var cost = Number(RegExp.$1);
                obj.eqsCost = cost;
            } else if (line.match(note2)) {
                obj.isEqsIgnore = true;
            } else if (line.match(note3)) {
                var type = Number(RegExp.$1);
                obj.eqsType = type;
            } else if (line.match(note4)) {
                var block = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                obj.eqsBlock = block;
            }
		    }
	  }
};

DataManager.readNotetags_EQS4 = function(group) {
    var note1 = /<(?:EQS SLOT GROW)[ ](\d+):[ ](\d+)>/i;
	  var note2 = /<(?:EQS LIMIT GROW):[ ](\d+)>/i;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.eqsSlotGrow = {"typeId":0,"grow":0};
        obj.eqsLimitGrow = 0;

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note1)) {
                var slotType = Number(RegExp.$1);
                var slotIncrease = Number(RegExp.$2);
                obj.eqsSlotGrow["typeId"] = slotType;
                obj.eqsSlotGrow["grow"] = slotIncrease;

            } else if (line.match(note2)) {
                var limitIncrease = Number(RegExp.$1);
                obj.eqsLimitGrow = limitIncrease;
            }

		    }
	  }
};

DataManager.readNotetags_EQS5 = function(group) {
    var note = /<(?:EQS HIDE)>/i;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.eqsHide = false;

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note)) {
                obj.eqsHide = true;
            }
		    }
	  }
};

DataManager.readNotetags_EQS6 = function(group) {
    var note = /<(?:EQS SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;

	  for (var n = 1; n < group.length; n++) {
		    var obj = group[n];
		    var notedata = obj.note.split(/[\r\n]+/);

        obj.eqsClassSkills = [];

		    for (var i = 0; i < notedata.length; i++) {
			      var line = notedata[i];
			      if (line.match(note)) {
                var skills = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                obj.eqsClassSkills = skills;
            }
		    }
	  }
};


//=============================================================================
// Game_Actor
//=============================================================================

Moogle_X.EQS.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    Moogle_X.EQS.Game_Actor_initMembers.call(this);
    this._eqsMaxSlots = {};
    this._eqsMaxLimit = 0;
    this._eqsSlots = {};
    this._eqsAddedSlots = {};
    for (var i = 0; i <= Game_BattlerBase.MAX_EQS_SLOT_TYPES; i++) {
        this._eqsAddedSlots[i] = 0;
    }
    this._eqsAddedLimit = 0;
};

Moogle_X.EQS.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Moogle_X.EQS.Game_Actor_setup.call(this, actorId);
    this.updateEqsParams();
    this.clearEqsSlots();
};

Game_Actor.prototype.updateEqsParams = function() {
    this._eqsMaxSlots = {};
    for (var i = 0; i <= Game_BattlerBase.MAX_EQS_SLOT_TYPES; i++) {
        this._eqsMaxSlots[i] = this.totalEqsSlots(i);
    }
    this._eqsMaxLimit = this.totalEqsLimit();
};

Game_Actor.prototype.totalEqsSlots = function(typeId) {
    var baseValue = this.baseEqsSlots(typeId);
    var plusValue = this.eqsSlotsPlus(typeId);
    return baseValue + plusValue + this._eqsAddedSlots[typeId];
};

Game_Actor.prototype.totalEqsLimit = function() {
    var baseValue = this.baseEqsLimit();
    var plusValue = this.eqsLimitPlus();
    return baseValue + plusValue + this._eqsAddedLimit;
};

Game_Actor.prototype.baseEqsSlots = function(typeId) {
    return this.actor().eqsMaxSlots[typeId][this._level];
};

Game_Actor.prototype.baseEqsLimit = function() {
    return this.actor().eqsMaxLimit[this._level];
};

Game_Actor.prototype.eqsSlotsPlus = function(typeId) {
    return Math.max(this.traitsSum(Game_BattlerBase.TRAIT_EQS_SLOT_PLUS, typeId), 0);
};

Game_Actor.prototype.eqsLimitPlus = function() {
    return Math.max(this.traitsSumAll(Game_BattlerBase.TRAIT_EQS_LIMIT_PLUS), 0);
};

Game_Actor.prototype.clearEqsSlots = function() {
    this._eqsSlots = {};

    for (var n = 0; n <= Game_BattlerBase.MAX_EQS_SLOT_TYPES; n++) {
        this._eqsSlots[n] = {};
        for (var i = 1; i <= this._eqsMaxSlots[n]; i++) {
            this._eqsSlots[n][i] = 0;
        }
    }

};

// The most important function of this plugin. I'm overwriting this.
Game_Actor.prototype.skills = function() {
    var list = this.getEqsArray();
    list = list.filter(function(id) {
        return id !== 0;
    });

    list = list.concat(this.addedSkills());

    var list2 = [];
    list.forEach(function(id) {
        if (!list2.contains($dataSkills[id])) {
            list2.push($dataSkills[id]);
        }
    });

    this._skills.forEach(function(id) {
        if (!list2.contains($dataSkills[id]) && $dataSkills[id].isEqsIgnore) {
            list2.push($dataSkills[id]);
        }
    });
    return list2;
};

// Convert this._eqsSlots into array for easier data manipulation.
Game_Actor.prototype.getEqsArray = function() {
    var list = [];

    for (var n = 0; n <= Game_BattlerBase.MAX_EQS_SLOT_TYPES; n++) {
        for (var i = 1; i <= this._eqsMaxSlots[n]; i++) {
            if (this._eqsSlots[n] !== undefined) {
                if (this._eqsSlots[n][i] !== undefined) {
                    list.push(this._eqsSlots[n][i] || 0);
                }
            }
        }
    }

    return list;
};

Game_Actor.prototype.getSkillPool = function(typeId) {
    var array = this._skills;
    array = array.map(function(skillId) {
        return $dataSkills[skillId];
    });

    // Slot Type check addition.
    array = array.filter(function(skill) {
        return skill.eqsType === typeId;
    });

    array = array.filter(function(skill) {
        return skill.isEqsIgnore === false;
    });

    if (Moogle_X.EQS.classRestrict) {
        var legalSkills = this.eqsGetLegalSkills();
        array = array.filter(function(skill) {
            return legalSkills.contains(skill.id);
        });
    }

    return array;
};

Game_Actor.prototype.eqsGetLegalSkills = function() {
    var legalSkills = [];

    var classSkills = this.currentClass().eqsClassSkills;
    if (classSkills) {
        legalSkills = classSkills;
    }

    if (Imported.YEP_X_Subclass) {
        if (this.subclass()) {
            var subSkills = this.subclass().eqsClassSkills;
            if (subSkills) {
                legalSkills = legalSkills.concat(subSkills);
            }
        }
    }

    var skills = [];

    legalSkills = legalSkills.concat(Moogle_X.EQS.legalSkills);
    legalSkills.forEach(function(skillId) {
        if (!skills.contains(skillId)) {
            skills.push(skillId);
        }
    });

    return skills;
};

Game_Actor.prototype.eqsEquipSkill = function(skill, typeId, slotId) {
    if (!this.canEquipSkill(skill)) return;
    if (this._eqsSlots[typeId][slotId] !== undefined) {
        if (skill === null) {
            this._eqsSlots[typeId][slotId] = 0;
        } else {
            this._eqsSlots[typeId][slotId] = skill.id;
        }
    }
    this.refresh();
};

// Plugin Command "EQS Actor x Type y Slot z Skill n"
Game_Actor.prototype.eqsEquipSkillPluginCommand = function(skill, typeId, slotId) {
    if (!this.canEquipSkill(skill) || this.eqsIsBlocked(skill)) return;
    if (this._eqsSlots[typeId][slotId] !== undefined) {
        if (skill === null) {
            this._eqsSlots[typeId][slotId] = 0;
        } else {
            this._eqsSlots[typeId][slotId] = skill.id;
        }
    }
    this.refresh();
};

Game_Actor.prototype.canEquipSkill = function(skill) {
    if (skill === null) {
        return true;
    }
    if (this.canPayEqsCost(skill) && !this.eqsSkillEquipped(skill) &&
        this.eqsIsLearnedSkill(skill.id) && !skill.isEqsIgnore &&
        this.eqsIsLegalSkill(skill)) {
        return true;
    } else {
        return false;
    }
};

Game_Actor.prototype.eqsIsLegalSkill = function(skill) {
    if (!Moogle_X.EQS.classRestrict) return true;
    var legalSkills = this.eqsGetLegalSkills();
    if (legalSkills.contains(skill.id)) {
        return true;
    } else {
        return false;
    }
};

// A simple method made for other plugins compatibility.
Game_Actor.prototype.eqsIsLearnedSkill = function(skillId) {
    // Party based skill pool.
    if (Moogle_X.EQS.partySkillPool) {
        var list = [];
        for (var i = 0; i < $gameParty.allMembers().length; i++) {
            var skillPool = $gameParty.allMembers()[i]._skills;
            list = list.concat(skillPool);
        }
        return list.contains(skillId);

    } else {
        // Default skill pool.
        return this._skills.contains(skillId);
    }
};

Game_Actor.prototype.canPayEqsCost = function(skill) {
    if (skill === undefined) return false; // A super important line!
    var cost = skill.eqsCost || 0;
    var leftover = this._eqsMaxLimit - this.currentEqsLimit();
    return leftover >= cost ? true : false;
};

Game_Actor.prototype.currentEqsLimit = function() {
    var list = this.getEqsArray();
    var total = 0;
    list.forEach(function(id) {
        if (id !== 0) {
            total += $dataSkills[id].eqsCost;
        }
    });
    return total;
};

Game_Actor.prototype.eqsSkillEquipped = function(skill) {
    if (skill === null) {
        return false;
    }

    var list = [];

    // Party based skill pool.
    if (Moogle_X.EQS.partySkillPool) {
        for (var i = 0; i < $gameParty.allMembers().length; i++) {
            var skillPool = $gameParty.allMembers()[i].getEqsArray();
            list = list.concat(skillPool);
        }

    } else {
        // Default skill pool.
        list = this.getEqsArray();
    }

    return list.contains(skill.id) ? true : false;
};

Moogle_X.EQS.Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    this.eqsRefresh();
    Moogle_X.EQS.Game_Actor_refresh.call(this);
};

Game_Actor.prototype.eqsRefresh = function() {
    var oldSlots = this._eqsSlots;
    this.updateEqsParams();
    this.clearEqsSlots();
    this.eqsReequip(oldSlots);
};

Game_Actor.prototype.eqsReequip = function(oldSlots) {
    if (Object.keys(oldSlots).length === 0) return; // Bug fix during actor setup.
    for (var n = 0; n <= Game_BattlerBase.MAX_EQS_SLOT_TYPES; n++) {
        for (var i = 1; i <= this._eqsMaxSlots[n]; i++) {
            var skillId = oldSlots[n][i] || 0;
            var skill = $dataSkills[skillId];

            if (this.canEquipSkill(skill)) {
                this._eqsSlots[n][i] = skillId;
            } else {
                this._eqsSlots[n][i] = 0; // Could be unnecessary too.
            }
        }
    }
};

Moogle_X.EQS.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    Moogle_X.EQS.Game_Actor_levelUp.call(this);
    this.eqsRefresh(); // Could be unnecessary. Better be safe than sorry.
};

Moogle_X.EQS.Game_Actor_levelDown = Game_Actor.prototype.levelDown;
Game_Actor.prototype.levelDown = function() {
    Moogle_X.EQS.Game_Actor_levelDown.call(this);
    this.eqsRefresh(); // Could be unnecessary. Better be safe than sorry.
};

Game_Actor.prototype.addEqsSlots = function(slotIncrease, typeId) {
    if (slotIncrease < 0) return;
    this._eqsAddedSlots[typeId] += slotIncrease;
    this.eqsRefresh();
};

Game_Actor.prototype.addEqsLimit = function(limitIncrease) {
    if (limitIncrease < 0) return;
    this._eqsAddedLimit += limitIncrease;
    this.eqsRefresh();
};

Game_Actor.prototype.isEqsHide = function() {
    if (this.actor().eqsHide) return true;
    if (this.currentClass().eqsHide) return true;
    return false;
};

Game_Actor.prototype.getEqsSlotList = function() {
    var list = [];

    for (var n = 0; n <= Game_BattlerBase.MAX_EQS_SLOT_TYPES; n++) {
        for (var i = 1; i <= this._eqsMaxSlots[n]; i++) {
            if (this._eqsSlots[n][i] !== undefined) {
                var slotData = {"typeId": n, "slotId": i,
                    "skill": $dataSkills[this._eqsSlots[n][i]]};
                list.push(slotData);
            }
        }
    }

    return list;
};

Game_Actor.prototype.eqsCheckSkillEquipped = function(skillId, switchId) {
    if (this.eqsSkillEquipped($dataSkills[skillId])) {
        $gameSwitches.setValue(switchId, true);
    } else {
        $gameSwitches.setValue(switchId, false);
    }
};

Game_Actor.prototype.getEqsBlock = function() {
    var list = this.getEqsArray();
    var block = [];
    list.forEach(function(skillId) {
        if ($dataSkills[skillId]) {
            if ($dataSkills[skillId].eqsBlock) {
                block = block.concat($dataSkills[skillId].eqsBlock);
            }
        }
    });
    return block;
};

Game_Actor.prototype.eqsIsBlocked = function(skill) {
    if (!skill) return false;
    return this.getEqsBlock().contains(skill.id);
};

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

        var eqsSkills = this.getEqsArray();
        var eqsIgnored = this._skills.filter(function(skillId) {
            return $dataSkills[skillId].isEqsIgnore === true;
        });
        eqsSkills = eqsSkills.concat(eqsIgnored);
        for (var i = 0; i < eqsSkills.length; ++i) {
            var skill = $dataSkills[eqsSkills[i]];
            array = array.concat(this.getPassiveStateData(skill));
        }

        this._passiveStatesRaw = array.filter(Yanfly.Util.onlyUnique)
        return this._passiveStatesRaw;
    };
}

//=============================================================================
// Game_Action
//=============================================================================

Moogle_X.EQS.Game_Action_testApply = Game_Action.prototype.testApply;
Game_Action.prototype.testApply = function(target) {
    return Moogle_X.EQS.Game_Action_testApply.call(this, target) ||
        this.testEqsEffect(target);
};

Game_Action.prototype.testEqsEffect = function(target) {
    if (target.isActor()) {
        return this.canGrowEqs(target);
    } else {
        return false; // Target is not actor.
    }
};

Game_Action.prototype.canGrowEqs = function(target) {
    if (target.isActor()) {
        var slotGrow = this.item().eqsSlotGrow.grow;
        var limitGrow = this.item().eqsLimitGrow;
        return (slotGrow > 0 || limitGrow > 0) ? true : false;
    } else {
        return false; // Target is not actor.
    }
};

Moogle_X.EQS.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Moogle_X.EQS.Game_Action_applyItemUserEffect.call(this, target);
    this.applyEqsSlotGrow(target);
    this.applyEqsLimitGrow(target);
};

Game_Action.prototype.applyEqsSlotGrow = function(target) {
    if (target.isEnemy()) return;
    var typeId = this.item().eqsSlotGrow.typeId;
    var slotIncrease = this.item().eqsSlotGrow.grow || 0;
    if (slotIncrease > 0) {
        target.addEqsSlots(slotIncrease, typeId);
    }
};

Game_Action.prototype.applyEqsLimitGrow = function(target) {
    if (target.isEnemy()) return;
    var limitIncrease = this.item().eqsLimitGrow || 0;
    if (limitIncrease > 0) {
        target.addEqsLimit(limitIncrease);
    }
};

//=============================================================================
// Scene_Menu
//=============================================================================

Moogle_X.EQS.Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    Moogle_X.EQS.Scene_Menu_createCommandWindow.call(this);
    if (Moogle_X.EQS.showEqsMenu) {
        this._commandWindow.setHandler('equip skill', this.commandPersonal.bind(this));
    }
};

Moogle_X.EQS.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
    Moogle_X.EQS.Scene_Menu_onPersonalOk.call(this);
    switch (this._commandWindow.currentSymbol()) {
    case 'equip skill':
        SceneManager.push(Scene_EQS);
        break;
    }
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Moogle_X.EQS.Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    Moogle_X.EQS.Window_MenuCommand_addOriginalCommands.call(this);
    if (Moogle_X.EQS.showEqsMenu) {
        if (Moogle_X.EQS.eqsMenuSwitch === 0) {
            this.addCommand(Moogle_X.EQS.eqsTitle, 'equip skill', true);
        } else if (Moogle_X.EQS.eqsMenuSwitch > 0 &&
            $gameSwitches.value(Moogle_X.EQS.eqsMenuSwitch)) {
            this.addCommand(Moogle_X.EQS.eqsTitle, 'equip skill', true);
        }
    }
};

//=============================================================================
// Scene_Skill
//=============================================================================

Moogle_X.EQS.Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function() {
    Moogle_X.EQS.Scene_Skill_create.call(this);
    this.createEquipLimitWindow();
    this.createEquipCostWindow();
    this.createEquipSkillWindow();
    this.createEquipSkillPool();
    this.refreshActor();
};

Moogle_X.EQS.Scene_Skill_createSkillTypeWindow =
    Scene_Skill.prototype.createSkillTypeWindow;
Scene_Skill.prototype.createSkillTypeWindow = function() {
    Moogle_X.EQS.Scene_Skill_createSkillTypeWindow.call(this);
    this._skillTypeWindow.setHandler('eqsEquip', this.commandEqs.bind(this));
};

Scene_Skill.prototype.createEquipLimitWindow = function() {
    var wy = this._skillTypeWindow.y + this._skillTypeWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = this._skillTypeWindow.lineHeight() +
        this._skillTypeWindow.padding * 2;
    this._eqsLimitWindow = new Window_EqsLimit(0, wy, ww, wh);
    this._skillTypeWindow.setEqsLimitWindow(this._eqsLimitWindow);
    this.addWindow(this._eqsLimitWindow);
};

Scene_Skill.prototype.createEquipCostWindow = function() {
    var wy = this._skillTypeWindow.y + this._skillTypeWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = this._skillTypeWindow.lineHeight() +
        this._skillTypeWindow.padding * 2;
    this._eqsCostWindow = new Window_EqsCost(ww, wy, ww, wh);
    this._skillTypeWindow.setEqsCostWindow(this._eqsCostWindow);
    this.addWindow(this._eqsCostWindow);
};

Scene_Skill.prototype.createEquipSkillWindow = function() {
    var wy = this._eqsLimitWindow.y + this._eqsLimitWindow.height;
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
    var wy = this._eqsCostWindow.y + this._eqsCostWindow.height;
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

Moogle_X.EQS.Scene_Skill_refreshActor = Scene_Skill.prototype.refreshActor;
Scene_Skill.prototype.refreshActor = function() {
    Moogle_X.EQS.Scene_Skill_refreshActor.call(this);
    var actor = this.actor();
    if (this._eqsSlotWindow) {
        this._eqsSlotWindow.setActor(actor);
    }
    if (this._eqsPoolWindow) {
        this._eqsPoolWindow.setActor(actor);
    }
    if (this._eqsLimitWindow) {
        this._eqsLimitWindow.setActor(actor);
    }
    if (this._eqsCostWindow) {
        this._eqsCostWindow.setActor(actor);
    }
};

Scene_Skill.prototype.commandEqs = function() {
    this._eqsSlotWindow.activate();
    this._eqsSlotWindow.select(0);
};

Scene_Skill.prototype.onEqsSlotOk = function() {
    this._eqsPoolWindow.activate();
    this._eqsPoolWindow.select(0);
};

Scene_Skill.prototype.onEqsSlotCancel = function() {
    this._eqsSlotWindow.deselect();
    this._skillTypeWindow.activate();
};

Scene_Skill.prototype.onEqsItemOk = function() {
    AudioManager.playStaticSe(this._eqsPoolWindow._equipSound);
    this.actor().eqsEquipSkill(this._eqsPoolWindow.item(),
        this._eqsSlotWindow.item(this._eqsSlotWindow.index()).typeId,
        this._eqsSlotWindow.item(this._eqsSlotWindow.index()).slotId);
    this._skillTypeWindow.refresh(); // Add skill type bug fix.
    this._skillTypeWindow.selectSymbol('eqsEquip');
    this._eqsSlotWindow.activate();
    this._eqsSlotWindow.refresh();
    this._eqsPoolWindow.deselect();
    this._eqsPoolWindow.refresh();
    this._eqsLimitWindow.refresh();
    this._statusWindow.refresh();
    this._eqsSlotWindow.updateHelp();
};

Scene_Skill.prototype.onEqsItemCancel = function() {
    this._eqsSlotWindow.activate();
    this._eqsPoolWindow.deselect();
};

//=============================================================================
// Window_SkillType
//=============================================================================

Moogle_X.EQS.Window_SkillType_makeCommandList =
    Window_SkillType.prototype.makeCommandList;
Window_SkillType.prototype.makeCommandList = function() {
    Moogle_X.EQS.Window_SkillType_makeCommandList.call(this);
    if (this._actor) {
        if (!this._actor.isEqsHide() && this.eqsShowCommand()) {
            this.addCommand(Moogle_X.EQS.eqsVocab, 'eqsEquip', true);
        }
    }
};

Window_SkillType.prototype.eqsShowCommand = function() {
    if (Moogle_X.EQS.showEqsMenuSkill) {
        if (Moogle_X.EQS.eqsMenuSwitchSkill === 0) return true;
        return $gameSwitches.value(Moogle_X.EQS.eqsMenuSwitchSkill);
    } else {
        return false;
    }
};

Window_SkillType.prototype.setEqsLimitWindow = function(eqsWindow) {
    this._eqsLimitWindow = eqsWindow;
    this.update();
};

Window_SkillType.prototype.setEqsCostWindow = function(eqsWindow) {
    this._eqsCostWindow = eqsWindow;
    this.update();
};

Window_SkillType.prototype.setEqsSlotWindow = function(eqsWindow) {
    this._eqsSlotWindow = eqsWindow;
    this.update();
};

Window_SkillType.prototype.setEqsPoolWindow = function(eqsWindow) {
    this._eqsPoolWindow = eqsWindow;
    this.update();
};

Moogle_X.EQS.Window_SkillType_update = Window_SkillType.prototype.update;
Window_SkillType.prototype.update = function() {
    Moogle_X.EQS.Window_SkillType_update.call(this);
    if (this._eqsSlotWindow && this._eqsPoolWindow && this._eqsLimitWindow
        && this._eqsCostWindow) {
        this.updateEqsShowHide();
    }
};

Window_SkillType.prototype.updateEqsShowHide = function() {
    if (this.currentSymbol() === 'eqsEquip') {
        this._eqsSlotWindow.show();
        this._eqsPoolWindow.show();
        this._eqsLimitWindow.show();
        this._eqsCostWindow.show();
    } else {
        this._eqsSlotWindow.hide();
        this._eqsPoolWindow.hide();
        this._eqsLimitWindow.hide();
        this._eqsCostWindow.hide();
    }
};

})(); // IIFE

//=============================================================================
// Window_EquipSkillSlot
//=============================================================================

function Window_EquipSkillSlot() {
    this.initialize.apply(this, arguments);
}

Window_EquipSkillSlot.prototype = Object.create(Window_Selectable.prototype);
Window_EquipSkillSlot.prototype.constructor = Window_EquipSkillSlot;

Window_EquipSkillSlot.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this.refresh();
};

Window_EquipSkillSlot.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_EquipSkillSlot.prototype.maxItems = function() {
    return this._data ? this._data.length : 0;
};

Window_EquipSkillSlot.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_EquipSkillSlot.prototype.makeItemList = function() {
    this._data = [];
    if (!this._actor) return;

    this._data = this._actor.getEqsSlotList();
};

Window_EquipSkillSlot.prototype.item = function(index) {
    return this._data ? this._data[index] : null;
};

Window_EquipSkillSlot.prototype.drawItem = function(index) {
    if (this._actor) {
        var rect = this.itemRectForText(index);
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(true);
        var item = this.item(index);
        var skill = item.skill;
        var typeId = item.typeId;

        if (typeId === 0) {
            if (skill) {
                this.drawItemName(skill, rect.x, rect.y, rect.width);
            } else {
                this.drawEmptySlot(rect.x, rect.y, rect.width);
            }

        } else if (typeId > 0) {
            this.changeTextColor(this.textColor(Moogle_X.EQS.slotTypes[typeId].color));
            this.drawText(Moogle_X.EQS.slotTypes[typeId].name, rect.x, rect.y,
                Moogle_X.EQS.slotTypeRectWidth);
            if (skill) {
                this.drawItemName(skill, rect.x + Moogle_X.EQS.slotTypeRectWidth,
                    rect.y, rect.width);
            } else {
                this.drawEmptySlot(rect.x + Moogle_X.EQS.slotTypeRectWidth,
                    rect.y, rect.width);
            }
        }
        this.changePaintOpacity(true);
    }
};

Window_EquipSkillSlot.prototype.drawEmptySlot = function(x, y, width) {
    this.changePaintOpacity(false);
    var iconWidth = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(Moogle_X.EQS.emptyIcon, x + 2, y + 2);
    this.drawText(Moogle_X.EQS.emptyText, x + iconWidth, y, width - iconWidth);
};

Window_EquipSkillSlot.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_EquipSkillSlot.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
    this.update();
};

Window_EquipSkillSlot.prototype.updateHelp = function() {
    Window_Selectable.prototype.updateHelp.call(this);
    if (this.item(this.index()) !== undefined) { // Error blocker!
        var skillData = this.item(this.index()).skill;
        this.setHelpWindowItem(skillData);
    }
    if (this._statusWindow) {
        this._statusWindow.setTempActor(null);
    }
};

Window_EquipSkillSlot.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this.item(this.index())) {
        this._itemWindow.setTypeId(this.item(this.index()).typeId);
    }
};

//=============================================================================
// Window_EquipSkillPool
//=============================================================================

function Window_EquipSkillPool() {
    this.initialize.apply(this, arguments);
}

Window_EquipSkillPool.prototype = Object.create(Window_Selectable.prototype);
Window_EquipSkillPool.prototype.constructor = Window_EquipSkillPool;

Window_EquipSkillPool.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.defineEquipSound();
    this._actor = null;
    this._data = [];
    this._typeId = null;
};

Window_EquipSkillPool.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this._typeId = null;
        this.refresh();
        this.resetScroll();
    }
};

Window_EquipSkillPool.prototype.maxCols = function() {
    return 1;
};

Window_EquipSkillPool.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_EquipSkillPool.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_EquipSkillPool.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_EquipSkillPool.prototype.includes = function(item) {
    return true;
};

Window_EquipSkillPool.prototype.isEnabled = function(item) {
    return this._actor && this._actor.canEquipSkill(item) &&
        !this._actor.eqsIsBlocked(item);
};

Window_EquipSkillPool.prototype.makeItemList = function() {
    if (this._actor) {
        this._data = [];
        if (this._typeId !== null) {

            // Party based skill pool.
            if (Moogle_X.EQS.partySkillPool) {
                for (var i = 0; i < $gameParty.allMembers().length; i++) {
                    var skillPool = $gameParty.allMembers()[i].getSkillPool(this._typeId);
                    skillPool.forEach(function(skill) {
                        if (!this._data.contains(skill)) {
                            this._data.push(skill);
                        }
                    }, this);
                }

            } else {
                // Default skill pool.
                this._data = this._actor.getSkillPool(this._typeId);
            }

            this._data.push(null);
        }
    } else {
        this._data = [];
    }
};

Window_EquipSkillPool.prototype.drawItem = function(index) {
    var skill = this._data[index];
    var costWidth = this.costWidth();
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    if (skill) {
        this.changePaintOpacity(this.isEnabled(skill));
        this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
        this.drawEquipCost(skill, rect.x, rect.y, rect.width);
    } else {
        this.drawEmptySlot(rect.x, rect.y, rect.width);
    }
    this.changePaintOpacity(1);
};

Window_EquipSkillPool.prototype.drawEmptySlot = function(x, y, width) {
    this.changePaintOpacity(false);
    var iconWidth = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(Moogle_X.EQS.removeIcon, x + 2, y + 2);
    this.drawText(Moogle_X.EQS.removeText, x + iconWidth, y, width - iconWidth);
};

Window_EquipSkillPool.prototype.costWidth = function() {
    return this.textWidth('000');
};

Window_EquipSkillPool.prototype.drawEquipCost = function(skill, x, y, width) {
    this.changeTextColor(this.textColor(Moogle_X.EQS.eqsCostNumberColor));
    if (skill.eqsCost > 0) {
        this.drawText(skill.eqsCost, x, y, width, 'right');
    }
};

Window_EquipSkillPool.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_EquipSkillPool.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_EquipSkillPool.prototype.setTypeId = function(typeId) {
    if (this._typeId === typeId) return; // waynee95's fix.
    this._typeId = typeId;
    this.refresh();
};

Window_EquipSkillPool.prototype.defineEquipSound = function() {
    this._equipSound = {
        name:   Moogle_X.EQS.eqSeName,
        volume: Moogle_X.EQS.eqSeVolume,
        pitch:  Moogle_X.EQS.eqSePitch,
        pan:    Moogle_X.EQS.eqSePan
    };
};

//=============================================================================
// Window_EqsLimit
//=============================================================================

function Window_EqsLimit() {
    this.initialize.apply(this, arguments);
}

Window_EqsLimit.prototype = Object.create(Window_Selectable.prototype);
Window_EqsLimit.prototype.constructor = Window_EqsLimit;

Window_EqsLimit.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this.refresh();
};

Window_EqsLimit.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_EqsLimit.prototype.maxItems = function() {
    return this._actor ? 1 : 0;
};

Window_EqsLimit.prototype.drawItem = function(index) {
    this.drawCurrentEqsLimit();
};

Window_EqsLimit.prototype.drawCurrentEqsLimit = function() {
    if (this._actor) {
        var rect = this.itemRectForText(0);
        var wx = rect.width / 2;
        this.changeTextColor(this.textColor(Moogle_X.EQS.limitColor));
        this.changePaintOpacity(true);
        this.drawText(Moogle_X.EQS.limitText, rect.x, rect.y, rect.width);
        this.changeTextColor(this.textColor(Moogle_X.EQS.limitNumberColor))
        var text = this._actor.currentEqsLimit() + "/" + this._actor._eqsMaxLimit;
        this.drawText(text, wx, rect.y, rect.width - wx, 'right');
    }
};

//=============================================================================
// Window_EqsCost
//=============================================================================

function Window_EqsCost() {
    this.initialize.apply(this, arguments);
}

Window_EqsCost.prototype = Object.create(Window_Selectable.prototype);
Window_EqsCost.prototype.constructor = Window_EqsLimit;

Window_EqsCost.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this.refresh();
};

Window_EqsCost.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_EqsCost.prototype.maxItems = function() {
    return this._actor ? 1 : 0;
};

Window_EqsCost.prototype.drawItem = function(index) {
    this.drawEqsCostText();
};

Window_EqsCost.prototype.drawEqsCostText = function() {
    if (this._actor) {
        var rect = this.itemRectForText(0);
        var wx = rect.width / 2;
        this.changeTextColor(this.textColor(Moogle_X.EQS.poolColor));
        this.changePaintOpacity(true);
        this.drawText(Moogle_X.EQS.poolText, rect.x, rect.y, rect.width);
        this.changeTextColor(this.textColor(Moogle_X.EQS.eqsCostColor));
        this.drawText(Moogle_X.EQS.eqsCostText, wx, rect.y, rect.width - wx, 'right');
    }
};

//=============================================================================
// Scene_EQS
//=============================================================================

function Scene_EQS() {
    this.initialize.apply(this, arguments);
}

Scene_EQS.prototype = Object.create(Scene_Skill.prototype);
Scene_EQS.prototype.constructor = Scene_EQS;

Scene_EQS.prototype.initialize = function() {
    Scene_Skill.prototype.initialize.call(this);
};

Scene_EQS.prototype.start = function() {
    Scene_Skill.prototype.start.call(this);
};

Scene_EQS.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createStatusWindow();
    this.createEquipLimitWindow();
    this.createEquipCostWindow();
    this.createEquipSkillWindow();
    this.createEquipSkillPool();
    this.refreshActor();
};

Scene_EQS.prototype.createStatusWindow = function() {
    var wx = 0;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = this._helpWindow.fittingHeight(4);
    this._statusWindow = new Window_EqsSkillStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
};

Scene_EQS.prototype.onActorChange = function() {
    this.refreshActor();
    this._eqsSlotWindow.activate();
};

Scene_EQS.prototype.createEquipLimitWindow = function() {
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = this._statusWindow.lineHeight() +
        this._statusWindow.padding * 2;
    this._eqsLimitWindow = new Window_EqsLimit(0, wy, ww, wh);
    this.addWindow(this._eqsLimitWindow);
};

Scene_EQS.prototype.createEquipCostWindow = function() {
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = this._statusWindow.lineHeight() +
        this._statusWindow.padding * 2;
    this._eqsCostWindow = new Window_EqsCost(ww, wy, ww, wh);
    this.addWindow(this._eqsCostWindow);
};

Scene_EQS.prototype.createEquipSkillWindow = function() {
    var wy = this._eqsLimitWindow.y + this._eqsLimitWindow.height;
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
    var wy = this._eqsCostWindow.y + this._eqsCostWindow.height;
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
};

Scene_EQS.prototype.refreshActor = function() {
    var actor = this.actor();
    if (this._statusWindow) {
        this._statusWindow.setActor(actor);
    }
    if (this._eqsSlotWindow) {
        this._eqsSlotWindow.setActor(actor);
    }
    if (this._eqsPoolWindow) {
        this._eqsPoolWindow.setActor(actor);
    }
    if (this._eqsLimitWindow) {
        this._eqsLimitWindow.setActor(actor);
    }
    if (this._eqsCostWindow) {
        this._eqsCostWindow.setActor(actor);
    }
};

Scene_EQS.prototype.onActorChange = function() {
    this.refreshActor();
    this._eqsSlotWindow.activate();
    this._eqsSlotWindow.select(0);
};

Scene_EQS.prototype.onEqsSlotOk = function() {
    this._eqsPoolWindow.activate();
    this._eqsPoolWindow.select(0);
};

Scene_EQS.prototype.onEqsSlotCancel = function() {
    this.popScene();
};

Scene_EQS.prototype.onEqsItemOk = function() {
    AudioManager.playStaticSe(this._eqsPoolWindow._equipSound);
    this.actor().eqsEquipSkill(this._eqsPoolWindow.item(),
        this._eqsSlotWindow.item(this._eqsSlotWindow.index()).typeId,
        this._eqsSlotWindow.item(this._eqsSlotWindow.index()).slotId);
    //this._skillTypeWindow.refresh(); // Add skill type bug fix.
    //this._skillTypeWindow.selectSymbol('eqsEquip');
    this._eqsSlotWindow.activate();
    this._eqsSlotWindow.refresh();
    this._eqsPoolWindow.deselect();
    this._eqsPoolWindow.refresh();
    this._eqsLimitWindow.refresh();
    this._statusWindow.refresh();
    this._eqsSlotWindow.updateHelp();
};

Scene_EQS.prototype.onEqsItemCancel = function() {
    this._eqsSlotWindow.activate();
    this._eqsPoolWindow.deselect();
};

//=============================================================================
// Window_EqsSkillStatus
//=============================================================================
function Window_EqsSkillStatus() {
    this.initialize.apply(this, arguments);
}

Window_EqsSkillStatus.prototype = Object.create(Window_Base.prototype);
Window_EqsSkillStatus.prototype.constructor = Window_EqsSkillStatus;

Window_EqsSkillStatus.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
};

Window_EqsSkillStatus.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_EqsSkillStatus.prototype.refresh = function() {
    this.contents.clear();
    if (!this._actor) return;

    if (Imported.YEP_CoreEngine) {
        var w = Math.round(this.width / 1.8) - this.padding * 2;
        var h = this.height - this.padding * 2;
        if (!eval(Yanfly.Param.MenuTpGauge)) {
            var y = h / 2 - this.lineHeight() * 1.5;
        } else {
            var y = 0;
        }
        var xpad = Yanfly.Param.WindowPadding + Window_Base._faceWidth;
        var width = w - xpad - this.textPadding();
        this.drawActorFace(this._actor, 0, 0, Window_Base._faceWidth, h);
        this.drawActorSimpleStatus(this._actor, xpad, y, width);
        var x2 = Math.round(this.width / 1.8) - this.padding * 2;
        var width2 = this.width - x2 - this.padding * 2;
        this.eqsDrawParameters(this._actor, x2, 0, width2);

    } else {
        var w = this.width - this.padding * 2;
        var h = this.height - this.padding * 2;
        var y = h / 2 - this.lineHeight() * 1.5;
        var width = this.width;
        this.drawActorFace(this._actor, 0, 0, 144, h);
        this.drawActorSimpleStatus(this._actor, 162, y, width);
    }

};

Window_EqsSkillStatus.prototype.eqsDrawParameters = function(actor, x, y, width) {
    var rect = new Rectangle(x, y, width, this.lineHeight());
    var dx = rect.x;
    var dy = rect.y + this.lineHeight();
    var dw = rect.width;
    var dh = rect.height;
    var dx2 = dx + this.textPadding();
    var textDw = dw / 2 - this.textPadding() * 2;

    // Attack
    this.drawDarkRect(dx, dy, dw / 2, dh);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(2), dx2, dy, textDw, 'left');
    this.changeTextColor(this.normalColor());
    this.drawText(Yanfly.Util.toGroup(actor.param(2)), dx2, dy, textDw, 'right');

    // Defense
    this.drawDarkRect(dx + dw / 2, dy, dw / 2, dh);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(3), dx2 + dw / 2, dy, textDw, 'left');
    this.changeTextColor(this.normalColor());
    this.drawText(Yanfly.Util.toGroup(actor.param(3)), dx2 + dw / 2, dy, textDw, 'right');

    // Magic
    this.drawDarkRect(dx, dy + dh, dw / 2, dh);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(4), dx2, dy + dh, textDw, 'left');
    this.changeTextColor(this.normalColor());
    this.drawText(Yanfly.Util.toGroup(actor.param(4)), dx2, dy + dh, textDw, 'right');

    // Magic Defense
    this.drawDarkRect(dx + dw / 2, dy + dh, dw / 2, dh);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(5), dx2 + dw / 2, dy + dh, textDw, 'left');
    this.changeTextColor(this.normalColor());
    this.drawText(Yanfly.Util.toGroup(actor.param(5)), dx2 + dw / 2, dy + dh, textDw, 'right');

    // Agility
    this.drawDarkRect(dx, dy + dh * 2, dw / 2, dh);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(6), dx2, dy + dh * 2, textDw, 'left');
    this.changeTextColor(this.normalColor());
    this.drawText(Yanfly.Util.toGroup(actor.param(6)), dx2, dy + dh * 2, textDw, 'right');

    // Luck
    this.drawDarkRect(dx + dw / 2, dy + dh * 2, dw / 2, dh);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(7), dx2 + dw / 2, dy + dh * 2, textDw, 'left');
    this.changeTextColor(this.normalColor());
    this.drawText(Yanfly.Util.toGroup(actor.param(7)), dx2 + dw / 2, dy + dh * 2, textDw, 'right');

    this.resetFontSettings();
};

Window_EqsSkillStatus.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

(function() { // IIFE

//=============================================================================
// Game_Interpreter
//=============================================================================

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'EQS') {
        switch (args[0]) {
        case 'Open':
            SceneManager.push(Scene_EQS);
            break;

        case 'Actor':
            if (args[2] === "Type" && args[4] === "Slot" && args[6] === "Skill") {
                $gameActors.actor(args[1]).eqsEquipSkillPluginCommand($dataSkills[args[7]],
                    Number(args[3]), Number(args[5]));
            } else if (args[2] === "Type" && args[4] === "Grow") {
                $gameActors.actor(args[1]).addEqsSlots(Number(args[5]), Number(args[3]));
            } else if (args[2] === "Limit" && args[3] === "Grow") {
                $gameActors.actor(args[1]).addEqsLimit(Number(args[4]));
            } else if (args[2] === "Type" && args[4] === "Slot" && args[6] === "Unequip") {
                $gameActors.actor(args[1]).eqsEquipSkill($dataSkills[0],
                    Number(args[3]), Number(args[5]));
            } else if (args[2] === "Unequip" && args[3] === "All") {
                $gameActors.actor(args[1]).clearEqsSlots();
                $gameActors.actor(args[1]).refresh();
            }
            break;

        case 'Switch':
            if (args[2] === "Actor" && args[4] === "Skill") {
                $gameActors.actor(args[3]).eqsCheckSkillEquipped(Number(args[5]),
                    Number(args[1]));
            }
            break;
        }
    }
};


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
