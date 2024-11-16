let specialData = [
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

let skillData = [
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

const levelData = [
  {
    name: "Level",
    min: 1,
    max: 50,
    pointsAdded: 1,
    total: 1,
  },
];

const maxSpecialPointsPerSpecial = 10;
const maxSkillPointsPerSkill = 100;
const maxSpecialPointsTotal = 40;
let maxSkillPointsTotal = 65;
const minPointsPerSpecial = 1;
const initialMinPointsPerSkill = 2;
let initialMinSkillPointsTotal = 65;

function addAttributesToSkills(skillData) {
  skillData.forEach((skill) => {
    skill.pointsAdded = 0;
    skill.specialBonus = 0;
    skill.luckBonus = 0;
    skill.tagBonus = 0;
    skill.min = initialMinPointsPerSkill;
    skill.max = 100;
    skill.total = skill.specialBonus + skill.luckBonus + skill.tagBonus;
  });
}

function addAttributesToSpecials(specialData) {
  specialData.forEach((special) => {
    special.pointsAdded = minPointsPerSpecial;
    special.implantBonus = 0;
    special.min = 1;
    special.max = 10;
    special.total = special.pointsAdded + special.implantBonus;
  });
}

function updateMinSkillValue(skill) {
  skill.min = initialMinPointsPerSkill + skill.specialBonus + skill.luckBonus + skill.tagBonus;
  if (skill.min > skill.total) {
    skill.total = skill.min;
  }
}

function updateAttributeInInput(attribute, type, input) {
  if (type === "special") {
    attribute.total = attribute.pointsAdded + attribute.implantBonus;
  } else if (type === "skill") {
    attribute.total = attribute.pointsAdded + attribute.min;
  } else if (type === "level") {
    attribute.total = attribute.pointsAdded;
  }
  input.value = attribute.total;
}

/**
 * Calculates and displays the total allocated points (number on left side of slash) for an attribute type.
 */
function updateTotalAllocatedPoints(data, type) {
  const allocatedPointsDisplay = document.getElementById(`${type}-points-counter`);

  let total = 0;
  data.forEach((attribute) => {
    total += attribute.total || 0;
  });

  allocatedPointsDisplay.innerHTML = total;
}

/**
 * Calculates bonus for a given skill based on SPECIAL scores.
 *
 * Formulas are x2 SPECIAL stat to each associated skill except Luck, which gives a
 * ceil(luck / 2) bonus to all skills.
 */
function calculateSpecialBonusesForSkill(skill) {
  const associatedSpecial = specialData.find((special) => special.name === skill.special);
  const luck = specialData.find((special) => special.name === "Luck");

  skill.specialBonus = 2 * associatedSpecial.total;
  skill.luckBonus = Math.ceil(luck.total / 2);
}

/**
 * Renders rows for numerical attributes (Level, SPECIAL, and Skills).
 */
function renderNumericalAttributeRows(data, type) {
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
          <button class="${type}-decrement-button" id="decrement-${attribute.name}" disabled>
              -
          </button>
          <input type="number" class="${type}-input" id="${attribute.name}-input"
              value="${attribute.total}" min="${attribute.min}"
              max="${attribute.max}">
          <button class="${type}-increment-button" id="increment-${attribute.name}">
              +
          </button>
      </div>
    `;
    container.appendChild(row);

    // Get elements
    const decrementButton = document.getElementById(`decrement-${attribute.name}`);
    const incrementButton = document.getElementById(`increment-${attribute.name}`);
    const attributeInput = document.getElementById(`${attribute.name}-input`);

    // Centralize the button state update in a common function
    const updateState = () => {
      updateAttributeInInput(attribute, type, attributeInput);
      updateTotalAllocatedPoints(data, type);
      updateButtonStates(attribute, type);
    };

    // Add event listeners for the buttons
    decrementButton.addEventListener("click", function () {
      decrementAttribute(attribute, type);
      updateState();
      handleLevelInput(type);
      updateState();
      handleSpecialInput(attribute, type);
      updateState();
    });

    incrementButton.addEventListener("click", function () {
      incrementAttribute(attribute, type);
      updateState();
      handleLevelInput(type);
      updateState();
      handleSpecialInput(attribute, type);
      updateState();
    });

    // Add event listeners for the input field
    attributeInput.addEventListener("change", function () {
      validateValue(attribute, type);
      updateState();
      handleLevelInput(type);
      updateState();
      handleSpecialInput(attribute, type);
      updateState();
    });

    // Optionally add other event listeners, like onmousedown, onmouseup, etc.
    // You can add them in a similar way as the above.

    // Update the button states based on the attribute
    updateState();
  });
}

/**
 * Ensures manual user input remains in the attribute range.
 */
function validateValue(attribute, type) {
  const input = document.getElementById(`${attribute.name}-input`);
  const currentVal = parseInt(input.value) || 0;
  const totalAllocatedPoints = parseInt(document.getElementById(`${type}-points-counter`).innerHTML);
  const totalAllocatablePoints = parseInt(document.getElementById(`${type}-points-total`).innerHTML);
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
}

/**
 * Decrements the value for a numerical attribute input.
 */
function decrementAttribute(attribute) {
  const input = document.getElementById(`${attribute.name}-input`);
  const currentVal = parseInt(input.value);

  if (currentVal > attribute.min) {
    attribute.pointsAdded = currentVal - 1;
  }
}

/**
 * Increments the value for a numerical attribute input.
 */
function incrementAttribute(attribute) {
  const input = document.getElementById(`${attribute.name}-input`);
  const currentVal = parseInt(input.value);

  if (currentVal < attribute.max) {
    attribute.pointsAdded = currentVal + 1;
  }
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
function updateButtonStates(attribute, type) {
  const input = document.getElementById(`${attribute.name}-input`);
  const decrementButton = document.getElementById(`decrement-${attribute.name}`);
  const incrementButton = document.getElementById(`increment-${attribute.name}`);

  const currentTotalPoints = parseInt(document.getElementById(`${type}-points-counter`).innerHTML);
  const maxTotalPoints = parseInt(document.getElementById(`${type}-points-total`).innerHTML);
  const incrementButtons = document.querySelectorAll(`.${type}-increment-button`);

  // Determine whether to disable individual increment buttons or all for an attribute type
  incrementButtons.forEach((button) => {
    if (currentTotalPoints >= maxTotalPoints) {
      button.disabled = true;
      triggerMouseUpOnDisabledButton(button);
    } else {
      const correspondingAttributeName = button.id.split("-")[1];
      const correspondingInput = document.getElementById(`${correspondingAttributeName}-input`);
      button.disabled = parseInt(correspondingInput.value) >= correspondingInput.max || currentTotalPoints >= maxTotalPoints;
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
function startIncrement(attribute, type) {
  incrementInterval = setInterval(() => {
    incrementAttribute(attribute, type);
  }, 150); // Adjust the interval speed as needed
}

/**
 * Starts the decrement interval for a numerical attribute input.
 */
function startDecrement(attribute, type) {
  decrementInterval = setInterval(() => {
    decrementAttribute(attribute, type);
  }, 150); // Adjust the interval speed as needed
}

/**
 * Stops the increment or decrement interval.
 */
function stopInterval() {
  clearInterval(incrementInterval);
  clearInterval(decrementInterval);
}

/**
 * Calculates allocatable skill points for player's current level.
 *
 * Formula is (Intelligence x 0.5) + 10 skill points per level, with the
 * half being turned into a full point every even level.
 */
function handleLevelInput(type) {
  if (type === "level") {
    const level = parseInt(document.getElementById("Level-input").value);
    const intelligence = specialData.find((special) => special.name === "Intelligence");
    const totalAllocatableSkillPointDisplay = document.getElementById("skill-points-total");
    let skillPointsMinimum = 0;

    skillData.forEach((skill) => {
      skillPointsMinimum += skill.total;
      console.log(skill.total);
    })
    totalAllocatableSkillPointDisplay.innerHTML = Math.floor(level * (intelligence.total * 0.5 + 10)) - 10 + skillPointsMinimum; // Minus 10 cuz no skill point allocation level 1
  }
}

function handleSpecialInput(attribute, type) {
  if (type === "special") {
    let skills;
    if (attribute.name != "Luck") {
      skills = skillData.filter((skill) => skill.special === attribute.name);
    } else {
      skills = skillData;
    }
    skills.forEach((skill) => {
      const input = document.getElementById(`${skill.name}-input`);
      calculateSpecialBonusesForSkill(skill);
      updateMinSkillValue(skill);
      updateAttributeInInput(skill, "skill", input);
      updateTotalAllocatedPoints(skillData, "skill");
    });
    updateTotalAllocatableSkillPoints();
  }
}

function updateTotalAllocatableSkillPoints() {
  const allocatedSkillPointDisplay = document.getElementById("skill-points-counter");
  const allocatableSkillPointDisplay = document.getElementById("skill-points-total");

  if (parseInt(allocatableSkillPointDisplay.innerHTML) < parseInt(allocatedSkillPointDisplay.innerHTML)) {
    allocatableSkillPointDisplay.innerHTML = allocatedSkillPointDisplay.innerHTML;
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  addAttributesToSpecials(specialData);
  addAttributesToSkills(skillData);

  skillData.forEach((skill) => {
    calculateSpecialBonusesForSkill(skill);
    updateMinSkillValue(skill);
  });

  renderNumericalAttributeRows(levelData, "level");
  renderNumericalAttributeRows(specialData, "special");
  renderNumericalAttributeRows(skillData, "skill");
});
