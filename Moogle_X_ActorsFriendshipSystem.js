//=============================================================================
// Actors Friendship System by Moogle_X
// Moogle_X_ActorsFriendshipSystem.js
// Created on: November 12nd 2015
//=============================================================================

var Imported = Imported || {};
Imported.Moogle_X_AFS = true;

var Moogle_X = Moogle_X || {};
Moogle_X.AFS = Moogle_X.AFS || {};

//=============================================================================
/*:
 * @plugindesc v2.01 Adds friendship mechanic between actors.
 * @author Moogle_X
 *
 * @param Default All Leaders
 * @desc Make all actors become leaders by default. 1:Yes 0:No
 * @default 1
 *
 * @param Default Max Level
 * @desc This is the default value for max Friendship Level for all actors.
 * @default 10
 *
 * @param Default Exp for Level Up
 * @desc This is the default value for Friendship Points needed to level up.
 * @default 20
 *
 * @param Friendship Gain Each Battle
 * @desc Friendship Points gained for each active party members to other leaders in battle party.
 * @default 1
 *
 * @param Allows Level Down
 * @desc Decide whether Friendship Level can decrease or not. 1:Yes 0:No
 * @default 0
 *
 * @param ---Scene---
 * @default
 *
 * @param Use Single Leader Scene
 * @desc Only the first leader's friend list will be shown. 1:Yes 0:No
 * @default 0
 *
 * @param Show in Main Menu
 * @desc Put "Show Friendship" scene command in main menu. 1:Yes 0:No
 * @default 1
 *
 * @param Show Menu Switch ID
 * @desc Turning on the in-game switch with this ID will put scene command in main menu. Put 0 to ignore this feature.
 * @default 0
 *
 * @param Menu Vocab
 * @desc Change the "Show Friendship" command name in main menu.
 * @default Friendship
 *
 * @param Help Text
 * @desc This is the text at the top of "Show Friendship" scene.
 * @default View Friendship Data
 *
 * @param ---Window Leader List---
 * @default
 *
 * @param Leader Name Color
 * @desc This is the color for actor's name in Window Leader List.
 * @default 0
 *
 * @param Back Text
 * @desc Change the text for "Back" at the bottom of Window Leader List.
 * @default Back
 *
 * @param Back Text Color
 * @desc This is the color for "Back" at the bottom of Window Leader List.
 * @default 0
 *
 * @param Back Icon
 * @desc Change the icon for "Back" at the bottom of Window Leader List. Put 0 for no icon.
 * @default 16
 *
 * @param ---Window Friend List---
 * @default
 *
 * @param Maximum Number of Rows
 * @desc This is the maximum number of friends shown in the window. Adjust to suit your screen resolution.
 * @default 4
 *
 * @param ---Friend's Face---
 * @default
 *
 * @param Show Friend's Face
 * @desc Decide whether to draw actor's face in Window Friend List. 1:Yes 0:No
 * @default 1
 *
 * @param Face Offset X
 * @desc Change the offset X value of actor's face in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Face Offset Y
 * @desc Change the offset Y value of actor's face in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @param ---Friend's Name---
 * @default
 *
 * @param Show Friend's Name
 * @desc Decide whether to draw actor's name in Window Friend List. 1:Yes 0:No
 * @default 1
 *
 * @param Friend Name Color
 * @desc This is the color for actor's name in Window Friend List.
 * @default 0
 *
 * @param Friend Name Width
 * @desc This is the rectangle width for actor's name in Window Friend List.
 * @default 168
 *
 * @param Friend Name Alignment
 * @desc This is the text alignment for actor's name in Window Friend List. (left center right)
 * @default left
 *
 * @param Friend Name Offset X
 * @desc Change the offset X value of actor's name in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Friend Name Offset Y
 * @desc Change the offset Y value of actor's name in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @param ---Friendship Level Text---
 * @default
 *
 * @param Friendship Level Text
 * @desc Change "Friendship Level" text in Window Friend List.
 * @default Friendship Level
 *
 * @param Show Friendship Level Text
 * @desc Decide whether to draw "Friendship Level" text in Window Friend List. 1:Yes 0:No
 * @default 1
 *
 * @param Friendship Level Text Color
 * @desc This is the color for "Friendship Level" text in Window Friend List.
 * @default 16
 *
 * @param Friendship Level Text Width
 * @desc This is the rectangle width for "Friendship Level" text in Window Friend List.
 * @default 200
 *
 * @param Friendship Level Text Alignment
 * @desc This is the text alignment for "Friendship Level" text in Window Friend List. (left center right)
 * @default left
 *
 * @param Friendship Level Text Offset X
 * @desc Change the offset X value of "Friendship Level" text in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Friendship Level Text Offset Y
 * @desc Change the offset Y value of "Friendship Level" text in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @param ---Friendship Level Number---
 * @default
 *
 * @param Show Friendship Level Number
 * @desc Decide whether to draw "Friendship Level" number in Window Friend List. 1:Yes 0:No
 * @default 1
 *
 * @param Friendship Level Number Color
 * @desc This is the color for "Friendship Level" number in Window Friend List.
 * @default 0
 *
 * @param Friendship Level Number Width
 * @desc This is the rectangle width for "Friendship Level" number in Window Friend List.
 * @default 40
 *
 * @param Friendship Level Number Alignment
 * @desc This is the text alignment for "Friendship Level" number in Window Friend List. (left center right)
 * @default right
 *
 * @param Friendship Level Number Offset X
 * @desc Change the offset X value of "Friendship Level" number in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Friendship Level Number Offset Y
 * @desc Change the offset Y value of "Friendship Level" number in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @param ---Friendship Gauge---
 * @default
 *
 * @param Show Friendship Gauge
 * @desc Decide whether to draw Friendship Gauge in Window Friend List. 1:Yes 0:No
 * @default 1
 *
 * @param Gauge Height
 * @desc This is the height of Friendship Gauge in Window Friend List.
 * @default 18
 *
 * @param Gauge Width
 * @desc This is the width of Friendship Gauge in Window Friend List.
 * @default 382
 *
 * @param Color 1
 * @desc This is the gradient color 1 of Friendship Gauge.
 * @default 24
 *
 * @param Color 2
 * @desc This is the gradient color 2 of Friendship Gauge.
 * @default 29
 *
 * @param Friendship Gauge Offset X
 * @desc Change the offset X value of Friendship Gauge in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Friendship Gauge Offset Y
 * @desc Change the offset Y value of Friendship Gauge in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @param ---Current FP Text---
 * @default
 *
 * @param Current FP Text
 * @desc Change "Current FP" text in Window Friend List.
 * @default Current FP
 *
 * @param Show Current FP Text
 * @desc Decide whether to draw "Current FP" text in Window Friend List. 1:Yes 0:No
 * @default 1
 *
 * @param Current FP Text Color
 * @desc This is the color for "Current FP" text in Window Friend List.
 * @default 16
 *
 * @param Current FP Text Width
 * @desc This is the rectangle width for "Current FP" text in Window Friend List.
 * @default 200
 *
 * @param Current FP Text Alignment
 * @desc This is the text alignment for "Current FP" text in Window Friend List. (left center right)
 * @default left
 *
 * @param Current FP Text Offset X
 * @desc Change the offset X value of "Current FP" text in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Current FP Text Offset Y
 * @desc Change the offset Y value of "Current FP" text in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @param ---Current FP Number---
 * @default
 *
 * @param Show Current FP Number
 * @desc Decide whether to draw "Current FP" number in Window Friend List. 1:Yes 0:No
 * @default 1
 *
 * @param Current FP Number Color
 * @desc This is the color for "Current FP" number in Window Friend List.
 * @default 0
 *
 * @param Current FP Number Width
 * @desc This is the rectangle width for "Current FP" number in Window Friend List.
 * @default 200
 *
 * @param Current FP Number Alignment
 * @desc This is the text alignment for "Current FP" number in Window Friend List. (left center right)
 * @default right
 *
 * @param Current FP Number Offset X
 * @desc Change the offset X value of "Current FP" number in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Current FP Number Offset Y
 * @desc Change the offset Y value of "Current FP" Number in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @param ---To Next Level Text---
 * @default
 *
 * @param To Next Level Text
 * @desc Change "To Next Level" text in Window Friend List.
 * @default To Next Level
 *
 * @param Show To Next Level Text
 * @desc Decide whether to draw "To Next Level" text in Window Friend List. 1:Yes 0:No
 * @default 1
 *
 * @param To Next Level Text Color
 * @desc This is the color for "To Next Level" text in Window Friend List.
 * @default 16
 *
 * @param To Next Level Text Width
 * @desc This is the rectangle width for "To Next Level" text in Window Friend List.
 * @default 200
 *
 * @param To Next Level Text Alignment
 * @desc This is the text alignment for "To Next Level" text in Window Friend List. (left center right)
 * @default left
 *
 * @param To Next Level Text Offset X
 * @desc Change the offset X value of "To Next Level" text in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param To Next Level Text Offset Y
 * @desc Change the offset Y value of "To Next Level" text in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @param ---To Next Level Number---
 * @default
 *
 * @param Show To Next Level Number
 * @desc Decide whether to draw "To Next Level" number in Window Friend List. 1:Yes 0:No
 * @default 1
 *
 * @param To Next Level Number Color
 * @desc This is the color for "To Next Level" number in Window Friend List.
 * @default 0
 *
 * @param To Next Level Number Width
 * @desc This is the rectangle width for "To Next Level" number in Window Friend List.
 * @default 200
 *
 * @param To Next Level Number Alignment
 * @desc This is the text alignment for "To Next Level" number in Window Friend List. (left center right)
 * @default right
 *
 * @param To Next Level Number Offset X
 * @desc Change the offset X value of "To Next Level" number in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param To Next Level Number Offset Y
 * @desc Change the offset Y value of "To Next Level" Number in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @param ---Friendship Icons---
 * @default
 *
 * @param Friendship Icons Offset X
 * @desc Change the offset X value of "Friendship Icons" in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Friendship Icons Offset Y
 * @desc Change the offset Y value of "Friendship Icons" in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @param ---FP Lock Icon---
 * @default
 *
 * @param Default Lock Icon
 * @desc This is the default icon shown when actor is under FP Lock effect. Put 0 for no icon.
 * @default 4
 *
 * @param FP Lock Icon Offset X
 * @desc Change the offset X value of "FP Lock Icon" in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param FP Lock Icon Offset Y
 * @desc Change the offset Y value of "FP Lock Icon" in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @param ---Custom Friend Icon---
 * @default
 *
 * @param Custom Friend Icon Offset X
 * @desc Change the offset X value of "Custom Friend Icon" in Window Friend List. (Positive: right; Negative: left)
 * @default 0
 *
 * @param Custom Friend Icon Offset Y
 * @desc Change the offset Y value of "Custom Friend Icon" in Window Friend List. (Positive: down; Negative: up)
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin adds friendship mechanic between actors of your choice.
 * Each actor has their own Friendship Points that can be increased or decreased
 * multiple ways.
 *
 * As their Friendship Points grows, that actor's Friendship Level may level up.
 * You can set some skills to be automatically learned at certain Friendship
 * Level.
 *
 * There is also the option to store certain actor's Friendship Points or
 * Friendship Level into in-game variable. You can then use that variable's
 * value as a conditional trigger for new event, etc.
 *
 * ============================================================================
 * Single Leader vs Multiple Leaders
 * ============================================================================
 * You are given a choice to go with Single Leader approach or Multiple Leaders
 * approach.
 *
 * Single Leader means there is one actor who is the central of relationships.
 * This actor is usually the main protagonist of your game.
 * You can view other actors' Friendship Points towards this Leader, but you
 * cannot view their Friendship Points towards other actors.
 *
 * Multiple Leaders approach take away this limitation. You can view all actors'
 * Friendship Points towards any actors that you tag as "Leader". You can make
 * all actors become Leader, or just a few of them.
 *
 * To make an actor become Leader, insert this notetag into his/her notebox:
 *
 * <AFS Leader>
 *
 * Actor's friendship value can be viewed in custom scene. You can access it
 * from the main menu or simply by using this plugin command:
 *
 * AFS Open                       // Open Friendship Scene.
 *
 * IMPORTANT!
 * There are 2 versions of Friendship Scene, Single Leader version and Multiple
 * Leaders version. Single Leader one only contains Window Friend List while
 * Multiple Leaders version contains both of Window Leader List and Window
 * Friend List.
 *
 * To enable Single Leader version, simply turn on "Use Single Leader Scene"
 * option in the plugin configuration.
 *
 * By default, no actor's friendship data will be shown. In order for it to
 * show up in the scene, you must first manually "unlock" that actor by using
 * these plugin commands:
 *
 * AFS Show Leader x              // Show actor x in the leader list.
 * AFS Show Friend x Leader y     // Show actor x as friend in leader y's
 *                                // friend list.
 *
 * If you want to hide the "unlocked" leader or friend for some reason during
 * mid-game, simply use these plugin commands:
 *
 * AFS Hide Leader x              // Hide actor x from the leader list.
 * AFS Hide Friend x Leader y     // Hide actor x from leader y's friend list.
 *
 * ============================================================================
 * Setting Up Friendship Level and Exp Requirements
 * ============================================================================
 * Each actor has their own Max Friendship Level and Exp Requirements needed
 * for each level up.
 *
 * You can go with the default value by editting the plugin configuration.
 * Or you can make each actor has their own Max Level and Exp Requirements by
 * inserting these notetags into the Actors' notebox:
 *
 * <AFS Max Level: x>             // Maximum Friendship Level is x.
 * <AFS Exp: n1, n2, n3, n4, n5>  // First level up will require n1 FP, second
 *                                // level up will require n2 FP, etc.
 *
 * ============================================================================
 * How to Increase Friendship Points
 * ============================================================================
 * There are 3 methods to increase or decrease Friendship Points. The easiest
 * method is using plugin command. With plugin command, you can increase or
 * decrease actor's Friendship Points by certain amount.
 *
 * AFS Gain x Friend y Leader z   // Increase actor y's FP towards Leader z
 *                                // by x amount.
 * AFS Lose x Friend y Leader z   // Decrease actor y's FP towards Leader z
 *                                // by x amount.
 *
 * The second method is using skills and items. By default, all skills and
 * items increase actor's Friendship Points by 0 amount. You can change this by
 * inserting new notetags into the skill/item's notebox. The value can be
 * either positive or negative. You can make the same skill/item to have
 * different effects on different actors.
 *
 * For example, the skill "Heal" with these notetags:
 *
 * <AFS Gain 2: 5>
 * <AFS Gain 3: -10>
 * <AFS Gain Default: 1>
 *
 * If the caster of this skill is a Leader, depending on who receive this
 * healing...
 *
 * This "Heal" will increase Actor 2's FP (Friendship Points) towards this Leader
 * by 2, decrease Actor 3's FP towards this Leader by 10, and increase other
 * actors' FP towards this Leader by 1.
 * Items also share similar notetags.
 *
 * The third and the last method to increase actor's FP is by having the actor
 * as one of the active battle members. All actors in active battle party will
 * gain certain amount of FP at the end of each battle (win or not).
 * The FP amount can be changed in "Friendship Gain Each Battle" option in the
 * plugin configurations.
 *
 * ============================================================================
 * Friendship Skills
 * ============================================================================
 * Actors are able to learn new skills when their Friendship Level is increased.
 * You need to set up what skills they learn by inserting notetags into their
 * respective noteboxes.
 *
 * <AFS Skill x Leader y: n>
 *
 * The above notetag means this actor will learn skill n when their Friendship
 * Level towards Leader y reach level x. If you want the actor learn more than
 * one skills at the same time, use this notetag instead:
 *
 * <AFS Skill x Leader y: n1, n2, n3, n4, n5>
 *
 * This actor will learn skills n1, n2, n3, n4, and n5 when their Friendship
 * Level towards Leader y reach level x.
 *
 * ============================================================================
 * EXTRA feature! "Best Friend Skill(s)"
 * ============================================================================
 * Actor can learn a new type of skill, called "Best Friend Skill".
 * Best Friend Skill will be automatically learn when these conditions are met:
 *
 * 1. The actor must have the necessary notetag in their notebox.
 *
 * <AFS Max Skill Leader x: n>                   // Use it for one skill.
 * <AFS Max Skill Leader x: n1, n2, n3, n4, n5>  // Use this for multiple skills.
 *
 * 2. This actor Friendship Level towards Leader x must reach maximum level.
 * 3. Leader x's Friendship Level towards this actor must ALSO reach maximum
 *    Level.
 *
 * When the above conditions are met, this actor will learn skill n (or n1, n2,
 * n3, n4, n5). Keep in mind that only this actor will learn the skills.
 * If Leader x doesn't have any "Best Friend Skill" notetag, that Leader won't
 * learn anything.
 *
 * If you want Leader x to learn "Best Friend Skill" as well, you must give
 * him/her the necessary notetag as well.
 *
 * One thing to remember. If their Friendship Level is decreased (therefore
 * they are no longer "Max Level"), both actors will forget their Best Friend
 * Skills.
 *
 * ============================================================================
 * Global Level Cap
 * ============================================================================
 * At any point in the game, you can put a Friendship Level restriction to all
 * actors in certain Leader's friend list. This "Global Level Cap" effect
 * can be applied by using a plugin command:
 *
 * AFS Cap Leader x Level y             // Put Global Level Cap at level y to
 *                                      // all actors in Leader x's friend list.
 *
 * For example, if you use "AFS Cap Leader 2 Level 5" plugin command.
 * All actors in Leader 2's friend list cannot increase their Friendship Level
 * towards Leader 2 past level 5.
 *
 * No matter how much FP they get, their Friendship Level towards this Leader
 * cannot reach level 6 or above.
 *
 * IMPORTANT!!!
 * This Global Level Cap effect only works on any friends that currently has
 * Friendship Level 5 or lower. If there is one (or more) friend that already
 * reach level 6 or higher, this particular friend can still increase his/her
 * Friendship Level normally. In other word, this friend is unaffected by
 * Global Level Cap effect.
 *
 * This situation can be used to your advantage depending on your game project.
 *
 * Global Level Cap effect can be removed by using plugin command:
 *
 * AFS Uncap Leader x               // Remove Global Level Cap effect from
 *                                  // Leader x.
 *
 * ============================================================================
 * FP Lock Effect
 * ============================================================================
 * You can give a FP Lock effect to certain friend in certain Leader's friend
 * list. Any friend that's affected by FP Lock effect cannot increase or
 * decrease his/her FP or Friendship Level towards a certain Leader.
 *
 * This effect can be applied by using plugin command:
 *
 * AFS Lock Friend x Leader y      // Friend x in Leader y's friend list will
 *                                 // receive FP Lock effect.
 *
 * FP Lock has a special icon indicator beside the friend's name.
 * You can decide the default icon by editting the "Default Lock Icon" option
 * in the plugin configuration.
 *
 * If you prefer some actors to use different icon, insert this notetag into
 * the actor's notebox:
 *
 * <AFS Lock Icon: x>             // This actor's FP Lock Icon will be icon
 *                                // with ID x.
 *
 * If you dislike the default icon position, you can adjust the new position
 * by editting "FP Lock Icon Offset X" and "FP Lock Icon Offset Y" options in
 * the plugin configuration.
 *
 * FP Lock effect can be removed anytime by using this plugin command:
 *
 * AFS Unlock Friend x Leader y   // Remove FP Lock effect from friend x in
 *                                // Leader y's friend list.
 *
 * ============================================================================
 * Extra Icons
 * ============================================================================
 * This plugin allows you to add 3 new icon types to the Window Friend List.
 * All of these icons are merely visual. They do not have any gameplay impact.
 * You can use these icons as special indicator for some gameplay mechanics
 * unique to your game project.
 *
 * 1. Friendship Icons
 *    This icons will show up in the window at certain Friendship Level. Each
 * actor can have different Friendship Icons with other actors or other Leader.
 * By default, these icons are located just above Friendship Gauge. Again, if
 * you dislike the default location, simply adjust "Friendship Icons Offset X"
 * and "Friendship Icons Offset Y" options in the plugin configuration.
 *    You can adjust actor's Friendship Icons by inserting these notetags into
 * actor's notebox:
 *
 * <AFS Icon Level x Leader y: n>   // Show icon n when this actor's Friendship
 *                                  // Level towards Leader y is currently at
 *                                  // level x.
 *
 * If you want to show more than one icons, use this notetag instead:
 *
 * <AFS Icon Level x Leader y: n1, n2, n3, n4, n5>    // Same as above, but more
 *                                                    // icons at the same time.
 *
 * 2. Custom Friend Icon
 *    This icon is by default located near the right most part of Friendship
 * Gauge. Icon position can changed by editting "Custom Friend Icon Offset X"
 * and "Custom Friend Icon Offset Y" in the plugin configuration.
 *    Custom Friend Icon is only 1 icon. You cannot show more than one icons for
 * this icon type. To show Custom Friend Icon, simply use this plugin command:
 *
 * AFS CFI x Friend y Leader z      // Friend y in Leader z's friend list will
 *                                  // get icon with ID x.
 *
 *    It's up to you what kind of icon that you want to show up. This icon can
 * be used for special indicator or anything. If you want to remove the icon,
 * simply use this plugin command:
 *
 * AFS CFI Remove Friend x Leader y   // Remove the Custom Friend Icon from
 *                                    // friend x in Leader y's friend list.
 *
 * 3. Custom Leader Icon
 *    This icon, unlike 2 icons above, is located in Window Leader List instead
 * of Window Friend List. It's located just to the right of Leader's name.
 * This icon is also merely visual. It doesn't have any gameplay impact.
 *    To add this icon, simply use this plugin command:
 *
 * AFS CLI x Leader y                 // Add icon x beside Leader y's name.
 *
 *    You can remove Custom Leader Icon anytime by using this plugin command:
 *
 * AFS CLI Remove Leader x            // Remove Custom Leader Icon beside Leader
 *                                    // x's name.
 *
 * ============================================================================
 * Notetags List
 * ============================================================================
 * Actors Notetags:
 * <AFS Leader>
 * <AFS Exp: n1, n2, n3, n4, n5>
 * <AFS Max Level: x>
 * <AFS Skill x Leader y: n>
 * <AFS Skill x Leader y: n1, n2, n3, n4, n5>
 * <AFS Max Skill Leader x: n>
 * <AFS Max Skill Leader x: n1, n2, n3, n4, n5>
 * <AFS Icon Level x Leader y: n>
 * <AFS Icon Level x Leader y: n1, n2, n3, n4, n5>
 * <AFS Lock Icon: x>
 *
 * Skills and Items Notetags:
 * <AFS Gain x: n>
 * <AFS Gain Default: n>
 *
 * ============================================================================
 * Plugin Commands List
 * ============================================================================
 * AFS Open
 * AFS Show Leader x
 * AFS Hide Leader x
 * AFS Show Friend x Leader y
 * AFS Hide Friend x Leader y
 * AFS Gain x Friend y Leader z
 * AFS Lose x Friend y Leader z
 * AFS Level Up Friend x Leader y
 * AFS Level Down Friend x Leader y
 * AFS Lock Friend x Leader y
 * AFS Unlock Friend x Leader y
 * AFS Cap Leader x Level y
 * AFS Uncap Leader x
 * AFS CLI x Leader y
 * AFS CLI Remove Leader x
 * AFS CFI x Friend y Leader z
 * AFS CFI Remove Friend x Leader y
 *
 * SPECIAL Plugin Commands!
 *
 * AFS Var x FP Friend y Leader z
 * "Change variable x value to be equal to the total FP that actor y have
 * towards Leader z."
 *
 * AFS Var x Level Friend y Leader z
 * "Change variable x value to be equal to the actor y's Friendship Level
 * towards Leader z."
 *
 * AFS Var x Best FP Leader y
 * "The engine will look at all the actors in Leader y's friend list. Then, it
 * will search the highest FP total among all these actors. The highest FP value
 * will be put inside variable x."
 *
 * AFS Var x Best Level Leader y
 * "The engine will look at all the actors in Leader y's friend list. Then, it
 * will search the highest Friendship Level among all these actors. The highest
 * level will be put inside variable x."
 *
 * AFS Var x Best FP Friend Leader y
 * "The engine will look at all the actors in Leader y's friend list. Then, it
 * will search the highest FP total among all these actors. Then, it will check
 * which actor has the highest FP total. This actor ID will be put inside
 * variable x."
 *
 * AFS Var x Best Level Friend Leader y
 * "The engine will look at all the actors in Leader y's friend list. Then, it
 * will search the highest Friendship Level among all these actors. Then, it
 * will check which actor has the highest Friendship Level. This actor ID will
 * be put inside variable x."
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
 * Version 2.01:
 * - Fixed a game breaking bug when using Skill or Item with FP gain effect.
 *
 * Version 2.0:
 * - A complete rewritten of the plugin. Introduced multiple leaders feature.
 *   Ton of new features added.
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

Moogle_X.AFS.parameters = PluginManager.parameters('Moogle_X_ActorsFriendshipSystem');
Moogle_X.AFS.defAllLeaders = Number(Moogle_X.AFS.parameters['Default All Leaders']) != 0;
Moogle_X.AFS.defMaxLevel = Number(Moogle_X.AFS.parameters['Default Max Level'] || 10);
Moogle_X.AFS.defExp = Number(Moogle_X.AFS.parameters['Default Exp for Level Up'] || 20);
    Moogle_X.AFS.defExp = Moogle_X.AFS.defExp > 0 ? Moogle_X.AFS.defExp : 1;
Moogle_X.AFS.canLevelDown = Number(Moogle_X.AFS.parameters['Allows Level Down']) != 0;
Moogle_X.AFS.battleFp = Number(Moogle_X.AFS.parameters['Friendship Gain Each Battle'] || 0);
Moogle_X.AFS.singleLeaderScene = Number(Moogle_X.AFS.parameters['Use Single Leader Scene']) != 0;
Moogle_X.AFS.helpText = String(Moogle_X.AFS.parameters['Help Text'] || '');
Moogle_X.AFS.showFpMenu = Number(Moogle_X.AFS.parameters['Show in Main Menu']) != 0;
Moogle_X.AFS.fpTitle = String(Moogle_X.AFS.parameters['Menu Vocab'] || 'Friendship');
Moogle_X.AFS.fpMenuSwitch = Number(Moogle_X.AFS.parameters['Show Menu Switch ID'] || 0);
Moogle_X.AFS.backText = String(Moogle_X.AFS.parameters['Back Text'] || '');
Moogle_X.AFS.backIcon = Number(Moogle_X.AFS.parameters['Back Icon'] || 0);
Moogle_X.AFS.maxRows = Number(Moogle_X.AFS.parameters['Maximum Number of Rows'] || 4);
Moogle_X.AFS.leaderNameColor = Number(Moogle_X.AFS.parameters['Leader Name Color'] || 0);
Moogle_X.AFS.backTextColor = Number(Moogle_X.AFS.parameters['Back Text Color'] || 0);
Moogle_X.AFS.showFace = Number(Moogle_X.AFS.parameters["Show Friend's Face"]) != 0;
Moogle_X.AFS.faceOffsetX = Number(Moogle_X.AFS.parameters['Face Offset X'] || 0);
Moogle_X.AFS.faceOffsetY = Number(Moogle_X.AFS.parameters['Face Offset Y'] || 0);
Moogle_X.AFS.showName = Number(Moogle_X.AFS.parameters["Show Friend's Name"]) != 0;
Moogle_X.AFS.friendNameColor = Number(Moogle_X.AFS.parameters['Friend Name Color'] || 0);
Moogle_X.AFS.friendNameWidth = Number(Moogle_X.AFS.parameters['Friend Name Width'] || 168);
Moogle_X.AFS.friendNameAlignment = String(Moogle_X.AFS.parameters['Friend Name Alignment'] || 'left');
Moogle_X.AFS.friendNameOffsetX = Number(Moogle_X.AFS.parameters['Friend Name Offset X'] || 0);
Moogle_X.AFS.friendNameOffsetY = Number(Moogle_X.AFS.parameters['Friend Name Offset Y'] || 0);
Moogle_X.AFS.fpLvlText = String(Moogle_X.AFS.parameters['Friendship Level Text'] || '');
Moogle_X.AFS.showLevelText = Number(Moogle_X.AFS.parameters['Show Friendship Level Text']) != 0;
Moogle_X.AFS.fpLvlTextColor = Number(Moogle_X.AFS.parameters['Friendship Level Text Color'] || 0);
Moogle_X.AFS.fpLvlTextWidth = Number(Moogle_X.AFS.parameters['Friendship Level Text Width'] || 200);
Moogle_X.AFS.fpLvlTextAlignment = String(Moogle_X.AFS.parameters['Friendship Level Text Alignment'] || 'left');
Moogle_X.AFS.fpLvlTextOffsetX = Number(Moogle_X.AFS.parameters['Friendship Level Text Offset X'] || 0);
Moogle_X.AFS.fpLvlTextOffsetY = Number(Moogle_X.AFS.parameters['Friendship Level Text Offset Y'] || 0);
Moogle_X.AFS.showLevelNumber = Number(Moogle_X.AFS.parameters['Show Friendship Level Number']) != 0;
Moogle_X.AFS.fpLvlNumberColor = Number(Moogle_X.AFS.parameters['Friendship Level Number Color'] || 0);
Moogle_X.AFS.fpLvlNumberWidth = Number(Moogle_X.AFS.parameters['Friendship Level Number Width'] || 40);
Moogle_X.AFS.fpLvlNumberAlignment = String(Moogle_X.AFS.parameters['Friendship Level Number Alignment'] || 'right');
Moogle_X.AFS.fpLvlNumberOffsetX = Number(Moogle_X.AFS.parameters['Friendship Level Number Offset X'] || 0);
Moogle_X.AFS.fpLvlNumberOffsetY = Number(Moogle_X.AFS.parameters['Friendship Level Number Offset Y'] || 0);
Moogle_X.AFS.showGauge = Number(Moogle_X.AFS.parameters['Show Friendship Gauge']) != 0;
Moogle_X.AFS.fpGaugeColor1 = Number(Moogle_X.AFS.parameters['Color 1'] || 24);
Moogle_X.AFS.fpGaugeColor2 = Number(Moogle_X.AFS.parameters['Color 2'] || 29);
Moogle_X.AFS.fpGaugeWidth = Number(Moogle_X.AFS.parameters['Gauge Width'] || 382);
Moogle_X.AFS.fpGaugeHeight = Number(Moogle_X.AFS.parameters['Gauge Height'] || 6);
Moogle_X.AFS.fpGaugeOffsetX = Number(Moogle_X.AFS.parameters['Friendship Gauge Offset X'] || 0);
Moogle_X.AFS.fpGaugeOffsetY = Number(Moogle_X.AFS.parameters['Friendship Gauge Offset Y'] || 0);
Moogle_X.AFS.currentFpText = String(Moogle_X.AFS.parameters['Current FP Text'] || '');
Moogle_X.AFS.showCurrentFpText = Number(Moogle_X.AFS.parameters['Show Current FP Text']) != 0;
Moogle_X.AFS.currentFpTextColor = Number(Moogle_X.AFS.parameters['Current FP Text Color'] || 0);
Moogle_X.AFS.currentFpTextWidth = Number(Moogle_X.AFS.parameters['Current FP Text Width'] || 200);
Moogle_X.AFS.currentFpTextAlignment = String(Moogle_X.AFS.parameters['Current FP Text Alignment'] || 'left');
Moogle_X.AFS.currentFpTextOffsetX = Number(Moogle_X.AFS.parameters['Current FP Text Offset X'] || 0);
Moogle_X.AFS.currentFpTextOffsetY = Number(Moogle_X.AFS.parameters['Current FP Text Offset Y'] || 0);
Moogle_X.AFS.showCurrentFpNumber = Number(Moogle_X.AFS.parameters['Show Current FP Number']) != 0;
Moogle_X.AFS.currentFpNumberColor = Number(Moogle_X.AFS.parameters['Current FP Number Color'] || 0);
Moogle_X.AFS.currentFpNumberWidth = Number(Moogle_X.AFS.parameters['Current FP Number Width'] || 200);
Moogle_X.AFS.currentFpNumberAlignment = String(Moogle_X.AFS.parameters['Current FP Number Alignment'] || 'right');
Moogle_X.AFS.currentFpNumberOffsetX = Number(Moogle_X.AFS.parameters['Current FP Number Offset X'] || 0);
Moogle_X.AFS.currentFpNumberOffsetY = Number(Moogle_X.AFS.parameters['Current FP Number Offset Y'] || 0);
Moogle_X.AFS.nextLevelText = String(Moogle_X.AFS.parameters['To Next Level Text'] || '');
Moogle_X.AFS.showNextLevelText = Number(Moogle_X.AFS.parameters['Show To Next Level Text']) != 0;
Moogle_X.AFS.nextLevelTextColor = Number(Moogle_X.AFS.parameters['To Next Level Text Color'] || 0);
Moogle_X.AFS.nextLevelTextWidth = Number(Moogle_X.AFS.parameters['To Next Level Text Width'] || 200);
Moogle_X.AFS.nextLevelTextAlignment = String(Moogle_X.AFS.parameters['To Next Level Text Alignment'] || 'left');
Moogle_X.AFS.nextLevelTextOffsetX = Number(Moogle_X.AFS.parameters['To Next Level Text Offset X'] || 0);
Moogle_X.AFS.nextLevelTextOffsetY = Number(Moogle_X.AFS.parameters['To Next Level Text Offset Y'] || 0);
Moogle_X.AFS.showNextLevelNumber = Number(Moogle_X.AFS.parameters['Show To Next Level Number']) != 0;
Moogle_X.AFS.nextLevelNumberColor = Number(Moogle_X.AFS.parameters['To Next Level Number Color'] || 0);
Moogle_X.AFS.nextLevelNumberWidth = Number(Moogle_X.AFS.parameters['To Next Level Number Width'] || 200);
Moogle_X.AFS.nextLevelNumberAlignment = String(Moogle_X.AFS.parameters['To Next Level Number Alignment'] || 'right');
Moogle_X.AFS.nextLevelNumberOffsetX = Number(Moogle_X.AFS.parameters['To Next Level Number Offset X'] || 0);
Moogle_X.AFS.nextLevelNumberOffsetY = Number(Moogle_X.AFS.parameters['To Next Level Number Offset Y'] || 0);
Moogle_X.AFS.fpIconsOffsetX = Number(Moogle_X.AFS.parameters['Friendship Icons Offset X'] || 0);
Moogle_X.AFS.fpIconsOffsetY = Number(Moogle_X.AFS.parameters['Friendship Icons Offset Y'] || 0);
Moogle_X.AFS.defLockIcon = Number(Moogle_X.AFS.parameters['Default Lock Icon'] || 0);
Moogle_X.AFS.fpLockOffsetX = Number(Moogle_X.AFS.parameters['FP Lock Icon Offset X'] || 0);
Moogle_X.AFS.fpLockOffsetY = Number(Moogle_X.AFS.parameters['FP Lock Icon Offset Y'] || 0);
Moogle_X.AFS.customFpIconOffsetX = Number(Moogle_X.AFS.parameters['Custom Friend Icon Offset X'] || 0);
Moogle_X.AFS.customFpIconOffsetY = Number(Moogle_X.AFS.parameters['Custom Friend Icon Offset Y'] || 0);

//=============================================================================
// DataManager
//=============================================================================

Moogle_X.AFS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Moogle_X.AFS.DataManager_isDatabaseLoaded.call(this)) return false;
		DataManager.readNotetags_AFS1($dataActors);
    DataManager.readNotetags_AFS2($dataItems);
    DataManager.readNotetags_AFS2($dataSkills);
		return true;
};

DataManager.readNotetags_AFS1 = function(group) {
    var note1 = /<(?:AFS LEADER)>/i;
    var note2 = /<(?:AFS EXP):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
    var note3 = /<(?:AFS MAX LEVEL):[ ](\d+)>/i;
    var note4 = /<(?:AFS SKILL)[ ](\d+)[ ](?:LEADER)[ ](\d+):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
    var note5 = /<(?:AFS MAX SKILL LEADER)[ ](\d+):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
    var note6 = /<(?:AFS ICON LEVEL)[ ](\d+)[ ](?:LEADER)[ ](\d+):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
    var note7 = /<(?:AFS LOCK ICON):[ ](\d+)>/i;

  	for (var n = 1; n < group.length; n++) {
        var obj = group[n];
  		  var notedata = obj.note.split(/[\r\n]+/);

        obj.isAfsLeader = Moogle_X.AFS.defAllLeaders;
        obj.afsExpChart = [];
        obj.afsMaxLevel =
            Moogle_X.AFS.defMaxLevel > 0 ? Moogle_X.AFS.defMaxLevel : 1;
        obj.afsSkills = [];
        obj.afsSkills.push(null);
        obj.afsMaxSkills = {};
        obj.afsIcons = [];
        obj.afsIcons.push(null);
        obj.afsLockIcon = Moogle_X.AFS.defLockIcon;

        for (var z = 1; z < group.length; z++) {
            var empty = {};
            obj.afsSkills.push(empty);
        }

        for (var c = 1; c < group.length; c++) {
            var empty = {};
            obj.afsIcons.push(empty);
        }

        for (var i = 0; i < notedata.length; i++) {
  			    var line = notedata[i];
            if (line.match(note1)) {
                obj.isAfsLeader = true;

            } else if (line.match(note2)) {
                var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                obj.afsExpChart = obj.afsExpChart.concat(array);

            } else if (line.match(note3)) {
                var maxLevel = Number(RegExp.$1);
                obj.afsMaxLevel = maxLevel > 0 ? maxLevel : 1;

            } else if (line.match(note4)) {
                var level = Number(RegExp.$1);
                var leader = Number(RegExp.$2);
                var list = JSON.parse('[' + RegExp.$3.match(/\d+/g) + ']');
                obj.afsSkills[leader][level] = list;

            } else if (line.match(note5)) {
                var bestFriend = Number(RegExp.$1);
                var maxList = JSON.parse('[' + RegExp.$2.match(/\d+/g) + ']');
                obj.afsMaxSkills[bestFriend] = maxList;

            } else if (line.match(note6)) {
                var iconLevel = Number(RegExp.$1);
                var iconLeader = Number(RegExp.$2);
                var iconList = JSON.parse('[' + RegExp.$3.match(/\d+/g) + ']');
                obj.afsIcons[iconLeader][iconLevel] = iconList;

            } else if (line.match(note7)) {
                var lockIconId = Number(RegExp.$1);
                obj.afsLockIcon = lockIconId;
            }
        }
  	}
};

DataManager.readNotetags_AFS2 = function(group) {
    var note1 = /<(?:AFS GAIN)[ ](\d+):[ ](.*)>/i;
    var note2 = /<(?:AFS GAIN DEFAULT):[ ](.*)>/i;

    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
  		  var notedata = obj.note.split(/[\r\n]+/);

        obj.afsGain = {};

        for (var i = 0; i < notedata.length; i++) {
  			    var line = notedata[i];
            if (line.match(note1)) {
                var actorId = Number(RegExp.$1);
                var gain = Number(RegExp.$2);
                obj.afsGain[actorId] = gain;
            } else if (line.match(note2)) {
                var defaultGain = Number(RegExp.$1);
                obj.afsGain["default"] = defaultGain;
            }
        }
  	}
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.isAfsLeader = function() {
    return false; // Initialize value for Game_Enemy.
};

//=============================================================================
// Game_Actor
//=============================================================================

Moogle_X.AFS.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    Moogle_X.AFS.Game_Actor_initMembers.call(this);
    this._isAfsLeader = false;
    this._afsExp = {};
    this._afsLevel = {};
    this._afsExpChart = [];
    this._afsSkills = {};
    this._afsMaxSkills = {};
};

Moogle_X.AFS.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Moogle_X.AFS.Game_Actor_setup.call(this, actorId);
    this.initAfsLeaderSetup();
    this.initAfsExpSetup();
    this.initAfsSkills();
};

Game_Actor.prototype.initAfsLeaderSetup = function() {
    this._isAfsLeader = this.actor().isAfsLeader;
    this._afsLeaderShow = false;      // Show in leader menu.
    this._afsFriendList = [];         // List of actors show up in the scene.
    this._afsGlobalCap = 0;
    this._afsLock = {};
    for (var i = 1; i < $dataActors.length; i++) {
        this._afsLock[i] = false;
    }
    this._afsCustomLeaderIcon = 0;
    this._afsCustomFpIcon = {};
    for (var i = 1; i < $dataActors.length; i++) {
        this._afsCustomFpIcon[i] = 0;
    }
};

Game_Actor.prototype.applyAfsGlobalCap = function(levelCap) {
    this._afsGlobalCap = levelCap;
};

Game_Actor.prototype.removeAfsGlobalCap = function() {
    this._afsGlobalCap = 0;
};

Game_Actor.prototype.isAfsGlobalCap = function() {
    return this._afsGlobalCap !== 0;
};

Game_Actor.prototype.afsGlobalCap = function() {
    return this._afsGlobalCap;
};

Game_Actor.prototype.isAfsLock = function(leaderId) {
    return this._afsLock[leaderId];
};

Game_Actor.prototype.applyAfsLock = function(leaderId) {
    this._afsLock[leaderId] = true;
};

Game_Actor.prototype.removeAfsLock = function(leaderId) {
    this._afsLock[leaderId] = false;
};

Game_Actor.prototype.afsShowLeader = function() {
    if (this.isAfsLeader()) {
        this._afsLeaderShow = true;
    }
};

Game_Actor.prototype.afsHideLeader = function() {
    this._afsLeaderShow = false;
};

Game_Actor.prototype.initAfsExpSetup = function() {
    for (var i = 1; i < $dataActors.length; i++) {
        this._afsExp[i] = 0;
        this._afsLevel[i] = 0;
    }

    this._afsMaxLevel = this.actor().afsMaxLevel;
    var expChart = this.actor().afsExpChart;

    // Initialize the friendship experience requirements.
    for (var i = 0; i < this._afsMaxLevel; i++) {
        var n = expChart[i] || Moogle_X.AFS.defExp;
        this._afsExpChart.push(n);
    }
};

Game_Actor.prototype.isAfsLeader = function() {
    return this._isAfsLeader;
};

Game_Actor.prototype.afsExp = function(leaderId) {
    return this._afsExp[leaderId];
};

Game_Actor.prototype.afsLevel = function(leaderId) {
    return this._afsLevel[leaderId];
};

Game_Actor.prototype.initAfsSkills = function() {
    this._afsSkills = this.actor().afsSkills;
    this._afsMaxSkills = this.actor().afsMaxSkills;

    for (var i = 1; i < $dataActors.length; i++) {
        this.learnAfsSkill(0,i);
    }
};

Game_Actor.prototype.learnAfsSkill = function(level, leaderId) {
    if (this._afsSkills[leaderId][level]) {
        this._afsSkills[leaderId][level].forEach(function(skillId) {
            this.learnSkill(skillId);
        }, this);
    }
};

Game_Actor.prototype.forgetAfsSkill = function(level, leaderId) {
    if (this._afsSkills[leaderId][level]) {
        this._afsSkills[leaderId][level].forEach(function(skillId) {
            this.forgetSkill(skillId);
        }, this);
    }
};

Game_Actor.prototype.isMaxAfsLevel = function(leaderId) {
    return this.afsLevel(leaderId) >= this._afsMaxLevel;
};

Game_Actor.prototype.isMinAfsLevel = function(leaderId) {
    return this.afsLevel(leaderId) <= 0;
};

Game_Actor.prototype.afsLevelUp = function(leaderId) {
    if (!this.isMaxAfsLevel(leaderId)) {
        this._afsLevel[leaderId]++;
        this.learnAfsSkill(this.afsLevel(leaderId), leaderId);
        this.learnAfsMaxSkill(leaderId);
    }
    this.refresh();
};

Game_Actor.prototype.afsLevelDown = function(leaderId) {
    if (!this.isMinAfsLevel(leaderId) && Moogle_X.AFS.canLevelDown) {
        this._afsLevel[leaderId]--;
        this.forgetAfsSkill(this.afsLevel(leaderId) + 1, leaderId);
        this.forgetAfsMaxSkill(leaderId);
    }
    this.refresh();
};

Game_Actor.prototype.learnAfsMaxSkill = function(leaderId) {
    var bestFriend = $gameActors.actor(leaderId);
    if (this.isAfsLeader() && bestFriend.isAfsLeader()) {
        if (this.isMaxAfsLevel(leaderId) &&
            bestFriend.isMaxAfsLevel(this.actorId())) {
            this.learnBestFriendSkill(leaderId);
            $gameActors.actor(leaderId).learnBestFriendSkill(this.actorId());
        }
    }
};

Game_Actor.prototype.forgetAfsMaxSkill = function(leaderId) {
    var bestFriend = $gameActors.actor(leaderId);
    if (this.isAfsLeader() && bestFriend.isAfsLeader()) {
        if (!this.isMaxAfsLevel(leaderId) ||
            !bestFriend.isMaxAfsLevel(this.actorId())) {
            this.forgetBestFriendSkill(leaderId);
            $gameActors.actor(leaderId).forgetBestFriendSkill(this.actorId());
        }
    }
};

Game_Actor.prototype.learnBestFriendSkill = function(leaderId) {
    if (this._afsMaxSkills[leaderId]) {
        var skillList = this._afsMaxSkills[leaderId];
        skillList.forEach(function(skillId) {
            this.learnSkill(skillId);
        }, this);
    }
};

Game_Actor.prototype.forgetBestFriendSkill = function(leaderId) {
    if (this._afsMaxSkills[leaderId]) {
        var skillList = this._afsMaxSkills[leaderId];
        skillList.forEach(function(skillId) {
            this.forgetSkill(skillId);
        }, this);
    }
};

// Plugin Command <AFS Level Up Friend x Leader y>
Game_Actor.prototype.autoAfsLevelUp = function(leaderId) {
    if (!$gameActors.actor(leaderId).isAfsLeader()) return;
    if (this.isAfsLock(leaderId)) return; // FP Lock effect.
    if ($gameActors.actor(leaderId).isAfsGlobalCap()) {
        var levelCap = $gameActors.actor(leaderId).afsGlobalCap();
        if (this.afsLevel(leaderId) === levelCap) return;
    }

    this.afsLevelUp(leaderId);
    this._afsExp[leaderId] = this.afsNeedForLevel(this.afsLevel(leaderId) - 1);
};

// Plugin Command <AFS Level Down Friend x Leader y>
Game_Actor.prototype.autoAfsLevelDown = function(leaderId) {
    if (!$gameActors.actor(leaderId).isAfsLeader()) return;
    if (this.isAfsLock(leaderId)) return; // FP Lock effect.

    if (Moogle_X.AFS.canLevelDown) {
        this.afsLevelDown(leaderId);
        this._afsExp[leaderId] = this.afsNeedForLevel(this.afsLevel(leaderId) - 1);
    }
};

Game_Actor.prototype.gainAfs = function(exp, leaderId) {
    if (!$gameActors.actor(leaderId).isAfsLeader()) return;
    if (this.isAfsLock(leaderId)) return; // FP Lock effect.

    var newExp = this.afsExp(leaderId) + Math.round(exp);

    // Global Level Cap Effect part.
    if ($gameActors.actor(leaderId).isAfsGlobalCap()) {
        var levelCap = $gameActors.actor(leaderId).afsGlobalCap();
        if (this.afsLevel(leaderId) === levelCap) {
            return;
        } else if (this.afsLevel(leaderId) < levelCap) {
            newExp = Math.max(newExp, 0);
            newExp = Math.min(newExp, this.afsNeedForLevel(levelCap - 1));
        }
    }

    this._afsExp[leaderId] = Math.max(newExp, 0);
    this._afsExp[leaderId] =
        Math.min(this._afsExp[leaderId], this.afsNeedForLevel(this._afsMaxLevel - 1));
    while (!this.isMaxAfsLevel(leaderId) && this.afsExp(leaderId) >=
        this.nextAfsLevelExp(leaderId)) {
        this.afsLevelUp(leaderId);
    }
    this.refresh();
};

Game_Actor.prototype.loseAfs = function(exp, leaderId) {
    if (!$gameActors.actor(leaderId).isAfsLeader()) return;
    if (this.isAfsLock(leaderId)) return; // FP Lock effect.

    var newExp = this.afsExp(leaderId) - Math.round(exp);
    if (Moogle_X.AFS.canLevelDown) {
        this._afsExp[leaderId] = Math.max(newExp, 0);
    } else {
        this._afsExp[leaderId] = Math.max(newExp,
              this.afsNeedForLevel(this.afsLevel(leaderId) - 1));
    }

    while (!this.isMinAfsLevel(leaderId) && this.afsExp(leaderId) <=
        this.afsNeedForLevel(this.afsLevel(leaderId) - 1) && Moogle_X.AFS.canLevelDown) {
        this.afsLevelDown(leaderId);
    }
};

Game_Actor.prototype.nextAfsLevelExp = function(leaderId) {
    return this.afsNeedForLevel(this.afsLevel(leaderId));
};

Game_Actor.prototype.afsNeedForLevel = function(level) {
    var level = level;
    if (level > this._afsMaxLevel) {
        level = this._afsMaxLevel; // Safety measure. Just in case.
    }
    var expChart = this._afsExpChart;
    var totalFp = 0;
    for (var i = 0; i <= level; i++) {
        totalFp += expChart[i];
    }
    return totalFp;
};

Game_Actor.prototype.nextRequiredAfs = function(leaderId) {
    return this.nextAfsLevelExp(leaderId) - this.afsExp(leaderId);
};

Game_Actor.prototype.afsRate = function(leaderId) {
    if (this.isMaxAfsLevel(leaderId)) {
        return 1;
    }
    var exp = this.afsExp(leaderId);
    var expBefore = this.afsNeedForLevel(this.afsLevel(leaderId) - 1);
    var range = this._afsExpChart[this.afsLevel(leaderId)];
    return (exp - expBefore) / range;
};

Game_Actor.prototype.afsShowFriendship = function(friendId) {
    if (!this.isAfsLeader()) return;
    if (!this._afsFriendList.contains(friendId)) {
        // Show this actor in Scene_ActorsFriendship.
        this._afsFriendList.push(friendId);
        this._afsFriendList.sort(function(a, b) {
            return a - b;
        });
    }
};

Game_Actor.prototype.afsHideFriendship = function(friendId) {
    if (!this.isAfsLeader()) return;
    var index = this._afsFriendList.indexOf(friendId);
    if (index >= 0) {
        // Hide this actor in Scene_ActorsFriendship.
        this._afsFriendList.splice(index, 1);
    }
};

Game_Actor.prototype.afsIcons = function(level, leaderId) {
    return this.actor().afsIcons[leaderId][level];
};

Game_Actor.prototype.afsLockIcon = function() {
    return this.actor().afsLockIcon;
};

Game_Actor.prototype.afsCustomFpIcon = function(leaderId) {
    if (this._afsCustomFpIcon[leaderId] === undefined) {
        this._afsCustomFpIcon[leaderId] = 0;
    }
    return this._afsCustomFpIcon[leaderId];
};

Game_Actor.prototype.afsCustomLeaderIcon = function() {
    return this._afsCustomLeaderIcon;
};

Game_Actor.prototype.changeAfsCustomLeaderIcon = function(icon) {
    this._afsCustomLeaderIcon = icon;
};

Game_Actor.prototype.removeAfsCustomLeaderIcon = function() {
    this._afsCustomLeaderIcon = 0;
};

Game_Actor.prototype.changeAfsCustomFpIcon = function(leaderId, icon) {
    this._afsCustomFpIcon[leaderId] = icon;
};

Game_Actor.prototype.removeAfsCustomFpIcon = function(leaderId) {
    this._afsCustomFpIcon[leaderId] = 0;
};

Game_Actor.prototype.afsGetBestFp = function(varId) {
    var friendList = this._afsFriendList;
    if (friendList.length > 0) {
        var fpList = friendList.map(function(friendId) {
            return $gameActors.actor(friendId).afsExp(this.actorId());
        }, this);
        var bestFp = Math.max.apply(null, fpList);
        $gameVariables.setValue(varId, bestFp);
    }
};

Game_Actor.prototype.afsGetBestLevel = function(varId) {
    var friendList = this._afsFriendList;
    if (friendList.length > 0) {
        var levelList = friendList.map(function(friendId) {
            return $gameActors.actor(friendId).afsLevel(this.actorId());
        }, this);
        var bestLevel = Math.max.apply(null, levelList);
        $gameVariables.setValue(varId, bestLevel);
    }
};

Game_Actor.prototype.afsGetBestFpFriend = function(varId) {
    var friendList = this._afsFriendList;
    if (friendList.length > 0) {
        var fpList = friendList.map(function(friendId) {
            return $gameActors.actor(friendId).afsExp(this.actorId());
        }, this);
        var bestFp = Math.max.apply(null, fpList);
        var index = fpList.indexOf(bestFp);
        if (index >= 0) {
            $gameVariables.setValue(varId, friendList[index]);
        }
    }
};

Game_Actor.prototype.afsGetBestLevelFriend = function(varId) {
    var friendList = this._afsFriendList;
    if (friendList.length > 0) {
        var levelList = friendList.map(function(friendId) {
            return $gameActors.actor(friendId).afsLevel(this.actorId());
        }, this);
        var bestLevel = Math.max.apply(null, levelList);
        var index = levelList.indexOf(bestLevel);
        if (index >= 0) {
            $gameVariables.setValue(varId, friendList[index]);
        }
    }
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.getAfsValue = function(target) {
    var fpTotal = 0;

    if (target.isActor()) {
        var actorId = target.actorId();
        if (this.item().afsGain[actorId]) {
            fpTotal += this.item().afsGain[actorId];
        } else if (this.item().afsGain["default"]) {
            fpTotal += this.item().afsGain["default"];
        }
    }

    return fpTotal;
};

Moogle_X.AFS.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Moogle_X.AFS.Game_Action_applyItemUserEffect.call(this, target);
    this.preApplyAfsGain(target);
};

Game_Action.prototype.preApplyAfsGain = function(target) {
    if (!this.subject().isAfsLeader()) return;

    // In battle scenario...
    if ($gameParty.inBattle()) {
        this.applyAfsGain(target);

    // On map scenario...
    } else {
        // Using item...
        if (this.isItem()) {
            // Nothing. Because of multiple leaders, this part is no
            // longer functional. Bye bye!

        // Using skill...
        } else if (this.isSkill()) {
            this.applyAfsGain(target);
        }
    }
};

Game_Action.prototype.applyAfsGain = function(target) {
    if (target.isActor()) {
        var fp = this.getAfsValue(target);
        if (fp > 0) {
            target.gainAfs(fp, this.subject().actorId());
        } else if (fp < 0) {
            target.loseAfs(fp * -1, this.subject().actorId());
        }
    }
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.getBattleAfsLeaders = function() {
    var array = [];
    this.battleMembers().forEach(function(actor) {
        if (actor.isAfsLeader()) {
            array.push(actor);
        }
    });
    return array;
};

//=============================================================================
// BattleManager
//=============================================================================

Moogle_X.AFS.BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    var list = $gameParty.getBattleAfsLeaders();
    if (list.length > 0) {
        $gameParty.battleMembers().forEach(function(actor) {
            for (var i = 0; i < list.length; i++) {
                actor.gainAfs(Moogle_X.AFS.battleFp, list[i].actorId());
            }
        }, this);
    }
    Moogle_X.AFS.BattleManager_endBattle.call(this, result);
};

})(); // IIFE

//=============================================================================
// Scene_ActorsFriendship
//=============================================================================

function Scene_ActorsFriendship() {
    this.initialize.apply(this, arguments);
}

Scene_ActorsFriendship.prototype =
    Object.create(Scene_MenuBase.prototype);
Scene_ActorsFriendship.prototype.constructor = Scene_ActorsFriendship;

Scene_Menu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_ActorsFriendship.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
};

Scene_ActorsFriendship.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createAllAfsWindows();
};

Scene_ActorsFriendship.prototype.createAllAfsWindows = function() {
    this.createLeaderWindow();
    if (Moogle_X.AFS.singleLeaderScene) {
        this.createSingleFriendListWindow();
    } else { // Multiple Leaders version.
        this.createFriendListWindow();
    }
};

Scene_ActorsFriendship.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
};

Scene_ActorsFriendship.prototype.createHelpWindow = function() {
    Scene_MenuBase.prototype.createHelpWindow.call(this);
    this._helpWindow.setText(Moogle_X.AFS.helpText);
};

Scene_ActorsFriendship.prototype.createLeaderWindow = function() {
    var wy = this._helpWindow.height;
    var ww = 240;
    var wh = Graphics.boxHeight - wy;
    this._afsLeaderWindow = new Window_FriendshipLeaders(0, wy, ww, wh);
    this._afsLeaderWindow.setHandler('ok',     this.onAfsSlotOk.bind(this));
    this._afsLeaderWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._afsLeaderWindow);
};

Scene_ActorsFriendship.prototype.createFriendListWindow = function() {
    var wx = this._afsLeaderWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = Graphics.boxHeight - wy;
    this._friendListWindow = new Window_ActorsFriendship(wx, wy, ww, wh);
    this._friendListWindow.setHandler('cancel', this.onAfsFriendCancel.bind(this));
    this._afsLeaderWindow.setFriendListWindow(this._friendListWindow);
    this.addWindow(this._friendListWindow);
    this._afsLeaderWindow.activate();
    this._afsLeaderWindow.select(0);
};

Scene_ActorsFriendship.prototype.createSingleFriendListWindow = function() {
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight - wy;
    this._friendListWindow = new Window_ActorsFriendship(0, wy, ww, wh);
    this._friendListWindow.setHandler('cancel', this.popScene.bind(this));
    this._afsLeaderWindow.setFriendListWindow(this._friendListWindow);
    this.addWindow(this._friendListWindow);
    this._afsLeaderWindow.hide();
    this._afsLeaderWindow.select(0);
    this._friendListWindow.activate();
    this._friendListWindow.select(0);
};

Scene_ActorsFriendship.prototype.onAfsSlotOk = function() {
    if (this._afsLeaderWindow.item() !== 0) {
        this._friendListWindow.activate();
        this._friendListWindow.select(0);
    } else {
        SoundManager.playCancel();
        this.popScene();
    }
};

Scene_ActorsFriendship.prototype.onAfsFriendCancel = function() {
    this._afsLeaderWindow.activate();
    this._friendListWindow.deselect();
};

//=============================================================================
// Window_FriendshipLeaders
//=============================================================================

function Window_FriendshipLeaders() {
    this.initialize.apply(this, arguments);
}

Window_FriendshipLeaders.prototype = Object.create(Window_Selectable.prototype);
Window_FriendshipLeaders.prototype.constructor = Window_FriendshipLeaders;

Window_FriendshipLeaders.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this.refresh();
};

Window_FriendshipLeaders.prototype.setFriendListWindow = function(friendWindow) {
    this._friendListWindow = friendWindow;
    this.update();
};

Window_FriendshipLeaders.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this._friendListWindow.setLeader(this.item());
};

Window_FriendshipLeaders.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_FriendshipLeaders.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_FriendshipLeaders.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_FriendshipLeaders.prototype.makeItemList = function() {
    var list = [];
    for (var n = 1; n < $dataActors.length; n++) {
        if ($gameActors.actor(n).isAfsLeader()) {
            list.push($gameActors.actor(n));
        }
    }

    this._data = [];

    if (Moogle_X.AFS.singleLeaderScene) {
        this._data.push(list[0]);

    } else {
        list.forEach(function(leader) {
            if (leader._afsLeaderShow === true) {
                this._data.push(leader);
            }
        }, this);
        this._data.push(0);
    }
};

Window_FriendshipLeaders.prototype.drawItem = function(index) {
    this.clearItem(index);
    var rect = this.itemRect(index);
    var wx = Window_Base._iconWidth / 2 + this.textPadding() / 2;
    var wy = rect.y + rect.height + 16;
    this.changePaintOpacity(true);
    var iconWidth = Window_Base._iconWidth + 4;
    if (this._data[index] !== 0) {
      var actor = this._data[index];
      this.drawActorCharacter(actor, wx, wy);
      this.changeTextColor(this.textColor(Moogle_X.AFS.leaderNameColor));
      this.drawText(actor.name(), rect.x + iconWidth, rect.y, rect.width - iconWidth);
      this.drawIcon(actor.afsCustomLeaderIcon(), rect.width - 34, rect.y + 2);
    } else {
      this.drawIcon(Moogle_X.AFS.backIcon, rect.x + 2, rect.y + 2);
      this.changeTextColor(this.textColor(Moogle_X.AFS.backTextColor));
      this.drawText(Moogle_X.AFS.backText, rect.x + iconWidth, rect.y, rect.width - iconWidth);
    }
    this.resetTextColor();
};

//=============================================================================
// Window_ActorsFriendship
//=============================================================================

function Window_ActorsFriendship() {
    this.initialize.apply(this, arguments);
}

Window_ActorsFriendship.prototype = Object.create(Window_Selectable.prototype);
Window_ActorsFriendship.prototype.constructor = Window_ActorsFriendship;

Window_ActorsFriendship.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._leader = null;
};

Window_ActorsFriendship.prototype.setLeader = function(leader) {
    this._leader = leader;
    this.refresh();
};

Window_ActorsFriendship.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_ActorsFriendship.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};

Window_ActorsFriendship.prototype.numVisibleRows = function() {
    return Moogle_X.AFS.maxRows;
};

Window_ActorsFriendship.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_ActorsFriendship.prototype.makeItemList = function() {
    this._data = [];
    if (this._leader) {
        this._data = this._leader._afsFriendList.map(function(id) {
            return $gameActors.actor(id);
        });
    }
};

Window_ActorsFriendship.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_ActorsFriendship.prototype.drawItem = function(index) {
    if (this._leader) {
      this.drawItemImage(index);
      this.drawFriendName(index);
      this.drawFriendshipLevelText(index);
      this.drawFriendshipLevelNumber(index);
      this.drawFriendshipGauge(index);
      this.drawCurrentFpText(index);
      this.drawCurrentFpNumber(index);
      this.drawNextLevelText(index);
      this.drawNextLevelNumber(index);
      this.drawAfsIcons(index);
      this.drawFpLock(index);
      this.drawCustomFpIcon(index);
    }
};

Window_ActorsFriendship.prototype.drawItemImage = function(index) {
    if (!Moogle_X.AFS.showFace) return;
    var rect = this.itemRect(index);
    this.drawActorFace(this._data[index], rect.x + 1 + Moogle_X.AFS.faceOffsetX,
        rect.y + 1 + Moogle_X.AFS.faceOffsetY, 144, rect.height - 2);
    this.changePaintOpacity(true);
};

Window_ActorsFriendship.prototype.drawFriendName = function(index) {
    if (!Moogle_X.AFS.showName) return;
    var rect = this.itemRect(index);
    var wx = rect.x + 162 + Moogle_X.AFS.friendNameOffsetX;
    var wy = rect.y + Moogle_X.AFS.friendNameOffsetY;
    var width = Moogle_X.AFS.friendNameWidth || 168;
    var alignment = Moogle_X.AFS.friendNameAlignment;
    this.changePaintOpacity(true);
    this.changeTextColor(this.textColor(Moogle_X.AFS.friendNameColor));
    this.drawText(this._data[index].name(), wx, wy, width, alignment);
    this.resetTextColor();
};

Window_ActorsFriendship.prototype.drawFriendshipLevelText = function(index) {
    if (!Moogle_X.AFS.showLevelText) return;
    var rect = this.itemRect(index);
    var wx = rect.x + 300 + Moogle_X.AFS.fpLvlTextOffsetX;
    var wy = rect.y + Moogle_X.AFS.fpLvlTextOffsetY;
    var width = Moogle_X.AFS.fpLvlTextWidth || 200;
    var alignment = Moogle_X.AFS.fpLvlTextAlignment;
    var text = Moogle_X.AFS.fpLvlText;
    this.changePaintOpacity(true);
    this.changeTextColor(this.textColor(Moogle_X.AFS.fpLvlTextColor));
    this.drawText(text, wx, wy, width, alignment);
    this.resetTextColor();
};

Window_ActorsFriendship.prototype.drawFriendshipLevelNumber = function(index) {
    if (!Moogle_X.AFS.showLevelNumber) return;
    var rect = this.itemRect(index);
    var wx = rect.x + 495 + Moogle_X.AFS.fpLvlNumberOffsetX;
    var wy = rect.y + Moogle_X.AFS.fpLvlNumberOffsetY;
    var width = Moogle_X.AFS.fpLvlNumberWidth || 40;
    var alignment = Moogle_X.AFS.fpLvlNumberAlignment;
    var text = this._data[index].afsLevel(this._leader.actorId());
    this.changePaintOpacity(true);
    this.changeTextColor(this.textColor(Moogle_X.AFS.fpLvlNumberColor));
    this.drawText(text, wx, wy, width, alignment);
    this.resetTextColor();
};

Window_ActorsFriendship.prototype.drawFriendshipGauge = function(index) {
    if (!Moogle_X.AFS.showGauge) return;
    var rect = this.itemRect(index);
    var wx = rect.x + 162 + Moogle_X.AFS.fpGaugeOffsetX;
    var wy = rect.y + 55 + Moogle_X.AFS.fpGaugeOffsetY;
    var width = Moogle_X.AFS.fpGaugeWidth || 382;
    var color1 = this.textColor(Moogle_X.AFS.fpGaugeColor1);
    var color2 = this.textColor(Moogle_X.AFS.fpGaugeColor2);
    var rate = this._data[index].afsRate(this._leader.actorId());
    this.drawGauge(wx, wy, width, rate, color1, color2);
};

Window_ActorsFriendship.prototype.drawCurrentFpText = function(index) {
    if (!Moogle_X.AFS.showCurrentFpText) return;
    var rect = this.itemRect(index);
    var wx = rect.x + 600 + Moogle_X.AFS.currentFpTextOffsetX;
    var wy = rect.y + Moogle_X.AFS.currentFpTextOffsetY;
    var width = Moogle_X.AFS.currentFpTextWidth || 200;
    var alignment = Moogle_X.AFS.currentFpTextAlignment;
    var text = Moogle_X.AFS.currentFpText;
    this.changePaintOpacity(true);
    this.changeTextColor(this.textColor(Moogle_X.AFS.currentFpTextColor));
    this.drawText(text, wx, wy, width, alignment);
    this.resetTextColor();
};

Window_ActorsFriendship.prototype.drawCurrentFpNumber = function(index) {
    if (!Moogle_X.AFS.showCurrentFpNumber) return;
    var rect = this.itemRect(index);
    var wx = rect.x + 600 + Moogle_X.AFS.currentFpNumberOffsetX;
    var wy = rect.y + 32 + Moogle_X.AFS.currentFpNumberOffsetY;
    var width = Moogle_X.AFS.currentFpNumberWidth || 200;
    var alignment = Moogle_X.AFS.currentFpNumberAlignment;
    var text = this._data[index].afsExp(this._leader.actorId());
    this.changePaintOpacity(true);
    this.changeTextColor(this.textColor(Moogle_X.AFS.currentFpNumberColor));
    this.drawText(text, wx, wy, width, alignment);
    this.resetTextColor();
};

Window_ActorsFriendship.prototype.drawNextLevelText = function(index) {
    if (!Moogle_X.AFS.showNextLevelText) return;
    var rect = this.itemRect(index);
    var wx = rect.x + 600 + Moogle_X.AFS.nextLevelTextOffsetX;
    var wy = rect.y + 64 + Moogle_X.AFS.nextLevelTextOffsetY;
    var width = Moogle_X.AFS.nextLevelTextWidth || 200;
    var alignment = Moogle_X.AFS.nextLevelTextAlignment;
    var text = Moogle_X.AFS.nextLevelText;
    this.changePaintOpacity(true);
    this.changeTextColor(this.textColor(Moogle_X.AFS.nextLevelTextColor));
    this.drawText(text, wx, wy, width, alignment);
    this.resetTextColor();
};

Window_ActorsFriendship.prototype.drawNextLevelNumber = function(index) {
    if (!Moogle_X.AFS.showNextLevelNumber) return;
    var rect = this.itemRect(index);
    var wx = rect.x + 600 + Moogle_X.AFS.nextLevelNumberOffsetX;
    var wy = rect.y + 96 + Moogle_X.AFS.nextLevelNumberOffsetY;
    var width = Moogle_X.AFS.nextLevelNumberWidth || 200;
    var alignment = Moogle_X.AFS.nextLevelNumberAlignment;
    if (this._data[index].isMaxAfsLevel(this._leader.actorId())) {
        var text = "---";
    } else {
        var text = this._data[index].nextRequiredAfs(this._leader.actorId());
    }
    this.changePaintOpacity(true);
    this.changeTextColor(this.textColor(Moogle_X.AFS.nextLevelNumberColor));
    this.drawText(text, wx, wy, width, alignment);
    this.resetTextColor();
};

Window_ActorsFriendship.prototype.drawAfsIcons = function(index) {
    var leaderId = this._leader.actorId();
    var actor = this._data[index];
    var level = actor.afsLevel(leaderId);
    if (actor.afsIcons(level, leaderId)) {
        var rect = this.itemRect(index);
        var wx = rect.x + 162 + Moogle_X.AFS.fpIconsOffsetX;
        var wy = rect.y + 34 + Moogle_X.AFS.fpIconsOffsetY;
        var icons = actor.afsIcons(level, leaderId)
        for (var i = 0; i < icons.length; i++) {
            this.drawIcon(icons[i], wx + 32 * i, wy);
        }
    }
};

Window_ActorsFriendship.prototype.drawFpLock = function(index) {
    var leaderId = this._leader.actorId();
    var actor = this._data[index];
    if (actor.isAfsLock(leaderId)) {
        var rect = this.itemRect(index);
        var wx = rect.x + 262 + Moogle_X.AFS.fpLockOffsetX;
        var wy = rect.y + Moogle_X.AFS.fpLockOffsetY;
        var icon = actor.afsLockIcon();
        this.drawIcon(icon, wx, wy);
    }
};

Window_ActorsFriendship.prototype.drawCustomFpIcon = function(index) {
    var leaderId = this._leader.actorId();
    var actor = this._data[index];
    if (actor.afsCustomFpIcon(leaderId) !== 0) {
        var rect = this.itemRect(index);
        var wx = rect.x + 512 + Moogle_X.AFS.customFpIconOffsetX;
        var wy = rect.y + 34 + Moogle_X.AFS.customFpIconOffsetY;
        var icon = actor.afsCustomFpIcon(leaderId);
        this.drawIcon(icon, wx, wy);
    }
};

Window_ActorsFriendship.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, Moogle_X.AFS.fpGaugeHeight, this.gaugeBackColor());
    this.contents.gradientFillRect(x, gaugeY, fillW,
        Moogle_X.AFS.fpGaugeHeight, color1, color2);
};

//=============================================================================
// Scene_Menu
//=============================================================================

Moogle_X.AFS.Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    Moogle_X.AFS.Scene_Menu_createCommandWindow.call(this);
    if (Moogle_X.AFS.showFpMenu) {
        this._commandWindow.setHandler('friendship', this.commandFriendship.bind(this));
    }
};

Scene_Menu.prototype.commandFriendship = function() {
    SceneManager.push(Scene_ActorsFriendship);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Moogle_X.AFS.Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    Moogle_X.AFS.Window_MenuCommand_addOriginalCommands.call(this);
    if (Moogle_X.AFS.showFpMenu) {
        if (Moogle_X.AFS.fpMenuSwitch === 0) {
            this.addCommand(Moogle_X.AFS.fpTitle, 'friendship', true);
        } else if (Moogle_X.AFS.fpMenuSwitch > 0 &&
            $gameSwitches.value(Moogle_X.AFS.fpMenuSwitch)) {
            this.addCommand(Moogle_X.AFS.fpTitle, 'friendship', true);
        }
    }
};

(function() { // IIFE

//=============================================================================
// Game_Interpreter
//=============================================================================

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'AFS') {
        switch (args[0]) {
        case 'Open':
            SceneManager.push(Scene_ActorsFriendship);
            break;
        case 'Show':
            if (args[1] === "Leader") {
                $gameActors.actor(args[2]).afsShowLeader();
            } else if (args[1] === "Friend" && args[3] === "Leader") {
                $gameActors.actor(args[4]).afsShowFriendship(Number(args[2]));
            }
            break;
        case 'Hide':
            if (args[1] === "Leader") {
                $gameActors.actor(args[2]).afsHideLeader();
            } else if (args[1] === "Friend" && args[3] === "Leader") {
                $gameActors.actor(args[4]).afsHideFriendship(Number(args[2]));
            }
            break;
        case 'Gain':
            if (args[2] === "Friend" && args[4] === "Leader") {
                $gameActors.actor(args[3]).gainAfs(Number(args[1]), Number(args[5]));
            }
            break;
        case 'Lose':
            if (args[2] === "Friend" && args[4] === "Leader") {
                $gameActors.actor(args[3]).loseAfs(Number(args[1]), Number(args[5]));
            }
            break;
        case 'Level':
            if (args[1] === "Up" && args[2] === "Friend" && args[4] === "Leader") {
                $gameActors.actor(args[3]).autoAfsLevelUp(Number(args[5]));
            } else if (args[1] === "Down" && args[2] === "Friend" && args[4] === "Leader") {
                $gameActors.actor(args[3]).autoAfsLevelDown(Number(args[5]));
            }
            break;
        case 'Lock':
            if (args[1] === "Friend" && args[3] === "Leader") {
                $gameActors.actor(args[2]).applyAfsLock(Number(args[4]));
            }
            break;
        case 'Unlock':
            if (args[1] === "Friend" && args[3] === "Leader") {
                $gameActors.actor(args[2]).removeAfsLock(Number(args[4]));
            }
            break;
        case 'Cap':
            if (args[1] === "Leader" && args[3] === "Level") {
                $gameActors.actor(args[2]).applyAfsGlobalCap(Number(args[4]));
            }
            break;
        case 'Uncap':
            if (args[1] === "Leader") {
                $gameActors.actor(args[2]).removeAfsGlobalCap();
            }
            break;
        case 'CLI':
            if (args[2] === "Leader" && args[1] !== "Remove") {
                $gameActors.actor(args[3]).changeAfsCustomLeaderIcon(Number(args[1]));
            } else if (args[1] === "Remove" && args[2] === "Leader") {
                $gameActors.actor(args[3]).removeAfsCustomLeaderIcon();
            }
            break;
        case 'CFI':
            if (args[2] === "Friend" && args[4] === "Leader" && args[1] !== "Remove") {
                $gameActors.actor(args[3]).changeAfsCustomFpIcon(Number(args[5]), Number(args[1]));
            } else if (args[1] === "Remove" && args[2] === "Friend" && args[4] === "Leader" ) {
                $gameActors.actor(args[3]).removeAfsCustomFpIcon(Number(args[5]));
            }
            break;
        case 'Var':
            if (args[2] === "FP" && args[3] === "Friend" && args[5] === "Leader") {
                var fp = $gameActors.actor(args[4]).afsExp(Number(args[6])) || 0;
                $gameVariables.setValue(Number(args[1]), fp);
            } else if (args[2] === "Level" && args[3] === "Friend" && args[5] === "Leader") {
                var fpLevel = $gameActors.actor(args[4]).afsLevel(Number(args[6])) || 0;
                $gameVariables.setValue(Number(args[1]), fpLevel);
            } else if (args[2] === "Best" && args[3] === "FP" && args[4] === "Leader") {
                $gameActors.actor(args[5]).afsGetBestFp(Number(args[1]));
            } else if (args[2] === "Best" && args[3] === "Level" && args[4] === "Leader") {
                $gameActors.actor(args[5]).afsGetBestLevel(Number(args[1]));
            } else if (args[2] === "Best" && args[3] === "FP" &&
                args[4] === "Friend" && args[5] === "Leader") {
                $gameActors.actor(args[6]).afsGetBestFpFriend(Number(args[1]));
            } else if (args[2] === "Best" && args[3] === "Level" &&
                args[4] === "Friend" && args[5] === "Leader") {
                $gameActors.actor(args[6]).afsGetBestLevelFriend(Number(args[1]));
            }
            break;
        }
    }
};


})(); // IIFE

//=============================================================================
// End of File
//=============================================================================
