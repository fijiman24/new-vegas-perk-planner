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
  },
  skill: {
    allocated: 0,
    maxEach: 100,
    maxAllocatable: 0,
  },
};

const maxSpecialPointsPerSpecial = 10;
const maxSkillPointsPerSkill = 100;
const maxSpecialPointsTotal = 40;
let maxSkillPointsTotal = 65;
const minPointsPerSpecial = 1;
const initialMinPointsPerSkill = 2;
let initialMinSkillPointsTotal = 65;

function addAttributesToSkills(skillData) {
  skillData.forEach((skill) => {
    skill.pointsAllocated = 0; // Points added by the user, not including default min or bonuses
    skill.specialBonus = 0;
    skill.luckBonus = 0;
    skill.tagBonus = 0;
    skill.min = initialMinPointsPerSkill;
    skill.max = 100;
    skill.total = skill.min + skill.pointsAllocated;
  });
}

function addAttributesToSpecials(specialData) {
  specialData.forEach((special) => {
    special.pointsAllocated = 0; // Points added by the user, not including default min or bonuses
    special.implantBonus = 0;
    special.min = minPointsPerSpecial;
    special.max = 10;
    special.total = special.min + special.pointsAllocated;
  });
}

function updateMinSkillValue(skill) {
  skill.min = initialMinPointsPerSkill + skill.specialBonus + skill.luckBonus + skill.tagBonus;

  const input = document.getElementById(`${skill.name}-input`);
  if (input) {
    input.min = skill.min; // Set the min if the element exists
  }
}

function updateMinSpecialValue(special) {
  special.min = minPointsPerSpecial + special.implantBonus;

  const input = document.getElementById(`${special.name}-input`);
  if (input) {
    input.min = special.min; // Set the min if the element exists
  }
}

function calculateAndDisplayAttributeTotal(attribute) {
  attribute.total = attribute.min + attribute.pointsAllocated;
  const input = document.getElementById(`${attribute.name}-input`);
  input.value = attribute.total;
}

/**
 * Calculates and displays the total allocated points (number on left side of slash) for an attribute type.
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

  const allocatedPointsDisplay = document.getElementById(`${type}-points-counter`);
  allocatedPointsDisplay.innerHTML = pointAllocationData[type].allocated;
}

/**
 * Ensures manual user input remains in the attribute range.
 */
function validateValue(attribute, type) {
  const input = document.getElementById(`${attribute.name}-input`);
  const inputValue = parseInt(input.value) || 0;
  const pointsBeingAllocated = inputValue - attribute.min;
  const totalAllocatedPoints = pointAllocationData[type].allocated;
  const totalAllocatablePoints = pointAllocationData[type].maxAllocatable;
  const min = attribute.min;
  const max = attribute.max;

  if (pointsBeingAllocated < min) {
    attribute.pointsAllocated = 0;
    // Bunch of if-else statements to handle if input would exceed total allocatable
  } else if (
    pointsBeingAllocated > attribute.pointsAllocated &&
    (pointsBeingAllocated > max || pointsBeingAllocated - attribute.pointsAllocated + totalAllocatedPoints > totalAllocatablePoints)
  ) {
    if (totalAllocatedPoints >= totalAllocatablePoints) {
      console.log("S");
      attribute.pointsAllocated = attribute.pointsAllocated;
    } else {
      console.log("A");
      console.log(max - min + totalAllocatedPoints - attribute.pointsAllocated);
      console.log(totalAllocatablePoints);

      if (max - min + totalAllocatedPoints - attribute.pointsAllocated <= totalAllocatablePoints) {
        console.log("B");
        attribute.pointsAllocated = max - min;
      } else {
        console.log("C");
        attribute.pointsAllocated += totalAllocatablePoints - totalAllocatedPoints;
      }
    }
  } else {
    attribute.pointsAllocated = pointsBeingAllocated;
  }
}

/**
 * Decrements the value for a numerical attribute input.
 */
function decrementAttribute(attribute) {
  const input = document.getElementById(`${attribute.name}-input`);
  const currentVal = parseInt(input.value);

  if (currentVal > attribute.min) {
    attribute.pointsAllocated -= 1;
  }
}

/**
 * Increments the value for a numerical attribute input.
 */
function incrementAttribute(attribute) {
  const input = document.getElementById(`${attribute.name}-input`);
  const currentVal = parseInt(input.value);

  if (currentVal < attribute.max) {
    attribute.pointsAllocated += 1;
  }
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
  updateMinSkillValue(skill);
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

    // Minus 10 cuz no skill point allocation level 1
    const skillPointsForLevel = Math.floor(level * (intelligence.total * 0.5 + 10)) - 10;
    pointAllocationData.skill.maxAllocatable = skillPointsForLevel;

    const totalAllocatableSkillPointDisplay = document.getElementById("skill-points-total");
    totalAllocatableSkillPointDisplay.innerHTML = pointAllocationData.skill.maxAllocatable;

    skillData.forEach((skill) => {
      updateButtonStates(skill, "skill");
    });
  }
}

function handleSpecialInput(attribute, type) {
  if (type === "special") {
    let skills = skillData;
    if (attribute.name != "Luck") {
      skills = skillData.filter((skill) => skill.special === attribute.name);
    }
    skills.forEach((skill) => {
      const input = document.getElementById(`${skill.name}-input`);
      calculateSpecialBonusesForSkill(skill);
      calculateAndDisplayAttributeTotal(skill);
      updateTotalAllocatedPointsForType("skill");
    });
  }
}

function updateInputsWithAttributeTotals(attribute) {
  const attributeInput = document.getElementById(`${attribute.name}-input`);
  attributeInput.innerHTML = attribute.total;
}

/**
 * Renders rows for numerical attributes (Level, SPECIAL, and Skills).
 */
function renderNumericalAttributeRows(data, type) {
  const container = document.getElementById(`${type}-rows`);
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
  };

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

    // TODO: Fix bug where it won't mouseup if totalAllocated exceeds totalAllocatable
    // Interval variables for increment/decrement
    let incrementInterval;
    let decrementInterval;

    /**
     * Starts the increment interval for a numerical attribute input.
     */
    function startIncrement(attribute, type) {
      incrementInterval = setInterval(() => {
        incrementAttribute(attribute, type);
        handleUpdate(attribute);
      }, 150); // Adjust the interval speed as needed
    }

    /**
     * Starts the decrement interval for a numerical attribute input.
     */
    function startDecrement(attribute, type) {
      decrementInterval = setInterval(() => {
        decrementAttribute(attribute, type);
        handleUpdate(attribute);
      }, 150); // Adjust the interval speed as needed
    }

    /**
     * Stops the increment or decrement interval.
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
  });
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
      const correspondingInput = document.getElementById(`${correspondingAttributeName}-input`);
      button.disabled = parseInt(correspondingInput.value) >= correspondingInput.max || currentTotalPoints >= maxTotalPoints;
      triggerMouseUpOnDisabledButton(button);
    }
  });
  triggerMouseUpOnDisabledButton(incrementButton);

  decrementButton.disabled = parseInt(input.value) <= attribute.min;
  triggerMouseUpOnDisabledButton(decrementButton);
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
  });

  renderNumericalAttributeRows(levelData, "level");
  renderNumericalAttributeRows(specialData, "special");
  renderNumericalAttributeRows(skillData, "skill");
});
