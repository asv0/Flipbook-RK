const cards = document.getElementsByClassName('card');
let toggledCardsArray = [];
let winCount = 0;
const restart = document.getElementById('restart');

const imagesLinkArray = [
    { src: 'assets/iced-tea.png' },
    { src: 'assets/iced-tea.png' },
    { src: 'assets/igloo.jpg' },
    { src: 'assets/igloo.jpg'},
    { src: 'assets/popsicle.png' },
    { src: 'assets/popsicle.png' },
    { src: 'assets/shirt.png' },
    { src: 'assets/shirt.png' }
];

const restartGame = () => {
    // 1. Flip all cards back to red first
    Object.values(cards).forEach(el => el.classList.remove("toggled"));
    
    // 2. Wait for flip animation to finish before swapping images
    setTimeout(() => {
        imagesLinkArray.sort(() => Math.random() - 0.5);
        let allImages = document.getElementsByClassName('card-image');
        Object.values(allImages).forEach((el, index) => {
            el.src = imagesLinkArray[index].src;
        });
        toggledCardsArray = [];
        winCount = 0;
    }, 600); 
};

restart.addEventListener('click', restartGame);

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        if (this.classList.contains("toggled") || toggledCardsArray.length === 2) return;

        this.classList.add("toggled");
        toggledCardsArray.push(this);

        if (toggledCardsArray.length === 2) {
            let img1 = toggledCardsArray[0].querySelector('.card-image').src;
            let img2 = toggledCardsArray[1].querySelector('.card-image').src;

            if (img1 !== img2) {
                let tempArray = [...toggledCardsArray];
                toggledCardsArray = [];
                setTimeout(() => {
                    tempArray.forEach(el => el.classList.remove("toggled"));
                }, 1000); // Slight delay so player can see the second card
            } else {
                toggledCardsArray = [];
                winCount++;
                if (winCount === 4) {
                    setTimeout(restartGame, 2000);
                }
            }
        }
    });
}

// Initial shuffle on load
window.onload = () => {
    // Immediate shuffle without delay for first load
    imagesLinkArray.sort(() => Math.random() - 0.5);
    let allImages = document.getElementsByClassName('card-image');
    Object.values(allImages).forEach((el, index) => {
        el.src = imagesLinkArray[index].src;
    });
};