// Step 1: Create a new <style> element
const style = document.createElement('style');
style.type = 'text/css';

// Step 2: Define the CSS rules
const cssRules = `
  .my-dynamic-class {
    background-color: #4CAF50;
    color: white;
    font-size: 20px;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
  }
`;

// Step 3: Insert the CSS rules into the <style> element
style.innerHTML = cssRules;

// Step 4: Append the <style> element to the document's head
document.head.appendChild(style);

// Example usage: Apply the dynamic class to an element
document.getElementById('myElement').classList.add('my-dynamic-class');
