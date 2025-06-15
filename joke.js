const joke_Api = "https://v2.jokeapi.dev/joke/";
// categories Any, Misc, Programming, Dark, Pun, Spooky, Christmas, Miscellaneous, Coding, Development, Halloween
var btn = document.querySelectorAll(".btn");

var img_bl = document.querySelector("#funImg2_btm_lt>img");
var img_br = document.querySelector("#funImg1>img");
let flag = false;

document.addEventListener('DOMContentLoaded', ()=>{
    img_bl.style.bottom = "0%";
    img_br.style.right = "1%";
    img_br.style.bottom = "1%";
})

async function getJoke(ctg="programming"){
    document.querySelector("#loader").style.display = "block";
   await fetch(joke_Api+ctg).then(async function(res){
    if(res.ok){
        flag = true;
    var jokeApi = res;
    var apiData = await jokeApi.json();
    if(flag){
        document.querySelector("#middleImg").style.top = "10%";
        document.querySelector("#middleImg").style.opacity = "1";
        // document.querySelector("#middleImg").style.scale = "1";
        // document.querySelector("#middleImg1").style.right = "calc(width*50)";
    }
    console.log(apiData);
    let responseDiv = document.querySelector("#response");
    responseDiv.style.opacity = "1";
    let jokeType = apiData.type;
    if(jokeType=="single"){
        document.querySelector("#single>h1").innerText = apiData.joke;  
        document.querySelector("#twoPart").style.display = "none";
        document.querySelector("#single").style.display = "block";
    }
    else if(jokeType=="twopart"){
        document.querySelector("#single").style.display = "none";
        document.querySelector("#twoPart").style.display = "flex";
        document.querySelector("#setup").innerText = apiData.setup;
        document.querySelector("#delivery").innerText = apiData.delivery;
    }
    document.querySelector("#loader").style.display = "none";
    }
    });        
    
}

btn.forEach(function(elem){
    elem.addEventListener("click",(elem2)=>{
        // console.log(elem2.target);
        if(elem2.target.id == "dark"){
            document.querySelector("#response").style.opacity = "0";
            document.querySelector("#alert").style.opacity = "1";
            let yesDiv = document.querySelector("#yes");
            let noDiv = document.querySelector("#no");
            yesDiv.addEventListener("click",()=>{
            document.querySelector("#alert").style.opacity = "0";
                getJoke(elem2.target.id);
            })
            noDiv.addEventListener("click",()=>{
                document.querySelector("#noDiv").style.opacity = "1";
                yesDiv.style.display = "none";
                btn.forEach((elem3)=>{
                    elem3.addEventListener("click",(btnEvent)=>{
                        getJoke(btnEvent.target.id);
                        document.querySelector("#alert").style.opacity = "0";              
                    })
                })
            })
        }
        else{
            getJoke(elem2.target.id);
        }
    })
})

