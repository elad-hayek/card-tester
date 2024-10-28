let definitions = [];
let shownDefinitions = new Set();
let currentDefinition = null;

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            definitions = data;
            updateRemainingCount();
            populateSidebar();
            showRandomDefinition();
        });

    document.getElementById('definition-card').addEventListener('click', () => {
        const answerElement = document.getElementById('definition-answer');
        answerElement.classList.toggle('hidden');
    });

    document.getElementById('next-button').addEventListener('click', showRandomDefinition);
    document.getElementById('restart-button').addEventListener('click', restartQuiz);
    document.getElementById('reset-counter-button').addEventListener('click', resetCounter);
});

function updateRemainingCount() {
    const remaining = definitions.length - shownDefinitions.size;
    document.getElementById('remaining-count').textContent = remaining;

    if (remaining === 0) {
        document.getElementById('next-button').classList.add('hidden');
        document.getElementById('restart-button').classList.remove('hidden');
    }
}

function populateSidebar() {
    const list = document.getElementById('definition-list');
    definitions.forEach(def => {
        const li = document.createElement('li');
        li.textContent = def.def;
        li.addEventListener('click', () => showDefinition(def));
        list.appendChild(li);
    });
}

function showDefinition(definition) {
    currentDefinition = definition;
    document.getElementById('definition-id').textContent = `ID: ${definition.id}`;
    document.getElementById('definition-text').textContent = definition.def;
    document.getElementById('definition-answer').textContent = definition.answer;
    document.getElementById('definition-answer').classList.add('hidden');
}

function showRandomDefinition() {
    const remainingDefinitions = definitions.filter(def => !shownDefinitions.has(def.id));
    if (remainingDefinitions.length === 0) return;

    const randomIndex = Math.floor(Math.random() * remainingDefinitions.length);
    const randomDefinition = remainingDefinitions[randomIndex];

    shownDefinitions.add(randomDefinition.id);
    showDefinition(randomDefinition);
    updateRemainingCount();
}

function restartQuiz() {
    shownDefinitions.clear();
    updateRemainingCount();
    showRandomDefinition();
    document.getElementById('restart-button').classList.add('hidden');
    document.getElementById('next-button').classList.remove('hidden');
}

function resetCounter() {
    shownDefinitions.clear();
    updateRemainingCount();
}
