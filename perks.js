// Perks data (replace with your JSON data if needed)
const PERK_DATA = [
  {
    name: "Black Widow/Lady Killer",
    description: "+10% damage to the opposite sex and unique dialogue options with certain characters.",
    requirements: "LVL2",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Cherchez La Femme/Confirmed Bachelor",
    description: "+10% damage to the same sex and unique dialogue options with certain characters.",
    requirements: "LVL2",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Friend of the Night",
    description: "Your eyes adapt quickly to low-light conditions.",
    requirements: "LVL2, PE6, Sneak30",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Heave, Ho!",
    description: "+50% thrown weapon velocity and range.",
    requirements: "LVL2, ST5, Explosives30",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Hunter",
    description: "In combat, you do 75% more critical damage against animals and mutated animals.",
    requirements: "LVL2, Survival30",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Intense Training",
    description: "You can put a single point into any of your SPECIAL attributes.",
    requirements: "LVL2",
    source: "Base Game",
    maxRank: 10,
  },
  {
    name: "Rapid Reload",
    description: "All of your weapon reloads are 25% faster than normal.",
    requirements: "LVL2, AG5, Guns30",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Retention",
    description: "Skill magazines last for 3 real-time minutes.",
    requirements: "LVL2, IN5",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Swift Learner",
    description: "You gain an additional 10% whenever experience points are earned.",
    requirements: "LVL2, IN4",
    source: "Base Game",
    maxRank: 3,
  },
  {
    name: "Cannibal",
    description: "When you're in Sneak mode, you gain the option to eat a human corpse to regain hit points, but lose Karma.",
    requirements: "LVL4",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Comprehension",
    description: "You gain one additional skill point for reading books and double the skill points for reading magazines.",
    requirements: "LVL4, IN4",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Educated",
    description: "You gain two more skill points every time you advance in level.",
    requirements: "LVL4, IN4",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Entomologist",
    description: "You do an additional 50% damage every time you attack a mutated insect.",
    requirements: "LVL4, IN4, Survival45",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Rad Child",
    description: "Regenerate 2 HP per second per 200 rads accumulated.",
    requirements: "LVL4, Survival70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Run 'n Gun",
    description: "Halved spread with one-handed ranged weapons while walking or running.",
    requirements: "LVL4, Guns45 or EnergyWeapons45",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Travel Light",
    description: "While wearing light armor or no armor, you run 10% faster.",
    requirements: "LVL4, Survival45",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Bloody Mess",
    description: "+5% overall damage; more violent death animations.",
    requirements: "LVL6",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Demolition Expert",
    description: "+20% damage with explosives.",
    requirements: "LVL6, Explosives50",
    source: "Base Game",
    maxRank: 3,
  },
  {
    name: "Ferocious Loyalty",
    description: "When you drop below 50% HP, companions gain +50 DR.",
    requirements: "LVL6, CH6",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Fortune Finder",
    description: "Considerably more bottle caps will be found in stockpiles.",
    requirements: "LVL6, LK5",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Gunslinger",
    description: "+25% accuracy in V.A.T.S. with one-handed weapons.",
    requirements: "LVL6",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Hand Loader",
    description: "When using Guns, you are twice as likely to recover cases and hulls. You also have all hand load recipes unlocked at any reloading benches.",
    requirements: "LVL6, Repair70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Lead Belly",
    description: "-50% radiation taken from food and water sources.",
    requirements: "LVL6, EN6",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Shotgun Surgeon",
    description: "When using shotguns, regardless of ammunition used, you ignore an additional 10 points of a target's Damage Threshold.",
    requirements: "LVL6, Guns45",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "The Professional",
    description: "Your sneak attack criticals with revolvers, pistols, and submachine guns (guns and energy weapons) all inflict an additional 20% damage.",
    requirements: "LVL6, Sneak70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Toughness",
    description: "+3 DT permanently.",
    requirements: "LVL6, EN5",
    source: "Base Game",
    maxRank: 2,
  },
  {
    name: "Vigilant Recycler",
    description:
      "When using Energy Weapons, you are twice as likely to recover drained ammunition. You also have more efficient recycling recipes available at workbenches.",
    requirements: "LVL6, Science70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Commando",
    description: "+25% accuracy in V.A.T.S. with two-handed weapons.",
    requirements: "LVL8",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Cowboy",
    description: "+25% damage done by dynamite, hatchets, knives, revolvers, and lever-action guns.",
    requirements: "LVL8, Guns45, MeleeWeapons45",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Living Anatomy",
    description: "Shows health and Damage Threshold of any target. +5% bonus to damage against humans and non-feral ghouls.",
    requirements: "LVL8, Medicine70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Pack Rat",
    description: "Items with a weight of two pounds or less now weigh half as much.",
    requirements: "LVL8, IN5, Barter70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Quick Draw",
    description: "Makes weapon equipping and holstering 50% faster.",
    requirements: "LVL8, AG5",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Rad Resistance",
    description: "+25% radiation resistance permanently.",
    requirements: "LVL8, EN5, Survival40",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Scrounger",
    description: "Considerably more ammunition in stockpiles.",
    requirements: "LVL8, LK5",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Stonewall",
    description: "+5 DT against melee and unarmed attacks and cannot be knocked down during combat.",
    requirements: "LVL8, ST6, EN6",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Strong Back",
    description: "+50 Carry Weight.",
    requirements: "LVL8, ST5, EN5",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Super Slam!",
    description:
      "All melee (except thrown) and unarmed attacks have a chance of knocking your target down. 15% for Unarmed or one-handed melee, 30% for two-handed melee.",
    requirements: "LVL8, ST6, MeleeWeapons45",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Terrifying Presence",
    description: "Can intimidate foes through dialogue; closing dialogue results in the foe fleeing for 5 seconds.",
    requirements: "LVL8, Speech70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Here and Now",
    description: "You instantly level up again.",
    requirements: "LVL10",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Animal Friend",
    description: "On 1st rank, hostile animals become friendly. On 2nd rank they come to your aid against enemies except against other animals.",
    requirements: "LVL10, CH6, Survival45",
    source: "Base Game",
    maxRank: 2,
  },
  {
    name: "Finesse",
    description: "+5% Critical Chance.",
    requirements: "LVL10",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Math Wrath",
    description: "Reduces all AP costs by 10%.",
    requirements: "LVL10, Science70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Miss Fortune",
    description: "10% chance that Miss Fortune will incapacitate a target in V.A.T.S.",
    requirements: "LVL10, LK6",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Mister Sandman",
    description: "Can instantly kill a sleeping non-player character, and earn bonus XP when doing so.",
    requirements: "LVL10, Sneak60",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Mysterious Stranger",
    description: "10% chance that the Stranger will finish off a target in V.A.T.S.",
    requirements: "LVL10, LK6",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Nerd Rage!",
    description: "+15 DT and Strength increased to 10 whenever health is 20% or lower.",
    requirements: "LVL10, IN5, Science50",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Night Person",
    description: "+2 Intelligence and +2 Perception between 6:00 P.M. and 6:00 A.M.",
    requirements: "LVL10",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Plasma Spaz",
    description: "AP costs for all plasma weapons are reduced by 20%.",
    requirements: "LVL10, EnergyWeapons70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Fast Metabolism",
    description: "+20% Hit Points restored with stimpaks.",
    requirements: "LVL12",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Ghastly Scavenger",
    description: "When you're in Sneak mode, you gain the option to eat a super mutant or feral ghoul corpse to regain hit points, but lose Karma.",
    requirements: "LVL12, Cannibal Perk",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Hit the Deck",
    description: "+25 DT against explosives.",
    requirements: "LVL12, Explosives70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Life Giver",
    description: "+30 hit points.",
    requirements: "LVL12, EN6",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Long Haul",
    description: "Being over-encumbered no longer prevents you from using fast travel.",
    requirements: "LVL12, EN6, Barter70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Piercing Strike",
    description: "All your unarmed and melee attacks negate 15 points of DT.",
    requirements: "LVL12, Unarmed70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Pyromaniac",
    description: "+50% damage with fire-based weapons.",
    requirements: "LVL12, Explosives60",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Robotics Expert",
    description: "+25% damage to robots; can shut down robots by sneaking up on them and deactivating.",
    requirements: "LVL12, Science50",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Silent Running",
    description: "Running no longer factors into a successful sneak attempt.",
    requirements: "LVL12, AG6, Sneak50",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Sniper",
    description: "25% more likely to hit the target's head in V.A.T.S.",
    requirements: "LVL12, PE6, AG6",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Splash Damage",
    description: "Explosives have a 25% larger area of effect.",
    requirements: "LVL12, Explosives70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Unstoppable Force",
    description: "x4 normal damage through enemy blocks with melee and unarmed attacks.",
    requirements: "LVL12, ST7, MeleeWeapons90",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Adamantium Skeleton",
    description: "Damage taken by limbs reduced by 50%.",
    requirements: "LVL14",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Center of Mass",
    description: "In V.A.T.S., you do an additional 15% damage when targeting the torso.",
    requirements: "LVL14, Guns70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Chemist",
    description: "Chems and (in Hardcore) stimpaks last twice as long.",
    requirements: "LVL14, Medicine60",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Jury Rigging",
    description: "Repair any item using a roughly similar item.",
    requirements: "LVL14, Repair90",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Light Step",
    description: "Floor traps or mines will not be set off.",
    requirements: "LVL14, PE6, AG6",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Purifier",
    description:
      "You do 50% extra damage with melee and unarmed weapons against centaurs, night stalkers, spore plants, spore carriers, deathclaws and super mutants.",
    requirements: "LVL14",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Action Boy/Action Girl",
    description: "+15 Action Points.",
    requirements: "LVL16, AG6",
    source: "Base Game",
    maxRank: 2,
  },
  {
    name: "Better Criticals",
    description: "+50% damage with critical hits.",
    requirements: "LVL16, PE6, LK6",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Chem Resistant",
    description: "Half as likely to get addicted.",
    requirements: "LVL16, Medicine60",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Meltdown",
    description: "Foes killed by your Energy Weapons emit a corona of harmful energy.",
    requirements: "LVL16, EnergyWeapons90",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Tag!",
    description: 'Fourth "tag" skill: +15 points to that skill.',
    requirements: "LVL16",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Weapon Handling",
    description: "Weapon Strength requirements are now 2 points lower than normal for you.",
    requirements: "LVL16, ST < 10",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Computer Whiz",
    description: "Can make one extra attempt to hack a locked-down terminal.",
    requirements: "LVL18, IN7, Science70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Concentrated Fire",
    description: "+5% accuracy in V.A.T.S. with every attack on a given body part queued.",
    requirements: "LVL18, EnergyWeapons60, Guns60",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Infiltrator",
    description: "Can make one more attempt to pick a broken lock.",
    requirements: "LVL18, PE7, Lockpick70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Paralyzing Palm",
    description: "Can paralyze an enemy for 30 seconds with a V.A.T.S. unarmed attack.",
    requirements: "LVL18, Unarmed70",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Explorer",
    description: "All locations are marked on your map.",
    requirements: "LVL20",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Grim Reaper's Sprint",
    description: "A kill in V.A.T.S. restores 20 AP immediately.",
    requirements: "LVL20",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Ninja",
    description:
      "x1.15 (instead of +15 luck due to a bug) critical chance with melee and unarmed weapons, +25% damage with melee/unarmed sneak attack criticals.",
    requirements: "LVL20, MeleeWeapons80, Sneak80",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Solar Powered",
    description: "+2 Strength and +1 HP per second while outside, from 6:00 A.M. to 6:00 P.M.",
    requirements: "LVL20, EN7",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Laser Commander",
    description: "You do an extra 15% damage and have a 10% extra chance to critically hit with any laser weapon.",
    requirements: "LVL22, EnergyWeapons90",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Nuka Chemist",
    description: "Unlocks special Nuka-Cola recipes at the workbench.",
    requirements: "LVL22, Science90",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Spray 'n Pray",
    description: "Your attacks do 75% less damage to companions.",
    requirements: "LVL22",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Slayer",
    description: "The speed of all your melee and unarmed attacks is increased by 30%.",
    requirements: "LVL24, AG7, Unarmed90",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Nerves of Steel",
    description: "20% faster AP regeneration.",
    requirements: "LVL26, AG7",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "Rad Absorption",
    description: "-1 Rad every 20 seconds.",
    requirements: "LVL28, EN7",
    source: "Base Game",
    maxRank: 1,
  },
  {
    name: "In Shining Armor",
    description: "This perk is bugged and applies no effect.",
    requirements: "LVL2, Repair20, Science70",
    source: "Dead Money",
    maxRank: 1,
  },
  {
    name: "Junk Rounds",
    description: "You can craft ammunition using scrap metal and tin cans.",
    requirements: "LVL2, LK6, Repair45",
    source: "Dead Money",
    maxRank: 1,
  },
  {
    name: "Light Touch",
    description: "While wearing light armor you gain +5% critical hit chance and your enemies suffer a -25% critical hit chance.",
    requirements: "LVL2, AG6, Repair45",
    source: "Dead Money",
    maxRank: 1,
  },
  {
    name: "Old World Gourmet",
    description:
      "+25% addiction resistance. +50% health bonus from snack foods. Scotch, vodka and wine now give you health in addition to their normal effects.",
    requirements: "LVL2, EN6, Survival45",
    source: "Dead Money",
    maxRank: 1,
  },
  {
    name: "And Stay Back",
    description: "Shotguns have a 10% chance, per pellet, of knocking an enemy back.",
    requirements: "LVL10, Guns70",
    source: "Dead Money",
    maxRank: 1,
  },
  {
    name: "Heavyweight",
    description: "Weapons with a weight of more than 10 are cut in half. This does not affect weapons modded to under 10 wg.",
    requirements: "LVL12, ST7",
    source: "Dead Money",
    maxRank: 1,
  },
  {
    name: "Hobbler",
    description: "Your chance to hit an opponent's legs in V.A.T.S. is increased by 25%.",
    requirements: "LVL12, PE7",
    source: "Dead Money",
    maxRank: 1,
  },
  {
    name: "Eye for Eye",
    description: "For each crippled limb you have, you do an additional 10% damage.",
    requirements: "LVL20",
    source: "Honest Hearts",
    maxRank: 1,
  },
  {
    name: "Fight the Power!",
    description: "+2 Damage Threshold and +5% Critical chance against anyone wearing NCR, Legion or Brotherhood of Steel armor.",
    requirements: "LVL10",
    source: "Honest Hearts",
    maxRank: 1,
  },
  {
    name: "Grunt",
    description:
      "25% more damage with 9mm pistols and SMGs, .45 pistols and SMGs, service rifles, assault and Marksman carbines, light machine guns, frag grenades, grenade rifles and launchers and combat knives.",
    requirements: "LVL8, Guns45, Explosives20",
    source: "Honest Hearts",
    maxRank: 1,
  },
  {
    name: "Home on the Range",
    description: "Whenever you interact with a campfire, you have the option of sleeping, with all the benefits that sleep brings.",
    requirements: "LVL8, Survival70",
    source: "Honest Hearts",
    maxRank: 1,
  },
  {
    name: "Sneering Imperialist",
    description: "+15% Damage and +25% accuracy in V.A.T.S. to various tribal and raider characters.",
    requirements: "LVL8",
    source: "Honest Hearts",
    maxRank: 1,
  },
  {
    name: "Tribal Wisdom",
    description:
      "-50% limb damage from animals, mutated animals, and mutated insects, +25% to Poison resistance, ability to eat mutated insects in sneak mode.",
    requirements: "LVL8, Survival70",
    source: "Honest Hearts",
    maxRank: 1,
  },
  {
    name: "Atomic!",
    description: "In irradiated areas, +25% move and attack speed, +2 DT, +2 ST. With excess rad level, AP regen scales from 1.1 times to 1.5 times normal.",
    requirements: "LVL20, EN6",
    source: "Old World Blues",
    maxRank: 1,
  },
  {
    name: "Mile in Their Shoes",
    description:
      "You have come to understand night stalkers. Consuming night stalker squeezin's now grants bonuses to Perception (+1 PER), Poison Resistance (+5), and Stealth (+5 Sneak) in addition to the normal benefits.",
    requirements: "LVL20, Survival25",
    source: "Old World Blues",
    maxRank: 1,
  },
  {
    name: "Them's Good Eatin'",
    description: "Any living creature you kill has a 50% chance to have the potent healing items thin red paste or blood sausage when looted.",
    requirements: "LVL20, Survival55",
    source: "Old World Blues",
    maxRank: 1,
  },
  {
    name: "Implant GRX",
    description:
      "You gain a non-addictive subdermal turbo (chem) injector. This perk may be taken twice, with the second rank increasing the effect from 2 to 3 seconds and the uses per day from 5 to 10 (activated in the Pip-Boy inventory).",
    requirements: "LVL30, EN8",
    source: "Old World Blues",
    maxRank: 2,
  },
  {
    name: "Ain't Like That Now",
    description: "Karma reset to 0, +25% AP regeneration rate, +20% attack speed, immunity to critical hits.",
    requirements: "LVL50, Karma less than -250",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Alertness",
    description: "+2 Perception when crouched and still.",
    requirements: "LVL12, PE between 6 and 8",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Broad Daylight",
    description: "No Sneak penalty for using Pip-Boy light.",
    requirements: "LVL36",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Burden to Bear",
    description: "+50 carry weight.",
    requirements: "LVL30, ST6, EN6",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Certified Tech",
    description: "+25% critical hit chance against robots, 85% chance of finding an extra crafting component on destroyed robots.",
    requirements: "LVL40",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Irradiated Beauty",
    description: "Sleep removes all Rads (Hardcore: only -100 Rads).",
    requirements: "LVL22, EN8",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Just Lucky I'm Alive",
    description: "+4 Luck for 3 minutes upon finishing a battle with less than 25% health; immunity to critical hits, +50% critical damage.",
    requirements: "LVL50, Karma between -250 and 250",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Lessons Learned",
    description: "+1% XP gain per player level.",
    requirements: "LVL26, IN6",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Roughin' It",
    description: "Sleeping outside gives Well Rested benefit.",
    requirements: "LVL28, Survival100",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Thought You Died",
    description: "+10 Health per 100 Karma; Karma reset to 0, +10% damage, immunity to critical hits.",
    requirements: "LVL50, Karma at least 250",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Tunnel Runner",
    description: "+25% sneaking speed when wearing light or no armor.",
    requirements: "LVL26, AG8",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Voracious Reader",
    description: "Damaged books become blank magazines; can copy existing magazines into blank magazines.",
    requirements: "LVL22, IN7",
    source: "Lonesome Road",
    maxRank: 1,
  },
  {
    name: "Mad Bomber",
    description: "Enables you to create special explosive recipes at any workbench.",
    requirements: "LVL6, Repair45, Explosives45",
    source: "Gun Runners Arsenal",
    maxRank: 1,
  },
];

// Map SPECIAL acronyms to full names
const SPECIAL_MAP = {
  IN: "Intelligence",
  ST: "Strength",
  PE: "Perception",
  EN: "Endurance",
  CH: "Charisma",
  AG: "Agility",
  LK: "Luck",
};

const PERK_ALLOCATION_DATA = {
  perksAllocated: 0,
  perksAllocatable: 12,
  selectedPerks: [],
};

/**
 * Flags perk rows if their level, SPECIAL, and skill requirements are not met.
 *
 * @param {Array} perkData
 * @param {Array} specialData
 * @param {Array} skillData
 * @param {Array} levelData
 */
function perkRequirementsMet(perk, specialData, skillData, levelData) {
  const requirementsMet = perk.requirementsArray.every((req) => {
    // Check for LVL requirements
    if (req.startsWith("LVL")) {
      const requiredLevel = parseInt(req.replace("LVL", "").trim());
      const playerLevel = levelData[0].total; // Assuming levelData[0] stores current level
      return playerLevel >= requiredLevel;
    }

    // Check for SPECIAL requirements
    const specialMatch = req.match(/^(IN|ST|PE|EN|CH|AG|LK)(\d+)$/);
    if (specialMatch) {
      const specialName = SPECIAL_MAP[specialMatch[1]];
      const requiredValue = parseInt(specialMatch[2]);
      const special = specialData.find((s) => s.name === specialName);
      return special && special.total >= requiredValue;
    }

    // Check for skill requirements
    const skillMatch = req.match(/^([A-Za-z\s]+)(\d{2})$/); // Matches string followed by 2-digit number
    if (skillMatch) {
      const skillName = skillMatch[1].trim();
      const requiredSkillValue = parseInt(skillMatch[2]);
      skillData.forEach(skill => console.log(skill.name.replace(/\s/g, "")));
      const skill = skillData.find((s) => s.name.replace(/\s/g, "") === skillName);
      return skill && skill.total >= requiredSkillValue;
    }

    // Default to true for unrecognized requirements (karma, prerequisite perks, nonspecific SPECIAL values)
    return true;
  });

  perk.requirementsMet = requirementsMet;
  return perk.requirementsMet;
}

/**
 * Updates the perk point counter and shows/hides perk ranks taken.
 *
 * @param {*} row
 * @param {object} perk
 */
function updateSelectedPerks(perk) {
  const row = document.getElementById(`${perk.name}-perk-row`);
  const perkPointsCounter = document.getElementById("perk-points-counter");
  perkPointsCounter.innerHTML = PERK_ALLOCATION_DATA.perksAllocated;

  if (PERK_ALLOCATION_DATA.perksAllocated > PERK_ALLOCATION_DATA.perksAllocatable) {
    perkPointsCounter.classList.add("points-exceeded");
  } else {
    perkPointsCounter.classList.remove("points-exceeded");
  }

  const perkNameCell = row.querySelector("td:first-child"); // Assuming name is in the first cell
  if (perk.ranksTaken > 0) {
    perkNameCell.textContent = `${perk.name} (${perk.ranksTaken}/${perk.maxRank})`;
  } else {
    perkNameCell.textContent = perk.name; // Restore original name
  }
}

function updatePerks(perk) {
  updateSelectedPerks(perk);
  updatePlanner(PERK_ALLOCATION_DATA.selectedPerks);
}

function handlePerkClick(perk) {
  // Prevent selection if requirements are not met
  if (!perk.requirementsMet) {
    return;
  }

  const selectedIndex = PERK_ALLOCATION_DATA.selectedPerks.findIndex((p) => p.name === perk.name);

  // Perk has not been selected yet
  if (selectedIndex === -1) {
    selectPerk(perk);
  } else {
    if (perk.ranksTaken < perk.maxRank) {
      selectPerk(perk);
    } else {
      // Remove perk if already selected
      PERK_ALLOCATION_DATA.perksAllocated -= perk.ranksTaken;
      perk.ranksTaken = 0;
      perk.levelTaken = 0;
      document.getElementById(`${perk.name}-perk-row`).classList.remove("selected-perk"); // Remove highlight
      PERK_ALLOCATION_DATA.selectedPerks = PERK_ALLOCATION_DATA.selectedPerks.filter((p) => p.name != perk.name);
      updatePerks(perk);
    }
  }
  updateSelectedPerks(perk);
  updatePlanner(PERK_ALLOCATION_DATA.selectedPerks);
}

function selectPerk(perk) {
  const row = document.getElementById(`${perk.name}-perk-row`);
  perk.ranksTaken += 1;
  perk.levelTaken = perk.lvl;

  // We need to copy the item to make sure different ranks of same perk have different IDs
  PERK_ALLOCATION_DATA.selectedPerks.push(JSON.parse(JSON.stringify(perk)));
  PERK_ALLOCATION_DATA.selectedPerks[PERK_ALLOCATION_DATA.selectedPerks.length - 1].id = PERK_ALLOCATION_DATA.perksAllocated;
  PERK_ALLOCATION_DATA.perksAllocated += 1;

  row.classList.add("selected-perk"); // Highlight the selected row
}

/**
 * Renders rows for perks.
 *
 * @param {object} perkData
 * @param {object} specialData
 * @param {object} skillData
 * @param {object} levelData
 */
function populatePerks(perkData, specialData, skillData, levelData) {
  const perkRows = document.getElementById("perk-rows");

  // Preprocess perks: Split requirements into arrays and add a numeric LVL field for sorting
  perkData.forEach((perk) => {
    const requirementParts = perk.requirements.split(",").map((req) => req.trim());
    perk.requirementsArray = requirementParts;
    const lvlMatch = requirementParts.find((req) => req.startsWith("LVL"));
    perk.lvl = lvlMatch ? parseInt(lvlMatch.replace("LVL", "").trim()) : 0;
  });

  // Sort perks: First by LVL, then alphabetically by name
  perkData.sort((a, b) => {
    if (a.lvl !== b.lvl) {
      return a.lvl - b.lvl; // Sort by LVL numerically
    }
    return a.name.localeCompare(b.name); // Sort alphabetically by name
  });

  // Create a table container
  const tableContainer = document.createElement("div");
  tableContainer.className = "scrollable-table-container";

  // Create the table
  const table = document.createElement("table");
  table.className = "scrollable-table";

  // Create table header
  const thead = document.createElement("thead");
  thead.className = "scrollable-table-header-container";

  const headerRow = document.createElement("tr");
  const displayedPerkAttributes = ["Name", "Description", "Requirements"];
  displayedPerkAttributes.forEach((header) => {
    const th = document.createElement("th");
    th.className = "scrollable-table-header";
    th.textContent = header;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");

  perkData.forEach((perk) => {
    const row = document.createElement("tr");
    row.className = "scrollable-table-row";
    row.id = `${perk.name}-perk-row`;

    // Disable perk rows where requirements are not met (all perks initially)
    if (!perkRequirementsMet(perk, specialData, skillData, levelData)) {
      row.classList.add("requirements-not-met");
    } else {
      row.classList.remove("requirements-not-met");
    }

    // Create table data
    displayedPerkAttributes.forEach((key) => {
      const td = document.createElement("td");
      td.className = "scrollable-table-data";
      if (key === "Requirements") {
        td.textContent = perk.requirementsArray.join(", "); // Display requirements as a comma-separated string
      } else {
        td.textContent = perk[key.toLowerCase()]; // Use key.toLowerCase() to match JSON keys
      }
      row.appendChild(td);
    });

    // Attach click handler
    row.addEventListener("click", () => handlePerkClick(perk));

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableContainer.appendChild(table);

  // Append the table container to the perkRows div
  perkRows.appendChild(tableContainer);
}

function renderPlanner() {
  const plannerRows = document.getElementById("planner-rows");
  plannerRows.innerHTML = ""; // Clear previous content

  // Generate HTML content for all even levels from 1 to 50
  for (let level = 2; level <= 50; level += 2) {
    // Create a section for each level
    const levelSection = document.createElement("div");
    levelSection.classList.add("level-section");
    levelSection.setAttribute("section-level", level);

    // Add a header for the level
    const levelHeader = document.createElement("h2");
    levelHeader.textContent = `-- Level ${level} --`;
    levelHeader.classList.add("level-header");

    // Append header and perks list
    levelSection.appendChild(levelHeader);

    // Empty perks list for this level
    const perksList = document.createElement("ul");
    perksList.classList.add("planner-list");
    levelSection.appendChild(perksList);

    // Append to the planner rows
    plannerRows.appendChild(levelSection);
  }
}

// Function to populate the planner
function updatePlanner(selectedPerks) {
  renderPlanner(); // Render the level sections first

  const plannerRows = document.getElementById("planner-rows");
  const perksByLevel = selectedPerks.reduce((acc, perk) => {
    acc[perk.levelTaken] = acc[perk.levelTaken] || [];
    acc[perk.levelTaken].push(perk);
    return acc;
  }, {});

  // Add perks to the appropriate sections
  for (let level = 2; level <= 50; level += 2) {
    const levelSection = plannerRows.querySelector(`[section-level="${level}"]`);
    const perksList = levelSection.querySelector(".planner-list");

    if (perksByLevel[level]) {
      perksByLevel[level].forEach((selectedPerk) => {
        const perkItem = document.createElement("li");
        perkItem.classList.add("planner-item");
        perkItem.setAttribute("id", selectedPerk.id);
        perkItem.setAttribute("name", selectedPerk.name);
        perkItem.setAttribute("minLevel", selectedPerk.lvl);
        perkItem.setAttribute("levelTaken", selectedPerk.levelTaken);

        // Perk content and delete button
        perkItem.innerHTML = `
          <button class="remove-perk">x</button>
          <div class="perk-details">
            <p>${selectedPerk.name}: ${selectedPerk.description}</p>
            <p>Requirements: ${selectedPerk.requirementsArray}</p>
          </div>
        `;

        // Grey out perk rows where requirements are not met
        if (!perkRequirementsMet(selectedPerk, specialData, skillData, levelData)) {
          perkItem.classList.add("requirements-not-met");
        } else {
          perkItem.classList.remove("requirements-not-met");
        }

        // Remove perk functionality
        perkItem.querySelector(".remove-perk").addEventListener("click", () => {
          removePerkFromPlanner(selectedPerk);
        });

        perksList.appendChild(perkItem);
      });
    }

    // Initialize Sortable.js with onEnd and onMove events
    new Sortable(perksList, {
      group: { name: "shared" },
      animation: 150,
      onEnd: function (evt) {
        const draggedItem = evt.item; // The dragged list item
        const newLevel = evt.to.closest(".level-section").getAttribute("section-level"); // New level header
        const perkId = parseInt(draggedItem.getAttribute("id")); // Perk ID from the item
        const perk = selectedPerks.find((p) => parseInt(p.id) === perkId);
        if (perk) {
          perk.levelTaken = parseInt(newLevel);
        }
        updatePlanner(selectedPerks);
      },
      onMove: function (evt) {
        const draggedItem = evt.dragged;
        const targetList = evt.to;
        const targetLevel = parseInt(targetList.closest(".level-section").getAttribute("section-level"), 10);
        const perkId = parseInt(draggedItem.getAttribute("id")); // Perk ID from the item
        const perk = selectedPerks.find((p) => p.id === perkId);

        // Allow move only if the target level is valid
        if (perk && targetLevel < perk.lvl) {
          return false;
        }
        return true;
      },
    });
  }
}

function removePerkFromPlanner(selectedPerk) {
  const selectedPerks = PERK_ALLOCATION_DATA.selectedPerks;
  const selectedIndex = selectedPerks.findIndex((p) => p.id === selectedPerk.id);
  const masterPerk = PERK_DATA.find((p) => p.name === selectedPerk.name);

  masterPerk.ranksTaken -= 1;
  PERK_ALLOCATION_DATA.perksAllocated -= 1;
  if (!masterPerk.ranksTaken) {
    masterPerk.levelTaken = 0;
    document.getElementById(`${selectedPerk.name}-perk-row`).classList.remove("selected-perk"); // Remove highlight
  }
  selectedPerks.splice(selectedIndex, 1);
  updatePerks(masterPerk);
}

// Populate perks on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  PERK_DATA.forEach((perk) => {
    perk.requirementsMet = true;
    perk.ranksTaken = 0;
    perk.levelTaken = 0;
  });

  populatePerks(PERK_DATA, specialData, skillData, levelData);
  renderPlanner();
});
