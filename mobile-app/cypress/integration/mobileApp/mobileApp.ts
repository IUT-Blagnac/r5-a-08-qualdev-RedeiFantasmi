import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

interface Time {
  hour: number,
  minutes: number,
}

// heure actuelle
let currentTime: Time;
// changement de jour pour l'application
let newDayTime: Time;
// est-ce que l'utilisateur a récupérer le bonus de connexion
let claimed: boolean = false;


// Obtenir un objet Time à partir d'une string
const getTimeFromString = (stringTime: string): Time => {
  // sépare la string en deux
  const splitTime = stringTime.split(':');

  // heure = première partie, minutes = deuxième partie
  const time: Time = {
    hour: parseInt(splitTime[0]),
    minutes: parseInt(splitTime[1]),
  }

  return time;
}

// Vérifier le si time1 est plus grand que time2
const checkTimeIsBigger = (time1: Time, time2: Time): boolean => {
  if (time1.hour > time2.hour) {
    return true;
  } else if (time1.hour === time2.hour && time1.minutes >= time2.minutes) {
    return true;
  } else {
    return false;
  }
}

// Vérifier si l'objet Time donné est valide
const checkTimeIsValid = (time: Time): boolean => {
  // si heure comprise entre 00 et 24
  if (time.hour >= 0 && time.hour <= 24) {
    // et minutes comprises entre 00 et 59
    if (time.minutes >= 0 && time.minutes <= 59) {
      // l'objet Time donné est valide
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// Vérifier si l'utilisateur doit récupérer le bonus de connexion
const hasToLogIn = (): string => {
  const needToLogIn = (!claimed && checkTimeIsBigger(currentTime, newDayTime));

  return needToLogIn ? 'needs' : "doesn't need";
}

// Il est {heure de format hh:mm}
Given("it is {string}", function (currentHour: string) {

  // on récupère un objet Time
  const time: Time = getTimeFromString(currentHour);

  // on vérifie s'il est valide
  assert.isTrue(checkTimeIsValid(time))

  // si c'est le cas, on l'enregistre pour plus tard
  currentTime = time;

});

// L'appli change de jour à {heure de format hh:mm}
Given("the app change of day is at {string}", function (dayChangeHour: string) {

  // on récupère un objet Time
  const time: Time = getTimeFromString(dayChangeHour);  

  // on vérifie s'il est valide
  assert.isTrue(checkTimeIsValid(time));

  // si c'est le cas, on l'enregistre pour plus tard
  newDayTime = time;

});

// L'utilisateur n'a pas encore récupéré le bonus de connexion
Given("the user has not claimed the login bonus", function () {

  claimed = false;

});

// L'utilisateur à déjà récupéré le bonus de connexion
Given("the user has claimed the login bonus", function () {

  claimed = true;

});

// L'utilisateur {doit|ne doit pas} se connecter
Then("the user {string} to login to claim the login bonus", function (state: string) {

  // on compare le résulat prévu avec le résultat réel
  assert.equal(state, hasToLogIn());
  
});

let staminaToReplinish = 0;
let replinishRate = 0;

// Obtenir l'heure de connexion à partir de l'énergie qu'il reste à recharger
const getLoginTime = () => {

  // énergie à recharger * le temps de rechargement d'une énergie
  const minutesDuration: number = staminaToReplinish * replinishRate;

  // Récupération de l'heure avec l'ajout d'un zéro devant si seulement un chiffre (ex : 1 => 01)
  const hour: string = (currentTime.hour + Math.floor(minutesDuration / 60)).toString().padStart(2, '0');
  // Récupération des minutes avec l'ajout d'un zéro devant si seulement un chiffre (ex : 4 => 04)
  const minutes: string = (minutesDuration % 60).toString().padStart(2, '0');

  const loginTime: string = `${hour}:${minutes}`;

  return loginTime;

}

// L'énérgie de l'utilisateur est à {énergie actuelle} sur {énergie totale}
Given("stamina is at {int} out of {int}", function (userRemaining: number, userTotal: number) {

  staminaToReplinish = userTotal - userRemaining;

  if (staminaToReplinish < 0) staminaToReplinish = 0;

});

// Il faut {nombre minutes} pour recharger une énergie
Given("it takes {int} minutes to replinish one stamina", function (gameReplinishRate: number) {

  replinishRate = gameReplinishRate;

});

// L'utiliateur doit se connecter à {heure de format hh:mm}
Then("user has to log in at {string}", function (expectedLoginTime: string) {

  // temps de connexion réel
  const loginTime: string = getLoginTime();

  // Si les deux temps sont pareils tout va bien
  assert.equal(loginTime, expectedLoginTime);

});
