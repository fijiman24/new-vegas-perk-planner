const specialData = [
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
    description:
      "Having a high Charisma will improve people's disposition towards you, and give bonuses to both the Barter and Speech skills.",
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
    description:
      "Agility affects your Guns and Sneak skills, the number of Action Points available for V.A.T.S., and weapon reload and holster speed.",
    skills: ["Guns", "Sneak"],
  },
  {
    name: "Luck",
    description:
      "Raising your luck will raise all of your skills a little. Having a high Luck will also improve your critical chance with all weapons.",
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

const levelData = [
  {
    name: "Level",
  },
];

const maxSpecialPointsPerAttribute = 10;
const maxSkillPointsPerAttribute = 100;
const maxSpecialPointsTotal = 40;
let maxSkillPointsTotal = 65;
const minSpecialPointsPerAttribute = 1;
const minSkillPointsPerAttribute = 2;
let baseMinSkillPointsTotal = 65;

/**
 * Renders rows for numerical attributes (SPECIAL and Skills).
 */
function renderAttributeRows(data, type, minPerAttribute, maxPerAttribute) {
  const container = document.getElementById(`${type}-rows`);
  container.innerHTML = "";

  data.forEach((attribute) => {
    const row = document.createElement("div");
    row.className = "attribute-row";

    row.innerHTML = `
      <div class="attribute-header">
          <span class="attribute-name">${attribute.name}</span>
      </div>
      <div class="input-controls">
          <button class="${type}-decrement-button" 
                  id="decrement-${attribute.name}" 
                  onclick="decrementAttribute('${attribute.name}', '${type}')"
                  onmousedown="startDecrement('${attribute.name}', '${type}')" 
                  onmouseup="stopInterval()" 
                  disabled>
              -
          </button>
          <input type="number" 
                 class="${type}-input" 
                 id="${attribute.name}-input"
                 onchange="validateValue('${attribute.name}', '${type}')" 
                 value="${minPerAttribute}" 
                 min="${minPerAttribute}"
                 max="${maxPerAttribute}">
          <button class="${type}-increment-button" 
                  id="increment-${attribute.name}" 
                  onclick="incrementAttribute('${attribute.name}', '${type}')"
                  onmousedown="startIncrement('${attribute.name}', '${type}')" 
                  onmouseup="stopInterval()">
              +
          </button>
      </div>
    `;
    container.appendChild(row);
    updateButtonStates(attribute.name, type);
  });
}

/**
 * Calculates bonus for a given skill based on SPECIAL scores.
 *
 * Formulas are x2 SPECIAL stat to each associated skill except Luck, which gives a
 * ceil(luck / 2) bonus to all skills.
 */
function calculateSpecialBonusForSkill(skill) {
  const associatedSpecial = skill.special;
  const specialValue = parseInt(
    document.getElementById(`${associatedSpecial}-input`).value
  );
  const luckValue = parseInt(document.getElementById("Luck-input").value);

  return 2 * specialValue + Math.ceil(luckValue / 2);
}

/**
 * Calculates allocatable skill points for player's current level.
 *
 * Formula is (Intelligence x 0.5) + 10 skill points per level, with the
 * half being turned into a full point every even level.
 */
function calculateAllocatableSkillPointsForLevel() {
  const level = parseInt(document.getElementById("Level-input").value);
  const intelligence = parseInt(
    document.getElementById("Intelligence-input").value
  );

  return Math.floor(level * (intelligence * 0.5 + 10)) - 10; // Minus 10 cuz no skill point allocation level 1
}

/**
 * Calculates minimum points per skill. Considers SPECIAL bonuses and TAG.
 */
function calculateAndDisplayMinimumSkillPoints() {
  // TODO: Add TAG to skill minimums, too

  baseMinSkillPointsTotal = 0;
  skillData.forEach((skill) => {
    const specialBonusForSkill = calculateSpecialBonusForSkill(skill);
    baseMinSkillPointsTotal +=
      minSkillPointsPerAttribute + specialBonusForSkill;

    const skillInput = document.getElementById(`${skill.name}-input`);
    skillInput.min = minSkillPointsPerAttribute + specialBonusForSkill;
    skillInput.value = minSkillPointsPerAttribute + specialBonusForSkill;
  });

  const allocatedSkillPoints = document.getElementById("skill-points-counter");
  if (parseInt(allocatedSkillPoints.innerHTML) < baseMinSkillPointsTotal) {
    allocatedSkillPoints.innerHTML = baseMinSkillPointsTotal;
  }
}

/**
 * Calculates and displays the total allocatable skill points (number on right side of slash).
 */
function updateTotalAllocatableSkillPoints() {
  const allocatablePointsDisplay =
    document.getElementById(`skill-points-total`);
  const level = parseInt(document.getElementById("Level-input").value);

  calculateAndDisplayMinimumSkillPoints();
  let allocatablePoints = baseMinSkillPointsTotal;

  if (level > 1) {
    allocatablePoints += calculateAllocatableSkillPointsForLevel();
  }

  allocatablePointsDisplay.innerHTML = allocatablePoints;
  updateTotalAllocatedPoints("skill");

  skillData.forEach((skill) => {
    updateButtonStates(skill.name, "skill");
  });
}

/**
 * Calculates and displays the total allocated points (number on left side of slash) for an attribute type.
 */
function updateTotalAllocatedPoints(type) {
  const inputs = document.querySelectorAll(`.${type}-input`);
  const allocatedPointsDisplay = document.getElementById(
    `${type}-points-counter`
  );

  let total = 0;
  inputs.forEach((input) => {
    total += parseInt(input.value) || 0;
  });

  allocatedPointsDisplay.innerHTML = total;
}

/**
 * Ensures manual user input remains in the attribute range.
 */
function validateValue(attributeName, type) {
  const input = document.getElementById(`${attributeName}-input`);
  const currentVal = parseInt(input.value) || 0;
  const totalAllocatedPoints = parseInt(
    document.getElementById(`${type}-points-counter`).innerHTML
  );
  const totalAllocatablePoints = parseInt(
    document.getElementById(`${type}-points-total`).innerHTML
  );
  const min = parseInt(input.min);
  const max = parseInt(input.max);

  if (currentVal < min) {
    input.value = min;
  } else if (currentVal > max) {
    // If setting input as max would exceed allocatable
    if (max + totalAllocatedPoints > totalAllocatablePoints) {
      input.value = input.min;
    } else {
      input.value = max;
    }
  }

  updateTotalAllocatedPoints(type);
  updateButtonStates(attributeName, type);
}

/**
 * Decrements the value for a numerical attribute input.
 */
function decrementAttribute(attributeName, type) {
  const input = document.getElementById(`${attributeName}-input`);
  const currentVal = parseInt(input.value);

  if (currentVal > input.min) {
    input.value = currentVal - 1;
  }
  updateTotalAllocatableSkillPoints();
  updateTotalAllocatedPoints(type);
  updateButtonStates(attributeName, type);
}

/**
 * Increments the value for a numerical attribute input.
 */
function incrementAttribute(attributeName, type) {
  const input = document.getElementById(`${attributeName}-input`);
  const currentVal = parseInt(input.value);

  if (currentVal < input.max) {
    input.value = currentVal + 1;
  }
  updateTotalAllocatableSkillPoints();
  updateTotalAllocatedPoints(type);
  updateButtonStates(attributeName, type);
}

/**
 * Helper function that fires mouseup events on buttons.
 * Used to mouseup after a button is disabled.
 */
function triggerMouseUpOnDisabledButton(button) {
  if (button.disabled) {
    const mouseUpEvent = new MouseEvent("mouseup", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    button.dispatchEvent(mouseUpEvent);
  }
}

/**
 * Updates the enabled/disabled states of the increment and decrement buttons.
 */
function updateButtonStates(attributeName, type) {
  const input = document.getElementById(`${attributeName}-input`);
  const decrementButton = document.getElementById(`decrement-${attributeName}`);
  const incrementButton = document.getElementById(`increment-${attributeName}`);

  const currentTotalPoints = parseInt(
    document.getElementById(`${type}-points-counter`).innerHTML
  );
  const maxTotalPoints = parseInt(
    document.getElementById(`${type}-points-total`).innerHTML
  );
  const incrementButtons = document.querySelectorAll(
    `.${type}-increment-button`
  );

  // Determine whether to disable individual increment buttons or all for an attribute type
  incrementButtons.forEach((button) => {
    if (currentTotalPoints >= maxTotalPoints) {
      button.disabled = true;
      triggerMouseUpOnDisabledButton(button);
    } else {
      const correspondingAttributeName = button.id.split("-")[1];
      const correspondingInput = document.getElementById(
        `${correspondingAttributeName}-input`
      );
      button.disabled =
        parseInt(correspondingInput.value) >= correspondingInput.max ||
        currentTotalPoints >= maxTotalPoints;
    }
  });
  triggerMouseUpOnDisabledButton(incrementButton);

  decrementButton.disabled = parseInt(input.value) <= input.min;
  triggerMouseUpOnDisabledButton(decrementButton);
}

let incrementInterval;
let decrementInterval;

/**
 * Starts the increment interval for a numerical attribute input.
 */
function startIncrement(attributeName, type) {
  incrementInterval = setInterval(() => {
    incrementAttribute(attributeName, type);
  }, 150); // Adjust the interval speed as needed
}

/**
 * Starts the decrement interval for a numerical attribute input.
 */
function startDecrement(attributeName, type) {
  decrementInterval = setInterval(() => {
    decrementAttribute(attributeName, type);
  }, 150); // Adjust the interval speed as needed
}

/**
 * Stops the increment or decrement interval.
 */
function stopInterval() {
  clearInterval(incrementInterval);
  clearInterval(decrementInterval);
}

// Initialize rendering for each type
document.addEventListener("DOMContentLoaded", () => {
  renderAttributeRows(levelData, "level", 1, 50);
  renderAttributeRows(
    specialData,
    "special",
    minSpecialPointsPerAttribute,
    maxSpecialPointsPerAttribute
  );
  renderAttributeRows(
    skillData,
    "skill",
    minSkillPointsPerAttribute,
    maxSkillPointsPerAttribute
  );
  calculateAndDisplayMinimumSkillPoints();
  updateTotalAllocatedPoints("special");
  updateTotalAllocatedPoints("skill");
});
