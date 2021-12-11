//KREIRANJE MENIJA I POPUNJAVANJE

const Meni = [
  {
    text: "Pocetna",
    link: "#",
  },
  {
    text: "O nama",
    link: "#mu-about-us",
  },
  {
    text: "Meni",
    link: "#mu-restaurant-menu",
  },
  {
    text: "Rezervacija",
    link: "#mu-reservation",
  },
  {
    text: "Galerija",
    link: "#mu-gallery",
  },
  {
    text: "Autor",
    link: "#mu-author",
  },
  {
    text: "Kontakt",
    link: "#mu-contact",
  },
];
function populateNavigation() {
  function e(e) {
    var i = document.createElement("a");
    (i.innerText = e.text), (i.href = e.link);
    var a = document.createElement("li");
    return a.appendChild(i), a;
  }
  for (var i = document.getElementById("top-menu"), a = 0; a < Meni.length; a++)
    i.appendChild(e(Meni[a]));
}
populateNavigation();

//SLIDER NA VRHU STRANICE

var nizPozadina = [
  "assets/img/pozadina1.jpg",
  "assets/img/pozadina2.jpg",
  "assets/img/pozadina3.jpg",
];
var nizNaziva1 = ["Dobrodosli", "Elegantni", "Ukusna"];
var nizNaziva2 = ["u Excellent", "Restoran", "Zacinjena hrana"];
var nizParagraf = ["EST. 2007", "&nbsp; ", "&nbsp; "];

var s = document.getElementById("slider");
var naslovMain = document.getElementById("naslov");
var naslovSecond = document.getElementById("naslov2");
var paragraf = document.getElementById("paragraf");
function slider() {
  for (var i = 0; i < nizPozadina.length; i++) {
    !(function (i) {
      setTimeout(function () {
        s.src = nizPozadina[i];
        naslovMain.innerText = nizNaziva1[i];
        naslovSecond.innerText = nizNaziva2[i];
        paragraf.innerHTML = nizParagraf[i];
      }, 3e3 * i);
    })(i);
  }
}
slider(),
  setInterval(function () {
    slider();
  }, 3e3 * nizPozadina.length);

//KRAJ DELA

//DINAMICKO KREIRANJE COUNTER DIVA

var Naslov1 = ["Sveza jela za", "Ukusna jela za", "Vrucih", "Zadovoljnih"];
var Broj1 = [150, 60, 45, 6569];
var Naslov2 = ["Dorucak", "Rucak", "Kafa", "Korisnika"];
var DivListaCounter = document.getElementById("lista");
DivListaCounter.setAttribute("class", "mu-couner-area");
var ListaCounter = document.createElement("ul");
ListaCounter.setAttribute("class", "mu-counter-nav");
DivListaCounter.appendChild(ListaCounter);
for (var i = 0; i < 4; i++) {
  var liTag = document.createElement("li");
  liTag.setAttribute("class", "col-md-3 col-sm-3 col-xs-12");
  var divGlavni = document.createElement("div");
  var span1 = document.createElement("span");
  span1.innerText = Naslov1[i];
  var naslovH3 = document.createElement("h3");
  var span2 = document.createElement("span");
  span2.setAttribute("class", "broj");
  span2.setAttribute("broj-kraj", Broj1[i]);
  span2.innerText = "0";
  var sup = document.createElement("sup");
  sup.innerText = "+";
  naslovH3.appendChild(span2);
  naslovH3.appendChild(sup);
  var tekst = document.createElement("p");
  tekst.innerText = Naslov2[i];
  divGlavni.setAttribute("class", "mu-single-counter");
  divGlavni.appendChild(span1);
  divGlavni.appendChild(naslovH3);
  divGlavni.appendChild(tekst);
  liTag.appendChild(divGlavni);
  ListaCounter.appendChild(liTag);
}

//KRAJ DELA

//SCROLL EFEKATI

var pokrenutCounter = false;
var PokrenutSlajder = false;
var PokrenutSlajder2 = false;

window.addEventListener("scroll", () => {
  var visinaY = window.scrollY;
  console.log(visinaY);

  if (visinaY > 800 && pokrenutCounter == false) {
    pokrenutCounter = true;
    $(".broj").each(function () {
      var $this = $(this);
      jQuery({ Counter: 0 }).animate(
        { Counter: $this.attr("broj-kraj") },
        {
          duration: 1500,
          easing: "swing",
          step: function (now) {
            $this.text(Math.ceil(now));
          },
        }
      );
    });
  }

  if (visinaY > 100 && PokrenutSlajder == false) {
    PokrenutSlajder = true;
    console.log("lmao");
    $(document).ready(function () {
      $(".fade-right").animate({ right: 0, opacity: "show" }, 1500);
      $(".fade-left").animate({ left: 0, opacity: "show" }, 1500);
    });
  }

  if (visinaY > 4000 && PokrenutSlajder2 == false) {
    PokrenutSlajder2 = true;
    console.log("lmao");
    $(document).ready(function () {
      $(".fade-top").animate({ top: 0, opacity: "show" }, 1500);
      $(".fade-bottom").animate({ bottom: 0, opacity: "show" }, 1500);
    });
  }
});

//KRAJ DELA

//DUGME TO TOP
var dugme = document.getElementById("scrollUp");

window.onscroll = function () {
  SkrolGore();
};

function SkrolGore() {
  if (
    document.body.scrollTop > 350 ||
    document.documentElement.scrollTop > 350
  ) {
    dugme.style.display = "block";
  } else {
    dugme.style.display = "none";
  }
}

//KRAJ DELA

//VALIDACIJA PRVE FORME

let forma = document.getElementById("form-submit");
forma.addEventListener("click", () => {
  let combo = document.getElementById("brojOsoba");
  let txtDatum = document.getElementById("date");
  let comboRez = combo.value;
  let txt = document.getElementById("napomena").value;
  let m1 = proveriIme();
  let m2 = proveriEmail();
  let m3 = proveriTelefon();
  if (comboRez == "") {
    document.getElementById("upozorenjeOsoba").classList.remove("sakrij");
  } else {
    document.getElementById("upozorenjeOsoba").classList.add("sakrij");
  }
  if (comboRez != "" && txt != "" && proveriEmail() && proveriIme()) {
    document.getElementById("upozorenjeText").classList.add("sakrij");
    document.getElementById("upozorenjeText").classList.add("sakrij");
  } else if (txt == "") {
    document.getElementById("upozorenjeText").classList.remove("sakrij");
  } else if (txt != "") {
    document.getElementById("upozorenjeText").classList.add("sakrij");
  } else if (comboRez == "") {
    document.getElementById("upozorenjeOsoba").classList.remove("sakrij");
  } else if (comboRez != "") {
    document.getElementById("upozorenjeText").classList.add("sakrij");
  } else if (!proveraIme()) {
    proveriIme();
  }
  if (isNaN(txtDatum.valueAsNumber)) {
    document.getElementById("upozorenjeDatum").classList.remove("sakrij");
  }
  if (!isNaN(txtDatum.valueAsNumber)) {
    document.getElementById("upozorenjeDatum").classList.add("sakrij");
  }
});

var danas = new Date();
var dd = String(danas.getDate());
var mm = String(danas.getMonth() + 1);
var yyyy = danas.getFullYear();

danas = yyyy + "-" + mm + "-" + dd;
$("#date").attr("min", danas);

let uzorakIme =
  /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,15}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,15})?(\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,20})\s*$/;

let txtIme = document.getElementById("name");
txtIme.addEventListener("blur", proveriIme);
function proveriIme() {
  let ime = txtIme.value;
  ime.replace(/\s\s+/g, " ");
  if (!uzorakIme.test(ime)) {
    let poljeIme = document.getElementById("upozorenjeIme");
    if (ime == "" || !ime.trim()) {
      poljeIme.innerHTML = "Niste popunili Ime i prezime!";
    } else {
      poljeIme.innerHTML = "Pogran unos imena i prezimena!";
    }
    poljeIme.classList.remove("sakrij");
    return false;
  }
  if (uzorakIme.test(ime)) {
    let poljeIme = document.getElementById("upozorenjeIme");
    poljeIme.classList.add("sakrij");
    return true;
  }
}
let uzorakEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

let txtEmail = document.getElementById("email");
txtEmail.addEventListener("blur", proveriEmail);
function proveriEmail() {
  let email = txtEmail.value;
  if (!uzorakEmail.test(email)) {
    let poljeEmail = document.getElementById("upozorenjeEmail");
    if (email == "" || !email.trim())
      poljeEmail.innerHTML = "Niste popunili email!";
    else poljeEmail.innerHTML = "Email nije u dobrom formatu!";

    poljeEmail.classList.remove("sakrij");
    return false;
  }
  if (uzorakEmail.test(email)) {
    let poljeEmail = document.getElementById("upozorenjeEmail");
    poljeEmail.classList.add("sakrij");
    return true;
  }
}
let uzorakTelefon = /^(\+381)?(\s|-)?6(([0-6]|[8-9])\d{8}|(77|78)\d{7}){1}$/;

let telefonTxt = document.getElementById("telefon");
telefonTxt.addEventListener("blur", proveriTelefon);

function proveriTelefon() {
  let telefon = telefonTxt.value;
  if (!uzorakTelefon.test(telefon)) {
    let poljeTelefon = document.getElementById("upozorenjeTelefon");
    if (telefon == "" || !telefon.trim())
      poljeTelefon.innerHTML = "Niste uneli telefon";
    else poljeTelefon.innerHTML = "Telefon nije u dobrom formatu!";

    poljeTelefon.classList.remove("sakrij");
    return false;
  }
  if (uzorakTelefon.test(telefon)) {
    let poljeTelefon = document.getElementById("upozorenjeTelefon");
    poljeTelefon.classList.add("sakrij");
    return true;
  }
}

//KRAJ DELA

//VALIDACIJA DRUGE FORME

let forma2 = document.getElementById("form-submit2");
forma2.addEventListener("click", () => {
  let txt = document.getElementById("message").value;
  let subject = document.getElementById("subject").value;
  let m1 = proveriIme2();
  let m2 = proveriEmail2();
  let m3 = proveriSubject();
  if (txt != "" && proveriEmail2() && proveriIme2()) {
    document.getElementById("upozorenjeText2").classList.add("sakrij");
    document.getElementById("upozorenjeText2").classList.add("sakrij");
  } else if (txt == "") {
    document.getElementById("upozorenjeText2").classList.remove("sakrij");
  } else if (txt != "") {
    document.getElementById("upozorenjeText2").classList.add("sakrij");
  } else if (!proveraIme2()) {
    proveriIme2();
  }
});

let txtIme2 = document.getElementById("name2");
txtIme2.addEventListener("blur", proveriIme2);
function proveriIme2() {
  let ime = txtIme2.value;
  ime.replace(/\s\s+/g, " ");
  if (!uzorakIme.test(ime)) {
    let poljeIme = document.getElementById("upozorenjeIme2");
    if (ime == "" || !ime.trim()) {
      poljeIme.innerHTML = "Niste popunili Ime i prezime";
    } else {
      poljeIme.innerHTML = "Pogran unos imena i prezimena";
    }
    poljeIme.classList.remove("sakrij");
    return false;
  }
  if (uzorakIme.test(ime)) {
    let poljeIme = document.getElementById("upozorenjeIme2");
    poljeIme.classList.add("sakrij");
    return true;
  }
}

let txtEmail2 = document.getElementById("email2");
txtEmail2.addEventListener("blur", proveriEmail2);
function proveriEmail2() {
  let email = txtEmail2.value;
  if (!uzorakEmail.test(email)) {
    let poljeEmail = document.getElementById("upozorenjeEmail2");
    if (email == "" || !email.trim())
      poljeEmail.innerHTML = "Niste popunili email!";
    else poljeEmail.innerHTML = "Email nije u dobrom formatu!";

    poljeEmail.classList.remove("sakrij");
    return false;
  }
  if (uzorakEmail.test(email)) {
    let poljeEmail = document.getElementById("upozorenjeEmail2");
    poljeEmail.classList.add("sakrij");
    return true;
  }
}

let txtSubject = document.getElementById("subject");
txtSubject.addEventListener("blur", proveriSubject);

function proveriSubject() {
  let subject = txtSubject.value;
  if (subject == "") {
    document.getElementById("upozorenjeSubject").classList.remove("sakrij");
  } else {
    document.getElementById("upozorenjeSubject").classList.add("sakrij");
  }
}

//KRAJ DELA

//DINAMICKO KREIRANJE GALERIJE

var listaSlika = [
  "assets/img/Gallery/galerija1.jpg",
  "assets/img/Gallery/galerija2.jpg",
  "assets/img/Gallery/galerija3.jpg",
  "assets/img/Gallery/galerija4.jpg",
  "assets/img/Gallery/galerija5.jpg",
  "assets/img/Gallery/galerija6.jpg",
  "assets/img/Gallery/galerija7.jpg",
  "assets/img/Gallery/galerija8.jpg",
  "assets/img/Gallery/galerija9.jpg",
];
var listaPodSlika = [
  "Kuhinja ugao 1",
  "Kuhinja ugao 2",
  "Kuhinja ugao 3",
  "Restoran ugao 1",
  "Restoran ugao 2",
  "Restoran ugao 3",
  "Restoran ugao 4",
  "Kuhinja ugao 4",
  "Kuhinja ugao 5",
];
var galerijaDiv = document.getElementById("galerijaDiv");
for (var i = 0; i < listaSlika.length; i++) {
  var a = document.createElement("a");
  a.setAttribute("class", "test-popup-link");
  a.setAttribute("href", listaSlika[i]);
  var slika = document.createElement("img");
  slika.setAttribute("alt", listaPodSlika[i]);
  slika.setAttribute("src", listaSlika[i]);
  var divPlus = document.createElement("div");
  divPlus.setAttribute("class", "mu-single-gallery-info");
  var slika2 = document.createElement("img");
  slika2.setAttribute("class", "mu-view-btn");
  slika2.setAttribute("src", "assets/img/plus.png");
  slika2.setAttribute("alt", "Plus ikonica");
  divPlus.appendChild(slika2);
  a.appendChild(slika);
  a.appendChild(divPlus);
  var figura = document.createElement("figure");
  figura.setAttribute("class", "mu-single-gallery-img");
  figura.appendChild(a);
  var secondDiv = document.createElement("div");
  secondDiv.setAttribute("class", "mu-single-gallery-item");
  secondDiv.appendChild(figura);
  var mainDiv = document.createElement("div");
  mainDiv.setAttribute("class", "mu-single-gallery col-md-4");
  mainDiv.appendChild(secondDiv);
  galerijaDiv.appendChild(mainDiv);
}

//KRAJ DELA

//GALERIJA VIEWER

jQuery(function (gallery) {
  gallery(".test-popup-link").magnificPopup({
    type: "image",
    mainClass: "mfp-fade",
    gallery: {
      enabled: true,
    },
  });
});

//KRAJ DELA

//DINAMICKO KREIRANJE DELA O NAMA
var NizTekstova = [
  "Nakon dugogodišnjeg iskustva u ugostiteljstvu, sa puno ljubavi i entuzijazma smo otvorili restoran Excellent.",
  "Restoran je otvoren 2007. godine i sa puno ljubavi sve ove godine služimo najbolju hranu.",
  "Kuhinja restorana predstavlja savrsenu kombinaciju tradicionalnih i internacionalnih ukusa. Restoran je pogodan kako za mirne i poslovne ruckove, tako i za prijatne porodicne ruckove ili za romanticne vecere.",
  "Restoran radi svih sedam dana u nedelji i pozivamo Vas da dodjete i uverite se u najbolju kuhinju u Beogradu.",
];
var pozicija = document.getElementById("drzac");
var pozicijaDiv1 = document.createElement("div");
pozicijaDiv1.setAttribute("class", "col-md-6 fade-left levo-minus-280");
var pozicijaDiv2 = document.createElement("div");
pozicijaDiv2.setAttribute("class", "mu-about-us-left");
var slicica = document.createElement("img");
slicica.setAttribute("src", "assets/img/oNama.jpg");
slicica.setAttribute("alt", "Slika radnika 1");
pozicijaDiv2.appendChild(slicica);
pozicijaDiv1.appendChild(pozicijaDiv2);
var pozicijaDiv3 = document.createElement("div");
pozicijaDiv3.setAttribute("class", "col-md-6 fade-right desno-minus-280");
var pozicijaDiv4 = document.createElement("div");
pozicijaDiv4.setAttribute("class", "mu-about-us-right");
for (var j = 0; j < NizTekstova.length; j++) {
  var paragraf2 = document.createElement("p");
  paragraf2.innerText = NizTekstova[j];
  if (j % 2 == 0 && j != 0) {
    var br = document.createElement("span");
    br.innerHTML = "<br/>";
    pozicijaDiv4.appendChild(br);
  }
  pozicijaDiv4.appendChild(paragraf2);
}
pozicijaDiv3.appendChild(pozicijaDiv4);
pozicija.appendChild(pozicijaDiv1);
pozicija.appendChild(pozicijaDiv3);

//DINAMICKO KREIRANJE O AUTORU

var nizTekst = [
  "Zdravo, ja sam Nenad Jevtic, student 2. godine Visoke skole ICT.",
  "Bio sam dovoljno srecan da radim za nekoliko zabavnih, uzbudljivih i uspesnih StartUp kompanija koje su mi pomogle da postanem ono sto sam sada.",
  "Komunikacija sa mnom je vrlo prosta, mozes me nazvati kad god pozelis. uvek razmisljam o brzini, optimizaciji koda i najadekvatnijem pristupu nekom problemu.",
];
var ulNiz = [
  "Godina: 20",
  "Index: 60/20",
  'Prethodno skolovanje: ETS "Rade Koncar"',
];

var drzac2 = document.getElementById("drzac2");
var divPozicija = document.createElement("div");
divPozicija.setAttribute("class", "col-md-6 fade-top gore-minus-200");
var divPozicija1 = document.createElement("div");
divPozicija1.setAttribute("class", "mu-about-us-left");
imgDiv = document.createElement("img");
imgDiv.setAttribute("src", "assets/img/Autor.jpg");
imgDiv.setAttribute("alt", "Slika autora");
divPozicija1.appendChild(imgDiv);
divPozicija.appendChild(divPozicija1);
var divPozicija2 = document.createElement("div");
divPozicija2.setAttribute("class", "col-md-6 fade-bottom dole-minus-200");
var divPozicija3 = document.createElement("div");
divPozicija3.setAttribute("class", "mu-about-us-right");
var ulTag = document.createElement("ul");
for (var k = 0; k < nizTekst.length; k++) {
  var text = document.createElement("p");
  text.innerText = nizTekst[k];
  divPozicija3.appendChild(text);
  var liTag1 = document.createElement("li");
  liTag1.innerText = ulNiz[k];
  ulTag.appendChild(liTag1);
}
divPozicija3.appendChild(ulTag);
divPozicija2.appendChild(divPozicija3);
drzac2.appendChild(divPozicija);
drzac2.appendChild(divPozicija2);
