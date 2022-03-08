    var nizMenija=[];
    var nizKategorija=[];
    var nizBrendova=[];
    var nizProizvoda=[];
    var nizPolova=[];

function prikazSocial(polje){
        let id=polje.getAttribute("data-id");
        let dugme=document.getElementById(id);
        dugme.classList.remove("hidden");
}

function sakriSocial(polje){
        let id=polje.getAttribute("data-id");
        let dugme=document.getElementById(id);
        dugme.classList.add("hidden");
}

window.onload=function(){

    if((JSON.parse(localStorage.getItem("cart")))==null){
        document.getElementById("numberOfProducts").textContent=0;
    }else{
        document.getElementById("numberOfProducts").textContent=(JSON.parse(localStorage.getItem("cart"))).length;
    }

    function dohvatanjePodataka(url, funkcijaPrikaza){
        $.ajax({
            "url":url,
            "method":"get",
            "datatype":"json",
            "success": function(data){
                funkcijaPrikaza(data)
            },
            "error": function(error){
                console.log(error);
            }
        })
        
    }
    function prikazMenija(data){
        let html=``;
        if(path=="/index.html" || path=="/"){
            data.forEach(meniStavka => {
                if(meniStavka.link=="index.html"){
                    html+=`<li class="nav-item" ><a class="nav-link" href="${meniStavka.link}" >${meniStavka.text}</a></li>`
                }else{
                    html+=`<li class="nav-item" ><a class="nav-link" href="pages/${meniStavka.link}" >${meniStavka.text}</a></li>`
                }
            });
        }else{
            data.forEach(meniStavka => {
                if(meniStavka.link=="index.html"){
                    html+=`<li class="nav-item" ><a class="nav-link" href="../${meniStavka.link}" >${meniStavka.text}</a></li>`
                }else{
                    html+=`<li class="nav-item" ><a class="nav-link" href="${meniStavka.link}" >${meniStavka.text}</a></li>`
                }
            });
        }
        html+=`<li class="nav-item" ><a class="nav-link" href="https://nenadjevtic01.github.io/portfolio/" >Author</a></li>`
        
        nizMenija=data;
        $("#meni").html(html);
    }
   

    function prikazKategorija(data){
        let html=``;
        data.forEach(kategorija=>{
            let br=0;
            html+=`<li class="filter-list"><input class="pixel-radio pixel-checkbox category" type="checkbox" id="category${kategorija.id}" name="category" value="category${kategorija.id}"><label for="${kategorija.name}"> ${kategorija.name} <span>(`
            for(var i=0;i<nizProizvoda.length;i++){
                if(nizProizvoda[i].category==kategorija.id){
                    br++;
                }
            }
            html+=br;
            html+=`)</span></label></li>`
        });
        nizKategorija=data;
        $("#kategorije").html(html);
        dohvatanjePodataka("../data/brands.json",prikazBrendova);
    }

    var dugme = document.getElementById("scrollUp");

    window.onscroll = function () {
    SkrolGore();
    };

function SkrolGore() {
    if(
        document.body.scrollTop > 350 ||
        document.documentElement.scrollTop > 350
    ){
        dugme.style.display = "block";
    } else {
        dugme.style.display = "none";
    }
}

    function prikazBrendova(data){
        let html=``;
        data.forEach(brend=>{
            let br=0;
            html+=`<li class="filter-list"><input class="pixel-radio pixel-checkbox brand" type="checkbox" id="brand${brend.id}" name="brand" value="brand${brend.id}"><label for="${brend.name}">${brend.name} <span>(`
            for(var i=0;i<nizProizvoda.length;i++){
                if(nizProizvoda[i].brand==brend.id){
                    br++;
                }
            }
            html+=br;
            html+=`)</span></label></li>`
        });
        nizBrendova=data;
        $("#brendovi").html(html);
        dohvatanjePodataka("../data/gender.json",prikazPola);
    }

    function prikazPola(data){
        html=``;
        data.forEach(pol=>{
            let br=0;
            html+=`<li class="filter-list"><input class="pixel-radio pol" type="radio" id="${pol.name}" value="pol${pol.id}" name="gender"><label for="${pol.name}"> ${pol.name} <span>(`
            for(var i=0;i<nizProizvoda.length;i++){
                if(nizProizvoda[i].gender==pol.id){
                    br++;
                }
            }
            html+=br;
            html+=`)</span></label></li>`
        })
        nizPolova=data;
        $("#gender").html(html);
        
    }

    var path=document.location.pathname;
    var broj=path.lastIndexOf("/");
    path=path.substring(broj);
    
    if(path=="/index.html" || path=="/"){
        dohvatanjePodataka("data/proizvodi.json",ispisPocetna);
        dohvatanjePodataka("data/meni.json",prikazMenija);
        dohvatanjePodataka("data/proizvodi.json",ispisPocetnaSlajder);
        $(".hero-carousel").owlCarousel({
            items:3,
            margin: 10,
            autoplay:false,
            autoplayTimeout: 5000,
            loop:true,
            nav:false,
            dots:false,
            responsive:{
              0:{
                items:1
              },
              600:{
                items: 2
              },
              810:{
                items:3
              }
            }
          });
        
    }

    function slajder(){
        if($('.owl-carousel').length > 0){
            $('#bestSellerCarousel').owlCarousel({
              loop:true,
              margin:30,
              nav:true,
              navText: ["<i class='ti-arrow-left'></i>","<i class='ti-arrow-right'></i>"],
              dots: false,
              responsive:{
                0:{
                  items:1
                },
                600:{
                  items: 2
                },
                900:{
                  items:3
                },
                1130:{
                  items:4
                }
              }
            })
          }
    }

    if(path=="/shop.html"){
        dohvatanjePodataka("../data/proizvodi.json",prikazProizvoda);
        dohvatanjePodataka("../data/categories.json",prikazKategorija);
        $("#gender").change(()=>{
            dohvatanjePodataka("../data/proizvodi.json",prikazProizvoda);
        })
        $("#brendovi").change(()=>{
            dohvatanjePodataka("../data/proizvodi.json",prikazProizvoda);
        })
        $("#sortiranje").change(()=>{
            dohvatanjePodataka("../data/proizvodi.json",prikazProizvoda);
        })
        $("#searchText").on("keyup",()=>{
            dohvatanjePodataka("../data/proizvodi.json",prikazProizvoda);
        })
        $("#kategorije").change(()=>{
            dohvatanjePodataka("../data/proizvodi.json",prikazProizvoda);
        })
        $("#dostupnost").change(()=>{
            dohvatanjePodataka("../data/proizvodi.json",prikazProizvoda);
        })
        dohvatanjePodataka("../data/proizvodi.json",ispisPopularniProizvodi);
        dohvatanjePodataka("../data/proizvodi.json",prikazDostupnosti);
    }

    if(path=="/single-product.html"){
        var params=new URLSearchParams(window.location.search);
        var proizvodID=params.get("id");
        dohvatanjePodataka("../data/proizvodi.json",prikazPojedinacnogProizvoda);
        dohvatanjePodataka("../data/proizvodi.json",ispisPopularniProizvodi);
    }

    if(path=="/cart.html"){
        dohvatanjePodataka("../data/proizvodi.json",ispisKorpa);
    }

    if(path=="/contact.html" || path=="/cart.html" || path=="/single-product.html" || path=="/shop.html" || path=="/checkout.html" || path=="/login.html" || path=="/register.html"){
        dohvatanjePodataka("../data/meni.json",prikazMenija);
    }

    if(path=="/contact.html"){
        proveraFormeContact();
    }

    if(path=="/checkout.html"){
        dohvatanjePodataka("../data/proizvodi.json",ispisProizvodaCheckout);
        proveraFormeCheckout();
    }

    if(path=="/login.html"){
        proveraFormeLogin();
    }

    if(path=="/register.html"){
        proveraFormeRegister();
    }

    function prikazProizvoda(data){
        html=``;
        data=pol(data);
        data=filtriranjeBrendova(data);
        data=naciniSortiranja(data);
        data=pretrazi(data);
        data=filtriranjeKategorija(data);
        data=dostupnost(data);
        data.forEach(proizvod=>{
            html+=`<div class="col-md-6 col-lg-4">
                <div class="card text-center card-product">
                  <div class="card-product__img ">
                    <a href="single-product.html?id=${proizvod.id}"><img class="card-img slikaProizvoda" src="../${proizvod.img.src}" alt="${proizvod.img.alt}" value=${proizvod.id} id="proizvod"></a>
                  </div>
                  <div class="card-body">
                    </br>
                    <h4 class="card-product__title"><a href="single-product.html?id=${proizvod.id}">${proizvod.name}</h4></a>`
                    
                    if(proizvod.price.oldPrice !=null){
                        html+=`<p class="card-product__price newPrice">${proizvod.price.newPrice}€</p>`
                        html+=`<p class="card-product__price strike" >${proizvod.price.oldPrice}€</p>`
                    }else{
                        html+=`<p class="card-product__price">${proizvod.price.newPrice}€</p>`
                    }
                  html+=`</div>
                </div>
              </div>`
        })

        nizProizvoda=data;
        $("select").niceSelect();
        $("#proizvodi").html(html);
    }

    function dostupnost(niz){
        var stanja=$(".stanje:checked");
        if(stanja.length==0){
            return niz;
        }else{
            var noviNiz=[];
            var status=false;
            for(var i=0;i<stanja.length;i++){
                if(stanja[i].checked){
                    if(stanja[i].value=="dostupno"){
                        status=true;
                    }
                }
            }
            for(var i=0;i<niz.length;i++){
                if(niz[i].inStock==status){
                    noviNiz.push(niz[i]);
                }
            }
            return noviNiz;
        }
    }


    function pol(niz){
        var odabraniPol=[];
        for(let i=0;i<$(".pol:checked").length;i++){
            odabraniPol.push(parseInt($(".pol:checked")[i].value.substring(3)));
        }
        if(odabraniPol.length!=0){
            return niz.filter((x)=>odabraniPol.includes(x.gender))
        }
        return niz;
    }

    function filtriranjeBrendova(niz){
        var odabraniBrendovi=[];

        for(let i=0;i<$(".brand:checked").length;i++){
            odabraniBrendovi.push(parseInt($(".brand:checked")[i].value.substring(5)));
        }
        if(odabraniBrendovi.length!=0){
            return niz.filter((x)=>odabraniBrendovi.includes(x.brand))
        }
        return niz;
    }

    function filtriranjeKategorija(niz){
        var odabraneKategorije=[];

        for(let i=0;i<$(".category:checked").length;i++){
            odabraneKategorije.push(parseInt($(".category:checked")[i].value.substring(8)));
        }
        if(odabraneKategorije.length!=0){
            return niz.filter((x)=>odabraneKategorije.includes(x.category));
        }
        return niz;
    }

    function naciniSortiranja(niz){
        var nacinSortiranja=$("#sortiranje").val();
        if(nacinSortiranja=="priceAscending"){
            return niz.sort((a,b)=>a.price.newPrice>b.price.newPrice ? 1 : -1);
        }else if(nacinSortiranja=="priceDescending"){
            return niz.sort((a,b)=>a.price.newPrice<b.price.newPrice ? 1 : -1);
        }else if(nacinSortiranja=="nameAscending"){
            return niz.sort((a,b)=>a.name>b.name ? 1 : -1);
        }else if(nacinSortiranja=="nameDescending"){
            return niz.sort((a,b)=>a.name<b.name ? 1 : -1);
        }else{
            return niz;
        }
    }

    function pretrazi(niz){
        let uneto= $("#searchText").val();
        if(uneto.trim()==""){
            return niz;
        }else{
            return niz.filter((x)=>{
                if(x.name.toLowerCase().indexOf(uneto.toLowerCase().trim())!=-1)
                    return x;
            })
        } 
        
    }

    function prikazPojedinacnogProizvoda(niz){
        let html=``;
        let htmlTabela=``;
        for(let i=0;i<niz.length;i++){
            if(niz[i].id==proizvodID){
                html+=`<div class="row s_product_inner proizvodMargin">
				<div class="col-lg-6">
					<div>
						<div class="single-prd-item">
							<img class="img-fluid col-md-12" src="../${niz[i].img.src}" alt="${niz[i].img.alt}">
						</div>
					</div>
				</div>
				<div class="col-lg-5 offset-lg-1">
					<div class="s_product_text jedanProizvod">
						<h3>${niz[i].name}</h3>`
                        if(niz[i].price.oldPrice!=null){
                            html+=`<h2 class="newPrice">${niz[i].price.newPrice}$</h2>`
                            html+=`<h4 class="strike">${niz[i].price.oldPrice}$</h4>`
                        }else{
                            html+=`<h2>${niz[i].price.newPrice}$</h2>`
                        }
						html+=`<ul class="list">
							<li><span>Category</span> : ${kategorijaProizvoda(niz[i].category)}</li>
							<li><span>Availibility</span> : ${(niz[i].inStock ? "In Stock" : "Unavailable")}</li>
						</ul>`
                            if(niz[i].availableSizes!=null){
                                html+=`<p>Available sizes: </br>`
                                for(let j=0;j<niz[i].availableSizes.length;j++){
                                        html+=`<input type="radio" class="pixel-radio size" name="size" value="${niz[i].availableSizes[j]}" id="${niz[i].name+niz[i].availableSizes[j]}"><label for="${niz[i].name+niz[i].availableSizes[j]}">${niz[i].availableSizes[j]}</label>`
                                        html+=`</br>`
                                    }
                                    html+=`<h6 class="hidden crveno" id="izaberiVelicinu">SELECT SIZE</h6>`
                                if(niz[i].gender==1){
                                    html+=`<a class="underlined" href="../img/Size guide for Men.png" target="_blank"><span>Size guide</span></a>`
                                }else{
                                    html+=`<a class="underlined" href="../img/Size guide for Women.png" target="_blank"><span>Size guide</span></a>`
                                }
                                html+=`</p>`
                                html+=`<div class="product_count">
                                <label for="qty">Quantity:</label>
                                                <input type="number" name="qty" id="qty" size="2" maxlength="12" value="1" min=1 max=99 title="Quantity:" class="input-text qty">
                                                <a class="button primary-btn addToCart" data-id="${niz[i].id}" href="javascript:void(0)">Add to Cart</a> 
                                                <h6 class="hidden crveno" id="izaberiKolicinu">INVALID QUANTITY</h6>            
                                          </div>`
                            }else{
                                html+=`<p>No sizes available</p>`
                                html+=`<h3>Product unavailable</h3>`
                            }
						
                            html+=`</div>
                            </div>
                        </div>`
            $("#naslovProizvoda").html(niz[i].id+" - "+niz[i].name)
                            htmlTabela+=`<table class="table">
							<tbody>
								<tr>
									<td>
										<h5>Material</h5>
									</td>
									<td>
										<h5>${niz[i].specs.material}</h5>
									</td>
								</tr>
								<tr>
									<td>
										<h5>Country of origin</h5>
									</td>
									<td>
										<h5>${niz[i].specs.COO}</h5>
									</td>
								</tr>
							</tbody>
						</table>`
            }
            $("#tabelaSpecs").html(htmlTabela);
        }
        $("#jedanProizvod").html(html);
        $(".addToCart").on("click", dodajUkorpu);
    }

    function ispisPopularniProizvodi(niz){
        html=``;
        var brojac=0;
        for(let i=0;i<3;i++){
            let br=0;
            html+=`<div class="col-sm-12 col-xl-4 mb-5 mb-xl-0">`
            html+=`<div class="single-search-product-wrapper">`
                for(let j=brojac;j<niz.length;j++){
                    if(niz[j].sale){
                        html+=`<div class="single-search-product d-flex">
                        <a href="single-product.html?id=${niz[j].id}"><img class="image-fluid" src="../${niz[j].img.src}" alt="${niz[j].img.alt}"></a>
                        <div class="desc">
                            <a href="single-product.html?id=${niz[j].id}" class="title">${niz[j].name}</a></br>
                            <div class="price">${niz[j].price.newPrice}$</div>
                        </div>
                      </div>`
                      br++;
                      brojac=brojac+4;
                      if(br==3){break;}
                    }
                }

            html+=`</div>`
            html+=`</div>`
        }


        $("#popularniProizvodi").html(html);
    }


    function prikazDostupnosti(niz){
        let br=0;
        let br1=0;
        for(let i=0;i<niz.length;i++){
            if(niz[i].inStock){
                br++;
            }else{
                br1++;
            }
        }
        document.getElementById("dostupnoText").textContent="Available ("+br+")";
        document.getElementById("nedostupnoText").textContent="Unavailable ("+br1+")";
    }

    

    function dodajUkorpu(){
        var idProizvoda=$(this).data("id");
        var velicina=checkSizeSelected();
        var kolicina=checkQuantity();
        var products=[];
        var korpa=JSON.parse(localStorage.getItem("cart"));
        if(kolicina && velicina){
            if(korpa){
                if(productExist()){
                    updateQuantity();
                }else{
                    korpa.push({
                        id:idProizvoda,
                        size:velicina,
                        qty:parseInt(kolicina)
                    });
                    localStorage.setItem("cart",JSON.stringify(korpa));
                }
            }else{
                products[0]={
                    id:idProizvoda,
                    size:velicina,
                    qty:parseInt(kolicina)
                }
                localStorage.setItem("cart",JSON.stringify(products));
                document.getElementById("numberOfProducts").textContent=1;
            }
        }

        if(korpa!=null){  
            document.getElementById("numberOfProducts").textContent=korpa.length;
        }
        
        function productExist(){
            return korpa.filter(x=>x.id==idProizvoda && x.size==velicina).length;
        }
    
        function updateQuantity(){
            let korpa=JSON.parse(localStorage.getItem("cart"));
    
            for(let i=0;i<korpa.length;i++){
                if(korpa[i].id==idProizvoda && korpa[i].size==velicina){
                    korpa[i].qty=parseInt(korpa[i].qty)+parseInt(kolicina);
                    break;
                }
            }
            localStorage.setItem("cart",JSON.stringify(korpa));
        }
         
    }


    function checkSizeSelected(){
        if($(".size:checked").length!=0){
            for(let i=0;i<($(".size").length);i++){
                if($(".size:checked")){  
                    if(!document.getElementById("izaberiVelicinu").classList.contains("hidden")){
                        document.getElementById("izaberiVelicinu").classList.add("hidden");
                    }
                    return ($(".size:checked").val());
                }
            }
            
        }else{
            document.getElementById("izaberiVelicinu").classList.remove("hidden");
            return false;
        }
    }

    function checkQuantity(){
        let kolicina=document.getElementById("qty").value;
        if(kolicina<1 || kolicina>99){
            document.getElementById("izaberiKolicinu").classList.remove("hidden");
            return false;
        }else{
            document.getElementById("izaberiKolicinu").classList.add("hidden");
            return kolicina;
        }
    }

    

    function ispisPocetna(niz){
        let html=``;
        let br=0;
        for(let i=0;i<niz.length;i++){
            if(niz[i].sale){
                br++;
                html+=`<div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card text-center card-product">
                  <div class="card-product__img">
                    <a href="pages/single-product.html?id=${niz[i].id}">
                    <img class="card-img" src="${niz[i].img.src}" alt="${niz[i].img.alt}">
                    </a>
                  </div>
                  <div class="card-body">
                    <p>${kategorijaProizvoda(niz[i].category)}</p>
                    <h4 class="card-product__title"><a href="pages/single-product.html?id=${niz[i].id}">${niz[i].name}</a></h4>`
                if(niz[i].price.oldPrice!=null){
                    html+=`<p class="card-product__price newPrice">${niz[i].price.newPrice}$ - SALE</p>`
                }else{
                    html+=`<p class="card-product__price">${niz[i].price.newPrice}$</p>`
                }
                  html+=`</div>
                </div>
              </div>`
              if(br==8){
                  break;
              }
            }
        }
        $("#proizvodiPrvaStrana").html(html);
    }

    function kategorijaProizvoda(id){
        switch(id){
            case 1: return "Shirts"; break;
            case 2: return "Jeans"; break;
            case 3: return "Jumpers"; break;
            case 4: return "Jackets"; break;
            case 5: return "Dress"; break;
            case 6: return "Skirts"; break;
            case 7: return "Shorts"; break;
        }
    }
    

    function ispisKorpa(niz){
        let korpa=JSON.parse(localStorage.getItem("cart"));
        let suma=0;
    let html=``;
        if(korpa){
            for(var i=0;i<korpa.length;i++){
                for(var j=0;j<niz.length;j++){
                    if(niz[j].id==korpa[i].id){
                        if(i==0){
                            suma+=korpa[i].qty*niz[j].price.newPrice;
                            html+=`<div class="row p-5 korpaItem prviRedKorpa">
                        <div class="col-sm-6 col-md-4 col-lg-2 centar">
                            <img class="malaSlikaKorpa" src="../${niz[j].img.src}" alt="${niz[j].img.alt}"/></br>
                        </div>
                        <div class="col-sm-6 col-md-4 col-lg-2 centar">
                            <h5><a href="single-product.html?id=${niz[j].id}">${niz[j].name}</a></h5>
                        </div>
                        <div class="col-sm-6 col-md-4 col-lg-2 centar">
                            <span>Quantity: </span>
                            <button class="btn-plus" type="button" value="${korpa[i].id},${korpa[i].size},${korpa[i].qty}" name="btnQty"><img src="../img/plus.svg" alt="Plus svg"/></button>
                            <input class="kolicinaKorpa" type="number" value="${korpa[i].qty}" max="99" min="0" >
                            <button class="btn-minus" type="button" value="${korpa[i].id},${korpa[i].size},${korpa[i].qty}" name="btnQty"><img src="../img/minus.svg" alt="Minus svg"/></button>
                        </div>
                        <div class="col-sm-6 col-md-4 col-lg-2 centar"><span>Selected size: ${korpa[i].size}</span></div>
                        <div class="col-sm-6 col-md-4 col-lg-2 centar"><span>Total price: ${korpa[i].qty*niz[j].price.newPrice}$</span></div>
                        <div class="col-sm-6 col-md-4 col-lg-2 centar">
                            <button class="removeItem button primary-btn" type="button" value="${korpa[i].id},${korpa[i].size},${korpa[i].qty}">Remove</button>
                        </div>
                        </div>`
                            break;
                        }
                        suma+=korpa[i].qty*niz[j].price.newPrice;
                        html+=`<div class="row p-5 korpaItem">
                        <div class="col-sm-6 col-md-4 col-lg-2 centar"><img class="malaSlikaKorpa" src="../${niz[j].img.src}" alt="${niz[j].img.alt}"/></div>
                        <div class="col-sm-6 col-md-4 col-lg-2 centar"><h5><a href="single-product.html?id=${niz[j].id}">${niz[j].name}</a></h5></div>
                        <div class="col-sm-6 col-md-4 col-lg-2 centar">
                        <span>Quantity:</span>
                        <button class="btn-plus" type="button" value="${korpa[i].id},${korpa[i].size},${korpa[i].qty}" name="btnQty"><img src="../img/plus.svg" alt="Plus svg"/></button>
                        <input class="kolicinaKorpa" type="number" value="${korpa[i].qty}" max="99" min="0" />
                        <button class="btn-minus" type="button" value="${korpa[i].id},${korpa[i].size},${korpa[i].qty}" name="btnQty"><img src="../img/minus.svg" alt="Minus svg"/></button>
                        </div>
                        <div class="col-sm-6 col-md-4 col-lg-2 centar"><span>Selected size: ${korpa[i].size}</span></div>
                        <div class="col-sm-6 col-md-4 col-lg-2 centar"><span>Total price: ${korpa[i].qty*niz[j].price.newPrice}$</span></div>
                        <div class="col-sm-6 col-md-4 col-lg-2 centar">
                            <button class="removeItem button primary-btn" type="button" value="${korpa[i].id},${korpa[i].size},${korpa[i].qty}">Remove</button>
                        </div>
                        </div>`
                        break;
                    }
                }
            }
            html+=`<div class="row p-5 korpaItem">
            <div class="col-sm-6 col-md-4 col-lg-2"></div>
            <div class="col-sm-6 col-md-4 col-lg-2"></div>
            <div class="col-sm-6 col-md-4 col-lg-2"></div>
            <div class="col-sm-6 col-md-4 col-lg-2 centar"><a href="checkout.html" class="button primary-btn">Checkout</a></div>
            <div class="col-sm-6 col-md-4 col-lg-2 centar"><h5>Subtotal:</h5></div>
            <div class="col-sm-6 col-md-4 col-lg-2 centar"><h5>${suma}$</h5></div>
            </div>`
        }else{
            html+=`
            <div class="col-12" style="display:flex;align-items:center;flex-direction:column">
            <h3>Cart is empty</h3>
            <a class="button button-header" href="shop.html">Buy Now</a>
            </div>`
        }

        $("#prikazKorpe").html(html);
        $(".removeItem").on("click",UkloniProizvod);
        $(".btn-plus").on("click",dodajQty);
        $(".btn-minus").on("click",smanjiQty);
    }

function dodajQty(){
    let dugme=$(this).val();
    dugme=dugme.split(",");
    let korpa=JSON.parse(localStorage.getItem("cart"));
    if(dugme[2]==99){
        return;
    }else{
        for(let i=0;i<korpa.length;i++){
            if(korpa[i].id==dugme[0] && korpa[i].size==dugme[1] && korpa[i].qty==dugme[2]){
                korpa[i].qty=korpa[i].qty+1;
            }
        }
    }
    localStorage.setItem("cart",JSON.stringify(korpa));
    dohvatanjePodataka("../data/proizvodi.json",ispisKorpa);
}

function smanjiQty(){
    let dugme=$(this).val();
    dugme=dugme.split(",");
    let korpa=JSON.parse(localStorage.getItem("cart"));
    if(dugme[2]==1){
        for(let i=0;i<korpa.length;i++){
            if(korpa[i].id==dugme[0] && korpa[i].size==dugme[1] && korpa[i].qty==dugme[2]){
                    korpa.splice(i,1);
            }
        }
        if(korpa.length==0){
            localStorage.removeItem("cart");
        }else{
            localStorage.setItem("cart",JSON.stringify(korpa));
        }
        document.getElementById("numberOfProducts").textContent=korpa.length;
        dohvatanjePodataka("../data/proizvodi.json",ispisKorpa);
    }else{
        for(let i=0;i<korpa.length;i++){
            if(korpa[i].id==dugme[0] && korpa[i].size==dugme[1] && korpa[i].qty==dugme[2]){
                korpa[i].qty=korpa[i].qty-1;
            }
        }
        localStorage.setItem("cart",JSON.stringify(korpa));
        dohvatanjePodataka("../data/proizvodi.json",ispisKorpa);
    }
}

function UkloniProizvod(){
    let dugme=$(this).val();
    dugme=dugme.split(",");
    let dugmad=document.getElementsByClassName("removeItem").length;
    if(dugmad!=1){
        let korpa=JSON.parse(localStorage.getItem("cart"));
        for(let i=0;i<korpa.length;i++){
            if(korpa[i].id==parseInt(dugme[0]) && korpa[i].size==dugme[1] && korpa[i].qty==parseInt(dugme[2])){
                korpa.splice(i,1);
            }
        }
        document.getElementById("numberOfProducts").textContent=korpa.length;
        localStorage.setItem("cart",JSON.stringify(korpa));
        dohvatanjePodataka("../data/proizvodi.json",ispisKorpa);
    }else{
        let korpa=JSON.parse(localStorage.getItem("cart"));
        for(let i=0;i<korpa.length;i++){
            if(korpa[i].id==parseInt(dugme[0]) && korpa[i].size==dugme[1] && korpa[i].qty==parseInt(dugme[2])){
                korpa.splice(i,1);
            }
        }
        document.getElementById("numberOfProducts").textContent=0;
        localStorage.removeItem("cart");
        dohvatanjePodataka("../data/proizvodi.json",ispisKorpa);
    }
}
    
function ispisPocetnaSlajder(niz){
    html=``;

    for(let i=0;i<niz.length;i++){
        if(niz[i].inStock && niz[i].sale){
            html+=`<div class="card text-center card-product">
            <div class="card-product__img">
                <a href="pages/single-product.html?id=${niz[i].id}">
                    <img class="img-fluid" src="${niz[i].img.src}" alt="${niz[i].img.alt}"/>
                </a>
            </div>
            <div class="card-body">
              <p>${kategorijaProizvoda(niz[i].category)}</p>
              <h4 class="card-product__title"><a href="pages/single-product.html?id=${niz[i].id}">${niz[i].name}</a></h4>
              <p class="card-product__price">${niz[i].price.newPrice}$</p>
            </div>
          </div>`
        }
    }

    $("#bestSellerCarousel").html(html);
    slajder();
}

function proveraFormeContact(){
    let dugme=document.getElementById("form-submit");
    dugme.addEventListener("click",()=>{
    let m1 = proveriIme();
    let m2= proveriEmail();
    let subject=document.getElementById("subject").value;
    let txt=document.getElementById("message").value;

    if(subject !="" && txt != "" && proveriIme() && proveriEmail()){
        document.getElementById("upozorenjeTema").classList.add("hidden");
        document.getElementById("upozorenjeText").classList.add("hidden");
        dugme.style.backgroundColor="green";
        dugme.style.color="white";
        dugme.innerText="Message sent"
    }
    if (txt == "") {
        document.getElementById("upozorenjeText").style.color="Red";
        document.getElementById("upozorenjeText").classList.remove("hidden");
    }else if (txt != "") {
        document.getElementById("upozorenjeText").classList.add("hidden");
    }
    if (subject == "") {
        document.getElementById("upozorenjeTema").style.color="Red";
        document.getElementById("upozorenjeTema").classList.remove("hidden");
    }else if (subject != "") {
        document.getElementById("upozorenjeTema").classList.add("hidden");
    }
    if (!proveraIme()) {
        proveriIme();
    }
    if(!proveriEmail()){
        proveriEmail();
    }
    });
}

function proveraFormeCheckout(){
    let dugme=document.getElementById("submitBtn");
    dugme.addEventListener("click",()=>{
        proveriIme();
        proveriEmail();
        proveriTelefon();
        proveriAdresu();
        proveriGrad();
        proveraZipKoda();
        proveraCheckBox();
        let combo=document.getElementById("CountrySelect");
        let selectedCountry=combo.value;
        if (selectedCountry == "") {
            document.getElementById("upozorenjeZemlja").classList.remove("hidden");
          } else {
            document.getElementById("upozorenjeZemlja").classList.add("hidden");
          }
        
          if(selectedCountry!="" && proveriIme() && proveriEmail() && proveriTelefon() && proveriAdresu() && proveriGrad() && proveraZipKoda() && proveraCheckBox()){
            document.getElementById("submitBtn").style.backgroundColor="green";
            document.getElementById("submitBtn").style.color="white";
            document.getElementById("submitBtn").innerText="Order sent!";
          }
    })

}

function proveriIme() {
        let uzorakIme= /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,15}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,15})?(\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,20})\s*$/;
        let ime = document.getElementById("name").value;
        ime.replace(/\s\s+/g, " ");
        if (!uzorakIme.test(ime)) {
        let poljeIme = document.getElementById("upozorenjeIme");
        if (ime == "" || !ime.trim()) {
            poljeIme.innerHTML = "Enter your name and last name!";
        } else {
            poljeIme.innerHTML = "Invalid name format!";
        }
        poljeIme.style.color="red";
        poljeIme.classList.remove("hidden");
        return false;
        }
        if (uzorakIme.test(ime)) {
        let poljeIme = document.getElementById("upozorenjeIme");
        poljeIme.classList.add("hidden");
        return true;
        }
  }

  function proveriEmail() {
        let uzorakEmail=/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
        let email = document.getElementById("email").value;
        if (!uzorakEmail.test(email)) {
        let poljeEmail = document.getElementById("upozorenjeEmail");
        if (email == "" || !email.trim())
            poljeEmail.innerHTML = "Enter email!";
        else poljeEmail.innerHTML = "Invalid email format!";
        poljeEmail.style.color="red";
        poljeEmail.classList.remove("hidden");
        return false;
        }
        if (uzorakEmail.test(email)) {
        let poljeEmail = document.getElementById("upozorenjeEmail");
        poljeEmail.classList.add("hidden");
        return true;
        }
  }

  function proveriTelefon() {
        let uzorakTelefon = /^\+(?:[0-9] ?){6,14}[0-9]$/;
        let telefon = document.getElementById("number").value;
        if (!uzorakTelefon.test(telefon)) {
        let poljeTelefon = document.getElementById("upozorenjeTelefon");
        if (telefon == "" || !telefon.trim())
            poljeTelefon.innerHTML = "Enter phone number";
        else poljeTelefon.innerHTML = "Invalid phone number format!";
        poljeTelefon.style.color="red";
        poljeTelefon.classList.remove("hidden");
        return false;
        }
        if (uzorakTelefon.test(telefon)) {
        let poljeTelefon = document.getElementById("upozorenjeTelefon");
        poljeTelefon.classList.add("hidden");
        return true;
        }
  }

  function proveriAdresu(){
        let uzorakAdrese= /[a-zA-Z0-9\s]+(\.)? [a-zA-Z]+ (\d{1,})/;
        let adresa=document.getElementById("address").value;
        if (!uzorakAdrese.test(adresa)) {
            let poljeAdresa = document.getElementById("upozorenjeAdresa");
            if (adresa == "" || !adresa.trim())
            poljeAdresa.innerHTML = "Enter your address";
            else poljeAdresa.innerHTML = "Invalid address format!";
            poljeAdresa.style.color="red";
            poljeAdresa.classList.remove("hidden");
            return false;
        }
        if (uzorakAdrese.test(adresa)) {
            let poljeAdresa = document.getElementById("upozorenjeAdresa");
            poljeAdresa.classList.add("hidden");
            return true;
        }
  }

  function proveriGrad(){
        let uzorakGrad=/^[a-zA-Z\u0080-\u024F]+(?:[\s-][a-zA-Z\u0080-\u024F]+)*$/
        let grad=document.getElementById("city").value;
        if (!uzorakGrad.test(grad)) {
            let poljeGrad = document.getElementById("upozorenjeGrad");
            if (grad == "" || !grad.trim())
            poljeGrad.innerHTML = "Enter city name";
            else poljeGrad.innerHTML = "Invalid city name!";
            poljeGrad.style.color="red";
            poljeGrad.classList.remove("hidden");
            return false;
        }
        if (uzorakGrad.test(grad)) {
            let poljeGrad = document.getElementById("upozorenjeGrad");
            poljeGrad.classList.add("hidden");
            return true;
        }
  }

  function proveraZipKoda(){
        let uzorakZipKoda=/^\d{5}$/;
        let postanskiBroj=$("#zip").val();
        if (!uzorakZipKoda.test(postanskiBroj)) {
            let poljeZip = document.getElementById("upozorenjePostanskiBroj");
            if (postanskiBroj == "" || !postanskiBroj.trim())
            poljeZip.innerHTML = "Enter postcode/ZIP!";
            else poljeZip.innerHTML = "Invalid postcode/ZIP!";
            poljeZip.style.color="red";
            poljeZip.classList.remove("hidden");
            return false;
        }
        if (uzorakZipKoda.test(postanskiBroj)) {
            let poljeZip = document.getElementById("upozorenjePostanskiBroj");
            poljeZip.classList.add("hidden");
            return true;
        }
  }

  function proveraCheckBox(){
      let dugme=document.getElementById("f-option4");
      if(dugme.checked==false){
          document.getElementById("linkCheckbox").style.color="red";
          return false;
      }else{
        document.getElementById("linkCheckbox").style.color="green";
        return true;
      }
  }

  function ispisProizvodaCheckout(niz){
      let korpa=JSON.parse(localStorage.getItem("cart"));
      let html=`<li style="border-bottom:1px solid #000"><a href="cart.html"><h4>Product <span>Total</span></h4></a></li>`;
      let suma=0;

      for(let i=0;i<korpa.length;i++){
          for(let j=0;j<niz.length;j++){
              if(korpa[i].id==niz[j].id){
                suma+=(korpa[i].qty * niz[j].price.newPrice);
                html+=`<li class="checkoutProizvodi"><a href="single-product.html?id=${korpa[i].id}">${niz[j].name} <span class="last"><span class="kolicinaKorpa">x ${korpa[i].qty}</span> &nbsp;&nbsp;&nbsp; ${korpa[i].qty * niz[j].price.newPrice}$</span></a></li>`
                break;
            }
          }
      }

      $("#listaProizvodaCheckout").html(html);

        html=`<hr>`;
        html+=  `<li><a href="javascript:void(0)">Subtotal <span>${suma}$</a></li>
                <li><a href="javascript:void(0)">Shipping <span>Flat rate: 50.00$</span></a></li>
                <li><a href="javascript:void(0)" class="pointer">Total <span>${suma+50}$</span></a></li>`
        $("#cenaCheckout").html(html);
    }

    function proveraFormeLogin(){
        let dugme=document.getElementById("btnLogIn");
        dugme.addEventListener("click", ()=>{
            proveriUsername();
            proveriPassword();
            if(proveriUsername() && proveriPassword()){
                dugme.style.backgroundColor="green";
                dugme.style.color="white";
                dugme.innerText="Login successfully"
            }
        })
    }

    function proveriUsername(){
        let uzorakUsername=/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
        let username=$("#username").val();
        if (!uzorakUsername.test(username)) {
            let poljeUsername = document.getElementById("upozorenjeUsername");
            if (username == "" || !username.trim())
            poljeUsername.innerHTML = "Enter username";
            else poljeUsername.innerHTML = "Invalid username format!";
            poljeUsername.style.color="red";
            poljeUsername.classList.remove("hidden");
            return false;
        }
        if (uzorakUsername.test(username)){
            let poljeUsername = document.getElementById("upozorenjeUsername");
            poljeUsername.classList.add("hidden");
            return true;
        }
    }

    function proveriPassword(){
        let uzorakPassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let password=$("#password").val();
        if (!uzorakPassword.test(password)) {
            let poljePassword = document.getElementById("upozorenjePassword");
            if (password == "" || !password.trim())
            poljePassword.innerHTML = "Enter password";
            else poljePassword.innerHTML = "Min 8 characters, at least 1 upper case and 1 number!";
            poljePassword.style.color="red";
            poljePassword.classList.remove("hidden");
            return false;
        }
        if (uzorakPassword.test(password)){
            let poljePassword = document.getElementById("upozorenjePassword");
            poljePassword.classList.add("hidden");
            return true;
        }
    }

    function proveriPassword2(){
        let uzorakPassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let password=$("#confirmPassword").val();
        if (!uzorakPassword.test(password)) {
            let poljePassword = document.getElementById("upozorenjePassword2");
            if (password == "" || !password.trim())
            poljePassword.innerHTML = "Re-enter password";
            else poljePassword.innerHTML = "Min 8 characters, at least 1 upper case and 1 number!";
            poljePassword.style.color="red";
            poljePassword.classList.remove("hidden");
            return false;
        }
        if (uzorakPassword.test(password)){
            let poljePassword = document.getElementById("upozorenjePassword2");
            poljePassword.classList.add("hidden");
            return true;
        }
    }

    function uporediPassword(){
        let password2=$("#confirmPassword").val();
        let password=$("#password").val();

        if(password!=password2){
            alert("Passwords doesn't match!");
            return false;
        }else{
            return true;
        }
    }

    function proveraFormeRegister(){
        let dugme=document.getElementById("btnRegister");
        dugme.addEventListener("click", ()=>{
            proveriUsername();
            proveriEmail();
            proveriPassword();
            proveriPassword2();
            if(proveriPassword() && proveriPassword2()){
                uporediPassword();
            }

            if(proveriUsername() && proveriEmail() && proveriPassword && proveriPassword2 && uporediPassword()){
                dugme.style.color="white";
                dugme.style.backgroundColor="green";
                dugme.innerText="Registration successfully"
            }
        })
    }
    
}