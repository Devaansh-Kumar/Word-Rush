export function Letter_Box() {

    const boxes = document.getElementsByClassName('letter-box');
    let currentIndex = 0;
    let wordLetters = []; // array to keep traack of the letters typed in each guess
    let validWordTyped = false; // boolean flag 
  
    document.addEventListener('keydown', letter_addition);
  
    Array.from(boxes).forEach((box, index) => {
      box.addEventListener('keydown', (event) => letter_deletion(event, box, index));
    });
  
    function letter_addition(event) {
        
      const key = event.key;
      // check if the key pressed in an alphabet key
      if (/^[A-Za-z]$/.test(key) && key.length === 1 && currentIndex < boxes.length) {
        boxes[currentIndex].textContent = key.toUpperCase();
        wordLetters.push(key.toUpperCase());
        currentIndex++;
        if (currentIndex < boxes.length) {
          boxes[currentIndex].focus();
        }
        // join all the letters in a row to form a word to check for validation
        const word = wordLetters.join('');
        if (word.length === 5) {
          // check if the word typed is a valid word
          fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => { 
              if (response.status === 200) {
                validWordTyped = true;
                wordLetters = [];
              } else {
                // if it is not a valid word then delete all the letters in that row and dissplay an alert message
                alert("Please type a valid word");
                wordLetters = [];
                Array.from(boxes).forEach((box, index) => {
                  if (index >= currentIndex - 5 && index <= currentIndex) {
                    box.textContent = "";
                  }
                });
                boxes[currentIndex - 5].focus();
                currentIndex = currentIndex - 5;
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      }
    }
  
    function letter_deletion(event, box, index) {
      const key = event.key;
      // if a valid word is typed then do not allow the user to delete the word
      if (validWordTyped) {
        event.preventDefault(); 
        return;
      }
      // if word length < 5 then allow the user to delete the letters
      else if (key === "Backspace" || key === "Delete") { 
        box.textContent = "";
        wordLetters.pop();
        if (index > 0) {
        // move the focus to the box whose content must be deleted
          boxes[index - 1].focus();
          currentIndex = index - 1;
        }
      }
    }
  }
  
export default Letter_Box;