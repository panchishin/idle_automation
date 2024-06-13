let allListeners = []; // {'button':button, 'id':parentid, 'listener': listener}
let selectedIds = [];

// Create the control panel
function createControlPanelElement() {
    const controlPanel = document.createElement('div');
    controlPanel.style.position = 'fixed';
    controlPanel.style.bottom = '20px';
    controlPanel.style.right = '0';
    controlPanel.style.width = '20rem';
    controlPanel.style.height = '3rem';
    controlPanel.style.background = 'black';
    controlPanel.style.color = 'white';
    controlPanel.style.border = '1px solid white';
    controlPanel.style.overflow = 'hidden';
    controlPanel.style.transition = 'height 0.5s; width 0.5s';
    controlPanel.style.zIndex = '1000';
    controlPanel.style.textAlign = 'center';
    controlPanel.style.padding = '10px';
    controlPanel.style.boxSizing = 'border-box';
    // disable horizontal scroll bar
    controlPanel.style.overflowX = 'hidden';
    return controlPanel;
}

const controlPanel = createControlPanelElement();
const controlPanelText = document.createElement('div');


function removeHookForAllParentIds() {
    allListeners.forEach(({button, listener}) => {
        button.removeEventListener('click', listener);
    });

    allListeners = [];
}

function updateControlPanel() {
    if (controlPanel.style.height === '40rem') {
        controlPanel.innerHTML = '';
        controlPanel.appendChild(controlPanelText);
        controlPanel.appendChild(createButtonList());
    }
}

function addHookForAllParentIds() {
    // Get all elements with the class "button"
    const buttons = document.querySelectorAll('.action.vb>.is-dark.button');

    // Loop through each button and add an onClick event
    buttons.forEach(button => {
      const id = button.parentNode.id;
      const listener = () => {
        // if id in selectedIds, remove it, else add it
        if (selectedIds.includes(id)) {
            // selectedIds = selectedIds.filter((value) => value !== id);
        } else {
            selectedIds.push(id);
        }
        updateControlPanel();
      };
      // Add the event listener to the button
      button.addEventListener('click', listener);
      allListeners.push({'button':button, 'id':id, 'listener': listener});
    });
}


function refreshHooks() {
    removeHookForAllParentIds();
    addHookForAllParentIds();
}



// Create a list of button ids that will be displayed in the control panel
function createButtonList() {
    const buttonList = document.createElement('div');
    
    buttonList.style.listStyleType = 'none';
    buttonList.style.padding = '0';
    buttonList.style.margin = '.5rem';
    buttonList.style.textAlign = 'left';
    buttonList.style.height = '100%';
    buttonList.style.width = '100%';
    buttonList.style.overflow = 'auto';
    selectedIds.forEach((text) => {
        const listItem = document.createElement('div');
        listItem.innerText = text;
        listItem.style.padding = '.25rem';
        listItem.style.border = '1px solid gray';
        listItem.style.margin = '.25rem';
        listItem.style.display = 'inline-block';
        listItem.style.minWidth = '10rem';
        buttonList.appendChild(listItem);
        listItem.addEventListener('click', () => {
            selectedIds = selectedIds.filter((value) => value !== text);
            updateControlPanel();
        });
    });
    return buttonList;
}

function createControlPanel() {
    // The control pannel will sit on top of the page in the bottom right corner
    // by default it will collapsed showing only the text [Control Panel]
    // when clicked it will expand showing the control panel which for now will a list of all the buttons in the 'allListeners' array

    document.body.appendChild(controlPanel);

    controlPanelText.innerHTML = 'Control Panel (expand)';
    controlPanel.appendChild(controlPanelText);

    controlPanelText.addEventListener('click', () => {
        refreshHooks();
        if (controlPanel.style.height === '40rem') {
            controlPanel.style.height = '3rem';
            controlPanel.style.width = '20rem';
            controlPanel.innerHTML = '';
            controlPanelText.innerHTML = 'Control Panel (expand)';
            controlPanel.appendChild(controlPanelText);
        } else {
            controlPanel.style.height = '40rem';
            controlPanel.style.width = '44rem';
            controlPanelText.innerHTML = 'Control Panel (collapse)';
            controlPanel.appendChild(createButtonList());
        }
    });

    const timer = setInterval(autoClick, 2000);

}

function autoClick() {
    // this function finds all the elements on the page that have an id that is in the selectedIds array
    // then picks one at random and clicks it
    let buttons = selectedIds.map(id => document.querySelector('#' + id + '.action.vb:not(.cna)>.is-dark.button'))
    // filter out the nulls
    buttons = buttons.filter(button => button !== null);
    // click a random button
    if (buttons.length > 0) {
        const button = buttons[Math.floor(Math.random()*buttons.length)];
        console.log(button)
        button.click();
    }
}


(function() {
    // Create the control panel
    createControlPanel();
})();

