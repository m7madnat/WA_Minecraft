let genWorld, gameSizeX = 0,gameSizeY = 0;
let invDirt = invGrass = invSnowygrass = invLeaves = invWood = invCobble = invWater = invLava = 0; //inventory variables
let myTool = '',
    selectedElement;
let allBlocks = ['dirt', 'stone', 'lava', 'water', 'grass', 'leaves', 'wood', 'sky', 'dark', 'snowy_grass', 'lilac']; //all blocks in game


let gameWindow = document.querySelector('#gameWindow');
let mainMenu = document.querySelector('#mainMenu');
let startBtn = document.querySelector('#startBtn');
let sizeInput = document.querySelector('#sizeInput');
let sun = document.querySelector('#sun');
let dark = document.querySelector('#dark');


let clickables = document.querySelectorAll('.clickable');
let invTools = document.querySelectorAll('.invTool');
let gameTiles = document.querySelectorAll('.gameTile');
let resetBtn = document.querySelector('#resetBtn');
let inv = document.querySelector('.inv');

//count
let grassCnt = document.querySelector('#grassCnt');
let snowyCnt = document.querySelector('#snowyCnt');
let dirtCnt = document.querySelector('#dirtCnt');
let woodCnt = document.querySelector('#woodCnt');
let leavesCnt = document.querySelector('#leavesCnt');
let waterCnt = document.querySelector('#waterCnt');
let lavaCnt = document.querySelector('#lavaCnt');
let stoneCnt = document.querySelector('#stoneCnt');


//functions
function createWorld(x, y) {
    //create empty world matrix.
    genWorld = Array.from(Array(parseInt(y)), () => new Array(parseInt(x)));
    //fill the genWorld with pre-defined + random layers of game blocks


    if (sun.checked) {
        for (let i = 0; i < 6; i++) //add sky
            for (let j = 0; j < genWorld[i].length; j++)
                genWorld[i][j] = 'sky';
    } else if (dark.checked) {
        for (let i = 0; i < 6; i++) //add sky
            for (let j = 0; j < genWorld[i].length; j++)
                genWorld[i][j] = 'dark';
    }
    for (let i = 12; i < 13; i++) //add grass
        for (let j = 0; j < genWorld[i].length; j++)
            genWorld[i][j] = 'grass';

    for (let i = 13; i < 19; i++) //add dirt
        for (let j = 0; j < genWorld[i].length; j++)
            genWorld[i][j] = 'dirt';

    for (let i = 12; i < 13; i++) { //add nowy_grass
        let end = Math.floor(Math.random() * (gameSizeX - 7));
        let start = 7 + Math.floor(Math.random() * end);
        for (let j = end; j > start; j--) {
            genWorld[i][j] = 'snowy_grass';
        }
    }
    for (let i = 13; i < 20; i++) { //add random water
        let end = Math.floor(Math.random() * (gameSizeX - 7));
        let start = 10 + Math.floor(Math.random() * end);
        for (let j = end; j > start; j--) {
            genWorld[i][j] = 'water';
        }
    }
    for (let i = 16; i < 20; i++) { //add lava
        let end = Math.floor(Math.random() * (gameSizeX - 7));
        let start = 1 + Math.floor(Math.random() * end);
        for (let j = end; j > start; j--) {
            genWorld[i][j] = 'lava';
        }
    }
    for (let i = 16; i < 20; i++) { //add stone
        let end = Math.floor(Math.random() * (gameSizeX - 7));
        for (let j = end; j > 0; j--) {
            genWorld[i][j] = 'stone';
        }
    }

    if (sun.checked) {
        for (let i = 6; i < 12; i++) //add TREES
            for (let j = 0; j < genWorld[i].length; j++)
                genWorld[i][j] = 'sky';
    } else if (dark.checked) {
        for (let i = 6; i < 12; i++) //add TREES
            for (let j = 0; j < genWorld[i].length; j++)
                genWorld[i][j] = 'dark';
    }

    if (genWorld[11][12] !== 'wood') { //add lilac 
        let end = Math.floor(Math.random() * (gameSizeX - 7));        
        genWorld[11][end] = 'lilac';  
        genWorld[11][end + 2] = 'lilac';  
    }



    let tree1 = Math.floor(Math.random() * 6) + 2
    let tree2 = Math.floor(Math.random() * 16) + 10
    tree(tree1, 11);
    tree(tree2, 11);
    tree(gameSizeX - 3, 11);
    tree(gameSizeX - 12, 11);

    for (let i = 2; i < gameSizeX - 5; i = i + 6) // clouds
    {

        let result = Math.round(Math.random() * 4)
        if (sun.checked) {
            if (result == 0 || result == 1) {
                cloud(i, 1);
            }
        }

    }
    //draw world to screen after generating it
    makeWorld();
}

function tree(x, y) {
    genWorld[y][x] = 'wood';
    genWorld[y - 1][x] = 'wood';
    genWorld[y - 2][x] = 'wood';
    genWorld[y - 3][x] = 'leaves';
    genWorld[y - 3][x - 1] = 'leaves';
    genWorld[y - 3][x + 1] = 'leaves';
    genWorld[y - 4][x] = 'leaves';
    genWorld[y - 4][x - 1] = 'leaves';
    genWorld[y - 4][x + 1] = 'leaves';
    genWorld[y - 5][x] = 'leaves';
}

function cloud(x, y) {
    genWorld[y][x] = 'cloud';
    genWorld[y][x + 1] = 'cloud';
    genWorld[y][x + 2] = 'cloud';
    genWorld[y][x + 3] = 'cloud';

    genWorld[y + 1][x] = 'cloud';
    genWorld[y + 1][x + 1] = 'cloud';
    genWorld[y + 1][x + 2] = 'cloud';
    genWorld[y + 1][x + 3] = 'cloud';
}

function makeWorld() {
    for (let i = 0; i < gameSizeY; i++) {
        for (let j = 0; j < gameSizeX; j++) {

            let div = document.createElement('div');
            div.style.gridRowStart = i + 1;
            div.style.gridColumnStart = j + 1;
            div.style.height = `5vh`;
            div.style.minWidth = `5vh`;
            div.style.backgroundRepeat = 'no-repeat';
            div.style.backgroundPosition = 'center';
            div.style.backgroundSize = 'cover';
            gameWindow.appendChild(div);
            div.addEventListener('click', gameTileClicked);
            div.classList.add('gameTile');
            if (sun.checked) {
                switch (genWorld[i][j]) {
                    case 'dirt':
                        div.classList.add('dirt')
                        break;
                    case 'grass':
                        div.classList.add('grass')
                        break;
                    case 'snowy_grass':
                        div.classList.add('snowy_grass')
                        break;
                    case 'wood':
                        div.classList.add('wood')
                        break;
                    case 'stone':
                        div.classList.add('stone')
                        break;
                    case 'water':
                        div.classList.add('water')
                        break;
                    case 'leaves':
                        div.classList.add('leaves')
                        break;
                    case 'sky':
                        div.classList.add('sky')
                        break;
                    case 'lilac':
                        div.classList.add('lilac')
                        break;
                    case 'cloud':
                        div.classList.add('cloud')
                        break;
                    case 'lava':
                        div.classList.add('lava')
                        break;
                }
            } else if (dark.checked) {
                switch (genWorld[i][j]) {
                    case 'dirt':
                        div.classList.add('dirt')
                        break;
                    case 'grass':
                        div.classList.add('grass')
                        break;
                    case 'snowy_grass':
                        div.classList.add('snowy_grass')
                        break;
                    case 'wood':
                        div.classList.add('wood')
                        break;
                    case 'stone':
                        div.classList.add('stone')
                        break;
                    case 'water':
                        div.classList.add('water')
                        break;
                    case 'leaves':
                        div.classList.add('leaves')
                        break;
                    case 'dark':
                        div.classList.add('dark')
                        break;
                    case 'lilac':
                        div.classList.add('lilac')
                        break;
                    case 'cloud':
                        div.classList.add('cloud')
                        break;
                    case 'lava':
                        div.classList.add('lava')
                        break;
                }
            }
        }
    }
}

function gameTileClicked() {
    //tool on block interactions
    if (sun.checked) {
        if (myTool == 'bucket' && (this.classList[1] == 'water' || this.classList[1] == 'lava')) {
            if (this.classList[1] == 'water') {
                invWater++;
                waterCnt.textContent = invWater;
                updateObjClasslist(this, 'water', 'sky');
            } else {
                invLava++;
                lavaCnt.textContent = invLava;
                updateObjClasslist(this, 'lava', 'sky');
            }
        }
        if (myTool == 'pickaxe' && this.classList[1] == 'stone') {
            invCobble++;
            stoneCnt.textContent = invCobble;
            updateObjClasslist(this, 'stone', 'sky');
        }
        if (myTool == 'axe' && (this.classList[1] == 'wood' || this.classList[1] == 'leaves')) {
            if (this.classList[1] == 'wood') {
                invWood++;
                woodCnt.textContent = invWood;
                updateObjClasslist(this, 'wood', 'sky');
            } else {
                invLeaves++;
                leavesCnt.textContent = invLeaves;
                updateObjClasslist(this, 'leaves', 'sky');
            }
        }
        if (myTool == 'shovel' && (this.classList[1] == 'dirt' || this.classList[1] == 'grass')) {
            if (this.classList[1] == 'dirt') {
                invDirt++;
                dirtCnt.textContent = invDirt;
                updateObjClasslist(this, 'dirt', 'sky');
            } else {
                invGrass++;
                grassCnt.textContent = invGrass;
                updateObjClasslist(this, 'grass', 'sky');
            }
        }
        if (myTool == 'shovel' && this.classList[1] == 'snowy_grass') {
            if (this.classList[1] == 'snowy_grass') {
                invSnowygrass++;
                snowyCnt.textContent = invSnowygrass;
                updateObjClasslist(this, 'snowy_grass', 'sky');
            }
        }
        //Block on sky interactions
        if (this.classList[1] == 'sky' && selectedElement.classList[1] == 'dirt' && invDirt >= 1) {
            invDirt--;
            dirtCnt.textContent = invDirt;
            updateObjClasslist(this, 'sky', 'dirt');
        }
        if (this.classList[1] == 'sky' && selectedElement.classList[1] == 'grass' && invGrass >= 1) {
            invGrass--;
            grassCnt.textContent = invGrass;
            updateObjClasslist(this, 'sky', 'grass');
        }
        if (this.classList[1] == 'sky' && selectedElement.classList[1] == 'snowy_grass' && invSnowygrass >= 1) {
            invSnowygrass--;
            snowyCnt.textContent = invSnowygrass;
            updateObjClasslist(this, 'sky', 'snowy_grass');
        }
        if (this.classList[1] == 'sky' && selectedElement.classList[1] == 'water' && invWater >= 1) {
            invWater--;
            waterCnt.textContent = invWater;
            updateObjClasslist(this, 'sky', 'water');
        }
        if (this.classList[1] == 'sky' && selectedElement.classList[1] == 'lava' && invLava >= 1) {
            invLava--;
            lavaCnt.textContent = invLava;
            updateObjClasslist(this, 'sky', 'lava');
        }
        if (this.classList[1] == 'sky' && selectedElement.classList[1] == 'wood' && invWood >= 1) {
            invWood--;
            woodCnt.textContent = invWood;
            updateObjClasslist(this, 'sky', 'wood');
        }
        if (this.classList[1] == 'sky' && selectedElement.classList[1] == 'leaves' && invLeaves >= 1) {
            invLeaves--;
            leavesCnt.textContent = invLeaves;
            updateObjClasslist(this, 'sky', 'leaves');
        }
        if (this.classList[1] == 'sky' && selectedElement.classList[1] == 'stone' && invCobble >= 1) {
            invCobble--;
            stoneCnt.textContent = invCobble;
            updateObjClasslist(this, 'sky', 'stone');
        }
    } else if (dark.checked) {
        if (myTool == 'bucket' && (this.classList[1] == 'water' || this.classList[1] == 'lava')) {
            if (this.classList[1] == 'water') {
                invWater++;
                waterCnt.textContent = invWater;
                updateObjClasslist(this, 'water', 'dark');
            } else {
                invLava++;
                lavaCnt.textContent = invLava;
                updateObjClasslist(this, 'lava', 'dark');
            }
        }
        if (myTool == 'pickaxe' && this.classList[1] == 'stone') {
            invCobble++;
            stoneCnt.textContent = invCobble;
            updateObjClasslist(this, 'stone', 'dark');
        }
        if (myTool == 'axe' && (this.classList[1] == 'wood' || this.classList[1] == 'leaves')) {
            if (this.classList[1] == 'wood') {
                invWood++;
                woodCnt.textContent = invWood;
                updateObjClasslist(this, 'wood', 'dark');
            } else {
                invLeaves++;
                leavesCnt.textContent = invLeaves;
                updateObjClasslist(this, 'leaves', 'dark');
            }
        }
        if (myTool == 'shovel' && (this.classList[1] == 'dirt' || this.classList[1] == 'grass')) {
            if (this.classList[1] == 'dirt') {
                invDirt++;
                dirtCnt.textContent = invDirt;
                updateObjClasslist(this, 'dirt', 'dark');
            } else {
                invGrass++;
                grassCnt.textContent = invGrass;
                updateObjClasslist(this, 'grass', 'dark');
            }
        }
        if (myTool == 'shovel' && this.classList[1] == 'snowy_grass') {
            if (this.classList[1] == 'snowy_grass') {
                invSnowygrass++;
                snowyCnt.textContent = invSnowygrass;
                updateObjClasslist(this, 'snowy_grass', 'dark');
            }
        }
        //Block on dark interactions
        if (this.classList[1] == 'dark' && selectedElement.classList[1] == 'dirt' && invDirt >= 1) {
            invDirt--;
            dirtCnt.textContent = invDirt;
            updateObjClasslist(this, 'dark', 'dirt');
        }
        if (this.classList[1] == 'dark' && selectedElement.classList[1] == 'grass' && invGrass >= 1) {
            invGrass--;
            grassCnt.textContent = invGrass;
            updateObjClasslist(this, 'dark', 'grass');
        }
        if (this.classList[1] == 'dark' && selectedElement.classList[1] == 'snowy_grass' && invSnowygrass >= 1) {
            invSnowygrass--;
            snowyCnt.textContent = invSnowygrass;
            updateObjClasslist(this, 'dark', 'snowy_grass');
        }
        if (this.classList[1] == 'dark' && selectedElement.classList[1] == 'water' && invWater >= 1) {
            invWater--;
            waterCnt.textContent = invWater;
            updateObjClasslist(this, 'dark', 'water');
        }
        if (this.classList[1] == 'dark' && selectedElement.classList[1] == 'lava' && invLava >= 1) {
            invLava--;
            lavaCnt.textContent = invLava;
            updateObjClasslist(this, 'dark', 'lava');
        }
        if (this.classList[1] == 'dark' && selectedElement.classList[1] == 'wood' && invWood >= 1) {
            invWood--;
            woodCnt.textContent = invWood;
            updateObjClasslist(this, 'dark', 'wood');
        }
        if (this.classList[1] == 'dark' && selectedElement.classList[1] == 'leaves' && invLeaves >= 1) {
            invLeaves--;
            leavesCnt.textContent = invLeaves;
            updateObjClasslist(this, 'dark', 'leaves');
        }
        if (this.classList[1] == 'dark' && selectedElement.classList[1] == 'stone' && invCobble >= 1) {
            invCobble--;
            stoneCnt.textContent = invCobble;
            updateObjClasslist(this, 'dark', 'stone');
        }
    }
}

function resetInventory() {
    invDirt = invGrass = invLava = invWater = invWood = invLeaves = invCobble = invSnowygrass = 0;
    dirtCnt.textContent = grassCnt.textContent = lavaCnt.textContent = waterCnt.textContent = woodCnt.textContent = leavesCnt.textContent = stoneCnt.textContent = snowyCnt.textContent = '0';
}

function updateObjClasslist(obj, toRemove, toAdd) {
    obj.classList.remove(toRemove);
    obj.classList.add(toAdd);
}

//event listeners
clickables.forEach((element) => {
    element.addEventListener('click', () => {
        if (selectedElement) //if there is an old selected element, remove it
            selectedElement.classList.remove('selected');
        element.classList.add('selected');
        selectedElement = element;
        myTool = element.classList[1];
    })
})
gameTiles.forEach((element) => {
    element.addEventListener('click', gameTileClicked);
})
startBtn.addEventListener('click', () => {
    if (sizeInput.value >= 25) {
        inv.style.visibility = 'visible';
        mainMenu.style.zIndex = '-1';
        mainMenu.style.visibility = 'hidden';
        gameSizeX = sizeInput.value;
        gameSizeY = 20;
        createWorld(gameSizeX, gameSizeY);
    } else {
        alert('Enter size bigger or equal to 25');
    }
})
resetBtn.addEventListener('click', () => {
    createWorld(gameSizeX, gameSizeY);
    resetInventory();
    selectedElement.classList.remove('selected');
})

sizeInput.value = 50;