console.log("here");

let whyButton = document.querySelector("#why");
let statsArea = document.querySelector("#stats");
let pieContainer = document.querySelector(".stat-container");

// Statistics for CS major
var statpic1 = document.getElementById("stat-pic-1");
var womenCircle1 = document.getElementById("women-circle-1");
var menCircle1 = document.getElementById("men-circle-1");
var statbody1 = document.getElementById("stat-b1");

// Statistics for Software Development
var statpic2 = document.getElementById("stat-pic-2");
var womenCircle2 = document.getElementById("women-circle-2");
var menCircle2 = document.getElementById("men-circle-2");
var statbody2 = document.getElementById("stat-b2");

// Identities
var womanIdentity = document.getElementById("woman-identity");
var nbIdentity = document.getElementById("nb-identity");
var manIdentity = document.getElementById("man-identity");
let actionHeader = document.getElementById("action-header");
let actionBody = document.getElementById("action-body");
let action = document.getElementById("action");

// let colorCodes = ["#f72585", "#b5179e", "#7209b7", "#3a0ca3", "#3f37c9", "#4361ee", "#4895ef", "#4cc9f0"];

// Pinks:
// let colorCodes = ["#f9dbbd", "#ffa5ab", "#da627d", "#a53860", "#450920"];

// Purple/Pinks:
// let colorCodes = ["#6f2dbd", "#a663cc", "#b298dc", "#b8d0eb", "#b9faf8"];
// let colorCodes = ["#ffa3a5", "#ff86c8", "#ffbf81", "#ffdc5e"];
let colorCodes = ["#FBC5DC", "#F8A0C5", "#F466A2", "#F2408A"];


// DATA USA API
const getCSData = async () => {
    // https://datausa.io/api/data?CIP=1107&drilldowns=Gender,IPEDS%20Race,Degree&measures=Completions&Degree=5&Year=2020
    // For 2020 only ^
    // https://datausa.io/api/data?CIP=1107&drilldowns=Gender,IPEDS%20Race,Degree&measures=Completions&Degree=5
    // For all years ^
    const response = await fetch("https://datausa.io/api/data?CIP=1107&drilldowns=Gender,IPEDS%20Race,Degree&measures=Completions&Degree=5&Year=2020");
    const data = await response.json();

    // Counters
    let womenCount = 0;
    let menCount = 0;
    let totalCount = 0;
    
    for(let i=0; i<data.data.length; i++) {
        if(data.data[i].Gender==="Women") {
            womenCount+=data.data[i].Completions;
            totalCount+=data.data[i].Completions;
        }
        else {
            menCount+=data.data[i].Completions;
            totalCount+=data.data[i].Completions;
        }
    }

    let womenPercent = getPercent(womenCount, totalCount);
    let menPercent = getPercent(menCount, totalCount);

    let womenDegree = getDegree(womenCount, totalCount);
    let menDegree = getDegree(menCount, totalCount);

    let wedgesCSDeg = [{color: randomColor(), degree: womenDegree, percent: womenPercent}, 
                    {color: randomColor(), degree: menDegree, percent: menPercent}];

    statpic1.style.backgroundImage = createGradient(wedgesCSDeg);
    womenCircle1.style.backgroundColor = wedgesCSDeg[0].color;
    menCircle1.style.backgroundColor = wedgesCSDeg[1].color;
    statbody1.innerHTML = `This chart exemplifies the gender gap that exists in the Computer Science field. While male students were awarded the most Computer Science degrees in 2020, less than ${Math.round(wedgesCSDeg[0].percent)}% of the graduates were women.`;
}

const getSDData = async () => {
    const response = await fetch("https://datausa.io/api/data?PUMS%20Occupation=15113X&drilldowns=Gender&Year=2017&measure=Total%20Population,Total%20Population%20MOE%20Appx,Record%20Count&Record%20Count%3E=5");
    const data = await response.json();

    // Counters
    let womenCount = 0;
    let menCount = 0;
    let totalCount = 0;
    
    for(let i=0; i<data.data.length; i++) {
        if(data.data[i].Gender==="Female") {
            womenCount+=data.data[i]["Total Population"];
            totalCount+=data.data[i]["Total Population"];
        }
        else {
            menCount+=data.data[i]["Total Population"];
            totalCount+=data.data[i]["Total Population"];
        }
    }
    
    let womenPercent = getPercent(womenCount, totalCount);
    let menPercent = getPercent(menCount, totalCount);
    let womenDegree = getDegree(womenCount, totalCount);
    let menDegree = getDegree(menCount, totalCount);

    let wedgesSDDeg = [{color: randomColor(), degree: womenDegree, percent: womenPercent}, 
                    {color: randomColor(), degree: menDegree, percent: menPercent}];

    statpic2.style.backgroundImage = createGradient(wedgesSDDeg);
    womenCircle2.style.backgroundColor = wedgesSDDeg[0].color;
    menCircle2.style.backgroundColor = wedgesSDDeg[1].color;
    statbody2.innerHTML = `This chart illustrates the gender imbalance of Software Developers in 2017. Males dominated the field and comprised ${Math.round(menPercent)}% of the profession as females made up the remaining ${Math.round(womenPercent)}%.`;
}

getCSData();
getSDData();

function getPercent(part, total) {
    return part/total*100;
}

function getDegree(part, total) {
    return part/total*360;
}

function createGradient(wedges) {
    let currDeg = 0;
    let gradStr = "conic-gradient(";
    for(let i=0; i<wedges.length; i++) {
        gradStr += `${wedges[i].color} ${currDeg}deg, ${wedges[i].color} `+(parseInt(wedges[i].degree)+currDeg)+`deg`;
        if(i<wedges.length-1)
            gradStr += `, `;
        else
            gradStr += `)`;
        currDeg = parseInt(wedges[i].degree)+currDeg;
    }
    return gradStr;
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomColor() {
    let colorCode = colorCodes.splice(getRandomInt(colorCodes.length), 1);
    return colorCode;
}


console.log(womanIdentity);

womanIdentity.addEventListener("mouseover", (e) => {
    console.log("woman hover");
    actionHeader.innerHTML = 'Woman';
    actionBody.innerHTML = 'Keep pursuing the major, and do not give up!';
    // actionHeader.style.color = '#FC9CC6';
    // actionBody.style.color = '#FC9CC6';
    // action.style.backgroundColor = '#2F2F2F';
});

nbIdentity.addEventListener("mouseover", (e) => {
    console.log("nb hover");
    actionHeader.innerHTML = 'Non-Binary';
    actionBody.innerHTML = 'Keep pursuing the major, and do not give up!';
    // actionHeader.style.color = '#FC9CC6';
    // actionBody.style.color = '#FC9CC6';
    // action.style.backgroundColor = '#2F2F2F';
});

manIdentity.addEventListener("mouseover", (e) => {
    console.log("man hover");
    actionHeader.innerHTML = 'Man';
    actionBody.innerHTML = "Accept that the gender gap exists, and that women are at a disadvantage in the CS industry. Contribute to a safer space for all women in CS. Acknowledge your underrepresented peers as equals, while recognizing their setbacks.";
    // actionHeader.style.color = '#FC9CC6';
    // actionBody.style.color = '#FC9CC6';
    // action.style.backgroundColor = '#2F2F2F';
});

womanIdentity.addEventListener("mouseleave", leaveIdentity);
nbIdentity.addEventListener("mouseleave", leaveIdentity);
manIdentity.addEventListener("mouseleave", leaveIdentity);


function leaveIdentity() {
    actionHeader.innerHTML = 'Person';
    actionBody.innerHTML = "There are many things we can do as an individual to help close the gap. However, not everyone's circumstances are the same. Hover over what you identify as on the right to see your next steps!";
    actionHeader.style.color = '#2F2F2F';
    actionBody.style.color = '#3B3B3B';
    action.style.backgroundColor = '#FC9CC6';
}