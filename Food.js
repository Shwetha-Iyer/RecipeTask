var app_id = "5517ab91";
var app_key = "9b4d00d63b0c3c216c41950116d73b6a";
function createTag(element,elementClass="",elementID=""){
    var tag = document.createElement(element);
    if(elementClass !== "")
    tag.setAttribute("class",elementClass);
    if(elementID !== "")
    tag.setAttribute("id",elementID);
    return tag;
}

var container1 = createTag("div","container");
var roww1 = createTag("div","row");
var colheading = createTag("div","col-12 text-center");
var heading = createTag("span");
heading.setAttribute("style","color:green;font-size:50px;font-family:cursive;font-style:italic;");
heading.innerHTML = "&nbsp;&nbsp;Recipe Search <hr>";

colheading.append(heading);
roww1.append(colheading);
container1.append(roww1);

var container2 = createTag("div","container");
var roww2 = createTag("div","row");
var colsearch = createTag("div","col-12");
colsearch.setAttribute("style","width:80%;margin-left:auto;margin-right:auto;");
var form = createTag("form","","myform");
var formdiv = createTag("div");
var label = createTag("label","form-label");
label.setAttribute("for","query");
label.innerHTML = "What shall we cook today";
var input = createTag("input","form-control","query");
input.setAttribute("type","text");
var button = createTag("button","btn btn-success");
button.setAttribute("type","button");
button.setAttribute("style","margin-top:20px;");
button.addEventListener("click",callapi);
button.innerHTML = "Search";

formdiv.append(label,input,button);
form.append(formdiv);
colsearch.append(form);
roww2.append(colsearch);
container2.append(roww2);
document.body.append(container1,container2);


async function callapi(){
    var query = document.getElementById("query").value;
    try{
        var resp = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}&from=0&to=50`);
        var data = await resp.json();
        document.body.innerHTML = "";
        var container3 = createTag("div","container");
        container3.innerHTML = `<hr> <h3>Here are some of the recipes for ${query}...</h3> <br> <br>`;
    var row = createTag("div","row");
        for(var i=0;i<data.hits.length;i++){
            var col = createTag("div","col-md-12");
            var card = createTag("div","card border-dark");
            card.setAttribute("style","margin-top:10px;");
            var row1 = createTag("div","row");
            var col1 = createTag("div","col-4");
            var img = createTag("img");
            img.setAttribute("src",data.hits[i].recipe.image);
            img.setAttribute("width","100%");
            img.setAttribute("height","200px");
            col1.append(img);
            var col2 = createTag("div","col-8");
            var cardtitle = createTag("h3","card-title");
            cardtitle.innerHTML = data.hits[i].recipe.label;
            // var meal = createTag("h5","text-muted");
            // meal.setAttribute("style","padding-top:7px;")
            // meal.innerHTML = `Meal Type: ${data.hits[i].recipe.mealType.join(" ")}`;
            var cal = createTag("h5");
            cal.setAttribute("style","padding-top:7px;")
            cal.innerHTML = `Calories: ${(data.hits[i].recipe.calories).toFixed(2)}`;
            var url = createTag("a","card-link");
            url.setAttribute("style","padding-top:10px;")
            url.setAttribute("src",data.hits[i].recipe.url);
            url.innerHTML = "Click here to read the full recipe";
            col2.append(cardtitle,cal,url);
            row1.append(col1,col2);
            //========================================
            var row2 = createTag("div","row border-dark");
            var col3 = createTag("div","col-md-5");
            var uul1 = createTag("ul","list-group list-group-flush");
            var lli1 = createTag("li","list-group-item");
            var ingre = createTag("h6");
            ingre.innerHTML = "Ingredient Lines";
            var lli2 = createTag("li","list-group-item");
            var igp = createTag("p");
            igp.innerHTML = data.hits[i].recipe.ingredientLines.join("\n");
            lli1.append(ingre);
            lli2.append(igp);
            uul1.append(lli1,lli2);
            col3.append(uul1);
            var col4 = createTag("div","col-md-3");
            var uul2 = createTag("ul","list-group list-group-flush");
            var lli3 = createTag("li","list-group-item");
            var healthtitle = createTag("h6");
            healthtitle.innerHTML= "Tags";
            var lli4 = createTag("li","list-group-item");
            var health = createTag("p");
            health.innerHTML = data.hits[i].recipe.healthLabels.join(" ");
            lli3.append(healthtitle);
            lli4.append(health);
            uul2.append(lli3,lli4);
            col4.append(uul2);
            var col5 =createTag("div","col-md-4");
            var uul3 = createTag("ul","list-group list-group-flush");
            var lli5 = createTag("li","list-group-item");
            var vita = createTag("h6");
            vita.innerHTML = "Vitamins";
            var lli6 = createTag("li","list-group-item");
            var vitamins = createTag("ul");
            vitamins.setAttribute("type","square");
            var li1 = createTag("li");
            li1.innerHTML = `Vitamin A: ${(data.hits[i].recipe.totalNutrients.VITA_RAE.quantity).toFixed(2)}&nbsp; ${data.hits[i].recipe.totalNutrients.VITA_RAE.unit}`;
            var li2 = createTag("li");
            li2.innerHTML =`Vitamin B12: ${(data.hits[i].recipe.totalNutrients.VITB12.quantity).toFixed(2)}&nbsp; ${data.hits[i].recipe.totalNutrients.VITB12.unit}`;
            var li3 = createTag("li");
            li3.innerHTML =`Vitamin C: ${(data.hits[i].recipe.totalNutrients.VITC.quantity).toFixed(2)}&nbsp; ${data.hits[i].recipe.totalNutrients.VITC.unit}`;
            var li4 = createTag("li");
            li4.innerHTML =`Vitamin D: ${(data.hits[i].recipe.totalNutrients.VITD.quantity).toFixed(2)}&nbsp; ${data.hits[i].recipe.totalNutrients.VITD.unit}`;
            var li5 = createTag("li");
            li5.innerHTML =`Vitamin E: ${(data.hits[i].recipe.totalNutrients.TOCPHA.quantity).toFixed(2)}&nbsp; ${data.hits[i].recipe.totalNutrients.TOCPHA.unit}`;
            vitamins.append(li1,li2,li3,li4,li5);
            lli5.append(vita);
            lli6.append(vitamins);
            uul3.append(lli5,lli6);
            col5.append(uul3);
            
            row2.append(col3,col4,col5);
            card.append(row1,row2);
            col.append(card);
            row.append(col);
            container3.append(row);
            //document.getElementById("myform").reset();
            document.body.append(container1,container2,container3);
        }
        
    }
    catch(error){
        console.log(error);
    }
}

