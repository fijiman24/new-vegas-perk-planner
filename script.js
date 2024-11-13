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

// Refactored JavaScript
const maxPoints = 40;
let allocatedPointsCount = 7;

// Generic Data Renderer
function renderRows(data, containerId, type, maxPerAttribute) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  data.forEach((attribute, index) => {
    const affectedByText =
      type === "special" ? "Affected Skills" : "Affected by";
    const affectedValue =
      type === "special" ? attribute.stats.join(", ") : attribute.special;

    const row = document.createElement("div");
    row.className = "attribute-row";

    row.innerHTML = `
      <div class="attribute-header">
        <span class="attribute-name">${attribute.name}</span>
      </div>
      <p>${attribute.description}</p>
      <p><strong>${affectedByText}:</strong> ${affectedValue}</p>
      <div class="input-controls">
        <button id="${type}-decrement-${index}" onclick="adjustPoints('${type}', ${index}, -1, ${maxPerAttribute})">-</button>
        <input type="number" id="${type}-input-${index}" value="1" min="1" max="${maxPerAttribute}">
        <button id="${type}-increment-${index}" onclick="adjustPoints('${type}', ${index}, 1, ${maxPerAttribute})">+</button>
      </div>
    `;
    container.appendChild(row);
  });

  updateTotalPoints(type);
  checkButtons(type);
}

const maxLevel = 50;

// Adjust Level with Boundaries
function adjustLevel(change) {
  const input = document.getElementById("level-input");
  let value = parseInt(input.value);

  if (change === 1 && value < maxLevel) {
    value++;
  } else if (change === -1 && value > 1) {
    value--;
  }

  input.value = value;
}

function checkLevelButtons() {
  const incrementButton = document.getElementById("level-increment");
  const decrementButton = document.getElementById("level-decrement");

  incrementButton.addEventListener("click", () => {
    const input = document.getElementById("level-input");
    const value = parseInt(input.value);
    // Disable the increment button if the level is at max
    incrementButton.disabled = value >= maxLevel;
    decrementButton.disabled = value <= 1;
  });

  decrementButton.addEventListener("click", () => {
    const input = document.getElementById("level-input");
    const value = parseInt(input.value);
    // Disable the decrement button if the level is at 1
    incrementButton.disabled = value >= maxLevel;
    decrementButton.disabled = value <= 1;
  });
}

// Adjust Points with Boundaries
function adjustPoints(type, index, change, maxPerAttribute) {
  const input = document.getElementById(`${type}-input-${index}`);
  let value = parseInt(input.value);

  if (
    change === 1 &&
    value < maxPerAttribute &&
    allocatedPointsCount < maxPoints
  ) {
    value++;
    allocatedPointsCount++;
  } else if (change === -1 && value > 1) {
    value--;
    allocatedPointsCount--;
  }

  input.value = value;
  updateTotalPoints(type);
  checkButtons(type, maxPerAttribute);
}

// Update Total Points Display
function updateTotalPoints(type) {
  const pointsCounter = document.getElementById(`${type}-points-counter`);
  pointsCounter.textContent = allocatedPointsCount;
}

// Check Buttons for Enable/Disable State
function checkButtons(type, maxPerAttribute) {
  const incrementButtons = document.querySelectorAll(
    `[id^="${type}-increment-"]`
  );
  const decrementButtons = document.querySelectorAll(
    `[id^="${type}-decrement-"]`
  );

  incrementButtons.forEach((button, index) => {
    const input = document.getElementById(`${type}-input-${index}`);
    const value = parseInt(input.value);

    button.disabled =
      allocatedPointsCount >= maxPoints || value >= maxPerAttribute;
  });

  decrementButtons.forEach((button, index) => {
    const input = document.getElementById(`${type}-input-${index}`);
    const value = parseInt(input.value);

    button.disabled = value <= 1;
  });
}

// Initialize rendering for each type
document.addEventListener("DOMContentLoaded", () => {
  renderRows(specialData, "special-rows", "special", 10);
  renderRows(skillData, "skill-rows", "skill", 100);
});
