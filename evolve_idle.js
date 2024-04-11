// javascript


function pickRandomItem() {
    let items = $(".action.vb:not(.cna):not(.city-garrison)>.is-dark.button");
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

let intervalChangePage = setInterval(changePage,20000)
