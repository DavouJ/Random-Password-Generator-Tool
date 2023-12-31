// * Generate a password when the button is clicked
//   * Present a series of prompts for password criteria
//     * Length of password
//       * At least 8 characters but no more than 128.
//     * Character types
//       * Lowercase
//       * Uppercase
//       * Numeric
//       * Special characters ($@%&*, etc)
//   * Code should validate for each input and at least one character type should be selected
//   * Once prompts are answered then the password should be generated and displayed in an alert or written to the page


// Array of special characters to be included in password
const specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
const upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

var generatedPass = ""
var passArr = []

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

// Function to prompt user for password options
function getPasswordOptions() {
  let summary = false;
  let passCharacteristics = {}
  
  while(summary === false){
    let passLength = prompt("Enter a password length between 8 and 128")
    
    while(passLength < 8 || passLength > 128 && passLength !== null){
      passLength = prompt(" Only enter a password length between 8 and 128")
    }

    let hasCaps = confirm("Would you like upper-case characters in your password?")
    let hasNoneCaps = confirm("Would you like lower-case characters in your password?")
    let hasSpecial = confirm("Would you like special characters in your password?")
    let hasNum = confirm("Would you like numerical characters in your password?")

    while( hasCaps === false && hasNoneCaps === false && hasSpecial === false && hasNum === false){
      alert("At least one of these options needs to be selected")
      let hasCaps = confirm("Would you like upper-case characters in your password?")
      let hasNoneCaps = confirm("Would you like lower-case characters in your password?")
      let hasSpecial = confirm("Would you like special characters in your password?")
      let hasNum = confirm("Would you like numerical characters in your password?")
    }

    passCharacteristics = {
      passLength: passLength,
      caps: hasCaps,
      nonCaps: hasNoneCaps,
      special: hasSpecial,
      num: hasNum
    }
    summary = confirm(`Confirm:\n Length:  ${passLength}\n Capital Letters?  ${hasCaps}\n Lower Case Letters?  ${hasNoneCaps}\n Special Characters?  ${hasSpecial}\n Numbers?  ${hasNum}`)

  }
  return passCharacteristics
}

// Function for getting a random element from an array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Function to generate password with user input
function generatePassword() {
  let passCharacteristics = getPasswordOptions()
  let randomCharArr = []
  let guaranteedCharArr = []
  let randIndx1 = 0
  let randIndx2 = 0
  let randIndx3 = 0
  let randIndx4 = 0
  
  if(passCharacteristics.caps === true){
    for(let i = 0; i < upperCasedCharacters.length; i++){
      randomCharArr.push(upperCasedCharacters[i])
    }
    guaranteedCharArr[0] = upperCasedCharacters[getRandomInt(upperCasedCharacters.length)]
  }
  if(passCharacteristics.nonCaps === true){
    for(let i = 0; i < lowerCasedCharacters.length; i++){
      randomCharArr.push(lowerCasedCharacters[i])
    }
    guaranteedCharArr[1] = lowerCasedCharacters[getRandomInt(lowerCasedCharacters.length)]
  }
  if(passCharacteristics.num === true){
    for(let i = 0; i < numericCharacters.length; i++){
      randomCharArr.push(numericCharacters[i])
    }
    guaranteedCharArr[2] = numericCharacters[getRandomInt(numericCharacters.length)]
  }
  if(passCharacteristics.special === true){
    for(let i = 0; i < specialCharacters.length; i++){
      randomCharArr.push(specialCharacters[i])
    }
    guaranteedCharArr[3] = specialCharacters[getRandomInt(specialCharacters.length)]
  }
  
  for(let i = 0; i < passCharacteristics.passLength; i++){
    passArr[i] = getRandom(randomCharArr)
   
  }
  

  while(randIndx1 === randIndx2 || randIndx1 === randIndx3 || randIndx1 === randIndx4 || randIndx2 === randIndx3 || randIndx2 === randIndx4 || randIndx3 === randIndx4){
    randIndx1 = getRandomInt(passArr.length)
    randIndx2 = getRandomInt(passArr.length)
    randIndx3 = getRandomInt(passArr.length)
    randIndx4 = getRandomInt(passArr.length)
  }

  passArr[randIndx1] = guaranteedCharArr[0]
  console.log(`putting ${guaranteedCharArr[0]} in ${randIndx1}`)
  passArr[randIndx2] = guaranteedCharArr[1]
  console.log(`putting ${guaranteedCharArr[1]} in ${randIndx2}`)
  passArr[randIndx3] = guaranteedCharArr[2]
  console.log(`putting ${guaranteedCharArr[2]} in ${randIndx3}`)
  passArr[randIndx4] = guaranteedCharArr[3]
  console.log(`putting ${guaranteedCharArr[3]} in ${randIndx4}`)
  

  generatedPass = passArr.toString()
  
  console.log(generatedPass.replace(/,/g,""))
  return generatedPass.replace(/,/g,"")

}

// Get references to the #generate element
const generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {

  let passText = "Your password is: \n\n"
  
  const password = generatePassword();
  const passwordText = document.querySelector('#password');

  passwordText.value = passText + password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);