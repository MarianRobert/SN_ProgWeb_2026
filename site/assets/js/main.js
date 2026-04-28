function segText() {
    if (document.getElementById('fileDisplayArea').innerHTML==""){
        //alert("Il faut d'abord charger un fichier .txt !"); //autre possibilitÃ©
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !";
    } else {
        if (document.getElementById("delimID").value === "") {
            document.getElementById("logger3").innerHTML = '<span class="errorlog">Aucun dÃ©limiteur donnÃ© !</span>'
        }else{
            document.getElementById('logger3').innerHTML="";
            let text = document.getElementById("fileDisplayArea").innerText;
            let delim = document.getElementById("delimID").value;
            let display = document.getElementById("page-analysis");
        
            let regex_delim = new RegExp(
                "["
                + delim
                    .replace("-", "\\-") // le tiret n'est pas Ã  la fin : il faut l'Ã©chapper, sinon erreur sur l'expression rÃ©guliÃ¨re
                    .replace("[", "\\[").replace("]", "\\]") // Ã  changer sinon regex fautive, exemple : [()[]{}] doit Ãªtre [()\[\]{}], on doit "Ã©chapper" les crochets, sinon on a un symbole ] qui arrive trop tÃ´t.
                + "\\s" // on ajoute tous les symboles d'espacement (retour Ã  la ligne, etc)
                + "]+" // on ajoute le + au cas oÃ¹ plusieurs dÃ©limiteurs sont prÃ©sents : Ã©vite les tokens vides
            );
        
            let tokens = text.split(regex_delim);
            tokens = tokens.filter(x => x.trim() != ""); // on s'assure de ne garder que des tokens "non vides"
            let lines = text.split(/\r?\n/g);
            lines = lines.filter(line => line.trim() != "");
        
            global_var_tokens = tokens; // dÃ©commenter pour vÃ©rifier l'Ã©tat des tokens dans la console dÃ©veloppeurs sur le navigateur
            global_var_lines = lines;
            display.innerHTML = tokens.join(" ");
			
        }
    }
}

//fonction kujuj: va ajouter uj à la fin de chacun des mots de la page web

function kujuj(text) {
    let mots = text.split(" "); // .split pour découper la chaîne de caractère en un tableau, il faut espacer les guillemets pour les mots, resserer si c'est lettre par lettre

    let mots_modifies = mots.map(function(mot) { // cette ligne permet un nouveau tableau "mots_modifies"
        return mot + "uj"; // ajoute "uj" à la fin de chaque mot 
    });

    let resultat = mots_modifies.join(" "); // ici .join va transformer le dernier tableau en chaîne de caractères , guillemets espacés pour espacer les mots
    return resultat; // donne le résultat final 
}
// fonction afficher kujuj

function afficherKujuj() {
    let texte = document.getElementById("fileDisplayArea").innerText; //  va récupérer le texte uploadé et affiché dans fileDisplayArea
    let resultat = kujuj(texte);
    document.getElementById("resultat").innerHTML = resultat; // renvoi le résultat final dans html 
}

window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
			segText(); // Automatise la segmentation du texte - Pas fonctionnel
			let pptxt = document.getElementByID("file-analysis").innerText; // Stocke le texte segmenté - Pas fonctionnel
			
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}



	

