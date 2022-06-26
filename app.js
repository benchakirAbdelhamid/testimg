const Access_Key = `9VLgVsvIPbEgvJR-liIN0t9jRPAYXTPqdffPEeb2wHc`
const Secret_key = `iJ_e7tEIr0BDoTw2zjqtzyaKbpvApNV4OFloG1raPRY`

const my_nbr_images = 10
let count = 0

const parent_collection = document.getElementById('parentCollection');

const collections = [
    'animal','car','People','model man',
    'hacking' ,'security',
    'sport','historic','3D Renders','Wallpapers',
    'Business Work','Fashion','Textures & Patterns    ',
    'Experimental','Architecture','Nature',
    'Athletics','Arts & Culture','Spirituality ','Animals','Travel',
    'Street Photography','Interiors','Health & Wellness','Food & Drink  ',
    ,'Experimental    ','Editorial    ','programming' ,'site web',
    'marocco' ,'gaming' ,'action','design','style'


];

function load(divv_parent_loading,situation){
    const img_load = document.querySelector('img[alt="loading"]')
    const parent_img_load =  document.createElement('span')
    parent_img_load.appendChild(img_load)
    if(situation === 'true'){
        img_load.style.display = "block";
    } else {
        img_load.style.display = "none";
    }
    divv_parent_loading.appendChild(parent_img_load)
}
// load(document.body,'false')
// load(document.body,'true')





function create_img(id,url_full,url_small,alt,parent,callback_overlay){
    const image  = document.createElement('img')
    image.setAttribute('id',  id ) 
    image.setAttribute('data-urlFull',url_full) 
    image.setAttribute('onclick',callback_overlay) 
    image.style.height = '160px'
    image.src = url_small
    image.alt = alt
    parent.appendChild(image)

}


for(let c in collections) {


    const xhttp = new XMLHttpRequest()
    function sendReauest(myAccess_Key,collection,nbr_images){
    xhttp.open("GET" ,
     `https://api.unsplash.com/search/photos/?query=${collection}&per_page=${nbr_images}&client_id=${myAccess_Key}`,
      true )
     xhttp.send()
     }      
     sendReauest(Access_Key,collections[c],my_nbr_images)
     

     xhttp.onreadystatechange = function () {

         if (this.readyState === 4 && this.status === 200) {
             data = JSON.parse(this.responseText);
        // console.log(  collections[c]  , data  )

           parent_collection.innerHTML += `
           <section id="${collections[c]}">
               <h1 class="title">${collections[c]}</h1>
               <article id="article_images${collections[c]}" >  </article>
           </section>`;

           const article_images_parent = document.getElementById(`article_images${collections[c]}`)

           for(let x in data.results) {
            count += 1
            // console.log(count)

            create_img(`id_${count}`, data.results[x].urls.full, data.results[x].urls.small ,data.results[x].description,article_images_parent,`overlay('${count}')` ) 
            } 

            load(document.body,'false')  

        }else{
            load(document.body,'true')
            
        }
    }

}


    
// icon ferme 
const iconclose = document.querySelector('svg')
iconclose.style.display = 'none'

function overlay(count){

    
    const img = document.querySelector(`#id_${count}`)
    // console.log(img)
    console.log(count)



    let popupBox = document.createElement("div")
    popupBox.className = 'popup-box1'
    let imgHeading = document.createElement("h3")
    let imgText = document.createTextNode(img.alt)
    imgHeading.appendChild(imgText)
    popupBox.appendChild(imgHeading)







    let parent_popupBox = document.createElement("div")
    parent_popupBox.className = 'parent_popupBox'
    let pupopImage = document.createElement("img")
    pupopImage.className = 'img_pupop'
    
    pupopImage.src = img.getAttribute('data-urlFull')
    popupBox.appendChild(pupopImage)
    parent_popupBox.appendChild(popupBox)


        // icon previouse  <==
        const icon_previeu = document.createElement('img')
        icon_previeu.src = 'previe.svg'
        icon_previeu.setAttribute('class','icon_switch_prev') 
        icon_previeu.setAttribute('onclick' , `previo('${count}')` ) 
        parent_popupBox.appendChild(icon_previeu)
    
    
         // icon next ==>
        const icon_next = document.createElement('img')
        icon_next.src = 'next.svg'
        icon_next.setAttribute('class','icon_switch_next') 
        icon_next.setAttribute('onclick' , `nexto('  ${   count}')` ) 
        parent_popupBox.appendChild(icon_next)




    document.body.appendChild(parent_popupBox)

    iconclose.style.display = 'block'
    document.body.appendChild(iconclose)






document.addEventListener("click" , function(e){
    if( e.target.className == 'parent_popupBox'  ){
        document.querySelector(".popup-box1").remove()
        document.querySelector(".parent_popupBox").remove()
        iconclose.style.display = 'none'
        n_icon_p = 0
        n_icon_n = 0
        n = 0
        p = 0
    }
})
iconclose.addEventListener('click',function(){
    document.querySelector(".popup-box1").remove()
    document.querySelector(".parent_popupBox").remove()
    iconclose.style.display = 'none'
    n_icon_p = 0
    n_icon_n = 0
    n = 0
     p = 0

})

}


let n_icon_n = 0
function nexto(n){
n_icon_n += 1

// console.log( parseFloat(n) + n_icon_n)
// console.log(n)

const img = document.querySelector(`#id_${ parseFloat(n) + n_icon_n  }`)

const f = document.querySelector(".parent_popupBox .popup-box1 .img_pupop")
const title_popup_box = document.querySelector(".parent_popupBox .popup-box1 h3")
title_popup_box.innerHTML = img.alt
f.src = img.src
f.alt = img.alt
}

function previo(p){
n_icon_n -= 1

// console.log( parseFloat(p) + n_icon_n)
const imgg = document.querySelector(`#id_${  parseFloat(p) + n_icon_n   }`)

const ff = document.querySelector(".parent_popupBox .popup-box1 .img_pupop")

const title_popup_box = document.querySelector(".parent_popupBox .popup-box1 h3")
title_popup_box.innerHTML = imgg.alt

ff.src = imgg.src
ff.alt = imgg.alt


if( parseFloat(p) + n_icon_n === 1){
    alert( " Can't this is the first picture  ")

}

}  
