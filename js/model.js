const cocktails = {
    "Rosa frizzante gin tonic": "Gin infused rose pepper\nCordial grapefruit\nSalt solution\nSimple",
    "Cherry velluto": "Lacto gin\nBasic cordial\nMonin cherry morello\nAcid mix",
    "Mela verde": "Vodka\nCordial apple\nCocktail drops cardamom",
    "Dolce lychee negroni": "Lychee Negroni punch\nLiqueur Lychee",
    "Maracuja intensa sour": "Rum Silver\nLime Fresh\nLime Cordial\nMonin Passionfruit puree\nBasil Leaves",
    "Bella pesca": "Vodka\nCordial peach\nCocktail drops palo santo\nAcid mix",
    "Sex and the city": "Vodka infused yuzu\nCordial Cranberry\nSimple syrup\nAcid mix",
    "Robin": "White wine\nGin\nRaspberry-Hibiscus cordial\nSimple\nAloe whiter\nAcid mix",
    "Aluna": "Tequila\nGrapefruit cordial\nLiqueur Pineapple\nAcid mix",
    "Aperitivo Spritz Santero": "Spritz Aperitivo\nSparkling wine",
    "Americano": "Vermouth Rosso\nBitter\nSoda",
    "Adonis": "Vermouth Rosso\nSherry Fino",
    "Aztec Negroni": "Tequila\nMezcal\nLiqueur Cynar\nBitter\nBitter Truth Chocolate Bitters",
    "Aviation": "Gin\nLiqueur Violette\nLiqueur maraschino\nLemon fresh",
    "Amaretto Sour": "Bourbon\nLiqueur Amaretto\nLemon fresh\nSimple\nEgg white\nBitter Angostura",
    "Boulevardier": "Bourbon\nVermouth Rosso\nBitter",
    "Clover Club": "Gin\nLemon fresh\nRaspberry syrup\nEgg white",
    "Daiquiri": "Rum Silver\nLime fresh\nSimple",
    "Dry Martini": "Gin\nVermouth Extra Dry\nBitter Angostura Orange",
    "Espresso Martini": "Vodka\nLiqueur Cartron Cafe\nLiqueur Giffard white cacao\nEspresso",
    "French 75": "Gin\nLemon fresh\nSimple\nSparkling wine",
    "Fino Daiquiri": "Sherry Fino\nLemon fresh\nSimple",
    "Gimlet": "Gin\nLime cordial",
    "Hanky Panky": "Gin\nVermouth Rosso\nAmaro Fernet Branca",
    "Hugo": "Liqueur Elderflower\nSparkling Wine\nSoda",
    "Last word": "Gin\nLiqueur Pages Verveine du Velay\nLiqueur Maraschino\nLime fresh",
    "Margarita": "Tequila\nLiqueur Triple sec\nLime fresh\nSimple",
    "Mezcal Margarita": "Mezcal\nTequila\nLiqueur Triple sec\nLime fresh\nSimple",
    "Martinez": "Gin\nVermouth Rosso\nLiqueur Maraschino\nBitter Angostura Orange",
    "Manhattan": "Bourbon\nVermouth Rosso\nBitter Angostura\nBitter Angostura orange",
    "M&M": "Mezcal\nAmaro Montenegro",
    "New york sour": "Bourbon\nLemon fresh\nSimple\nEgg white\nRed wine",
    "Negroni": "Gin\nVermouth Rosso\nBitter",
    "Negroni Sbagliato": "Vermouth Rosso\nBitter\nSparkling wine",
    "Old Fashioned": "Bourbon\nCane syrup\nBitter Angostura",
    "Pedro Manhattan": "Bourbon\nCherry Pedro Jimenez\nBitter Peychaud's",
    "Prospector": "Bourbon\nAmaro Averna\nCherry Pedro Jimenez\nBitter Angostura",
    "Penicillin": "Whiskey Grant's Smoky\nWhiskey Laphroaig 10\nCocktail drops ginger\nGinger syrup\nLemon fresh",
    "Pisco sour": "Pisco\nLemon fresh\nLime fresh\nSimple\nEgg white",
    "Tom collins": "Gin\nLemon fresh\nSimple\nSoda",
    "Sazerac": "Whiskey Templeton Rye\nCognac VSOP\nAbsente 55\nSymple\nBitter Angostura\nBitter Peychaud's",
    "Vieux carre": "Whiskey Templeton Rye\nCognac VSOP\nVermouth Rosso\nLiqueur Benedictine\nBitter Angostura\nBitter Peychaud's",
    "Whiskey Sour": "Bourbon\nLemon fresh\nSimple\nEgg white",
    "White Lady": "Gin\nLiqueur Triple sec\nLemon fresh\nEgg white"
};

const soundCorrect = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'); 
const soundWrong = new Audio('audio/error.mp3'); 

let keys = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startQuiz() {
    keys = Object.keys(cocktails).sort(() => Math.random() - 0.5);
    currentIndex = 0;
    score = 0;
    
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('final-screen').style.display = 'none';
    document.getElementById('quiz-ui').style.display = 'block';
    
    document.getElementById('total-questions').innerText = keys.length;
    showQuestion();
}

function showQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    updateTimerBar();

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

    timer = setInterval(() => {
        timeLeft -= 0.1;
        updateTimerBar();
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 100);
}

function updateTimerBar() {
    const bar = document.getElementById('timer-bar');
    const percent = (timeLeft / 10) * 100;
    bar.style.width = percent + "%";
    
    if (timeLeft < 3) bar.style.background = "#f44336";
    else bar.style.background = "#ffcc00";
}

function handleTimeOut() {
    soundWrong.play().catch(()=>{});
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => {
        b.disabled = true;
        if(b.innerText === cocktails[keys[currentIndex]]) b.classList.add('correct');
    });
    nextStep();
}

function check(btn, isCorrect) {
    clearInterval(timer);
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
    nextStep();
}

function nextStep() {
    setTimeout(() => {
        currentIndex++;
        if(currentIndex < keys.length) showQuestion();
        else finish();
    }, 1500);
}

function finish() {
    document.getElementById('quiz-ui').style.display = 'none';
    document.getElementById('final-screen').style.display = 'block';
    document.getElementById('final-score').innerText = `${score} / ${keys.length}`;

    const percent = (score / keys.length) * 100;
    let msg = "";
    let comment = "";

    if (percent >= 90) {
        msg = "Легенда 🦾";
        comment = "Відмінний результат! Піди всім розкажи, який ти молодець.";
    } else if (percent >= 75) {
        msg = "На бар бека підійдеш";
        comment = "Середній результат. Головне не засиджуйся 😉";
    } else {
        msg = "Ти голова, іди вчи";
        comment = "Або твоїй мамці розкажи, що ти глек! 😂";
    }

    document.getElementById('final-msg').innerText = msg;
    document.getElementById('final-comment').innerText = comment;
}