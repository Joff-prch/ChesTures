import fs from "fs";
import cookieParser from "cookie-parser";


export class Name {
    name;
    photos = [];
    constructor(name) {
        this.name = name;
    }

    static goodPseudo(tab, pseudo, res) {
        let good = false;
        for (const element in tab) {
            if (tab[element].name == pseudo) {
                good = true;
                break;
            } else {
                good = false;
            }
        }
        if (good) {
            res.cookie('pseudo', pseudo, {
                maxAge: 1000000000
            })
            console.log('cookie envoyé');
            res.redirect('/main')
        }
        if (!good) {
            res.render('login.twig', {
                message: "Ceci n'est pas un Pseudo valide"
            })
        }
    }

    static newInscription(fileContent, req, res) {
        let good2 = false;
        let newPseudo = req.body.newpseudo;
        for(const element in fileContent){
            if(fileContent[element].name == newPseudo){
                res.render('inscription.twig', {
                    message: "Ce Nom existe déjà"
                })
                good2 = false;
                break;
            } else {
                good2 = true;
            }
        }
        if (good2) {
            let newPseudo = new Name(req.body.newpseudo);
            fileContent.push(newPseudo);
            fileContent = JSON.stringify(fileContent, null, 4);
            fs.writeFileSync('./assets/login/nameLogin.json', fileContent);
            res.redirect('/')
        }

    }


}