/**
 * Kit Kat Alley Rescue - animals from the rescue's own Facebook posts.
 * Real photos belong in /images. Do not put generated pets back on the site.
 */

const ANIMALS = [
    {
        id: "pepper",
        name: "Pepper",
        species: "cat",
        breed: "Gray tabby",
        age: "8 weeks",
        sex: "Female",
        status: "available",
        image: "images/pepper-1.jpg",
        images: ["images/pepper-1.jpg", "images/pepper-2.jpg"],
        shortStory: "Up for adoption. Sweet 8-week-old gray tabby and a certified cuddle pro.",
        story: "The Kit Kat Alley Rescue family just grew by four tiny paws. Pepper is an 8-week-old gray tabby: incredibly sweet, perfectly clean, and already a certified master of cuddles. She has been dealing with a minor upper respiratory infection and is recovering beautifully with Terramycin. Her full veterinary work-up is scheduled for October 14, 2026, so she has a little extra time to get strong. She is up for adoption. Message Kit Kat Alley Rescue or Stephanie on Facebook, or email kitkatalleyrescue@yahoo.com.",
        goodWith: "People who want a cuddly kitten. Ask us about other pets.",
        fee: "Up for adoption. Email kitkatalleyrescue@yahoo.com to apply.",
        featured: true,
        isTodo: false
    },
    {
        id: "cheeto",
        name: "Cheeto",
        species: "cat",
        breed: "Domestic cat",
        age: "16 weeks • Fixed, vaccinated, FIV/FeLV negative",
        sex: "Male",
        status: "adopted",
        image: "images/cheeto.jpg",
        images: ["images/cheeto.jpg"],
        shortStory: "The stud of the litter. A gentleman everyone loves.",
        story: "Cheeto is the first kitty people are drawn to, and he loves everyone. Adopted.",
        goodWith: "Loves everyone",
        fee: "Adopted",
        featured: true,
        isTodo: false
    },
    {
        id: "stormy",
        name: "Stormy",
        species: "cat",
        breed: "Diluted tortoiseshell, short hair • Fixed, vaccinated, FIV/FeLV negative",
        age: "16 weeks",
        sex: "Female",
        status: "adopted",
        image: "images/stormy.jpg",
        images: ["images/stormy.jpg"],
        shortStory: "Quiet and reserved. A short-hair version of her mother, who was adopted in August.",
        story: "Stormy is a beautiful sweet kitten. Adopted.",
        goodWith: "Quiet and reserved",
        fee: "Adopted",
        featured: true,
        isTodo: false
    },
    {
        id: "teresa-marie",
        name: "Teresa Marie",
        species: "cat",
        breed: "Long-hair diluted ginger • Fixed, vaccinated, FIV/FeLV negative",
        age: "16 weeks",
        sex: "Female",
        status: "adopted",
        image: "images/teresa-marie.jpg",
        images: ["images/teresa-marie.jpg"],
        shortStory: "Sweet looking, and the instigator of the litter.",
        story: "Teresa Marie plays with her brothers like she is the heavyweight champion. The rescue jokes that she converted to Catholicism given her name. Adopted.",
        goodWith: "Plays with her brothers",
        fee: "Adopted",
        featured: true,
        isTodo: false
    },
    {
        id: "miss-sailor",
        name: "Miss Sailor",
        species: "cat",
        breed: "Brown tabby • Fixed, vaccinated, FIV/FeLV negative",
        age: "16 weeks",
        sex: "Female",
        status: "adopted",
        image: "images/miss-sailor.jpg",
        images: ["images/miss-sailor.jpg"],
        shortStory: "The curious one, and she holds her own with the boys.",
        story: "Miss Sailor is a sweet, beautiful brown tabby. Fostered by a retired US Navy commander. Adopted.",
        goodWith: "Holds her own with the boys",
        fee: "Adopted",
        featured: true,
        isTodo: false
    },
    {
        id: "merlin",
        name: "Merlin",
        species: "cat",
        breed: "Domestic cat • Fixed, vaccinated, FIV/FeLV negative",
        age: "16 weeks",
        sex: "Male",
        status: "adopted",
        image: "images/merlin.jpg",
        images: ["images/merlin.jpg"],
        shortStory: "First born and king of the pack. A cuddle bug when he is not doing ninja tricks with the dust mop.",
        story: "Merlin is the top of the litter. Adopted.",
        goodWith: "Cuddle bug",
        fee: "Adopted",
        featured: true,
        isTodo: false
    },
    {
        id: "angel",
        name: "Angel",
        species: "cat",
        breed: "Domestic cat",
        age: "Adopted",
        sex: "Female",
        status: "adopted",
        image: "images/angel.jpg",
        images: ["images/angel.jpg"],
        shortStory: "Happy Adoption Day. Angel went home with the Reeves family.",
        story: "Happy Adoption Day to Angel and the Reeves family. Thank you for saving a life and giving this beautiful girl a forever home. Adoption approved. Congratulations from Kit Kat Alley Rescue. Angel has been adopted.",
        goodWith: "Her new family, the Reeves.",
        fee: "Adopted",
        featured: true,
        isTodo: false
    }
];

function getAnimalById(id) {
    return ANIMALS.find(a => a.id === id) || ANIMALS[0];
}
