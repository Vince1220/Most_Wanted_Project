
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
    let maxCriteria= 5
    let continueSearch= true
    while (searchCriteria.length < maxCriteria && continueSearch){
        const trait= prompt(`Enter Trait ${searchCriteria.length +1}:eyeColor,weight,height,gender,occupation`);
        const validTraits= ["eyeColor","height","gender","occupation","weight"];
        if(validTraits.includes(trait)){
            alert("Invalid Trait");
            return true
        }
        const value = prompt(`Enter trait ${trait}`);
        searchCriteria.push({trait,value});
        continueSearch= confirm ("Do you want to continue searching?");
        let filteredPeople = people;
        for(const criteria of searchCriteria){
            filteredPeople= filteredPeople.filter(person =>[criteria.trait]== criteria.value);
        }
        displayPeople("Search Results", filteredPeople)

    }
}

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
            // displayPersonInfo(person);
            function displayPerson(person){
                let personInfo =`first name:${person.firstName}\n`;
                personInfo += `last name:${person.lastName}\n`;
                personInfo += `id:${person.id}\n`;
                personInfo += `gender:${person.gender}\n`;
                personInfo += `dob:${person.dob}\n`;
                personInfo += `height:${person.height}\n`;
                personInfo += `weight:${person.weight}\n`;
                personInfo += `eyecolor:${person.eyeColor}\n`;
                personInfo += `occupation:${person.occupation}\n`;
                personInfo += `parents:${person.parents}\n`;
                personInfo += `currentspouse:${person.currentSpouse}\n`;
            alert(`${person.id}`);
            alert(`${person.firstName}`);
            alert(`${person.lastName}`);
            alert(`${person.gender}`);
            alert(`${person.dob}`);
            alert(`${person.height}`);
            alert(`${person.weight}`);
            alert(`${person.eyeColor}`);
            alert(`${person.occupation}`);
            alert(`${person.parents}`);
            alert(`${person.currentSpouse}`)
            alert(displayPersonInfo);
            let displayPersonInfo= displayPerson(person[0]);
            }
            break;
        case "family":
            //! TODO
            // let personFamily = findPersonFamily(person, people);
            // displayPeople('Family', personFamily);
            let personFamily= findFamily(people,person[0])
            alert(personFamily);
            break;
        case "descendants":
            //! TODO
            // let personDescendants = findPersonDescendants(person, people);
            // displayPeople('Descendants', personDescendants);
            let personDescendants= findPersonDecendants(person[0], people);
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

function searchbyEyeColor(people){
    let eyeColor = promptFor("What is the person's eye color?", chars);
    let foundPerson = people.filter(function(person){
      if(person.eyeColor === eyeColor){
      return true;
      }
      else{
        return false;
      }
  })
  return foundPerson[0];
  }
  

function findPersonDecendants(people,person){
    let children = people.filter(p=>p.parents.includes(person.id))
    let grandchildren =[]
    for (let i=0; i <children.length;i++){
        let child = children[i];
        grandchildren.concat(people.filter(p=>p.parents.includes(child.id)))

        }

        displayPeople("Children",children);
        for (let i=0; i< children.length;i++){
            let grandchildren = people.filter(p.parents.includes(children[i].id));
            if (grandchildren.length>0){
                displayPeople("Grandchildren",grandchildren);
                decendants = decendants.concat(grandchildren);
                decendants = decendants.concat(findDecendants(grandchildren, people));
            }
        }
        displayPeople("Grandchildren", grandchildren);
    }

    function findFamily(people,person){
        let spouse = people.filter(p=> p.id === person.currentSpouse)
        displayPeople("Spouse", spouse)
        let parents = people.filter(p=> person.parents(p.id))
        displayPeople("Parents", parents)

        let siblings = people.filter(p=>{
            if (p.id !== person.id){
                for(let i=0; i<person.parents.length; i++){
                if(p.parents.includes(person, parents [i])){
                    return true
                }
            }
        }
        return false
        })
        displayPeople("Siblings", siblings)
    }

    function findSpouseId(people, person){
        const familyMember = people.filter(p=> p.id === person.currentSpouse)
        return familyMember
    }


function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

} 