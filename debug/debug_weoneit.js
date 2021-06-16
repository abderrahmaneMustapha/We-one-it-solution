/*
    L'objectif est d'avoir l'affichage suivant en faisant une seule modification sur le code :
    We
    -
    One
    -
    IT
    -
*/

//Ne pas modifier cette fonction
async function getSeparator() {
    return "-";
}

function getElts() {
    array.forEach((element) => {
        getSeparator()
            .then((separator) =>console.log(`${element}\n${separator}`))          
    });
}

let array = ["We", "One", "IT"];

getElts();
