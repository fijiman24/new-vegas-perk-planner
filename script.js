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
    pointsAllocated: 0,
    total: 1,
  },
];

const statData = [
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
    name: "Skill Points Per Level",
    description: "Can be allocated to skills to improve them",
    special: "Intelligence",
    formula: (special) => 10 + special / 2,
  },
];

const pointAllocationData = {
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
  },
};

const elementSuffix = {
  INPUT: "input",
  POINTS_COUNTER: "points-counter",
  POINTS_TOTAL: "points-total",
  CHECKBOX: "checkbox",
  CHECKBOX_COUNTER: "checkbox-counter",
  VALUE: "value",
  ROWS: "rows",
  DECREMENT: "decrement",
  TOTAL: "total",
};

const MIN_POINTS_PER_SPECIAL = 1;
const BASE_MIN_POINTS_PER_SKILL = 2;
const TAG_BONUS = 15;
const IMPLANT_BONUS = 10;

/**
 * Returns a webpage element with a given prefix and suffix.
 * Use the elementSuffix values for suffix.
 * 
 * @param {string} prefix 
 * @param {string} suffix 
 * @returns 
 */
function getElementByIdWithPrefix(prefix, suffix) {
  return document.getElementById(`${prefix}-${suffix}`);
}

/**
 * Calculates the new minimum value for an attribute based on its bonuses.
 * 
 * @param {object} attribute 
 * @param {Array} bonuses 
 */
function updateMinValue(attribute, bonuses) {
  attribute.min = bonuses.reduce((sum, bonus) => sum + bonus, 0);
  const input = getElementByIdWithPrefix(attribute.name, elementSuffix.INPUT);
  if (input) {
    input.min = attribute.min;
  }
}

/**
 * Updates the minimum skill value based on relevant bonuses (SPECIAL, TAG, books).
 *
 * @param {object} skill
 */
function updateMinSkillValue(skill) {
  updateMinValue(skill, [BASE_MIN_POINTS_PER_SKILL, skill.specialBonus, skill.luckBonus, skill.tagBonus]);
}

/**
 * Updates the minimum skill value based on relevant bonuses (SPECIAL, implants, books).
 *
 * @param {object} special
 */
function updateMinSpecialValue(special) {
    updateMinValue(special, [MIN_POINTS_PER_SPECIAL, special.implantBonus]);
}

/**
 * Calculates the total attribute value by adding allocated pointst to base minimum.
 * Displays the total in the attribute input field.
 *
 * @param {object} attribute
 */
function calculateAndDisplayAttributeTotal(attribute) {
  attribute.total = attribute.min + attribute.pointsAllocated;
  const input = getElementByIdWithPrefix(attribute.name, elementSuffix.INPUT);
  input.value = attribute.total;
}

/**
 * Updates the total points allocated for each attribute type (left side of slash).
 *
 * @param {string} type
 */
function updateTotalAllocatedPointsForType(type) {
  let totalAllocated = 0;

  if (type === "special") {
    specialData.forEach((special) => {
      totalAllocated += special.pointsAllocated;
    });
  } else if (type === "skill") {
    skillData.forEach((skill) => {
      totalAllocated += skill.pointsAllocated;
    });
  } else if (type === "level") {
    levelData.forEach((level) => {
      totalAllocated += level.pointsAllocated;
    });
  }

  pointAllocationData[type].allocated = totalAllocated;

  const allocatedPointsDisplay = getElementByIdWithPrefix(type, elementSuffix.POINTS_COUNTER);
  allocatedPointsDisplay.innerHTML = pointAllocationData[type].allocated;
}

/**
 * Ensures manual user input remains in the attribute range.
 *
 * @param {object} attribute
 * @param {string} type
 * @returns
 */
function validateValue(attribute, type) {
  const input = getElementByIdWithPrefix(attribute.name, elementSuffix.INPUT);
  const inputValue = parseInt(input.value) || 0;
  const pointsBeingAllocated = inputValue - attribute.min;
  const totalAllocatedPoints = pointAllocationData[type].allocated;
  const totalAllocatablePoints = pointAllocationData[type].maxAllocatable;
  const min = attribute.min;
  const max = attribute.max;

  if (pointsBeingAllocated < min) {
    attribute.pointsAllocated = 0;
    return;
  }

  if (pointsBeingAllocated > attribute.pointsAllocated) {
    const wouldExceedMax = pointsBeingAllocated > max;
    const wouldExceedTotalAllocatable = pointsBeingAllocated - attribute.pointsAllocated + totalAllocatedPoints > totalAllocatablePoints;

    if (wouldExceedMax || wouldExceedTotalAllocatable) {
      if (totalAllocatedPoints >= totalAllocatablePoints) {
        return;
      }

      attribute.pointsAllocated = Math.min(max - min, attribute.pointsAllocated + totalAllocatablePoints - totalAllocatedPoints);
      return;
    }
  }

  attribute.pointsAllocated = pointsBeingAllocated;
}

/**
 * Decrements the value for a numerical attribute input.
 *
 * @param {object} attribute
 */
function decrementAttribute(attribute) {
  const input = getElementByIdWithPrefix(attribute.name, elementSuffix.INPUT);
  const currentVal = parseInt(input.value);

  if (currentVal > attribute.min) {
    attribute.pointsAllocated -= 1;
  }
}

/**
 * Increments the value for a numerical attribute input.
 *
 * @param {object} attribute
 */
function incrementAttribute(attribute) {
  const input = getElementByIdWithPrefix(attribute.name, elementSuffix.INPUT);
  const currentVal = parseInt(input.value);

  if (currentVal < attribute.max) {
    attribute.pointsAllocated += 1;
  }
}

/**
 * Calculates bonus for a given skill based on SPECIAL scores.
 * 2x SPECIAL stat to each associated skill except Luck, which gives a ceil(luck / 2) bonus to all skills.
 *
 * @param {object} skill
 */
function calculateSpecialBonusesForSkill(skill) {
  const associatedSpecial = specialData.find((special) => special.name === skill.special);
  const luck = specialData.find((special) => special.name === "Luck");

  skill.specialBonus = 2 * associatedSpecial.total;
  skill.luckBonus = Math.ceil(luck.total / 2);
  updateMinSkillValue(skill);
}

/**
 * Calculates allocatable skill points for player's current level.
 * Formula is (Intelligence x 0.5) + 10 skill points per level, with the half being turned into a full point every even level.
 *
 * @param {string} type
 */
function handleLevelInput(type) {
  if (type === "level") {
    const levelInput = getElementByIdWithPrefix("Level", elementSuffix.INPUT);
    const level = parseInt(levelInput.value);
    if (level > 1) {
      const intelligence = specialData.find((special) => special.name === "Intelligence");

      // Minus 10 cuz no skill point allocation level 1
      const skillPointsForLevel = Math.floor(level * (intelligence.total * 0.5 + 10)) - 10;
      pointAllocationData.skill.maxAllocatable = skillPointsForLevel;
    } else {
      pointAllocationData.skill.maxAllocatable = 0;
    }

    const totalAllocatableSkillPointDisplay = getElementByIdWithPrefix("skill", elementSuffix.POINTS_TOTAL);
    totalAllocatableSkillPointDisplay.innerHTML = pointAllocationData.skill.maxAllocatable;

    skillData.forEach((skill) => {
      updateButtonStates(skill, "skill");
    });

    // Update health points
    const endurance = specialData.find((special) => special.name === "Endurance");
    updateDerivedStats(endurance);
  }
}

/**
 * Scales stats and skills and updates implant limit with new SPECIAL input.
 *
 * @param {object} attribute
 * @param {string} type
 */
function handleSpecialInput(attribute, type) {
  if (type === "special") {
    let skills = skillData;
    if (attribute.name != "Luck") {
      skills = skillData.filter((skill) => skill.special === attribute.name);
    }
    skills.forEach((skill) => {
      calculateSpecialBonusesForSkill(skill);
      calculateAndDisplayAttributeTotal(skill);
      updateTotalAllocatedPointsForType("skill");
    });
    if (attribute.name == "Endurance") {
      updateCheckboxLimit(attribute);
    }
    // Recalculate allocatable skill points if Intelligence changes
    if (attribute.name === "Intelligence") {
      handleLevelInput("level");
    }
    updateDerivedStats(attribute);
  }
}

/**
 * Update a display new checkbox limit for attribute.
 * For now, only used to update implant limit on Endurance change.
 *
 * @param {object} attribute
 */
function updateCheckboxLimit(attribute) {
  const enduranceCheckbox = getElementByIdWithPrefix(attribute.name, elementSuffix.CHECKBOX);

  // Don't update implant limit if implanting endurance
  if (enduranceCheckbox.checked) {
    pointAllocationData.special.maxChecked = attribute.total - 1;
  } else {
    pointAllocationData.special.maxChecked = attribute.total;
  }
  updateTotalAllocatableDisplay(pointAllocationData.special.maxChecked, "implant");
}

/**
 * Handles attribute checkbox; implant for SPECIAL, tag for skill.
 *
 * @param {object} attribute - The attribute being modified.
 * @param {string} type - The type of attribute ("special" or "skill").
 * @param {boolean} isChecked - Whether the checkbox is checked.
 */
function handleAttributeCheckbox(attribute, type, isChecked) {
  const totalCheckedDisplay = getElementByIdWithPrefix(type, elementSuffix.CHECKBOX_COUNTER);

  if (isChecked) {
    if (type === "special") {
      attribute.min += 1;
    } else if (type === "skill") {
      attribute.tagBonus += 15;
      updateMinSkillValue(attribute);
    }
    pointAllocationData[type].checked += 1;
  } else {
    if (type === "special") {
      attribute.min -= 1;
    } else if (type === "skill") {
      attribute.tagBonus -= 15;
      updateMinSkillValue(attribute);
    }
    pointAllocationData[type].checked -= 1;
  }
  totalCheckedDisplay.innerHTML = pointAllocationData[type].checked;
}

/**
 * Disables/enables checkboxes of a type based on if checked boxes exceed the maximum.
 *
 * @param {string} type
 */
function updateCheckboxStates(type) {
  const allCheckboxes = document.querySelectorAll(`.${type}-checkbox`);
  const maxChecked = pointAllocationData[type].maxChecked;

  // Disable/Enable checkboxes based on the current count
  if (pointAllocationData[type].checked >= maxChecked) {
    allCheckboxes.forEach((checkbox) => {
      if (!checkbox.checked) {
        checkbox.disabled = true; // Disable unchecked boxes
      }
    });
  } else {
    allCheckboxes.forEach((checkbox) => {
      checkbox.disabled = false; // Re-enable all checkboxes
    });
  }

  specialData.forEach((special) => {
    // Can't implant maxxed stats
    if (special.total >= special.max) {
      const specialCheckbox = getElementByIdWithPrefix(special.name, elementSuffix.CHECKBOX);
      if (!specialCheckbox.checked) {
        specialCheckbox.disabled = true;
      }
    }
  });
}

/**
 * Renders stats derived from SPECIAL attributes.
 */
function renderDerivedStats() {
  // Render Derived Stats
  statData.forEach((stat) => {
    const derivedStatItem = document.createElement("div");
    derivedStatItem.classList.add("derived-stat-item");
    derivedStatItem.innerHTML = `
        <p class="stat-name">${stat.name}:</p>
        <p id="${stat.name}-value">--</p>
      `;
    document.getElementById("derived-stats").appendChild(derivedStatItem);
  });

  // Update their values
  specialData.forEach((special) => {
    updateDerivedStats(special);
  });
}

/**
 * Update all derived stats for a given SPECIAL attribute.
 * 
 * @param {object} special 
 */
function updateDerivedStats(special) {
  const points = special.total;
  const derivedStats = statData.filter((stat) => stat.special === special.name);
  const level = levelData[0].total;
  let value;

  derivedStats.forEach((stat) => {
    if (stat) {
      if (stat.name == "Hit Points") {
        value = stat.formula(points, level);
      } else {
        value = stat.formula(points);
      }

      // Round the value to the nearest tenth
      value = Math.round(value * 100) / 100;

      // Update the element with the rounded value
      getElementByIdWithPrefix(stat.name, elementSuffix.VALUE).innerText = `${value}`;
    }
  });
}

/**
 * Renders rows for numerical attributes (Level, SPECIAL, and Skills) and applies element functions.
 *
 * @param {Array} data
 * @param {string} type
 */
function renderNumericalAttributeRows(data, type) {
  const container = getElementByIdWithPrefix(type, elementSuffix.ROWS);
  container.innerHTML = "";

  // Centralized update function to minimize redundant calls
  const updateState = (attribute) => {
    calculateAndDisplayAttributeTotal(attribute);
    updateTotalAllocatedPointsForType(type);
    updateButtonStates(attribute, type);
  };

  // Function to handle updating the attribute input value
  const handleUpdate = (attribute) => {
    updateState(attribute);
    handleLevelInput(type);
    handleSpecialInput(attribute, type);
    updateCheckboxStates(type);
  };

  data.forEach((attribute) => {
    const row = document.createElement("div");
    row.className = "attribute-row";
    row.innerHTML = `
      <input type="checkbox" class="${type}-checkbox" id="${attribute.name}-checkbox">
      <div class="attribute-header">
          <span class="attribute-name">${attribute.name}</span>
      </div>
      <div class="input-controls">
          <button class="decrement ${type}-decrement-button" id="${attribute.name}-decrement" disabled>
              -
          </button>
          <input type="number" class="${type}-input" id="${attribute.name}-input"
              value="${attribute.total}" min="${attribute.min}"
              max="${attribute.max}">
          <button class="increment ${type}-increment-button" id="increment-${attribute.name}">
              +
          </button>
      </div>
    `;

    container.appendChild(row);

    // Get elements
    const decrementButton = getElementByIdWithPrefix(attribute.name, elementSuffix.DECREMENT);
    const incrementButton = document.getElementById(`increment-${attribute.name}`);
    const attributeInput = getElementByIdWithPrefix(attribute.name, elementSuffix.INPUT);
    const checkbox = getElementByIdWithPrefix(attribute.name, elementSuffix.CHECKBOX);

    // Update the button states based on the attribute initially
    updateState(attribute);

    // Add event listeners for the buttons
    decrementButton.addEventListener("click", function () {
      decrementAttribute(attribute, type);
      handleUpdate(attribute);
    });

    incrementButton.addEventListener("click", function () {
      incrementAttribute(attribute, type);
      handleUpdate(attribute);
    });

    // Interval variables for increment/decrement
    let incrementInterval;
    let decrementInterval;

    /**
     * Starts the increment interval for a numerical attribute input.
     *
     * @param {object} attribute
     * @param {string} type
     */
    function startIncrement(attribute, type) {
      incrementInterval = setInterval(() => {
        incrementAttribute(attribute, type);
        handleUpdate(attribute);
      }, 150); // Adjust the interval speed as needed
    }

    /**
     * Starts the decrement interval for a numerical attribute input.
     *
     * @param {object} attribute
     * @param {string} type
     */
    function startDecrement(attribute, type) {
      decrementInterval = setInterval(() => {
        decrementAttribute(attribute, type);
        handleUpdate(attribute);
      }, 150); // Adjust the interval speed as needed
    }

    /**
     * Stops the increment or decrement interval.
     *
     * @param {object} attribute
     * @param {string} type
     */
    function stopInterval() {
      clearInterval(incrementInterval);
      clearInterval(decrementInterval);
    }

    // Add pointerdown event listeners for holding the buttons
    decrementButton.addEventListener("mousedown", function () {
      startDecrement(attribute, type);
    });

    incrementButton.addEventListener("mousedown", function () {
      startIncrement(attribute, type);
    });

    // Add pointerup or pointerout event listeners to stop holding
    decrementButton.addEventListener("mouseup", stopInterval);
    incrementButton.addEventListener("mouseup", stopInterval);

    // Add event listeners for the input field
    attributeInput.addEventListener("change", function () {
      validateValue(attribute, type);
      handleUpdate(attribute);
    });

    checkbox.addEventListener("change", function () {
      handleAttributeCheckbox(attribute, type, this.checked);
      handleUpdate(attribute);
    });
  });
}

/**
 * Helper function that fires mouseup events on buttons.
 * Used to mouseup after a button is disabled.
 *
 * @param {button} button
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
 *
 * @param {object} attribute
 * @param {string} type
 */
function updateButtonStates(attribute, type) {
  const input = document.getElementById(`${attribute.name}-input`);
  const decrementButton = getElementByIdWithPrefix(attribute.name, elementSuffix.DECREMENT);
  const incrementButton = document.getElementById(`increment-${attribute.name}`);

  const currentTotalPoints = pointAllocationData[type].allocated;
  const maxTotalPoints = pointAllocationData[type].maxAllocatable;
  const incrementButtons = document.querySelectorAll(`.${type}-increment-button`);

  // Determine whether to disable individual increment buttons or all for an attribute type
  incrementButtons.forEach((button) => {
    if (currentTotalPoints >= maxTotalPoints) {
      button.disabled = true;
      triggerMouseUpOnDisabledButton(button);
    } else {
      const correspondingAttributeName = button.id.split("-")[1];
      const correspondingInput = getElementByIdWithPrefix(correspondingAttributeName, elementSuffix.INPUT);
      button.disabled = parseInt(correspondingInput.value) >= correspondingInput.max || currentTotalPoints >= maxTotalPoints;
      triggerMouseUpOnDisabledButton(button);
    }
  });
  triggerMouseUpOnDisabledButton(incrementButton);

  decrementButton.disabled = parseInt(input.value) <= attribute.min;
  triggerMouseUpOnDisabledButton(decrementButton);
}

function updateTotalAllocatableDisplay(countable, type) {
  const allocatablePointsDisplay = getElementByIdWithPrefix(type, elementSuffix.POINTS_TOTAL);
  allocatablePointsDisplay.innerHTML = countable;
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  specialData.forEach((special) => {
    special.pointsAllocated = 0; // Points added by the user, not including default min or bonuses
    special.implantBonus = 0;
    special.min = MIN_POINTS_PER_SPECIAL;
    special.max = 10;
    special.total = special.min + special.pointsAllocated;
  });

  skillData.forEach((skill) => {
    skill.pointsAllocated = 0; // Points added by the user, not including default min or bonuses
    skill.specialBonus = 0;
    skill.luckBonus = 0;
    skill.tagBonus = 0;
    skill.min = BASE_MIN_POINTS_PER_SKILL;
    skill.max = 100;
    skill.total = skill.min + skill.pointsAllocated;
  });

  skillData.forEach((skill) => {
    calculateSpecialBonusesForSkill(skill);
  });

  updateTotalAllocatableDisplay(pointAllocationData.level.maxAllocatable, "level");
  updateTotalAllocatableDisplay(pointAllocationData.special.maxAllocatable, "special");
  updateTotalAllocatableDisplay(pointAllocationData.skill.maxAllocatable, "skill");
  updateTotalAllocatableDisplay(pointAllocationData.special.maxChecked, "implant");
  updateTotalAllocatableDisplay(pointAllocationData.skill.maxChecked, "tag");

  renderNumericalAttributeRows(levelData, "level");
  renderNumericalAttributeRows(specialData, "special");
  renderNumericalAttributeRows(skillData, "skill");
  renderDerivedStats();
});
