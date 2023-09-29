document.addEventListener('DOMContentLoaded', function() {
    const contactList = document.getElementById('contact-list');
    const addContactForm = document.getElementById('add-contact-form');

    addContactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const number = document.getElementById('number').value;

        const newContact = document.createElement('li');
        newContact.innerHTML = `
            <span data-name="${name}" data-surname="${surname}" data-number="${number}">${name} - ${surname} - ${number}</span>
            <div class="contact-buttons"><button class="sup"><i class="material-icons">delete</i></button>
            <button class="mod"><i class="material-icons">settings</i></button></div>
        `;

        newContact.querySelector('button.sup').addEventListener('click', function() {
            newContact.remove();
            saveContacts();
        });

        newContact.querySelector('button.mod').addEventListener('click', function() {
            openEditForm(contact);
        });

        document.querySelector('button.clear').addEventListener('click', function() {
            localStorage.clear();
            newContact.remove();
            saveContacts();
        });

        contactList.appendChild(newContact);

        saveContacts();
    });

    function openEditForm(contact) {
        document.getElementById('add-contact-form').style.display = "none";
        const editForm = document.createElement('form');
        editForm.id = 'edit-contact-form';
        editForm.innerHTML = `
        <form id="edit-form">
            <h2>Modifier le contact</h2>
            <label for="edit-name">Nom :</label>
            <input type="text" id="edit-name" value="${contact.name}" required>
            <label for="edit-surname">Prénom :</label>
            <input type="text" id="edit-surname" value="${contact.surname}" required>
            <label for="edit-number">Numéro de téléphone :</label>
            <input type="text" id="edit-number" value="${contact.number}" required>
            <button type="submit">Modifier</button>
        </form>`;
    
        editForm.addEventListener('submit', function(event) {
            event.preventDefault();
    
            contact.name = document.getElementById('edit-name').value;
            contact.surname = document.getElementById('edit-surname').value;
            contact.number = document.getElementById('edit-number').value;
    
            const contactSpan = document.querySelector(`[data-name="${contact.name}"][data-surname="${contact.surname}"][data-number="${contact.number}"]`);
            contactSpan.textContent = `${contact.name} - ${contact.number}`;

            editForm.remove();
            
            saveContacts();
        });
        document.getElementById('add-contact-form').style.display = "flex";
        document.body.appendChild(editForm);
    }

    function saveContacts() {
        const contacts = [];
        contactList.querySelectorAll('li').forEach(contact => {
            const name = contact.querySelector('span').dataset.name;
            const surname = contact.querySelector('span').dataset.surname;
            const number = contact.querySelector('span').dataset.number;
            contacts.push({ name, surname, number });
        });
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    function loadContacts() {
        const savedContacts = JSON.parse(localStorage.getItem('contacts'));
        if (savedContacts) {
            savedContacts.forEach(contact => {
                const newContact = document.createElement('li');
                newContact.innerHTML = `
                    <span data-name="${contact.name}" data-surname="${contact.surname}" data-number="${contact.number}">${contact.name} - ${contact.surname} - ${contact.number}</span>
                    <div class="contact-buttons"><button class="sup"><i class="material-icons">delete</i></button>
                    <button class="mod"><i class="material-icons">settings</i></button></div>
                `;
                newContact.querySelector('button.sup').addEventListener('click', function() {
                    newContact.remove();
                    saveContacts();
                });

                newContact.querySelector('button.mod').addEventListener('click', function() {
                    openEditForm(contact);
                });

                document.querySelector('button.clear').addEventListener('click', function() {
                    newContact.remove();
                    localStorage.clear();
                    saveContacts();
                });
                contactList.appendChild(newContact);
            });
        }
    }


    loadContacts();
});