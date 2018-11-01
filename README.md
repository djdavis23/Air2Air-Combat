# Air2Air-Combat
Boise Codeworks Week 2 CheckPoint exercise.  Basic Game to practice Javascript-HTML-CSS interaction.

In this game, the player attempts to shoot down the adversary or "red force" aircraft before running out of ammunition.  
The player may choose the red and blue force aircraft, though defaults are provided.
Each aircraft is equiped with a cannon and two types of missiles.  Descriptions of the weapons and corresponding attack buttons
are located on the lower right side of the UI.
The player may also modify the attack by selecting defenses for the adversary aircraft.  Defenses and activation buttons are located on 
the lower left side of the UI.  Only one defense may be active at a time.  The selected defense remains active until the player selects
another defense.  Each defense is effective against one type of attack and can range from completely effective (0 damage done) to completely 
ineffective (max damage done).
If the adversary's health drops to/below zero, the player wins.
If the player runs out of missiles and bullets prior to the advesary dying, then the player loses.
This project created just with Vanilla javascript.  No DB to persist data.
