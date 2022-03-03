const fs = require('fs');

const case1 = fs.readFileSync('./samples/1_simple_case.txt', 'utf-8').split('\n');
const case2 = fs.readFileSync('./samples/2_1000_groups_of_few_people.txt', 'utf-8').split('\n');
const case3 = fs
  .readFileSync('./samples/3_the_same_groups_go_on_the_ride_several_times_during_the_day.txt', 'utf-8')
  .split('\n');
const case4 = fs
  .readFileSync('./samples/4_all_the_people_get_on_the_roller_coaster_at_least_once.txt', 'utf-8')
  .split('\n');
const case5 = fs.readFileSync('./samples/5_high_earnings_during_the_day.txt', 'utf-8').split('\n');
const case6 = fs.readFileSync('./samples/6_works_with_a_large_dataset.txt', 'utf-8').split('\n');
const case7 = fs.readFileSync('./samples/7_hard.txt', 'utf-8').split('\n');
const case8 = fs.readFileSync('./samples/8_harder.txt', 'utf-8').split('\n');

/*----------------------------------------------*/

/**
 * Fonction de Test des cas
 */
testExo = async () => {
  const result1 = await estimateScenario(case1);
  console.log(`Cas 1: ${result1} dirhams`);
  const result2 = await estimateScenario(case2);
  console.log(`Cas 2: ${result2} dirhams`);
  const result3 = await estimateScenario(case3);
  console.log(`Cas 3: ${result3} dirhams`);
  const result4 = await estimateScenario(case4);
  console.log(`Cas 4: ${result4} dirhams`);
  const result5 = await estimateScenario(case5);
  console.log(`Cas 5: ${result5} dirhams`);
  const result6 = await estimateScenario(case6);
  console.log(`Cas 6: ${result6} dirhams`);
};

testExo();

/**
 *  Fonction principale pour estimer le revenu de l'attraction
 * @param {string[]} file
 * @returns la somme gagné avec cette attraction
 */
async function estimateScenario(file) {
  // Récupération des données
  let data = file;
  let [L, C, N] = data[0].split(' ');
  data.shift();

  // Parsing des données pour être sur d'avoir des nombres
  C = parseInt(C, 10);
  data = data.map((group) => parseInt(group, 10));

  //Récupération des groupes pouvant faire l'attraction (suppression des groupes trop grand (peut être inutile))
  let valid_groups = data.filter((group) => group <= L);

  //Remplissage de la file si trop petite
  valid_groups = await fillQueue(valid_groups, C);
  //Création des chariots
  let cartGroups = await formCartGroup(valid_groups, L, N);

  //rechargement de la queue si besoin
  cartGroups = await fillQueue(cartGroups, C);

  //Réduction de la file à la longueur max
  cartGroups = cartGroups.splice(0, C);

  //Calcul de l'argent gagné
  const moneyEarn = cartGroups.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  return moneyEarn;
}

/*--------------------------------------------------*/

/**
 * Fonction pour former les groupes qui monteront des les chariots
 * @param {number[]} friendsGroups Tableau des groupes de personnes
 * @param {number} maxPerCart Nombre maximun de personnes par chariot
 * @param {number} initialGroupNumber Nombre de groupes au départ de l'attraction
 * @returns Tableau de personnes par chariot
 */
function formCartGroup(friendsGroups, maxPerCart, initialGroupNumber) {
  return new Promise((resolve, reject) => {
    const cartGroups = [];

    friendsGroups.reduce((previousValue, currentValue, index) => {
      const addedValue = previousValue + currentValue;
      if (previousValue === 0) {
        return currentValue;
      } else {
        if ((index + 1) % initialGroupNumber === 0 && friendsGroups.length - index >= initialGroupNumber) {
          if (addedValue <= maxPerCart) {
            cartGroups.push(addedValue);
          } else {
            cartGroups.push(...[previousValue, currentValue]);
          }
          return 0;
        } else if (addedValue <= maxPerCart) {
          return previousValue + currentValue;
        } else {
          cartGroups.push(previousValue);
          if (friendsGroups.length === index + 1) {
            currentValue + friendsGroups[0] <= maxPerCart
              ? cartGroups.push(currentValue + friendsGroups[0])
              : cartGroups.push(currentValue);
          }
          return currentValue;
        }
      }
    }, 0);
    resolve(cartGroups);
  });
}

/**
 *  Fonction pour remplir la queue avec les groupes de personnes
 * @param {number[]} queue Tableau des groupes de personnes
 * @param {number} maxTour Nombre de tour maximum pour l'attraction
 * @returns un tableau de groupes de personnes supérieur au nombre de tour max de l'attraction
 */
async function fillQueue(queue, maxTour) {
  return new Promise(async (resolve, reject) => {
    if (queue.length < maxTour) {
      queue = queue.concat(queue);
      resolve(await fillQueue(queue, maxTour));
    } else {
      resolve(queue);
    }
  });
}
