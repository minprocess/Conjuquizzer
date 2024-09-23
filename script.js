
let focusedTextbox = null;

document.querySelectorAll('.textbox').forEach(textbox => {
    textbox.addEventListener('focus', (event) => {
        focusedTextbox = event.target;
    });
});

function addCharacter(character) {
    if (focusedTextbox) {
        const start = focusedTextbox.selectionStart;
        const end = focusedTextbox.selectionEnd;
        const text = focusedTextbox.value;
        focusedTextbox.value = text.slice(0, start) + character + text.slice(end);
        focusedTextbox.focus();
        focusedTextbox.selectionStart = focusedTextbox.selectionEnd = start + character.length;
    } else {
        alert('Please focus on a text box first.');
    }
}



const verbs = [
  { verb: 'être', tense: 'présent' },
  { verb: 'avoir', tense: 'présent' },
  { verb: 'aller', tense: 'présent' },
  // Add more verbs and tenses as needed
];

const apiUrl = 'https://api.reverso.net/translate/v1/translation';

function getRandomVerb() {
  const randomIndex = Math.floor(Math.random() * verbs.length);
  return verbs[randomIndex];
}

function fetchConjugations(verb, tense) {
  return fetch(`${apiUrl}?input=${verb}&from=fra&to=fra&tense=${tense}`)
      .then(response => response.json())
      .then(data => data.translation);
}

function displayVerbInfo(verb, tense) {
  document.getElementById('verb-info').innerText = `Conjugate the verb "${verb}" in "${tense}" tense.`;
}

function displayResults(correctConjugations) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '<h2>Correct Conjugations:</h2>';
  for (const pronoun in correctConjugations) {
      resultsDiv.innerHTML += `<p>${pronoun}: ${correctConjugations[pronoun]}</p>`;
  }
}

function submitForm() {
  const verbInfo = getRandomVerb();
  const { verb, tense } = verbInfo;
  displayVerbInfo(verb, tense);

  fetchConjugations(verb, tense).then(correctConjugations => {
      displayResults(correctConjugations);
  });
}
/*
function insertCharacter(character) {
  console.log('insertCharacter character', character)
  const activeElement = lastFocusedElement;
  console.log('activeElement.name', activeElement.getAttribute("name"))
  if (activeElement && activeElement.tagName === 'INPUT') {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const value = activeElement.value;
      activeElement.value = value.slice(0, start) + character + value.slice(end);
      activeElement.selectionStart = activeElement.selectionEnd = start + character.length;
      activeElement.focus();
  }
}


function insertCharacter(character) {
  console.log('insertCharacter character', character)
  const activeElement = document.activeElement;
  console.log('activeElement.name', activeElement.getAttribute("name"))
  if (activeElement && activeElement.tagName === 'INPUT') {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      const value = activeElement.value;
      activeElement.value = value.slice(0, start) + character + value.slice(end);
      activeElement.selectionStart = activeElement.selectionEnd = start + character.length;
      activeElement.focus();
  }
}
*/

// Initialize with a random verb
const initialVerbInfo = getRandomVerb();
displayVerbInfo(initialVerbInfo.verb, initialVerbInfo.tense);