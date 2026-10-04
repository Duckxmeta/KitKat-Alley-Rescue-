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
        status: "pre-adoption",
        image: "images/pepper-1.jpg",
        images: ["images/pepper-1.jpg", "images/pepper-2.jpg"],
        shortStory: "New intake. Sweet 8-week-old gray tabby, already a cuddle pro. Pre-adoption applications are open while she finishes recovering.",
        story: "The Kit Kat Alley Rescue family just grew by four tiny paws. Pepper is an 8-week-old gray tabby: incredibly sweet, perfectly clean, and already a certified master of cuddles. She has been dealing with a minor upper respiratory infection and is recovering beautifully with Terramycin. Her full veterinary work-up is scheduled for October 14, 2026, so she has a little extra time to get strong. Pre-adoption applications are open now. Message Kit Kat Alley Rescue or Stephanie on Facebook, or email kitkatalleyrescue@yahoo.com.",
        goodWith: "People who want a cuddly kitten. Ask us about other pets.",
        fee: "Pre-adoption application open. Fee confirmed when she is medically cleared.",
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
