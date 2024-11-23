const SPECIAL_DATA = [
  {
    name: "Strength",
    description:
      "Strength is a measure of your raw physical power. It affects how much you can carry, the power of all melee attacks, and your effectiveness with many heavy weapons.",
    skills: ["Melee Weapons"],
  },
  {
    name: "Perception",
    description:
      "A high Perception grants a bonus to the Explosives, Lockpick and Energy Weapons, and determines when red compass markings appear (which indicate threats).",
    skills: ["Energy Weapons", "Explosives", "Lockpick"],
  },
  {
    name: "Endurance",
    description:
      "Endurance is a measure of your overall physical fitness. A high Endurance gives bonuses to health, environmental resistances, and the Survival and Unarmed skills.",
    skills: ["Survival", "Unarmed"],
  },
  {
    name: "Charisma",
    description: "Having a high Charisma will improve people's disposition towards you, and give bonuses to both the Barter and Speech skills.",
    skills: ["Barter", "Speech"],
  },
  {
    name: "Intelligence",
    description:
      "Intelligence affects the Science, Repair and Medicine skills. The higher your Intelligence, the more Skill Points you'll be able to distribute when you level up.",
    skills: ["Medicine", "Repair", "Science"],
  },
  {
    name: "Agility",
    description: "Agility affects your Guns and Sneak skills, the number of Action Points available for V.A.T.S., and weapon reload and holster speed.",
    skills: ["Guns", "Sneak"],
  },
  {
    name: "Luck",
    description: "Raising your luck will raise all of your skills a little. Having a high Luck will also improve your critical chance with all weapons.",
    skills: [
      "Barter",
      "Energy Weapons",
      "Explosives",
      "Guns",
      "Lockpick",
      "Medicine",
      "Melee Weapons",
      "Repair",
      "Science",
      "Sneak",
      "Speech",
      "Survival",
      "Unarmed",
    ],
  },
];

const SKILL_DATA = [
  {
    name: "Barter",
    description: "Proficiency at trading and haggling. Also used to negotiate better quest rewards or occasionally as a bribe-like alternative to Speech.",
    special: "Charisma",
  },
  {
    name: "Energy Weapons",
    description: "Proficiency at using energy-based weapons.",
    special: "Perception",
  },
  {
    name: "Explosives",
    description: "Proficiency at using explosive weaponry, disarming mines, and crafting explosives.",
    special: "Perception",
  },
  {
    name: "Guns",
    description: "Proficiency at using weapons that fire standard ammunition.",
    special: "Agility",
  },
  {
    name: "Lockpick",
    description: "Proficiency at picking locks.",
    special: "Perception",
  },
  {
    name: "Medicine",
    description: "Proficiency at using medical tools, drugs, and for crafting Doctor's Bags.",
    special: "Intelligence",
  },
  {
    name: "Melee Weapons",
    description: "Proficiency at using melee weapons.",
    special: "Strength",
  },
  {
    name: "Repair",
    description: "Proficiency at repairing items and crafting items and ammunition.",
    special: "Intelligence",
  },
  {
    name: "Science",
    description: "Proficiency at hacking terminals, recycling energy ammunition at workbenches, crafting chems, and many dialog checks.",
    special: "Intelligence",
  },
  {
    name: "Sneak",
    description: "Proficiency at remaining undetected and stealing.",
    special: "Agility",
  },
  {
    name: "Speech",
    description:
      "Proficiency at persuading others. Also used to negotiate for better quest rewards and to talk your way out of combat, convincing people to give up vital information and succeeding in multiple Speech checks.",
    special: "Charisma",
  },
  {
    name: "Survival",
    description: "Proficiency at cooking, making poisons, and crafting 'natural' equipment and consumables. Also yields increased benefits from food.",
    special: "Endurance",
  },
  {
    name: "Unarmed",
    description: "Proficiency at unarmed fighting.",
    special: "Endurance",
  },
];

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

const STAT_DATA = [
  {
    name: "Hit Points",
    description: "Used to measure the health of a character. Should a character be reduced to 0 HP, the character dies",
    special: "Endurance",
    level: 0,
    formula: (special, level) => 95 + special * 20 + level * 5,
  },
  {
    name: "Action Points",
    description: "Number of things a player can do during V.A.T.S. mode",
    special: "Agility",
    formula: (special) => 65 + 3 * special,
  },
  { name: "Critical Chance", description: "Chance to cause a critical hit", special: "Luck", formula: (special) => special * 0.01 },
  {
    name: "Melee Damage",
    description: "Amount of bonus damage a character does with Melee Weapons",
    special: "Strength",
    formula: (special) => 0.5 * special,
  },
  {
    name: "Carry Weight",
    description: "How much can be carried before becoming overencumbered",
    special: "Strength",
    formula: (special) => 150 + special * 10,
  },
  { name: "Nerve", description: "Boosts the damage and Damage Threshold of each companion", special: "Charisma", formula: (special) => 0.05 * special },
  {
    name: "Skill Point Per Level",
    description: "Can be allocated to skills to improve them",
    special: "Intelligence",
    formula: (special) => 10 + special / 2,
  },
];

const LEVEL_DATA = [
  {
    name: "Level",
    min: 1,
    max: 50,
    pointsAllocated: 0,
    total: 1,
  },
];

const POINT_ALLOCATION_DATA = {
  level: {
    allocated: 0,
    maxEach: 50,
    maxAllocatable: 49,
  },
  special: {
    allocated: 0,
    maxEach: 10,
    maxAllocatable: 33,
    checked: 0,
    maxChecked: 1,
  },
  skill: {
    allocated: 0,
    maxEach: 100,
    maxAllocatable: 0,
    checked: 0,
    maxChecked: 3,
    educatedAllocatable: 0,
  },
  perk: {
    allocated: 0,
    maxAllocatable: 0,
    selected: [],
  },
};