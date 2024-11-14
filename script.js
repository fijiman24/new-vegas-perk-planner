const specialData = [
  {
    name: "Strength",
    description:
      "Strength is a measure of your raw physical power. It affects how much you can carry, the power of all melee attacks, and your effectiveness with many heavy weapons.",
    stats: ["Melee Weapons"],
  },
  {
    name: "Perception",
    description:
      "A high Perception grants a bonus to the Explosives, Lockpick and Energy Weapons, and determines when red compass markings appear (which indicate threats).",
    stats: ["Energy Weapons", "Explosives", "Lockpick"],
  },
  {
    name: "Endurance",
    description:
      "Endurance is a measure of your overall physical fitness. A high Endurance gives bonuses to health, environmental resistances, and the Survival and Unarmed skills.",
    stats: ["Survival", "Unarmed"],
  },
  {
    name: "Charisma",
    description:
      "Having a high Charisma will improve people's disposition towards you, and give bonuses to both the Barter and Speech skills.",
    stats: ["Barter", "Speech"],
  },
  {
    name: "Intelligence",
    description:
      "Intelligence affects the Science, Repair and Medicine skills. The higher your Intelligence, the more Skill Points you'll be able to distribute when you level up.",
    stats: ["Medicine", "Repair", "Science"],
  },
  {
    name: "Agility",
    description:
      "Agility affects your Guns and Sneak skills, the number of Action Points available for V.A.T.S., and weapon reload and holster speed.",
    stats: ["Guns", "Sneak"],
  },
  {
    name: "Luck",
    description:
      "Raising your luck will raise all of your skills a little. Having a high Luck will also improve your critical chance with all weapons.",
    stats: [
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

const skillData = [
  {
    name: "Barter",
    description:
      "Proficiency at trading and haggling. Also used to negotiate better quest rewards or occasionally as a bribe-like alternative to Speech.",
    special: "Charisma",
  },
  {
    name: "Energy Weapons",
    description: "Proficiency at using energy-based weapons.",
    special: "Perception",
  },
  {
    name: "Explosives",
    description:
      "Proficiency at using explosive weaponry, disarming mines, and crafting explosives.",
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
    description:
      "Proficiency at using medical tools, drugs, and for crafting Doctor's Bags.",
    special: "Intelligence",
  },
  {
    name: "Melee Weapons",
    description: "Proficiency at using melee weapons.",
    special: "Strength",
  },
  {
    name: "Repair",
    description:
      "Proficiency at repairing items and crafting items and ammunition.",
    special: "Intelligence",
  },
  {
    name: "Science",
    description:
      "Proficiency at hacking terminals, recycling energy ammunition at workbenches, crafting chems, and many dialog checks.",
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
    description:
      "Proficiency at cooking, making poisons, and crafting 'natural' equipment and consumables. Also yields increased benefits from food.",
    special: "Endurance",
  },
  {
    name: "Unarmed",
    description: "Proficiency at unarmed fighting.",
    special: "Endurance",
  },
];

const maxSpecialPoints = 10;
const maxSkillPoints = 100;

/**
 * Renders rows for numerical attributes (SPECIAL and Skills).
 */
function renderAttributeRows(data, containerId, type, maxPerAttribute) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  data.forEach((attribute) => {
    const row = document.createElement("div");
    row.className = "attribute-row";

    row.innerHTML = `
      <div class="attribute-header">
        <span class="attribute-name">${attribute.name}</span>
      </div>
      <div class="input-controls">
        <button id="decrement-${attribute.name}" onclick="decrementAttribute('${attribute.name}', '${type}')">-</button>
        <input type="number" class="${type}-input" id="${attribute.name}-input" onchange="displayTotalPoints('${type}')" value="1" min="1" max="${maxPerAttribute}">
        <button id="increment-${attribute.name}" onclick="incrementAttribute('${attribute.name}', ${maxPerAttribute}, '${type}')">+</button>
      </div>
    `;
    container.appendChild(row);
  });
}

/**
 * Calculates and displays the total allocated points for an attribute type.
 */
function displayTotalPoints(type) {
  const inputs = document.querySelectorAll(`.${type}-input`);
  const totalPointDisplay = document.getElementById(`${type}-points-counter`);

  let total = 0;
  inputs.forEach((input) => {
    total += parseInt(input.value) || 0;
  });

  totalPointDisplay.innerHTML = total;
}

/**
 * Decrements the value for a numerical attribute input.
 */
function decrementAttribute(attributeName, type) {
  const input = document.getElementById(`${attributeName}-input`);
  const currentVal = parseInt(input.value);

  if (currentVal > 1) {
      input.value = currentVal - 1;
      displayTotalPoints(type);
  }
}

/**
 * Increments the value for a numerical attribute input.
 */
function incrementAttribute(attributeName, maxPerAttribute, type) {
  const input = document.getElementById(`${attributeName}-input`);
  const currentVal = parseInt(input.value);

  if (currentVal < maxPerAttribute) {
      input.value = currentVal + 1;
      displayTotalPoints(type);
  }
}

// Initialize rendering for each type
document.addEventListener("DOMContentLoaded", () => {
  renderAttributeRows(specialData, "special-rows", "special", maxSpecialPoints);
  renderAttributeRows(skillData, "skill-rows", "skill", maxSkillPoints);
});
