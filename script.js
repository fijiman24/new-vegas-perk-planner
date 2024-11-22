// #### LEVEL, STATS, SPECIAL, AND SKILLS
const ELEMENT_SUFFIXES = {
  INPUT: "input",
  POINTS_COUNTER: "points-counter",
  POINTS_TOTAL: "points-total",
  CHECKBOX: "checkbox",
  CHECKBOX_COUNTER: "checkbox-counter",
  CHECKBOX_TOTAL: "checkbox-total",
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
  const input = getElementByIdWithPrefix(attribute.name, ELEMENT_SUFFIXES.INPUT);
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
  // Logic for if SPECIAL is increased while Skill is already 100
  if (attribute.min + attribute.pointsAllocated > attribute.max) {
    attribute.pointsAllocated = attribute.max - attribute.min;
  }

  attribute.total = attribute.min + attribute.pointsAllocated;
  const input = getElementByIdWithPrefix(attribute.name, ELEMENT_SUFFIXES.INPUT);
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
    SPECIAL_DATA.forEach((special) => {
      totalAllocated += special.pointsAllocated;
    });
  } else if (type === "skill") {
    SKILL_DATA.forEach((skill) => {
      totalAllocated += skill.pointsAllocated;
    });
  } else if (type === "level") {
    LEVEL_DATA.forEach((level) => {
      totalAllocated += level.pointsAllocated;
    });
  }

  POINT_ALLOCATION_DATA[type].allocated = totalAllocated;

  const allocatedPointsDisplay = getElementByIdWithPrefix(type, ELEMENT_SUFFIXES.POINTS_COUNTER);
  allocatedPointsDisplay.innerHTML = POINT_ALLOCATION_DATA[type].allocated;
}

/**
 * Ensures manual user input remains in the attribute range.
 *
 * @param {object} attribute
 * @param {string} type
 * @returns
 */
function validateValue(attribute, type) {
  const input = getElementByIdWithPrefix(attribute.name, ELEMENT_SUFFIXES.INPUT);
  const inputValue = parseInt(input.value) || 0;
  const pointsBeingAllocated = inputValue - attribute.min;
  const totalAllocatedPoints = POINT_ALLOCATION_DATA[type].allocated;
  const totalAllocatablePoints = POINT_ALLOCATION_DATA[type].maxAllocatable;
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
  const input = getElementByIdWithPrefix(attribute.name, ELEMENT_SUFFIXES.INPUT);
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
  const input = getElementByIdWithPrefix(attribute.name, ELEMENT_SUFFIXES.INPUT);
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
  const associatedSpecial = SPECIAL_DATA.find((special) => special.name === skill.special);
  const luck = SPECIAL_DATA.find((special) => special.name === "Luck");

  skill.specialBonus = 2 * associatedSpecial.total;
  skill.luckBonus = Math.ceil(luck.total / 2);
  updateMinSkillValue(skill);
}

/**
 * Calculates the maximum allocatable skill points based on level, Intelligence, and the Educated perk.
 *
 * @param {number} level - The current level of the player.
 * @param {number} intelligence - The total Intelligence of the player.
 * @param {number} educatedBonus - The bonus skill points from the "Educated" perk.
 * @returns {number} - The maximum allocatable skill points.
 */
function calculateMaxAllocatableSkillPoints() {
  const level = LEVEL_DATA[0].total;
  const intelligence = SPECIAL_DATA.find((special) => special.name === "Intelligence").total;
  const educatedBonus = calculateEducatedPerkBonusSkillPoints();
  if (level > 1) {
    const baseSkillPoints = Math.floor(level * (intelligence * 0.5 + 10)) - 10;
    return baseSkillPoints + educatedBonus;
  }
  return 0;
}

/**
 * Calculates allocatable skill points for player's current level.
 * Formula is (Intelligence x 0.5) + 10 skill points per level, with the half being turned into a full point every even level.
 *
 * @param {string} type
 */
function handleLevelInput(type) {
  if (type === "level") {
    // Use the extracted function to calculate skill points
    POINT_ALLOCATION_DATA.skill.maxAllocatable = calculateMaxAllocatableSkillPoints();
    updateTotalAllocatablePointsDisplay("skill");

    SKILL_DATA.forEach((skill) => {
      updateButtonStates(skill, "skill");
    });

    // Update health points
    const endurance = SPECIAL_DATA.find((special) => special.name === "Endurance");
    updateDerivedStats(endurance);
    PERK_DATA.forEach((perk) => {
      updateSelectedPerks(perk);
    });
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
    let skills = SKILL_DATA;
    if (attribute.name != "Luck") {
      skills = SKILL_DATA.filter((skill) => skill.special === attribute.name);
    }
    skills.forEach((skill) => {
      calculateSpecialBonusesForSkill(skill);
      calculateAndDisplayAttributeTotal(skill);
      updateTotalAllocatedPointsForType("skill");
    });
    if (attribute.name == "Endurance") {
      updateCheckboxLimit(attribute, type);
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
 * @param {string} type
 */
function updateCheckboxLimit(attribute, type) {
  const checkbox = getElementByIdWithPrefix(attribute.name, ELEMENT_SUFFIXES.CHECKBOX);

  // Don't update implant limit if implanting endurance
  if (checkbox.checked) {
    POINT_ALLOCATION_DATA[type].maxChecked = attribute.total - 1;
  } else {
    POINT_ALLOCATION_DATA[type].maxChecked = attribute.total;
  }
  updateTotalAllocatableCheckboxDisplay("special");
  const checkboxCounter = getElementByIdWithPrefix(type, ELEMENT_SUFFIXES.CHECKBOX_COUNTER);
  if (POINT_ALLOCATION_DATA[type].maxChecked < POINT_ALLOCATION_DATA[type].checked) {
    checkboxCounter.classList.add("points-exceeded");
  } else {
    checkboxCounter.classList.remove("points-exceeded");
  }
}

/**
 * Handles attribute checkbox; implant for SPECIAL, tag for skill.
 *
 * @param {object} attribute - The attribute being modified.
 * @param {string} type - The type of attribute ("special" or "skill").
 * @param {boolean} isChecked - Whether the checkbox is checked.
 */
function handleAttributeCheckbox(attribute, type, isChecked) {
  const totalCheckedDisplay = getElementByIdWithPrefix(type, ELEMENT_SUFFIXES.CHECKBOX_COUNTER);

  if (isChecked) {
    if (type === "special") {
      attribute.min += 1;
    } else if (type === "skill") {
      attribute.tagBonus += 15;
      updateMinSkillValue(attribute);
    }
    POINT_ALLOCATION_DATA[type].checked += 1;
  } else {
    if (type === "special") {
      attribute.min -= 1;
    } else if (type === "skill") {
      attribute.tagBonus -= 15;
      updateMinSkillValue(attribute);
    }
    POINT_ALLOCATION_DATA[type].checked -= 1;
  }
  totalCheckedDisplay.innerHTML = POINT_ALLOCATION_DATA[type].checked;
}

/**
 * Disables/enables checkboxes of a type based on if checked boxes exceed the maximum.
 *
 * @param {string} type
 */
function updateCheckboxStates(type) {
  const allCheckboxes = document.querySelectorAll(`.${type}-checkbox`);
  const maxChecked = POINT_ALLOCATION_DATA[type].maxChecked;

  // Disable/Enable checkboxes based on the current count
  if (POINT_ALLOCATION_DATA[type].checked >= maxChecked) {
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

  SPECIAL_DATA.forEach((special) => {
    // Can't implant maxxed stats
    if (special.total >= special.max) {
      const specialCheckbox = getElementByIdWithPrefix(special.name, ELEMENT_SUFFIXES.CHECKBOX);
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
  STAT_DATA.forEach((stat) => {
    const derivedStatItem = document.createElement("div");
    derivedStatItem.classList.add("derived-stat-item");
    derivedStatItem.innerHTML = `
        <p class="stat-name">${stat.name}:</p>
        <p id="${stat.name}-value">--</p>
      `;
    document.getElementById("derived-stats").appendChild(derivedStatItem);
  });

  // Update their values
  SPECIAL_DATA.forEach((special) => {
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
  const derivedStats = STAT_DATA.filter((stat) => stat.special === special.name);
  const level = LEVEL_DATA[0].total;
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
      getElementByIdWithPrefix(stat.name, ELEMENT_SUFFIXES.VALUE).innerText = `${value}`;
    }
  });
}

/**
 * Updates the style of perks in the Perks and Planner section to indicate whether their requirements are met.
 * To be used when manipulating the attributes (level, SPECIAL, skills).
 */
function updatePerkRequirementsMetStyling() {
  PERK_DATA.forEach((perk) => {
    updateSelectedPerks(perk);
  });
}

/**
 * Renders rows for numerical attributes (Level, SPECIAL, and Skills) and applies element functions.
 *
 * @param {Array} data
 * @param {string} type
 */
function renderNumericalAttributeRows(data, type) {
  const container = getElementByIdWithPrefix(type, ELEMENT_SUFFIXES.ROWS);
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
    updatePerkRequirementsMetStyling();
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
    const decrementButton = getElementByIdWithPrefix(attribute.name, ELEMENT_SUFFIXES.DECREMENT);
    const incrementButton = document.getElementById(`increment-${attribute.name}`);
    const attributeInput = getElementByIdWithPrefix(attribute.name, ELEMENT_SUFFIXES.INPUT);
    const checkbox = getElementByIdWithPrefix(attribute.name, ELEMENT_SUFFIXES.CHECKBOX);

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
  const decrementButton = getElementByIdWithPrefix(attribute.name, ELEMENT_SUFFIXES.DECREMENT);
  const incrementButton = document.getElementById(`increment-${attribute.name}`);

  const currentTotalPoints = POINT_ALLOCATION_DATA[type].allocated;
  const maxTotalPoints = POINT_ALLOCATION_DATA[type].maxAllocatable;
  const incrementButtons = document.querySelectorAll(`.${type}-increment-button`);

  // Determine whether to disable individual increment buttons or all for an attribute type
  incrementButtons.forEach((button) => {
    if (currentTotalPoints >= maxTotalPoints) {
      button.disabled = true;
      triggerMouseUpOnDisabledButton(button);
    } else {
      const correspondingAttributeName = button.id.split("-")[1];
      const correspondingInput = getElementByIdWithPrefix(correspondingAttributeName, ELEMENT_SUFFIXES.INPUT);
      button.disabled = parseInt(correspondingInput.value) >= correspondingInput.max || currentTotalPoints >= maxTotalPoints;
      triggerMouseUpOnDisabledButton(button);
    }
  });
  triggerMouseUpOnDisabledButton(incrementButton);

  decrementButton.disabled = parseInt(input.value) <= attribute.min;
  triggerMouseUpOnDisabledButton(decrementButton);
}

/**
 * Updates the total points allocatable counter for an attribute type.
 *
 * @param {string} type
 */
function updateTotalAllocatablePointsDisplay(type) {
  const allocatablePointsDisplay = getElementByIdWithPrefix(type, ELEMENT_SUFFIXES.POINTS_TOTAL);
  allocatablePointsDisplay.innerHTML = POINT_ALLOCATION_DATA[type].maxAllocatable;
}

/**
 * Updates the total checkbox allocatable counter for an attribute type.
 *
 * @param {string} type
 */
function updateTotalAllocatableCheckboxDisplay(type) {
  const allocatableCheckboxDisplay = getElementByIdWithPrefix(type, ELEMENT_SUFFIXES.CHECKBOX_TOTAL);
  allocatableCheckboxDisplay.innerHTML = POINT_ALLOCATION_DATA[type].maxChecked;
}

// #### PERKS AND PLANNER
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
  // Update perk row in Perks section
  const perkRow = document.getElementById(`${perk.name}-perk-row`);
  updatePerkStyling(perkRow, perk, SPECIAL_DATA, SKILL_DATA, LEVEL_DATA);

  const perkNameCell = perkRow.querySelector("td:first-child"); // Assuming name is in the first cell
  if (perk.ranksTaken > 0) {
    perkNameCell.textContent = `${perk.name} (${perk.ranksTaken}/${perk.maxRank})`;
  } else {
    perkNameCell.textContent = perk.name; // Restore original name
  }

  // Update perk rows in Planner
  const allPerkItems = document.querySelectorAll(".planner-item");
  allPerkItems.forEach((perkItem) => {
    const perkId = parseInt(perkItem.getAttribute("id"));
    const perk = PERK_ALLOCATION_DATA.selectedPerks.find((p) => p.id === perkId);
    if (perk) {
      updatePerkStyling(perkItem, perk, SPECIAL_DATA, SKILL_DATA, LEVEL_DATA);
    }
  });

  // Update perk counter
  const perkPointsCounter = document.getElementById("perk-points-counter");
  perkPointsCounter.innerHTML = PERK_ALLOCATION_DATA.perksAllocated;

  // Change styling to notify user that perk points were exceeded
  if (PERK_ALLOCATION_DATA.perksAllocated > PERK_ALLOCATION_DATA.perksAllocatable) {
    perkPointsCounter.classList.add("points-exceeded");
  } else {
    perkPointsCounter.classList.remove("points-exceeded");
  }
}

/**
 * Updates the chosen perk in the Perk section and the selected perks in the Planner.
 *
 * @param {object} perk
 */
function updatePerks(perk) {
  updateSelectedPerks(perk);
  updatePlanner(PERK_ALLOCATION_DATA.selectedPerks);
}

/**
 * Selects, ranks up, and removes chosen perks from the Perk section.
 *
 * @param {object} perk
 */
function handlePerkClick(perk) {
  // CHANGE: users can add perk that don't have their requirements
  // met to the planner, but it's clear the requirements aren't met
  // // Prevent selection if requirements are not met
  // if (!perk.requirementsMet) {
  //   return;
  // }

  const selectedIndex = PERK_ALLOCATION_DATA.selectedPerks.findIndex((p) => p.name === perk.name);

  // Perk has not been selected yet
  if (selectedIndex === -1) {
    selectPerk(perk);
  } else {
    if (perk.ranksTaken < perk.maxRank) {
      selectPerk(perk);
    } else {
      // Remove perk if already selected/at max ranks
      deselectPerk(perk);
    }
  }
  updateSelectedPerks(perk);
  updatePlanner(PERK_ALLOCATION_DATA.selectedPerks);
}

/**
 * Selects a perk in the Perks section.
 *
 * @param {object} perk
 */
function selectPerk(perk) {
  const row = document.getElementById(`${perk.name}-perk-row`);
  perk.ranksTaken += 1;
  perk.levelTaken = perk.lvl;

  // We need to copy the item to make sure different ranks of same perk have different IDs
  PERK_ALLOCATION_DATA.selectedPerks.push(JSON.parse(JSON.stringify(perk)));
  PERK_ALLOCATION_DATA.selectedPerks[PERK_ALLOCATION_DATA.selectedPerks.length - 1].id = PERK_ALLOCATION_DATA.perksAllocated;
  PERK_ALLOCATION_DATA.perksAllocated += 1;
  row.classList.add("selected-perk"); // Highlight the selected row

  handlePerkAttributeChange(perk, true);
}

/**
 * Deselects a perk in the Perks section.
 *
 * @param {object} perk
 */
function deselectPerk(perk) {
  PERK_ALLOCATION_DATA.perksAllocated -= perk.ranksTaken;
  perk.ranksTaken = 0;
  perk.levelTaken = 0;
  document.getElementById(`${perk.name}-perk-row`).classList.remove("selected-perk"); // Remove highlight
  PERK_ALLOCATION_DATA.selectedPerks = PERK_ALLOCATION_DATA.selectedPerks.filter((p) => p.name != perk.name);
  updatePerks(perk);
  handlePerkAttributeChange(perk, false);
}

/**
 * Calculate the bonus to allocatable skill points given by the Educated perk at the current level.
 * Considers what level the perk was taken at.
 * 
 * @returns {number} - the bonus to allocatable skill points given by the Educated perk  
 */
function calculateEducatedPerkBonusSkillPoints() {
  const currentLevel = LEVEL_DATA[0].total;
  const educatedPerk = PERK_ALLOCATION_DATA.selectedPerks.find((p) => p.name === "Educated");

  if (educatedPerk != undefined && currentLevel > educatedPerk.levelTaken) {
    return (currentLevel - educatedPerk.levelTaken) * 2;
  } else {
    return 0;
  }
}

/**
 * Handle the selection and deselection of perks that affect the other attributes.
 * 1. Educated: 2 additional skill points per level up
 * 2. Intense Training: Additional SPECIAL allocation point
 * 3. Tag!: Additional taggable skill
 * 
 * Does not consider perks that affect base stats.
 * 
 * @param {object} perk
 * @param {boolean} selected - true if the perk was selected, else false 
 * @param {number} intenseTrainingRanksToDeduct - other value is 1, when individual perk rank is removed from the planner
 */
function handlePerkAttributeChange(perk, selected, intenseTrainingRanksToDeduct = 10) {
  // Handle the "Educated" perk
  if (perk.name === "Educated") {
    if (selected) {
      POINT_ALLOCATION_DATA.skill.educatedAllocatable = calculateEducatedPerkBonusSkillPoints();
    } else {
      POINT_ALLOCATION_DATA.skill.educatedAllocatable = 0;
    }
    POINT_ALLOCATION_DATA.skill.maxAllocatable = calculateMaxAllocatableSkillPoints();
    updateTotalAllocatablePointsDisplay("skill");
  }

  // Handle the "Intense Training" perk
  if (perk.name === "Intense Training") {
    if (selected) {
      perk.RanksTaken = (perk.RanksTaken || 0) + 1;
      POINT_ALLOCATION_DATA.special.maxAllocatable += 1;
    } else {
      if (perk.RanksTaken > 0) {
        POINT_ALLOCATION_DATA.special.maxAllocatable -= intenseTrainingRanksToDeduct;
      }
    }

    updateTotalAllocatablePointsDisplay("special");
    SPECIAL_DATA.forEach((special) => {
      updateButtonStates(special, "special");
    });
  }

  // Handle the "Tag!" perk
  if (perk.name === "Tag!") {
    if (selected) {
      POINT_ALLOCATION_DATA.skill.maxChecked += 1;
    } else {
      POINT_ALLOCATION_DATA.skill.maxChecked -= 1;
    }

    updateTotalAllocatableCheckboxDisplay("skill");
    updateCheckboxStates("skill");
  }
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

  // Clear existing perks from the container
  perkRows.innerHTML = "";

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

/**
 * Renders the planner initally, with level headers for all levels a player
 * can acquire perks (even number from 2 to 50).
 */
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

/**
 * Updates the styling of a perk element based on whether its requirements are met.
 *
 * @param {HTMLElement} perkElement - The DOM element of the perk.
 * @param {object} perk - The perk data object.
 * @param {object} specialData - The SPECIAL data object.
 * @param {object} skillData - The skill data object.
 * @param {object} levelData - The level data object.
 */
function updatePerkStyling(perkElement, perk, specialData, skillData, levelData) {
  if (!perkRequirementsMet(perk, specialData, skillData, levelData)) {
    perkElement.classList.add("requirements-not-met");
  } else {
    perkElement.classList.remove("requirements-not-met");
  }
}

/**
 * Updates the perk Planner with selected, removed, and moved perks.
 *
 * @param {Array} selectedPerks
 */
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

        // Update styling based on requirements
        updatePerkStyling(perkItem, selectedPerk, SPECIAL_DATA, SKILL_DATA, LEVEL_DATA);

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
        const draggedItem = evt.item;
        const newLevel = evt.to.closest(".level-section").getAttribute("section-level");
        const perkId = parseInt(draggedItem.getAttribute("id"));
        const perk = selectedPerks.find((p) => parseInt(p.id) === perkId);
        if (perk) {
          perk.levelTaken = parseInt(newLevel);
        }
        updatePlanner(selectedPerks);
        POINT_ALLOCATION_DATA.skill.maxAllocatable = calculateMaxAllocatableSkillPoints();
        updateTotalAllocatablePointsDisplay("skill");
      },
      onMove: function (evt) {
        const draggedItem = evt.dragged;
        const targetList = evt.to;
        const targetLevel = parseInt(targetList.closest(".level-section").getAttribute("section-level"), 10);
        const perkId = parseInt(draggedItem.getAttribute("id"));
        const perk = selectedPerks.find((p) => p.id === perkId);

        if (perk && targetLevel < perk.lvl) {
          return false;
        }
        return true;
      },
    });
  }
}

/**
 * Removes a perk from the Planner, and either deselects it
 * or ranks it down in the main Perks section.
 * @param {*} selectedPerk
 */
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
  handlePerkAttributeChange(masterPerk, false, (intenseTrainingRanks = 1));
}

// #### INITIALIZE APP
document.addEventListener("DOMContentLoaded", () => {
  SPECIAL_DATA.forEach((special) => {
    special.pointsAllocated = 0; // Points added by the user, not including default min or bonuses
    special.implantBonus = 0;
    special.min = MIN_POINTS_PER_SPECIAL;
    special.max = 10;
    special.total = special.min + special.pointsAllocated;
  });

  SKILL_DATA.forEach((skill) => {
    skill.pointsAllocated = 0; // Points added by the user, not including default min or bonuses
    skill.specialBonus = 0;
    skill.luckBonus = 0;
    skill.tagBonus = 0;
    skill.min = BASE_MIN_POINTS_PER_SKILL;
    skill.max = 100;
    skill.total = skill.min + skill.pointsAllocated;
  });

  SKILL_DATA.forEach((skill) => {
    calculateSpecialBonusesForSkill(skill);
  });

  updateTotalAllocatablePointsDisplay("level");
  updateTotalAllocatablePointsDisplay("special");
  updateTotalAllocatablePointsDisplay("skill");
  updateTotalAllocatableCheckboxDisplay("special");
  updateTotalAllocatableCheckboxDisplay("skill");

  renderNumericalAttributeRows(LEVEL_DATA, "level");
  renderNumericalAttributeRows(SPECIAL_DATA, "special");
  renderNumericalAttributeRows(SKILL_DATA, "skill");
  renderDerivedStats();

  PERK_DATA.forEach((perk) => {
    perk.requirementsMet = true;
    perk.ranksTaken = 0;
    perk.levelTaken = 0;
  });

  populatePerks(PERK_DATA, SPECIAL_DATA, SKILL_DATA, LEVEL_DATA);
  renderPlanner();
});
