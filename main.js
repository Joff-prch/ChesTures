import express from "express";
import bodyParser from "body-parser";
import fs from "fs"
import { Name } from "./assets/class/name.class.js";
import { Photox } from "./assets/class/photo.class.js";
import cookieParser from "cookie-parser";



let filePath = './assets/login/nameLogin.json';
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([{
        name: "default",
        photos: []
    }]))
}
let fileContent = await JSON.parse(fs.readFileSync(filePath, 'utf-8'));


const app = express();
app.use(express.static('./assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.listen(8085, () => {
    console.log("Le serveur a demarré et fonctionne");
})





app.get('/', async (req, res) => {
    res.render('login.twig');
});


app.post('/', async (req, res) => {
    let pseudo = req.body.pseudo;
    Name.goodPseudo(fileContent, pseudo, res);
});




app.get('/inscription', async (req, res) => {
    res.render('inscription.twig');
});


app.post('/inscription', async (req, res) => {
    Name.newInscription(fileContent, req, res);
});




app.get('/main', async (req, res) => {
    let coocki = req.cookies.pseudo;
    let photo = () => {
        let concat = '';
        for (let y = 0; y < fileContent.length; y++) {
            if (fileContent[y].name == coocki) {
                for (let i = 0; i < fileContent[y].photos.length; i++) {
                    concat += "<img onclick='copyToClipB(event)' draggable='true' id='" + fileContent[y].photos[i].id + "' class='base' name='pict' src='" + fileContent[y].photos[i].photo + "'>";
                }
            }
        }
        return concat;
    }
    res.render('main.twig', {
        photos: photo()
    });
});


app.post('/main', async (req, res) => {
    let url = req.body.photo;
    if (url == "") {

    } else {
        let coocki = req.cookies.pseudo;
        for (let i = 0; i < fileContent.length; i++) {
            if (fileContent[i].name == coocki) {
                let newPhoto = new Photox(url, Photox.randID());
                fileContent[i].photos.push(newPhoto);
                fileContent = JSON.stringify(fileContent, null, 4);
                fs.writeFileSync('./assets/login/nameLogin.json', fileContent);
                break;
            }
        }
    }
    res.redirect('/main');
});


app.post('/remove', async (req, res) => {
    let url = req.body.url_img;
    let pseudo = req.cookies.pseudo;
    for (let i = 0; i < fileContent.length; i++) {
        if (fileContent[i].name === pseudo) {
            for (let j = 0; j < fileContent[i].photos.length; j++) {
                if (fileContent[i].photos[j].photo == url) {
                    fileContent[i].photos.splice(j, 1);
                    fileContent = JSON.stringify(fileContent, null, 4);
                    fs.writeFileSync('./assets/login/nameLogin.json', fileContent);
                    break;
                }

            }
        }
    }
    res.redirect('/main');
})

