
let previousUnsold = 0;
function adjustPrice() {
    let unsold = document.getElementById("unsoldClips").innerHTML.replaceAll(",","")*1;
    let change = unsold - previousUnsold;
    let price = document.getElementById("margin").innerHTML.replaceAll(",","")*1;
    let chance = Math.abs((unsold - 10000) / 10000);
    // if (Math.random() < chance) {
        if (unsold >= 10000) {
            if (change >= 0 && price > 0.01) {
                lowerPrice()
            }
        } else {
            if (change <= 0) {
                raisePrice()
            }
        }
    // }
    previousUnsold = unsold;
}

let intervalAdjustPrice = setInterval(adjustPrice, 100)

function manageWire() {
    // <button class="button2" id="btnBuyWire" onclick="buyWire()">Wire</button>
    let wire = document.getElementById("wire").innerHTML.replaceAll(",","")*1;
    if (wire < 10000 && !document.getElementById("btnBuyWire").disabled) {
        buyWire();
    }
}
let intervalWire = setInterval(manageWire, 1000)


function manageTourney() {
    // if (!document.getElementById("btnImproveInvestments").disabled ) {
    //     investUpgrade()
    // }

    if (!document.getElementById("btnNewTournament").disabled ) {
        newTourney();
        setTimeout(()=>{
            runTourney();
        },1000)
    }

}
let intervalManageTourney = setInterval(manageTourney,2000)


function qq() {
    // first run the qComp to populate the qCompDisplay
    qComp()
    let lastValue = -1;

    // get the value of the qCompDisplay after 200ms
    setTimeout(()=>{
        lastValue = document.getElementById("qCompDisplay").innerHTML.replaceAll(",","").replaceAll("qOps: ","")*1
        // if there is enough value, then spam for 1 second
        if (lastValue > 100) {
            for(let i=0; i<100; i++) qComp()
        }
    },200)
}

let intervalqq = setInterval(qq,2000)
clearInterval(intervalqq)
clearInterval(intervalManageTourney)
