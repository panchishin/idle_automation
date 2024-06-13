let buttonList = []
function echoParentIdWhenClick() {
    // Get all elements with the class "button"
    const buttons = document.querySelectorAll('.button');

    // Loop through each button and add an onClick event
    buttons.forEach(button => {
      const listener = () => {
        // Find the parent element of the button
        const parent = button.parentNode;
        buttonList.push(parent.id);
        console.log(buttonList);
      };

      // Add the event listener to the button
      button.addEventListener('click', listener);

    });
}