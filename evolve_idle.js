try{clearInterval(intervalPickRandomItem)} catch(e) {}
try{clearInterval(intervalChangePage)} catch(e) {}
try{clearInterval(intervalPickEvolve)} catch(e) {}
try{clearInterval(intervalPickAllowed)} catch(e) {}

function pickRandomItem() {
    let items = [
        ...$("#tech>.action.vb:not(.cna):not(#tech-fanaticism)>.is-dark.button"),
        ...$("#city>.action.vb:not(.cna):not(#city-garrison)>.is-dark.button")
        ];
    if (items.length > 0) {
        let random_item = items[Math.floor(Math.random()*items.length)];
        random_item.click();
    }
}
let intervalPickRandomItem = setInterval(pickRandomItem,1000)

let myPage = 0;
function changePage() {
    if (myPage == 0) { $("nav>ul>li>a")[1].click(); }
    else { $("nav>ul>li>a")[3].click(); }
    myPage = 1 - myPage;
}
let intervalChangePage = setInterval(changePage,15000)


function pickEvolve() { 
    for(let i=0; i<100; i++) {
        for(let j=0; j<3; j++) $("#evolution-rna>.button")[0].click();
        $("#evolution-dna>.button")[0].click();
    }
}
// let intervalPickEvolve = setInterval(pickEvolve, 1000)

let idList = "city-basic_housing city-cottage city-apartment city-lodge city-bank city-amphitheatre city-casino city-temple city-university city-library city-wardenclyffe city-biolab city-factory city-foundry city-cement_plant city-windmill city-coal_power city-oil_power city-shed city-tourist_center city-metal_refinery";

let idArray = idList.split(" ");

function pickAllowed() {
    let items = [];
    for (let id of idArray) {
        let found = $("#"+id+".action.vb:not(.cna)>.is-dark.button");
        if (found.length > 0) items.push(id);
    }
    if (items.length > 0) {
        let random_id = items[Math.floor(Math.random()*items.length)];
        console.log(random_id);
        let found = $("#"+random_id+".action.vb:not(.cna)>.is-dark.button");
        if (found.length > 0) found[0].click();
    }
}

let intervalPickAllowed = setInterval(pickAllowed,1000)
