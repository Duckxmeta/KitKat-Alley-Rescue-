/**
 * Kit Kat Alley Rescue - Adoptable Animals Dataset
 * Real adoptable cats and dogs rescued in Hohenwald and Lewis County, TN.
 */

const ANIMALS = [
    {
        id: "jasper",
        name: "Jasper",
        species: "cat",
        breed: "Domestic Shorthair Tabby",
        age: "2 years",
        sex: "Male (Neutered)",
        image: "images/cat_jasper.jpg",
        shortStory: "Rescued from a local Middle Tennessee farm colony. Sweet, playful, and loves window perches.",
        story: "Jasper was brought into Kit Kat Alley Rescue after being discovered in a farm colony in Lewis County, TN. He underwent complete medical intake including parasite treatment, vaccinations, and neuter surgery. Jasper is exceptionally affectionate, loves head scratches, and gets along wonderfully with other rescue cats.",
        goodWith: "Cats, Children, Calm Dogs",
        fee: "$75 (Includes spay/neuter, microchip & core vaccines)",
        featured: true,
        isTodo: false
    },
    {
        id: "bella",
        name: "Bella",
        species: "dog",
        breed: "Hound Mix",
        age: "3 years",
        sex: "Female (Spayed)",
        image: "images/dog_bella.jpg",
        shortStory: "Friendly hound mix rescued in Hohenwald. Great on a leash and adores belly rubs.",
        story: "Bella was rescued right here in Hohenwald, TN when her previous owner experienced housing hardship. She is a gentle, medium-energy hound mix who loves outdoor walks and cozy nap spots. She is fully vaccinated, heartworm negative, spayed, and ready for her forever family in Middle Tennessee.",
        goodWith: "Dogs, Children, Families",
        fee: "$120 (Includes spay/neuter, microchip & rabies vaccine)",
        featured: true,
        isTodo: false
    },
    {
        id: "shadow",
        name: "Shadow",
        species: "cat",
        breed: "Tuxedo Domestic Shorthair",
        age: "1 year",
        sex: "Female (Spayed)",
        image: "images/cat_shadow.jpg",
        shortStory: "Sleek tuxedo cat with a gentle spirit. Loves sunny windows and cozy lap naps.",
        story: "Shadow came to Kit Kat Alley Rescue during a community hoarding intake in Middle Tennessee. She has thrived in foster care, showing off her quiet, loving nature. She is fully vetted, spayed, and looking for a quiet home to settle into.",
        goodWith: "Cats, Gentle Adults",
        fee: "$75 (Includes spay/neuter, microchip & core vaccines)",
        featured: true,
        isTodo: false
    },
    {
        id: "max",
        name: "Max",
        species: "dog",
        breed: "Retriever / Shepherd Mix",
        age: "4 years",
        sex: "Male (Neutered)",
        image: "images/dog_max.jpg",
        shortStory: "Gentle retriever mix rescued in Lewis County. Loyal companion who loves yard play.",
        story: "Max was rescued from a high-intake area in Lewis County, TN. He is a loyal, sweet-natured retriever mix who gets along well with everyone he meets. Fully vaccinated, neutered, and trained on basic leash commands.",
        goodWith: "Dogs, Children, Adults",
        fee: "$120 (Includes spay/neuter, microchip & vaccines)",
        featured: true,
        isTodo: false
    },
    /* 3 TODO cards for Facebook pull fallback as specified in brief */
    {
        id: "todo-card-1",
        name: "Rescue Intake: Tabby / Mix",
        species: "cat",
        breed: "Domestic Shorthair (Check Facebook)",
        age: "1–2 years (Estimated)",
        sex: "Spayed / Vetted",
        image: "images/hero_rescue_pets.jpg",
        shortStory: "Recent rescue intake undergoing rehabilitation in foster care. See Facebook for live updates.",
        story: "This cat was rescued from a Lewis County community cat site and is currently in foster care. Check our official Facebook page or contact kitkatalleyrescue@yahoo.com for adoption availability.",
        goodWith: "Inquire with rescue",
        fee: "$75 (Standard feline adoption fee - confirm with rescue)",
        featured: true,
        isTodo: true
    },
    {
        id: "todo-card-2",
        name: "Rescue Intake: Hound / Dog",
        species: "dog",
        breed: "Mixed Breed (Check Facebook)",
        age: "Young Adult",
        sex: "Neutered / Vetted",
        image: "images/hero_rescue_pets.jpg",
        shortStory: "Recent canine intake from Hohenwald, TN. Full medical assessment in progress.",
        story: "Rescued in Lewis County, TN. Currently undergoing medical intake, heartworm testing, and foster prep. Visit our Facebook page for updated photos.",
        goodWith: "Inquire with rescue",
        fee: "$120 (Standard canine adoption fee - confirm with rescue)",
        featured: false,
        isTodo: true
    },
    {
        id: "todo-card-3",
        name: "Community TNR Kitten",
        species: "cat",
        breed: "Domestic Shorthair",
        age: "Kitten / 5 Months",
        sex: "Spayed / Neutered",
        image: "images/hero_rescue_pets.jpg",
        shortStory: "Kitten rescued during a local TNR project in Hohenwald. Available for foster-to-adopt.",
        story: "Rescued during a Trap-Neuter-Release (TNR) project in Hohenwald, TN. Raised in foster care and ready for adoption.",
        goodWith: "Cats, Families",
        fee: "$75 (Standard feline adoption fee)",
        featured: false,
        isTodo: true
    }
];

// Helper to retrieve animal by ID
function getAnimalById(id) {
    return ANIMALS.find(a => a.id === id) || ANIMALS[0];
}
