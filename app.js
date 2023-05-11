
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            //! TODO
           results = searchByTraits(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchByTraits(people){
    let searchCriteria= []
    let filteredPeople= people;
    let continueSearch= true

    while (searchCriteria.length < 5){
        const trait= validatedPrompt("Enter Trait:", [eyeColor,weight,height,gender,occupation]);
        const validTraits= ["eyeColor","height","gender","occupation","weight"];
        }
     }

     switch (trait.toLowerCase()){
        case "height":
            const height = parseInt(prompt("Enter the person's height in inches."));
            filteredPeople = filteredPeople.filter(function(person){return person.height === height});
            searchCriteria.push(`height =${height}`);
            break;
        case "weight":
                const weight = parseInt(prompt("Enter person's weight in pounds. "));
                filteredPeople = filteredPeople.filter(function(person){return person.weight === weight});
                searchCriteria.push(`weight = ${weight}`);
            break;
        case "gender":
            const gender = prompt("Enter the person's gender: male or female");
            filteredPeople = filteredPeople.filter(function(person){return person.gender.toLowerCase === gender.toLowerCase});
            searchCriteria.push(`gender =${gender.toLowerCase()}`);
            break;
        case "occupation":
            const occupation = prompt("Enter the person's occupation.");
            filteredPeople = filteredPeople.filter(function(person){return person.occupation.toLowerCase === occupation.toLowerCase});
            searchCriteria.push(`occupation = ${occupation.toLowerCase()}`);
            break;
        case "eye color":
            const eyeColor = prompt("Enter the person's eye color.");
            filteredPeople = filteredPeople.filter(function(person){return person.eyeColor.toLowerCase === eyeColor.toLowerCase});
            searchCriteria.push(`eyeColor = ${eyeColor.toLowerCase}`);
            break;
            default:
                alert("Invalid trait entered");
     }

     if (filteredPeople.length ===0){
        alert("No matces found.");
        return [];
    } else if (filteredPeople.length === 1){
        alert(`Match found: ${filteredPeople[0].firstName} ${filteredPeople[0].lastName}`);
        return filteredPeople
    }

    const continueSearch = prompt("Do you want to keep searching? yes or no");
    if (continueSearch.toLowerCase() === "n"){
        return filteredPeople;
    }
    alert ("Max of five search criteria reached.");
    return filteredPeople


function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
            //! TODO
             displayPersonInfo(person);
            
            break;
        case "family":
            //! TODO
             let personFamily = findPersonFamily(person, people);
             displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            let personDescendants = findPersonDescendants(person, people);
            displayPeople('Descendants', personDescendants);
            if (personDescendants.length == 0){
                alert("No descendant found.")
            }
            else (displayPeople(personDescendants));
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay){
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n ${formatedPeopleDisplayText}`);
}
  
function validatedPrompt(message,acceptableAnswers){
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());
    const builtPromptWithAcceptableAnswers = `${message} \n Acceptable Answers: ${acceptableAnswers.map(aa=> `\n -> ${aa}`).join("")}`;
    const userResponse = prompt (builtPromptWithAcceptableAnswers).toLowerCase();
    if (acceptableAnswers.includes(userResponse)){
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not a valid response, try again.: \n ${acceptableAnswers.map(aa => `\n -> ${aa}`).join("")}`);
        return validatedPrompt(message, acceptableAnswers);
    }
}
function exitOrRestart(people){
    const userExitOrRestartChoice = validatedPrompt(
        "Would you ike to exit or restart?"
        ["exit", "restart"]
    );
}

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

    function displayPersonInfo(person){
        let infoForPerson = "First Name: " + person.firstName+ "\n";
        infoForPerson += "Last Name: " + person.lastName+ "\n";
        infoForPerson += "Gender: " + person.gender+ "\n";
        infoForPerson += "Weight: " + person.weight+ "\n";
        infoForPerson += "Eye Color: " + person.eyeColor+ "\n";
        infoForPerson += "Height: " + person.height+ "\n";
        infoForPerson += "Occupation: "+ person.occupation+ "\n";
        alert(infoForPerson)
        
}

function findPersonFamily(targetPerson, people) {
    const family = people.filter(function(person) {
      return person.lastName === targetPerson.lastName && person !== targetPerson;
    });
  
    const familyWithRelationships = family.map(function(person) {
      let relationship = "";
      if (person.currentSpouse === targetPerson.id) {
        relationship = "Partner";
      } else if (person.parents.includes(targetPerson.id)) {
        relationship = "Parent";
      } else if (targetPerson.parents.includes(person.id)) {
        relationship = "Child";
      }  else if ((person.gender === "male" || person.gender === "female") && (targetPerson.gender === "female" || targetPerson.gender === "male")) {
        relationship = "Sibling";
    }
    person.relationship = relationship;
    return person;
  });
  const familyNamesWithRelationships = familyWithRelationships.map(function(person) {
      return `${person.firstName} ${person.lastName} (${person.relationship})`;
    });
  
    alert(`Family members of ${targetPerson.firstName} ${targetPerson.lastName}: ${familyNamesWithRelationships}`);
  }

  