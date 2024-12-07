// Retrieve notes from localStorage and display them
document.addEventListener("DOMContentLoaded", loadNotes);

const addNoteBtn = document.getElementById('addNoteBtn');
const noteTitle = document.getElementById('noteTitle');
const noteDescription = document.getElementById('noteDescription');
const notesList = document.getElementById('notesList');

// Add a new note
addNoteBtn.addEventListener('click', addNote);

// Load notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = ''; // Clear the list first

    notes.forEach((note, index) => {
        const noteCard = createNoteCard(note, index);
        notesList.appendChild(noteCard);
    });
}

// Create a note card element
function createNoteCard(note, index) {
    const noteCard = document.createElement('div');
    noteCard.classList.add('note-card');

    const noteTitleElement = document.createElement('h3');
    noteTitleElement.textContent = note.title;

    const noteDescriptionElement = document.createElement('p');
    noteDescriptionElement.textContent = note.description;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(index));

    noteCard.appendChild(noteTitleElement);
    noteCard.appendChild(noteDescriptionElement);
    noteCard.appendChild(deleteBtn);

    return noteCard;
}

// Add a new note and save it to localStorage
function addNote() {
    const title = noteTitle.value.trim();
    const description = noteDescription.value.trim();

    // Check for empty inputs
    if (title === '' || description === '') {
        alert('Please fill out both fields.');
        return;
    }

    const newNote = {
        title: title,
        description: description
    };

    // Get existing notes from localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(newNote);

    // Save the updated notes back to localStorage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Clear the form
    noteTitle.value = '';
    noteDescription.value = '';

    // Reload the notes to update the display
    loadNotes();
}

// Delete a note from localStorage
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Remove the note at the given index
    notes.splice(index, 1);

    // Save the updated notes back to localStorage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Reload the notes to update the display
    loadNotes();
}
