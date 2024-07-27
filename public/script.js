function saveNote() {
    const content = document.getElementById('noteContent').value;

    fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Note saved:', data);
        alert('Note saved!');
    })
    .catch(error => console.error('Error saving note:', error));
}

function listNotes() {
    fetch('/notes')
    .then(response => response.json())
    .then(notes => {
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.innerHTML = `<p>${note.content} <button onclick="deleteNote(${note.id})">Delete</button></p>`;
            notesList.appendChild(noteElement);
        });
    })
    .catch(error => console.error('Error listing notes:', error));
}

function deleteNote(id) {
    fetch(`/notes/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Note deleted:', data);
        alert('Note deleted!');
        listNotes(); // Refresh list after deletion
    })
    .catch(error => console.error('Error deleting note:', error));
}
