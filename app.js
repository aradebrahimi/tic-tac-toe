const playerStr = () => {
    let player1Str = prompt(`Do you want "X" or "O"?`).toUpperCase();
    let player2Str = null;
    while(player1Str !== 'X' && player1Str !== 'O'){
        player1Str = prompt(`Do you want "X" or "O"?!!`).toUpperCase();
    }
    switch(player1Str){
        case 'O': player2Str = 'X'; break;
        case 'X': player2Str = 'O'; break;
    }
    return [player1Str, player2Str];
};
const statusCheck = (num, player) => {
    const result = `PLAYER ${num} (${player}) WON! GAME OVER.`;
    return result;
};
const table = () => {
    document.getElementsByClassName('main')[0].insertAdjacentHTML('afterbegin', '<table class="table"></table>');
    let rowColNum = prompt('How many rows and columns? (An integer >= 3 and <= 6)');
    while(parseInt(rowColNum) != rowColNum || parseInt(rowColNum) < 3 || parseInt(rowColNum) > 6){
        rowColNum = prompt('How many rows and columns?!! (An integer >= 3 and <= 6)');
    }
    rowColNum = parseInt(rowColNum);
    for(let i = 0; i < rowColNum; i++){
        document.getElementsByClassName('table')[0].insertAdjacentHTML('beforeend', '<tr class="tr"></tr>');
        for(let j = 0; j < rowColNum; j++){
            document.getElementsByClassName('tr')[i].insertAdjacentHTML('afterbegin', '<td class="td"></td>');
        }
    }
    const tdArr = document.getElementsByClassName('td');
    let rowMatrix = [];
    let x1 = 0;
    for(let i = 0; i < rowColNum; i++){
        rowMatrix.push([]);
        for(let j = 0; j < rowColNum; j++){
            rowMatrix[i][j] = tdArr[x1];
            x1++;
        }
    }
    let colMatrix = [];
    let x2 = 0;
    let n2 = 0;
    for(let i = 0; i < rowColNum; i++){
        colMatrix.push([]);
        for(let j = 0; j < rowColNum; j++){
            colMatrix[i][j] = tdArr[x2];
            x2 += rowColNum;
        }
        n2++;
        x2 = n2;
    }
    const diameterMatrix = [];
    let dMatrix1 = [];
    let x3 = 0;
    for(let i = 0; i < rowColNum; i++){
        dMatrix1[i] = tdArr[x3];
        x3 += (rowColNum + 1);
    }
    let dMatrix2 = [];
    let x4 = rowColNum -1;
    for(let i = 0; i < rowColNum; i++){
        dMatrix2[i] = tdArr[x4];
        x4 += (rowColNum - 1);
    }
    diameterMatrix.push(dMatrix1);
    diameterMatrix.push(dMatrix2);
    return [rowMatrix, colMatrix, diameterMatrix];
};
const check = (rowMatrix, colMatrix, diameterMatrix, player1Arr, player2Arr) => {
    let status = null;
    let rowFlag = false;
    for(let i = 0; i < rowMatrix.length; i++){
        if(rowMatrix[i].every(el => el.innerHTML === player1Arr[0])){
            rowFlag = true;
            status = statusCheck(1, player1Arr[1]);
        }
        else if(rowMatrix[i].every(el => el.innerHTML === player2Arr[0])){
            rowFlag = true;
            status = statusCheck(2, player2Arr[1]);
        }
    }
    let colFlag = false;
    for(let i = 0; i < colMatrix.length; i++){
        if(colMatrix[i].every(el => el.innerHTML === player1Arr[0])){
            colFlag = true;
            status = statusCheck(1, player1Arr[1]);
        }
        else if(colMatrix[i].every(el => el.innerHTML === player2Arr[0])){
            colFlag = true;
            status = statusCheck(2, player2Arr[1]);
        }
    }
    let diameterFlag = false;
    for(let i = 0; i < diameterMatrix.length; i++){
        if(diameterMatrix[i].every(el => el.innerHTML === player1Arr[0])){
            diameterFlag = true;
            status = statusCheck(1, player1Arr[1]);
        }
        else if(diameterMatrix[i].every(el => el.innerHTML === player2Arr[0])){
            diameterFlag = true;
            status = statusCheck(2, player2Arr[1]);
        }
    }
    let gameOver = false;
    if(rowFlag == true || colFlag == true || diameterFlag == true){
        alert(status);
        let answer = prompt('Do you want to play again? (Enter Y for yes and N for no)').toUpperCase();
        while(parseFloat(answer) == answer || (answer !== 'Y' && answer !== 'YES' && answer !== 'N' && answer !== 'NO')){
            answer = prompt('Do you want to play again?!! (Enter Y for yes and N for no)').toUpperCase();
        }
        if(answer === 'Y' || answer === 'YES')
            gameOver = true;
        else
            alert('Maybe another time then!');
    }
    return gameOver;
};
const restart = (x) => {
    if(x){
        document.getElementsByClassName('table')[0].parentNode.removeChild(document.getElementsByClassName('table')[0]);
        start();
    }
};
const start = () => {
    const matrix = table();
    const playerArr = playerStr();
    const player1Str = playerArr[0];
    const player2Str = playerArr[1];
    const rowMatrix = matrix[0];
    const colMatrix = matrix[1];
    const diameterMatrix = matrix[2];
    const tdArr = document.getElementsByClassName('td');
    const xAudio = document.getElementsByClassName('x')[0];
    const oAudio = document.getElementsByClassName('o')[0];
    let player1Arr = [];
    let player2Arr = [];
    let flag = true;
    let flagArr = [];
    let playerFlag = null;
    for(let i = 0; i < tdArr.length; i++){
        flagArr[i] = true;
    }
    for(let i = 0; i < tdArr.length; i++){
        tdArr[i].addEventListener('click', () => {
            if(flag && flagArr[i]) {
                const img = document.createElement('img');
                if(player1Str === 'X'){
                    xAudio.play();
                    img.src = 'icons8-xbox-x-80.png';
                    player1Arr[0] = '<img src=\"icons8-xbox-x-80.png\">';
                    player1Arr[1] = 'X';
                    playerFlag = true;
                }
                else if(player1Str === 'O'){
                    oAudio.play();
                    img.src = 'icons8-circled-o-80.png';
                    player1Arr[0] = '<img src=\"icons8-circled-o-80.png\">';
                    player1Arr[1] = 'O';
                    playerFlag = false;
                }
                tdArr[i].appendChild(img);
                flag = !flag;
                flagArr[i] = false;
                const gameOver = check(rowMatrix, colMatrix, diameterMatrix, player1Arr, player2Arr);
                restart(gameOver);
            }
            else if(!flag && flagArr[i]) {
                const img = document.createElement('img');
                if(playerFlag === true){
                    oAudio.play();
                    img.src = 'icons8-circled-o-80.png';
                    player2Arr[0] = '<img src=\"icons8-circled-o-80.png\">';
                    player2Arr[1] = 'O';
                }
                else if(playerFlag === false){
                    xAudio.play();
                    img.src = 'icons8-xbox-x-80.png';
                    player2Arr[0] = '<img src=\"icons8-xbox-x-80.png\">';
                    player2Arr[1] = 'X';
                }
                tdArr[i].appendChild(img);
                flag = !flag;
                flagArr[i] = false;
                const gameOver = check(rowMatrix, colMatrix, diameterMatrix, player1Arr, player2Arr);
                restart(gameOver);
            }
        });
    }
};
start();