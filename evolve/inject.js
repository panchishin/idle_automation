let allListeners = []; // {'button':button, 'id':parentid, 'listener': listener}


function removeHookForAllParentIds() {
    allListeners.forEach(({button, listener}) => {
        button.removeEventListener('click', listener);
    });

    allListeners = [];
}


function addHookForAllParentIds(callback) {
    // Get all elements with the class "button"
    const buttons = document.querySelectorAll('.action.vb>.is-dark.button');

    // Loop through each button and add an onClick event
    buttons.forEach(button => {
      const parentid = button.parentNode.id;
      const listener = () => {
        // Find the parent element of the button
        callback(parentid);
      };
      // Add the event listener to the button
      button.addEventListener('click', listener);
      allListeners.push({'button':button, 'id':parentid, 'listener': listener});
    });
}


function refreshHooks(callback) {
    removeHookForAllParentIds();
    addHookForAllParentIds(callback);
}


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

// Create a list of button ids that will be displayed in the control panel
function createButtonList() {
    const buttonTextArray = allListeners.map((button) => button.id);
    const buttonList = document.createElement('div');
    
    buttonList.style.listStyleType = 'none';
    buttonList.style.padding = '0';
    buttonList.style.margin = '.5rem';
    buttonList.style.textAlign = 'left';
    buttonList.style.height = '100%';
    buttonList.style.width = '100%';
    buttonList.style.overflow = 'auto';
    buttonTextArray.forEach((text) => {
        const listItem = document.createElement('div');
        listItem.innerText = text;
        listItem.style.padding = '.25rem';
        listItem.style.border = '1px solid gray';
        listItem.style.margin = '.25rem';
        listItem.style.display = 'inline-block';
        listItem.style.minWidth = '10rem';
        buttonList.appendChild(listItem);
    });
    return buttonList;
}

function createControlPanel() {
    // The control pannel will sit on top of the page in the bottom right corner
    // by default it will collapsed showing only the text [Control Panel]
    // when clicked it will expand showing the control panel which for now will a list of all the buttons in the 'allListeners' array

    const controlPanel = createControlPanelElement();    
    document.body.appendChild(controlPanel);

    const controlPanelText = document.createElement('div');
    controlPanelText.innerHTML = 'Control Panel (expand)';
    controlPanel.appendChild(controlPanelText);


    controlPanelText.addEventListener('click', () => {
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

}


(function() {

    // Add a hook to all buttons to update the control panel
    refreshHooks((parentId) => {
        console.log(parentId);
    });

    // Create the control panel
    createControlPanel();

})();

