//Au chargement de la page d'accueil
window.addEventListener("load", function (){
  var url = document.location.href;
  //Si la page a été actualisé à partir d'un chapitre, l'URL contient encore l'id du chapitre de type #x.
  //Cela ne pose pas de soucis car le lien de la page d'accueil vers 2 remplacera l'id de l'url par #2.
  //Mais si la page a été actualisé à partir du chapitre 2, l'URL contient déjà #2 donc le lien vers 2 ne redirigera pas vers le chapitre 2 car l'url n'a pas besoin d'être modifiée, hashchange ne sera pas appelé.
  if(url.includes("#2")){
    //On récupère donc l'URL du site sans le chapitre
    url = url.split('#');
    document.location.href = url[0];
  }
  //Puis on affiche le chapitre 1.
  afficherChapitre(1);
});

//Au changement de l'url
window.addEventListener("hashchange", function(){
  //On récupère le chiffre suivant le # et on affiche le chapitre correspondant
  afficherChapitre(window.location.hash.substring(1));
});


function afficherChapitre(num){
  var req = new XMLHttpRequest();
  //requête vers le chapitre voulu
  req.open("GET","./chapitres/chapitre" + num + ".json");
  req.onerror = function() {
    console.log("Échec de chargement ");
  };
  req.onload = function() {
    //Si la requête a fonctionné
    if (req.status === 200) {
      var data = JSON.parse(req.responseText);
      //On modifie la description actuelle en y mettant le texte du chapitre
      document.getElementById("desc").textContent = data.txt;
      //On vide le conteneur des liens vers les autres chapitres
      var conteneurLiens = document.getElementById("conteneurLiens");
      conteneurLiens.innerHTML="";
      //Pour chaque redirection du chapitre, on créé un nouvel élément a que l'on ajoute au conteneur
      for (var i=0 ; i< data.links.length ; i++){
        var lien = document.createElement("a");
        lien.textContent = data.links[i].txt;
        lien.href=data.links[i].link;
        conteneurLiens.appendChild(lien);
      }
    } else {
      console.log("Erreur " + req.status);
    }
  };
  req.send();
}
