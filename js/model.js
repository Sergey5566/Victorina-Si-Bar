const cocktails = {
    "Rosa frizzante gin tonic": "Gin infused rose pepper, Cordial grapefruit, Salt solution, Simple",
    "Cherry velluto": "Lacto gin, Basic cordial, Monin cherry morello, Acid mix",
    "Mela verde": "Vodka, Cordial apple, Cocktail drops cardamom",
    "Dolce lychee negroni": "Lychee negroni punch, Лікер Giffard lychee",
    "Maracuja intensa sour": "Tanduay Asian Rum Silver, Lime fresh, Lime cordial, Monin passionfruit puree, Basil leaves",
    "Bella pesca": "Vodka Marblehead, Cordial peach, Cocktail drops palo santo, Acid mix",
    "Sex and the city": "Vodka infused yuzu, Cordial cranberry, Simple syrup, Acid mix",
    "Robin": "Вино белое Acantus, Джин рабочий flora, Raspberry-Hibiscus cordial, Simple, Alvera Aloe вода, Acid mix",
    "Aluna": "Текіла Sombrero, Grapefruit cordial, Лікер Giffard Pineapple, Acid mix",
    "Aperitivo Spritz Santero": "Spritz Aperitivo, Вино ігристе просекко",
    "Americano": "Vermouth Rosso, Bitter, Содова",
    "Adonis": "Vermouth Rosso, Херес Fino",
    "Aztec Negroni": "Текіла Sambrero, Мескаль Guerrero Maya Espadin, Лікер Cynar, Bitter, Bitter Truth Chocolate Bitters",
    "Aviation": "Джин Flora, Лікер Cartron Violette, Лікер maraschino, Lemon fresh",
    "Amaretto Sour": "Бурбон Old Virginia, Лікер Disaronno Original, Lemon fresh, Simple, Egg white, Bitter Angostura",
    "Boulevardier": "Vermouth Rosso, Bitter, Бурбон Old Virginia",
    "Clover Club": "Gin Flora, Lemon fresh, Raspberry syrup, Egg white",
    "Daiquiri": "Ром Tanduay Silver, Lime fresh, Simple",
    "Dry Martini": "Джин Flora, Вермут Cinzano Extra Dry, Бітер Angostura Orange",
    "Espresso Martini": "Горілка Marblehead, Лікер Cartron Cafe, Лікер Giffard white cacao, Espresso",
    "French 75": "Джин Flora, Lemon fresh, Simple, Вино ігристе просекко",
    "Fino Daiquiri": "Херес Fino, Lemon fresh, Simple",
    "Gimlet": "Джин Flora, Lime cordial",
    "Hanky Panky": "Джин Flora, Vermouth Rosso, Амаро Fernet Branca",
    "Hugo": "Лікер Giffard Fleur de Sureau Sauvage, Вино ігристе Prosecco, Содова",
    "Last word": "Джин Flora, Лікер Pages Verveine du Velay, Лікер Maraschino, Lime fresh",
    "Margarita": "Текіла Sambrero, Лікер Cartron Triple sec, Lime fresh, Simple",
    "Mezcal Margarita": "Мескаль Guerrero Maya Espadin, Текіла Sambrero, Лікер Cartron Triple sec, Lime fresh, Simple",
    "Martinez": "Джин Flora, Vermouth Rosso, Лікер Maraschino, Бітер Angostura Orange",
    "Manhattan": "Бурбон Old Virginia, Vermouth Rosso, Бітер Angostura, Бітер Angostura orange",
    "M&M": "Мескаль Guerrero Maya Espadin, Амаро Montenegro",
    "New york sour": "Бурбон Old Virginia, Lemon fresh, Simple, Egg white, Red wine",
    "Negroni": "Vermouth Rosso, Bitter, Джин Flora",
    "Negroni Sbagliato": "Vermouth Rosso, Bitter, Вино ігристе просекко",
    "Old Fashioned": "Бурбон Old Virginia, Cane syrup, Бітер Angostura",
    "Pedro Manhattan": "Бурбон Old Virginia, Херес Pedro Jimenez, Бітер Peychaud's",
    "Prospector": "Бурбон Old Virginia, Амаро Averna, Херес Pedro Jimenez, Бітер Angostura",
    "Penicillin": "Віскі Grant's Smoky, Віскі Laphroaig 10, Cocktail drops ginger, Ginger syrup, Lemon fresh",
    "Pisco sour": "Піско, Lemon fresh, Lime fresh, Simple, Egg white",
    "Tom collins": "Джин Flora, Lemon fresh, Simple, Содова",
    "Sazerac": "Віскі Templeton Rye, Коньяк Hine VSOP, Absente 55, Symple, Бітер Angostura, Бітер Peychaud's",
    "Vieux carre": "Віскі Templeton Rye, Коньяк Hine VSOP, Вермут Negroni Rosso, Лікер Benedictine, Бітер Angostura, Бітер Peychaud's",
    "Whiskey Sour": "Бурбон Old Virginia, Lemon fresh, Simple, Egg white",
    "White Lady": "Джин Flora, Лікер Cointreau, Lemon fresh, Egg white"
};

const soundCorrect = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'); 
const soundWrong = new Audio('error.mp3'); // Твоя уточка

let keys = [];
let currentIndex = 0;
let score = 0;

function startQuiz() {
    keys = Object.keys(cocktails).sort(() => Math.random() - 0.5);
    currentIndex = 0;
    score = 0;
    document.getElementById('quiz-ui').style.display = 'block';
    document.getElementById('final-screen').style.display = 'none';
    document.getElementById('total-questions').innerText = keys.length;
    showQuestion();
}

function showQuestion() {
    const name = keys[currentIndex];
    const correct = cocktails[name];
    document.getElementById('target-cocktail').innerText = name;
    document.getElementById('current-idx').innerText = currentIndex + 1;

    let options = [correct];
    const allIngredients = Object.values(cocktails);
    while(options.length < 4) {
        let rand = allIngredients[Math.floor(Math.random() * allIngredients.length)];
        if(!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById('options-container');
    container.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => check(btn, opt === correct);
        container.appendChild(btn);
    });
}

function check(btn, isCorrect) {
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);

    if(isCorrect) {
        btn.classList.add('correct');
        soundCorrect.play().catch(()=>{});
        score++;
    } else {
        btn.classList.add('wrong');
        soundWrong.play().catch(()=>{});
        btns.forEach(b => {
            if(b.innerText === cocktails[keys[currentIndex]]) b.classList.add('correct');
        });
    }

    setTimeout(() => {
        currentIndex++;
        if(currentIndex < keys.length) showQuestion();
        else finish();
    }, 1500);
}

function finish() {
    const total = keys.length;
    const percent = (score / total) * 100;
    
    document.getElementById('quiz-ui').style.display = 'none';
    document.getElementById('final-screen').style.display = 'block';
    document.getElementById('final-score').innerText = `${score} / ${total}`;

    let msg = "";
    let comment = "";

    if (percent === 100) {
        msg = "Серега, ты машина! 🦾";
        comment = "Чистая работа! Хоть сейчас на международный конкурс.";
    } else if (percent >= 75) {
        msg = "Давай лучше!";
        comment = "Хороший прогон! В целом годно, но на паре коктейлей ты бы «запорол» заказ. 😉";
    } else {
        msg = "Не молодец...";
        comment = "Слабовато для профи. Давай-ка еще пару кругов теории, Лера бы расстроилась! 😂";
    }

    document.getElementById('final-msg').innerText = msg;
    document.getElementById('final-comment').innerText = comment;
}

startQuiz();