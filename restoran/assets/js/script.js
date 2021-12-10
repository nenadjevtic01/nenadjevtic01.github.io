//SLIDER NA VRHU STRANICE

var nizPozadina = [
  "assets/img/pozadina1.jpg",
  "assets/img/pozadina2.jpg",
  "assets/img/pozadina3.jpg"
];
var nizNaziva1 = ["Dobrodosli", "Elegantni", "Ukusna"];
var nizNaziva2 = ["u Excellent", "Restoran", "Zacinjena hrana"];
var nizParagraf=["EST. 2007","&nbsp; ","&nbsp; "]

var s = document.getElementById("slider");
var naslovMain = document.getElementById("naslov");
var naslovSecond = document.getElementById("naslov2");
var paragraf= document.getElementById("paragraf")
function slider() {
  for (var i = 0; i < nizPozadina.length; i++) {
    !(function (i) {
      setTimeout(function () {
        s.src = nizPozadina[i];
        naslovMain.innerText = nizNaziva1[i];
        naslovSecond.innerText = nizNaziva2[i];
        paragraf.innerHTML=nizParagraf[i];
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

window.addEventListener("scroll", () => {
  var visinaY = window.scrollY;
  console.log(visinaY);

  if ((visinaY >800 && pokrenutCounter == false)) {
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

  if ((visinaY > 100 && PokrenutSlajder == false)) {
    PokrenutSlajder = true;
    console.log("lmao");
    $(document).ready(function () {
      $(".fade-right").animate({ right: 0, opacity: "show" }, 1500);
      $(".fade-left").animate({ left: 0, opacity: "show" }, 1500);
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

let forma=document.getElementById("form-submit");
forma.addEventListener("click", ()=>{
    let combo=document.getElementById("brojOsoba");
    let comboRez=combo.value;
    let txt=document.getElementById("napomena").value
    let m1=proveriIme();
    let m2=proveriEmail();
    let m3=proveriTelefon();
    if(comboRez==""){
        document.getElementById("upozorenjeOsoba").classList.remove("sakrij");
    }
    else{
        document.getElementById("upozorenjeOsoba").classList.add("sakrij");
    }
    if(comboRez!="" &&  txt!="" && proveriEmail() && proveriIme()){
        console.log("ide gas na maskaru")
        document.getElementById("upozorenjeText").classList.add("sakrij");
        document.getElementById("upozorenjeText").classList.add("sakrij");
    }
    else if(txt==""){
        document.getElementById("upozorenjeText").classList.remove("sakrij");
    }
    else if(txt!=""){
        document.getElementById("upozorenjeText").classList.add("sakrij");
    }
    else if(comboRez==""){
        document.getElementById("upozorenjeOsoba").classList.remove("sakrij");
    }
    else if(comboRez!=""){
        document.getElementById("upozorenjeText").classList.add("sakrij");
    }
    else if(!proveraIme()){
        proveriIme();
    }
    
});
let uzorakIme = /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,15}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,15})?(\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,20})\s*$/;

let txtIme = document.getElementById('name');
txtIme.addEventListener('blur', proveriIme);
function proveriIme() {
    let ime = txtIme.value;
    ime.replace(/\s\s+/g, ' ');
    if (!uzorakIme.test(ime)) {
        let poljeIme = document.getElementById('upozorenjeIme');
        if (ime == "" || !ime.trim()) {
            poljeIme.innerHTML = "Niste popunili Ime i prezime!";
        }
        else {
            poljeIme.innerHTML = "Pogran unos imena i prezimena!";
        }
        poljeIme.classList.remove('sakrij');
        return false;
    }
    if (uzorakIme.test(ime)) {
        let poljeIme = document.getElementById('upozorenjeIme');
        poljeIme.classList.add('sakrij');
        return true;
    }
}
let uzorakEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

let txtEmail = document.getElementById('email');
txtEmail.addEventListener('blur', proveriEmail);
function proveriEmail(){
    let email = txtEmail.value;
    if (!uzorakEmail.test(email)) {
        let poljeEmail = document.getElementById('upozorenjeEmail');
        if (email == "" || !email.trim())
            poljeEmail.innerHTML = "Niste popunili email!";
        else
            poljeEmail.innerHTML = "Email nije u dobrom formatu!";

        poljeEmail.classList.remove('sakrij');
        return false;
    }
    if (uzorakEmail.test(email)) {
        let poljeEmail = document.getElementById('upozorenjeEmail');
        poljeEmail.classList.add('sakrij');
        return true;
    }
}
let uzorakTelefon=/^(\+381)?(\s|-)?6(([0-6]|[8-9])\d{8}|(77|78)\d{7}){1}$/

let telefonTxt=document.getElementById("telefon")
telefonTxt.addEventListener('blur', proveriTelefon);

function proveriTelefon(){
  let telefon=telefonTxt.value;
  if(!uzorakTelefon.test(telefon)){
    let poljeTelefon=document.getElementById("upozorenjeTelefon")
    if(telefon==""||!telefon.trim())
        poljeTelefon.innerHTML="Niste uneli telefon";
    else
        poljeTelefon.innerHTML="Telefon nije u dobrom formatu!";

        poljeTelefon.classList.remove('sakrij')
        return false
  }
  if(uzorakTelefon.test(telefon)){
    let poljeTelefon=document.getElementById("upozorenjeTelefon")
    poljeTelefon.classList.add("sakrij")
    return true
  }
}

txtTelefon=telefon.value;


//KRAJ DELA

//VALIDACIJA DRUGE FORME

let forma2=document.getElementById("form-submit2");
forma2.addEventListener("click", ()=>{
    let txt=document.getElementById("message").value
    let subject=document.getElementById("subject").value
    let m1=proveriIme2();
    let m2=proveriEmail2();
    if(txt!="" && proveriEmail2() && proveriIme2()){
        document.getElementById("upozorenjeText2").classList.add("sakrij");
        document.getElementById("upozorenjeText2").classList.add("sakrij");
      }
    else if(txt==""){
        document.getElementById("upozorenjeText2").classList.remove("sakrij");
    }
    else if(txt!=""){
        document.getElementById("upozorenjeText2").classList.add("sakrij");
    }
    else if(!proveraIme2()){
        proveriIme2();
    }
    
    if(subject==""){
      document.getElementById("upozorenjeSubject").classList.remove("sakrij")
    }else{
      document.getElementById("upozorenjeSubject").classList.add("sakrij")
    }
});

let txtIme2 = document.getElementById('name2');
txtIme2.addEventListener('blur', proveriIme2);
function proveriIme2() {
    let ime = txtIme2.value;
    ime.replace(/\s\s+/g, ' ');
    if (!uzorakIme.test(ime)) {
        let poljeIme = document.getElementById('upozorenjeIme2');
        if (ime == "" || !ime.trim()) {
            poljeIme.innerHTML = "Niste popunili Ime";
        }
        else {
            poljeIme.innerHTML = "Pogran unos imena";
        }
        poljeIme.classList.remove('sakrij');
        return false;
    }
    if (uzorakIme.test(ime)) {
        let poljeIme = document.getElementById('upozorenjeIme2');
        poljeIme.classList.add('sakrij');
        return true;
    }
}

let txtEmail2 = document.getElementById('email2');
txtEmail2.addEventListener('blur', proveriEmail2);
function proveriEmail2(){
    let email = txtEmail2.value;
    if (!uzorakEmail.test(email)) {
        let poljeEmail = document.getElementById('upozorenjeEmail2');
        if (email == "" || !email.trim())
            poljeEmail.innerHTML = "Niste popunili email!";
        else
            poljeEmail.innerHTML = "Email nije u dobrom formatu!";

        poljeEmail.classList.remove('sakrij');
        return false;
    }
    if (uzorakEmail.test(email)) {
        let poljeEmail = document.getElementById('upozorenjeEmail2');
        poljeEmail.classList.add('sakrij');
        return true;
    }
}

