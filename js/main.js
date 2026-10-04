/**
 * Kit Kat Alley Rescue - Main JavaScript
 * Handles navigation, interactive pet filters, dynamic profile loading,
 * giving band presets, and accessible form mailto prefill triggers with success UI.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPetGrid();
    initAnimalProfile();
    initGivingBand();
    initForms();
});

/* ==========================================================================
   NAVIGATION TOGGLE
   ========================================================================== */

function initNavigation() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            toggleBtn.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

/* ==========================================================================
   PET GRID RENDERER & FILTERING
   ========================================================================== */

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
        } else if (filter !== 'all') {
            items = ANIMALS.filter(a => a.species === filter);
        }

        if (items.length === 0) {
            petGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <h3>No animals found in this category right now.</h3>
                <p>Please check back soon or contact us directly at <a href="mailto:kitkatalleyrescue@yahoo.com">kitkatalleyrescue@yahoo.com</a>.</p>
            </div>`;
            return;
        }

        items.forEach(animal => {
            const card = document.createElement('div');
            card.className = 'pet-card';
            
            const badgeClass = animal.isTodo ? 'badge-todo' : (animal.species === 'cat' ? 'badge-cat' : 'badge-dog');
            const badgeLabel = animal.isTodo ? 'INTAKE / TODO' : animal.species.toUpperCase();

            card.innerHTML = `
                <div class="pet-card-image">
                    <img src="${animal.image}" alt="${animal.name} - ${animal.breed}">
                    <span class="pet-badge ${badgeClass}">${badgeLabel}</span>
                </div>
                <div class="pet-card-body">
                    <h3>${animal.name}</h3>
                    <div class="pet-card-meta">${animal.breed} • ${animal.age} • ${animal.sex}</div>
                    <p class="pet-card-story">${animal.shortStory}</p>
                    <div style="margin-top: auto; display: flex; gap: 0.5rem;">
                        <a href="animal.html?id=${animal.id}" class="btn btn-outline" style="width: 100%;">View Profile</a>
                    </div>
                </div>
            `;
            petGrid.appendChild(card);
        });
    }

    // Initial render
    renderGrid('all');

    // Filter button handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGrid(btn.dataset.filter);
        });
    });
}

/* ==========================================================================
   ANIMAL PROFILE RENDERER
   ========================================================================== */

function initAnimalProfile() {
    const profileContainer = document.querySelector('#animal-profile-container');
    if (!profileContainer || typeof ANIMALS === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id') || 'jasper';
    const animal = getAnimalById(animalId);

    document.title = `${animal.name} | Adoptable ${animal.species === 'cat' ? 'Cat' : 'Dog'} | Kit Kat Alley Rescue`;

    const badgeClass = animal.isTodo ? 'badge-todo' : (animal.species === 'cat' ? 'badge-cat' : 'badge-dog');

    profileContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;">
            <div>
                <img src="${animal.image}" alt="${animal.name}" style="width: 100%; height: 420px; object-fit: cover; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
            </div>
            <div>
                <span class="pet-badge ${badgeClass}" style="position: static; display: inline-block; margin-bottom: 0.75rem;">${animal.species.toUpperCase()}</span>
                <h1 style="margin-bottom: 0.5rem;">${animal.name}</h1>
                <p style="font-size: 1.1rem; color: var(--text-muted); font-weight: 600; margin-bottom: 1.5rem;">
                    ${animal.breed} • ${animal.age} • ${animal.sex}
                </p>

                <div style="background-color: var(--surface-white); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--secondary);">Rescue Story & Background</h3>
                    <p style="margin-bottom: 1rem; line-height: 1.7;">${animal.story}</p>
                    
                    <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; font-size: 0.95rem;">
                        <p><strong>Good with:</strong> ${animal.goodWith}</p>
                        <p><strong>Adoption Fee:</strong> ${animal.fee}</p>
                    </div>
                </div>

                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="adopt.html#adoption-form?animal=${encodeURIComponent(animal.name)}" class="btn btn-primary" style="flex: 1; min-width: 200px;">
                        Apply to Adopt ${animal.name}
                    </a>
                    <a href="adopt.html" class="btn btn-outline">Back to All Animals</a>
                </div>
            </div>
        </div>
    `;
}

/* ==========================================================================
   GIVING BAND PRESETS
   ========================================================================== */

function initGivingBand() {
    const presetBtns = document.querySelectorAll('.giving-preset-btn');
    const donateLink = document.querySelector('#giving-donate-link');

    if (presetBtns.length && donateLink) {
        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                presetBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const amount = btn.dataset.amount;
                donateLink.href = `donate.html?amount=${amount}`;
            });
        });
    }
}

/* ==========================================================================
   FORM HANDLING & MAILTO PREFILL GENERATION
   ========================================================================== */

/**
 * Host email fallback:
 * Since static site hosts (GitHub Pages) do not process server-side mail scripts,
 * forms prefill a structured mailto link directly to kitkatalleyrescue@yahoo.com
 * and display an immediate success banner to the user.
 */
function initForms() {
    // 1. Adoption Form
    const adoptionForm = document.querySelector('#form-adoption');
    if (adoptionForm) {
        // Prefill animal name if query param present
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
            const email = formData.get('email') || '';
            const phone = formData.get('phone') || '';
            const address = formData.get('address') || '';
            const city = formData.get('city') || '';
            const species = formData.get('species_wanted') || '';
            const animalName = formData.get('animal_name') || 'Not specified';
            const housing = formData.get('housing') || '';
            const landlord = formData.get('landlord_permission') || '';
            const otherPets = formData.get('other_pets') || '';
            const vetName = formData.get('vet_name') || '';
            const whyAnimal = formData.get('why_this_animal') || '';
            const anyoneHome = formData.get('anyone_home') || '';

            const subject = `Adoption application — ${name}`;
            const body = `Kit Kat Alley Rescue Adoption Application:

Applicant Name: ${name}
Phone: ${phone}
Email: ${email}
Address: ${address}, ${city}

Species Interested In: ${species}
Specific Animal Name: ${animalName}
Housing (Own/Rent): ${housing}
Landlord Permission: ${landlord}
Other Pets in Home: ${otherPets}
Vet Name / Reference: ${vetName}
Anyone Home During the Day: ${anyoneHome}

Why this animal / Additional notes:
${whyAnimal}`;

            triggerMailtoAndSuccess(adoptionForm, subject, body);
        });
    }

    // 2. Volunteer Form
    const volunteerForm = document.querySelector('#form-volunteer');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(volunteerForm);
            const name = formData.get('name') || 'Volunteer';
            const email = formData.get('email') || '';
            const phone = formData.get('phone') || '';
            const city = formData.get('city') || '';
            const interests = formData.getAll('interests').join(', ') || 'General';
            const availability = formData.get('availability') || '';

            const subject = `Volunteer application — ${name}`;
            const body = `Kit Kat Alley Rescue Volunteer Application:

Name: ${name}
Phone: ${phone}
Email: ${email}
City: ${city}
Areas of Interest: ${interests}
Availability: ${availability}`;

            triggerMailtoAndSuccess(volunteerForm, subject, body);
        });
    }

    // 3. Board Interest Form
    const boardForm = document.querySelector('#form-board');
    if (boardForm) {
        boardForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(boardForm);
            const name = formData.get('name') || 'Applicant';
            const email = formData.get('email') || '';
            const phone = formData.get('phone') || '';
            const city = formData.get('city') || '';
            const background = formData.get('background') || '';
            const whyServe = formData.get('why_serve') || '';

            const subject = `Board interest — ${name}`;
            const body = `Kit Kat Alley Rescue Board Member Interest:

Name: ${name}
Phone: ${phone}
Email: ${email}
City: ${city}

Professional & Volunteer Background:
${background}

Why I want to serve on the Board:
${whyServe}`;

            triggerMailtoAndSuccess(boardForm, subject, body);
        });
    }

    // 4. Spay / Neuter & TNR Request Form
    const tnrForm = document.querySelector('#form-tnr');
    if (tnrForm) {
        tnrForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(tnrForm);
            const name = formData.get('name') || 'Requester';
            const email = formData.get('email') || '';
            const phone = formData.get('phone') || '';
            const cityCounty = formData.get('city_county') || '';
            const species = formData.get('species') || '';
            const count = formData.get('count') || '1';
            const ownedOrFeral = formData.get('owned_or_feral') || '';
            const incomeQualified = formData.get('income_qualified') || '';
            const timing = formData.get('timing') || '';

            const subject = `Spay/Neuter/TNR request — ${name}`;
            const body = `Kit Kat Alley Rescue Spay/Neuter & TNR Assistance Request:

Requester Name: ${name}
Phone: ${phone}
Email: ${email}
City / County: ${cityCounty}

Animals (Cats/Dogs): ${species}
Number of Animals: ${count}
Status: ${ownedOrFeral}
Income Qualified (Yes/No): ${incomeQualified}
Preferred Timing: ${timing}`;

            triggerMailtoAndSuccess(tnrForm, subject, body);
        });
    }

    // 5. General Contact Form
    const contactForm = document.querySelector('#form-contact');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name') || 'Inquirer';
            const email = formData.get('email') || '';
            const phone = formData.get('phone') || '';
            const message = formData.get('message') || '';

            const subject = `Inquiry — ${name}`;
            const body = `Kit Kat Alley Rescue Website Contact Inquiry:

Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}`;

            triggerMailtoAndSuccess(contactForm, subject, body);
        });
    }
}

function triggerMailtoAndSuccess(formElement, subject, body) {
    const mailtoUrl = `mailto:kitkatalleyrescue@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open user default mail app
    window.location.href = mailtoUrl;

    // Show success feedback on page
    const banner = formElement.querySelector('.form-success-banner');
    if (banner) {
        banner.style.display = 'block';
        banner.innerHTML = `<strong>Application Prepared!</strong> Sent. We reply by email at kitkatalleyrescue@yahoo.com. If your email app did not open automatically, please send your details directly to <strong>kitkatalleyrescue@yahoo.com</strong>.`;
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
