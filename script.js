"use strict";

const skills = [
    {
        name: "Networking",
        category: "Technical",
        description: "Learning how computer networks, devices, and systems connect and communicate.",
        level: 70
    },
    {
        name: "HTML and CSS",
        category: "Web Development",
        description: "Creating responsive and organized web pages using HTML and CSS.",
        level: 85
    },
    {
        name: "JavaScript",
        category: "Programming",
        description: "Learning how to make websites interactive using JavaScript.",
        level: 70
    },
    {
        name: "Java",
        category: "Programming",
        description: "Developing programming skills using arrays, loops, objects, and classes.",
        level: 65
    },
    {
        name: "Problem Solving",
        category: "Technical",
        description: "Analyzing problems and creating simple solutions through programming.",
        level: 75
    }
];

const skillsContainer = document.getElementById("skillsContainer");
const skillSearch = document.getElementById("skillSearch");
const skillMessage = document.getElementById("skillMessage");
const categoryButtons = document.querySelectorAll(".category-btn");
const resetButton = document.getElementById("resetSkills");

let selectedCategory = "All";

function filterSkills(value) {
    const searchTerm = value.trim().toLowerCase();

    return skills.filter(function(skill) {

        const matchesSearch =
            skill.name.toLowerCase().includes(searchTerm) ||
            skill.category.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "All" ||
            skill.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
}

function renderSkills(skillList) {

    skillsContainer.innerHTML = "";

    if (skillList.length === 0) {
        skillMessage.textContent = "No skills found. Try another search.";
        return;
    }

    skillMessage.textContent =
        skillList.length + " skill(s) displayed.";

    skillList.forEach(function(skill) {

        const card = document.createElement("button");

        card.type = "button";
        card.className = "interactive-skill-card";

        card.innerHTML = `
            <div class="skill-icon">♡</div>

            <h3>${skill.name}</h3>

            <span>${skill.category}</span>

            <p>${skill.description}</p>

            <div class="skill-level">
                <div class="level-info">
                    <small>Skill Level</small>
                    <strong>${skill.level}%</strong>
                </div>

                <div class="progress-bar">
                    <div
                        class="progress-fill"
                        style="width: ${skill.level}%"
                    ></div>
                </div>
            </div>

            <div class="click-text">
                Click to select
            </div>
        `;

        card.addEventListener("click", function() {

            document
                .querySelectorAll(".interactive-skill-card")
                .forEach(function(item) {
                    item.classList.remove("selected");
                });

            card.classList.add("selected");

            skillMessage.textContent =
                skill.name + " selected • " +
                skill.level + "% skill level";
        });

        skillsContainer.appendChild(card);
    });
}

skillSearch.addEventListener("input", function() {

    const filteredSkills = filterSkills(skillSearch.value);

    renderSkills(filteredSkills);
});

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        categoryButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        renderSkills(filterSkills(skillSearch.value));
    });
});

resetButton.addEventListener("click", function() {

    skillSearch.value = "";
    selectedCategory = "All";

    categoryButtons.forEach(function(button) {
        button.classList.remove("active");
    });

    categoryButtons[0].classList.add("active");

    renderSkills(skills);

    skillMessage.textContent = "Showing all my skills.";
});

renderSkills(skills);

skillMessage.textContent = "Showing all my skills.";
