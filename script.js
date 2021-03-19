const canvas = document.querySelector('#cv');
const ctx = canvas.getContext('2d');
const btn = document.querySelector('#btn');
const rows = 170;
const cols = 80;
const size = 10;
let game = [];
for (let i = 0; i < rows; i++) {
    game[i] = [];
    for (let j = 0; j < cols; j++) {
         // game[i][j] = 0;
        game[i][j] = Math.floor(Math.random()*2);
    }
}
let interval = setInterval(drawCtx);

canvas.addEventListener('click', (e) => {

    // addEventListener('mousemove', (e)=>{
        draw(e);
    // })

});
addEventListener('mouseup',()=>{

})

btn.addEventListener('click',()=>{
    clearInterval(interval);
    interval = setInterval(startLife,4);
});

function draw(e){
    let posX = e.offsetX;
    let posY = e.offsetY;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if(posX > i*size && posX < i*size + size && posY > j*size && posY < j*size + size){
                game[i][j] = 1;
            }
        }
    }
}

function startLife() {
    let next = [];
    for (let i = 0; i < rows; i++) {
        next[i] = [];
        for (let j = 0; j < cols; j++) {

            let state = game[i][j];
            if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1){
                next[i][j] = state;
                continue;
            }
            let neighbors = countNeighbors(i,j);
            if( state === 0 && neighbors === 3) {
                next[i][j] = 1;
            } else if ( state === 1 && (neighbors < 2 || neighbors > 3)){
                next[i][j] = 0;
            }else {
                next[i][j] = state;
            }
        }
    }
    game = next;
    drawCtx();
}

function drawCtx(){
    ctx.fillStyle = '#777';
    ctx.fillRect(0,0,size*rows,size*cols);
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++) {
            if(game[i][j]) {
                ctx.fillStyle = 'black';

                ctx.fillRect(i * size, j * size, size, size);
            }
        }
    }
}

function countNeighbors(x,y) {
    let sum = 0;
    for (let i = -1; i < 2; i++){
        for (let j = -1; j < 2; j++){
            sum += game[x+i][y+j];
        }
    }
    sum -= game[x][y];
    return sum;
}

function fpm(i){
    if(i === 0) return rows;
    else return i;
}
function fpp(i){
    if(i === rows -1) return -1;
    else return i;
}

