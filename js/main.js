/**
 * Kit Kat Alley Rescue - Main JavaScript
 * Navigation, pet cards, profiles, giving band, and mailto forms.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPetGrid();
    initAnimalProfile();
    initGivingBand();
    initForms();
});

function initNavigation() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            toggleBtn.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function statusLabel(animal) {
    if (animal.status === 'adopted') return 'ADOPTED';
    if (animal.status === 'pre-adoption') return 'PRE-ADOPTION';
    if (animal.isTodo) return 'INTAKE';
    return animal.species.toUpperCase();
}

function initPetGrid() {
    const petGrid = document.querySelector('#pet-grid-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!petGrid || typeof ANIMALS === 'undefined') return;

    const isHomepage = petGrid.dataset.homepage === 'true';

    function renderGrid(filter = 'all') {
        petGrid.innerHTML = '';

        let items = ANIMALS;
        if (isHomepage) {
            items = ANIMALS.filter(a => a.featured).slice(0, 6);
        } else if (filter === 'adopted') {
            items = ANIMALS.filter(a => a.status === 'adopted');
        } else if (filter !== 'all') {
            items = ANIMALS.filter(a => a.species === filter && a.status !== 'adopted');
        } else {
            items = ANIMALS.filter(a => a.status !== 'adopted');
        }

        if (items.length === 0) {
            petGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <h3>No animals in this category right now.</h3>
                <p>Pepper is accepting pre-adoption applications. Email <a href="mailto:kitkatalleyrescue@yahoo.com">kitkatalleyrescue@yahoo.com</a>.</p>
            </div>`;
            return;
        }

        items.forEach(animal => {
            const card = document.createElement('div');
            card.className = 'pet-card';
            const badgeClass = animal.status === 'adopted' ? 'badge-todo' : (animal.species === 'cat' ? 'badge-cat' : 'badge-dog');
            const cta = animal.status === 'adopted' ? 'Read her story' : 'View Profile';

            card.innerHTML = `
                <div class="pet-card-image">
                    <img src="${animal.image}" alt="${animal.name}, ${animal.breed}">
                    <span class="pet-badge ${badgeClass}">${statusLabel(animal)}</span>
                </div>
                <div class="pet-card-body">
                    <h3>${animal.name}</h3>
                    <div class="pet-card-meta">${animal.breed} • ${animal.age} • ${animal.sex}</div>
                    <p class="pet-card-story">${animal.shortStory}</p>
                    <div style="margin-top: auto; display: flex; gap: 0.5rem;">
                        <a href="animal.html?id=${animal.id}" class="btn btn-outline" style="width: 100%;">${cta}</a>
                    </div>
                </div>
            `;
            petGrid.appendChild(card);
        });
    }

    renderGrid('all');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGrid(btn.dataset.filter);
        });
    });
}

function initAnimalProfile() {
    const profileContainer = document.querySelector('#animal-profile-container');
    if (!profileContainer || typeof ANIMALS === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id') || 'pepper';
    const animal = getAnimalById(animalId);
    const photos = animal.images && animal.images.length ? animal.images : [animal.image];
    const adopted = animal.status === 'adopted';

    document.title = `${animal.name} | Kit Kat Alley Rescue`;

    const gallery = photos.map((src, i) => `
        <img src="${src}" alt="${animal.name} photo ${i + 1}" style="width: 100%; height: ${i === 0 ? '420px' : '220px'}; object-fit: cover; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); margin-bottom: 1rem;">
    `).join('');

    const action = adopted
        ? `<p style="font-weight: 700; color: var(--secondary);">Angel has been adopted. Congratulations to the Reeves family.</p>`
        : `<a href="adopt.html?animal=${encodeURIComponent(animal.name)}#adoption-form" class="btn btn-primary" style="flex: 1; min-width: 200px;">Pre-adopt ${animal.name}</a>`;

    profileContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;">
            <div>${gallery}</div>
            <div>
                <span class="pet-badge badge-cat" style="position: static; display: inline-block; margin-bottom: 0.75rem;">${statusLabel(animal)}</span>
                <h1 style="margin-bottom: 0.5rem;">${animal.name}</h1>
                <p style="font-size: 1.1rem; color: var(--text-muted); font-weight: 600; margin-bottom: 1.5rem;">
                    ${animal.breed} • ${animal.age} • ${animal.sex}
                </p>
                <div style="background-color: var(--surface-white); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--secondary);">${adopted ? 'Adoption day' : 'Her story'}</h3>
                    <p style="margin-bottom: 1rem; line-height: 1.7;">${animal.story}</p>
                    <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; font-size: 0.95rem;">
                        <p><strong>Good with:</strong> ${animal.goodWith}</p>
                        <p><strong>Adoption:</strong> ${animal.fee}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    ${action}
                    <a href="adopt.html" class="btn btn-outline">Back to animals</a>
                </div>
            </div>
        </div>
    `;
}

function initGivingBand() {
    const presetBtns = document.querySelectorAll('.giving-preset-btn');
    const donateLink = document.querySelector('#giving-donate-link');

    if (presetBtns.length && donateLink) {
        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                presetBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                donateLink.href = `donate.html?amount=${btn.dataset.amount}`;
            });
        });
    }
}

function initForms() {
    const adoptionForm = document.querySelector('#form-adoption');
    if (adoptionForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const animalParam = urlParams.get('animal');
        if (animalParam) {
            const animalInput = adoptionForm.querySelector('#animal_name');
            if (animalInput) animalInput.value = decodeURIComponent(animalParam);
        }

        adoptionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(adoptionForm);
            const name = formData.get('name') || 'Applicant';
            const subject = `Adoption application — ${name}`;
            const body = `Kit Kat Alley Rescue Adoption Application:

Applicant Name: ${name}
Phone: ${formData.get('phone') || ''}
Email: ${formData.get('email') || ''}
Address: ${formData.get('address') || ''}, ${formData.get('city') || ''}

Species Interested In: ${formData.get('species_wanted') || ''}
Specific Animal Name: ${formData.get('animal_name') || 'Not specified'}
Housing (Own/Rent): ${formData.get('housing') || ''}
Landlord Permission: ${formData.get('landlord_permission') || ''}
Other Pets in Home: ${formData.get('other_pets') || ''}
Vet Name / Reference: ${formData.get('vet_name') || ''}
Anyone Home During the Day: ${formData.get('anyone_home') || ''}

Why this animal / Additional notes:
${formData.get('why_this_animal') || ''}`;
            triggerMailtoAndSuccess(adoptionForm, subject, body);
        });
    }

    const volunteerForm = document.querySelector('#form-volunteer');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(volunteerForm);
            const name = formData.get('name') || 'Volunteer';
            const subject = `Volunteer application — ${name}`;
            const body = `Kit Kat Alley Rescue Volunteer Application:

Name: ${name}
Phone: ${formData.get('phone') || ''}
Email: ${formData.get('email') || ''}
City: ${formData.get('city') || ''}
Areas of Interest: ${formData.getAll('interests').join(', ') || 'General'}
Availability: ${formData.get('availability') || ''}`;
            triggerMailtoAndSuccess(volunteerForm, subject, body);
        });
    }

    const boardForm = document.querySelector('#form-board');
    if (boardForm) {
        boardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(boardForm);
            const name = formData.get('name') || 'Applicant';
            const subject = `Board interest — ${name}`;
            const body = `Kit Kat Alley Rescue Board Member Interest:

Name: ${name}
Phone: ${formData.get('phone') || ''}
Email: ${formData.get('email') || ''}
City: ${formData.get('city') || ''}

Professional & Volunteer Background:
${formData.get('background') || ''}

Why I want to serve on the Board:
${formData.get('why_serve') || ''}`;
            triggerMailtoAndSuccess(boardForm, subject, body);
        });
    }

    const tnrForm = document.querySelector('#form-tnr');
    if (tnrForm) {
        tnrForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(tnrForm);
            const name = formData.get('name') || 'Requester';
            const subject = `Spay/neuter registration — ${name}`;
            const body = `Kit Kat Alley Rescue spay/neuter registration
Clinic: Linden Animal Clinic day. October 14, 2026 is FULL. This request is for the next clinic.

Owner name: ${name}
Phone: ${formData.get('phone') || ''}
Email: ${formData.get('email') || ''}
City / County: ${formData.get('city_county') || ''}
Drop-off: ${formData.get('dropoff') || ''}
Cat sex: ${formData.get('cat_sex') || ''}
Number of cats: ${formData.get('count') || '1'}
Owned or community cat: ${formData.get('owned_or_feral') || ''}
Committed to attending: ${formData.get('committed') || ''}
Notes: ${formData.get('timing') || ''}

Copays go to the clinic: female $60, male $50. Kit Kat Alley Rescue covers rabies vaccines, transport, and additional care.
Lewis County drop-off when a clinic is open: 7:00 AM at Tractor Supply Co., 608 E Main St, Hohenwald. Pickup 2:00 PM.
Perry County drop-off: 8:00 AM at Linden Animal Clinic. Pickup 12:00 PM.`;
            triggerMailtoAndSuccess(tnrForm, subject, body);
        });
    }

    const contactForm = document.querySelector('#form-contact');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name') || 'Inquirer';
            const subject = `Inquiry — ${name}`;
            const body = `Kit Kat Alley Rescue Website Contact Inquiry:

Name: ${name}
Phone: ${formData.get('phone') || ''}
Email: ${formData.get('email') || ''}

Message:
${formData.get('message') || ''}`;
            triggerMailtoAndSuccess(contactForm, subject, body);
        });
    }
}

function triggerMailtoAndSuccess(formElement, subject, body) {
    window.location.href = `mailto:kitkatalleyrescue@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const banner = formElement.querySelector('.form-success-banner');
    if (banner) {
        banner.style.display = 'block';
        banner.innerHTML = `<strong>Email opened with your details filled in.</strong> Send it to kitkatalleyrescue@yahoo.com. If your mail app did not open, copy the form and email that address directly.`;
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
