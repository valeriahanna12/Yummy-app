$(document).ready(function () {
    $('#loading').fadeOut(1000,function()
    {
        $('body').css('overflow', 'visible');
    });
});
/**********************************************************************/
$('.navbar .rightSide .menu').click(function(){
    let linksBoxWidth=$('.leftSide').outerWidth();
        $('.leftSide').animate({'left':0},500)
        $('.rightSide').animate({'left':linksBoxWidth},500)
        $('.close').removeClass('d-none');
        $('.menu').fadeOut(0);
})

$('.navbar .rightSide .close').click(function (){
    let linksBoxWidth=$('.leftSide').outerWidth();
        $('.leftSide').animate({'left':-linksBoxWidth},500)
        $('.rightSide').animate({'left':'0'},500)
        $('.close').addClass('d-none');
        $('.menu').fadeIn(0);       
})
/*********************************************************************/
let allMeals = []; 
async function getRecipes( name=''){
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let meals = await responce.json();
    allMeals = meals.meals
    displayMeals();
}
getRecipes();
function displayMeals()
{
    let cartona = '';
    for (var i=0 ; i<allMeals.length ; i++){
        cartona+=
        `
            <div class='col-lg-3 col-md-4 col-sm-6 p-3 meals'>
                <div class='meal position-relative'>
                    <img class='w-100 meal-img' src="${allMeals[i].strMealThumb}">
                    <div onclick=gotoMeal("${allMeals[i].idMeal}") class='px-3 layer d-flex justify-content-start'>
                        <h3 class=' d-flex align-items-center'>${allMeals[i].strMeal}</h3>
                    </div>
                </div>
            </div>       
        `
    }
    document.querySelector('.meals').innerHTML = cartona;
}
let recipe=[];
async function gotoMeal(id){
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let recipeOfMeal = await responce.json();
    recipe = recipeOfMeal.meals;
    let items = '';
    for(let i=0 ; i<recipe.length ; i++){
        items +=`
            <div class='col-md-4 '>
            <div class='imgOfMeal'>
                <img class=' w-100' src="${recipe[i].strMealThumb}">
                <h4 class='meal-name '>${recipe[i].strMeal}</h4>
            </div>
        </div>
        <div class='col-md-8 text-start'>
            <div class='captionOfMeal d-flex flex-column'>
                <h3 class=' text-white'>Instructions</h3>
                <p class='pb-2 text-white'>${recipe[i].strInstructions}</p>
                <h5 class=' text-white fw-bold '>Area : <span class=' fw-light'>${recipe[i].strArea}</span></h5>
                <h5 class=' text-white fw-bold '>Category : <span class=' fw-light'>${recipe[i].strCategory}</span></h5>
                <h3 class=' text-white'>Recipes :</h3>
                <div class=' text-white d-flex flex-wrap '>
                    <span class='ingredients-of-meal '> ${recipe[i].strMeasure1}${recipe[i].strIngredient1}</span>
                    <span class='ingredients-of-meal '> ${recipe[i].strMeasure2}${recipe[i].strIngredient2}</span>
                    <span class='ingredients-of-meal '> ${recipe[i].strMeasure3}${recipe[i].strIngredient3}</span>
                    <span class='ingredients-of-meal '> ${recipe[i].strMeasure4}${recipe[i].strIngredient4}</span>
                    <span class='ingredients-of-meal '> ${recipe[i].strMeasure5}${recipe[i].strIngredient5}</span>  
                </div>
                <h3 class=' text-white'>Tags :</h3>
                <span class='tag'>${recipe[i].strTags}</span>

                <div class=' d-flex justify-content-start py-5'>
                    <a target=_blank href=${recipe[i].strSource}  class=' btn btn-success me-2 '>Source</a>
                    <a target=_blank href=${recipe[i].strYoutube} class='btn btn-danger'>Youtub</a>
                </div>  
            </div>
        </div>
        `
    }
    document.querySelector('.meals').innerHTML = items;
}
/*********************************************************************/
$('#search').click(function () {
    $('.contact').addClass('d-none');
    let linksBoxWidth=$('.leftSide').outerWidth();
        $('.leftSide').animate({'left':-linksBoxWidth},500)
        $('.rightSide').animate({'left':'0'},500)
        $('.close').addClass('d-none');
        $('.menu').fadeIn(0); 
        $('.search').removeClass('d-none');
        $('.main').addClass('d-none');
        let nameSearch = document.querySelector('#nameSearch');
        let letterSearch = document.querySelector('#letterSearch');
        
        $(nameSearch).keyup(function () {
            getRecipes(nameSearch.value);
            $('.main').removeClass('d-none')  
        });


        $(letterSearch).keyup(function(e){
            if(e.keyCode < 65 || e.keyCode > 90 || e.key == 'q' || e.key == 'u' || e.key == 'x' || e.key == 'z' || e.key == 'Q' || e.key == 'U' || e.key == 'X' || e.key == 'Z'){
                $('.main').addClass('d-none');
            }
            else{
                searchByFirstLetter(letterSearch.value);
                $('.main').removeClass('d-none');
            }
        })
})
let test=[];
async function searchByFirstLetter(letter='a'){
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let meals = await responce.json();
    test = meals.meals;
    displayTestMeal();
}
function displayTestMeal (){
    let cartona8='';
    for(let i = 0 ; i < test.length ; i++){
        cartona8+=
        `
            <div class=' col-md-4 col-sm-6 meals mb-3'>
                <div class=' meal position-relative' onclick=gotoMeal("${test[i].idMeal}")>
                    <img class='w-100 meal-img' src='${test[i].strMealThumb}'>
                    <div class=' px-3 layer d-flex justify-content-start align-items-center'>
                        <h3>${test[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
        document.querySelector('.meals').innerHTML = cartona8;

    }
}
/*********************************************************************/
$('#category').click(function () {
    $('.main').removeClass('d-none');
    $('.search').addClass('d-none');
    $('.contact').addClass('d-none');
    let linksBoxWidth=$('.leftSide').outerWidth();
        $('.leftSide').animate({'left':-linksBoxWidth},500)
        $('.rightSide').animate({'left':'0'},500)
        $('.close').addClass('d-none');
        $('.menu').fadeIn(0); 
    let allCategories =[];
    async function getCategoryMeals(){
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let recibeOfCategory = await responce.json();
        allCategories = recibeOfCategory.categories;  
        displayCategory();   
    }
    getCategoryMeals();
    function displayCategory(){
        let cartona2='';
        for(let i=0 ; i<allCategories.length ; i++){
            cartona2+=`
                <div class='col-lg-3 col-md-4 categories'>
                    <div class=' category position-relative my-5' onclick=gotoFilterCategory("${allCategories[i].strCategory}")>
                        <img class='w-100 category-img' src="${allCategories[i].strCategoryThumb}">
                        <div class='px-3 layer text-center'>
                            <h3 class=' pt-2'>${allCategories[i].strCategory}</h3>
                            <P>${allCategories[i].strCategoryDescription}</P>
                        </div>
                    </div>
                </div>
            `
        }
        document.querySelector('.meals').innerHTML=cartona2;
    }
})

let allFilterCategory=[];
async function gotoFilterCategory(strCategory){
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`);
    let filterCategory =await responce.json();
    allFilterCategory=filterCategory.meals;
    let cartona3='';
    for(let i=0 ; i<allFilterCategory.length ; i++){
        cartona3+=`
            <div class='col-lg-3 col-md-4 filterMeals'>
                <div class='one-meal position-relative my-5'>
                    <img class='w-100 imgOfOneMeal' src="${allFilterCategory[i].strMealThumb}">
                    <div onclick=gotoMeal("${allFilterCategory[i].idMeal}") class='px-3 layer text-center'>
                        <h3 class=' pt-2'>${allFilterCategory[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    }
    document.querySelector('.meals').innerHTML=cartona3;
}
/*********************************************************************/
$('#area').click(function () {
    $('.main').removeClass('d-none');
    $('.search').addClass('d-none');
    $('.contact').addClass('d-none');
    let linksBoxWidth=$('.leftSide').outerWidth();
        $('.leftSide').animate({'left':-linksBoxWidth},500)
        $('.rightSide').animate({'left':'0'},500)
        $('.close').addClass('d-none');
        $('.menu').fadeIn(0); 
    let allFilterArea =[];
    async function getMealOfArea(){
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let filterByArea = await responce.json();
        allFilterArea = filterByArea.meals;  
        displayArea();   
    }
    getMealOfArea();
    function displayArea(){
        let cartona4='';
        for(let i=0 ; i<allFilterArea.length ; i++){
            cartona4+=`
                <div class='col-lg-3 col-md-4 areas'>
                    <div class=' area position-relative my-5' onclick=gotoMealOfArea("${allFilterArea[i].strArea}")>
                        <i class="fa-solid fa-city area-icon"></i>
                        <div class='px-3 layer text-center'>
                            <h3 class='city fw-light text-white pt-2'>${allFilterArea[i].strArea}</h3>
                        </div>
                    </div>
                </div>
            `
        }
        document.querySelector('.meals').innerHTML=cartona4;
    }
})
let allFilterMealArea=[];
async function gotoMealOfArea(strArea){
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`);
    let filterMealArea =await responce.json();
    allFilterMealArea=filterMealArea.meals;
    let cartona5='';
    for(let i=0 ; i<allFilterMealArea.length ; i++){
        cartona5+=`
            <div class='col-lg-3 col-md-4 filterMeals'>
                <div class='one-meal position-relative my-5'>
                    <img class='w-100 imgOfOneMeal' src="${allFilterMealArea[i].strMealThumb}">
                    <div onclick=gotoMeal("${allFilterMealArea[i].idMeal}") class='px-3 layer text-center'>
                        <h3 class=' pt-2'>${allFilterMealArea[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    }
    document.querySelector('.meals').innerHTML=cartona5;
}
/*********************************************************************/
$('#ingredients').click(function () {
    $('.main').removeClass('d-none');
    $('.search').addClass('d-none');
    $('.contact').addClass('d-none');
    let linksBoxWidth=$('.leftSide').outerWidth();
        $('.leftSide').animate({'left':-linksBoxWidth},500)
        $('.rightSide').animate({'left':'0'},500)
        $('.close').addClass('d-none');
        $('.menu').fadeIn(0); 
    let allFilteringredients =[];
    async function getMealOfIngredients(){
        let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let filterByIngredients = await responce.json();
        allFilteringredients = filterByIngredients.meals;  
        displayIngredients();   
    }
    getMealOfIngredients();
function displayIngredients(){
    let cartona6='';
    for(let i=0 ; i<10 ; i++){
        cartona6+=
        `
            <div class='col-lg-3 col-md-4 Ingredients'>
                <div class=' Ingredient position-relative my-5' onclick=gotoMealOfIngredient("${allFilteringredients[i].strIngredient}")>
                        <i class="fa-solid fa-bowl-food Ingredient-icon"></i>
                        <div class='px-3 layer text-center'>
                        <h3 class='fw-light text-white pt-2 name-of-ingredient'>${allFilteringredients[i].strIngredient}</h3>
                        <p class=' text-white prag-of-ingredient'>${allFilteringredients[i].strDescription}</p>
                    </div>
                </div>
            </div>
        `
        }
    document.querySelector('.meals').innerHTML=cartona6;
    }
})
let allFilterMealIngredient=[];
async function gotoMealOfIngredient(strIngredient){
    let responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`);
    let filterMealIngredient =await responce.json();
    allFilterMealIngredient=filterMealIngredient.meals;
    let cartona7='';
    for(let i=0 ; i<allFilterMealIngredient.length ; i++){
        cartona7+=`
            <div class='col-lg-3 col-md-4 filterMeals'>
                <div class='one-meal position-relative my-5'>
                    <img class='w-100 imgOfOneMeal' src="${allFilterMealIngredient[i].strMealThumb}">
                    <div onclick=gotoMeal("${allFilterMealIngredient[i].idMeal}") class='px-3 layer text-center'>
                        <h3 class=' pt-2'>${allFilterMealIngredient[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
    }
    document.querySelector('.meals').innerHTML=cartona7;
}
/********************************************************************/
// $('#contact').click(function () { 
//     $('.main').removeClass('d-none');
//     $('.search').addClass('d-none');
//     let linksBoxWidth=$('.leftSide').outerWidth();
//         $('.leftSide').animate({'left':-linksBoxWidth},500)
//         $('.rightSide').animate({'left':'0'},500)
//         $('.close').addClass('d-none');
//         $('.menu').fadeIn(0); 
//     $('.contact').removeClass('d-none');
//     $('.main , .search').addClass('d-none');
    
//     var nameInput = document.getElementById('nameInput');
//     var emailInput = document.getElementById('emailInput');
//     var numberInput = document.getElementById('numberInput');
//     var ageInput = document.getElementById('ageInput');
//     var passwordInput = document.getElementById('passwordInput');
//     var rePasswordInput = document.getElementById('rePasswordInput');
//     var submitBtn = document.querySelector('.submitBtn')

//     var nameAlert = document.querySelector('.nameAlert');
//     var emailAlert = document.querySelector('.emailAlert');
//     var numberAlert = document.querySelector('.numberAlert');
//     var ageAlert = document.querySelector('.ageAlert');
//     var passwordAlert = document.querySelector('.passwordAlert');
//     var rePasswordAlert = document.querySelector('.rePasswordAlert');
    
//     var rejexForName = /^[A-Z][a-z-( )*]{2,15}$/
//     var rejexForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
//     var rejexForNumber = /^[0][0-9]{10}$/
//     var rejexForAge = /^[1-9][0-9]$/
//     var rejexForPassword =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

//     function enableBtn()
//     {
//         if(rejexForName.test(nameInput.value) && rejexForEmail.test(emailInput.value) && rejexForNumber.test(numberInput.value) && rejexForAge.test(ageInput.value) && rejexForPassword.test(passwordInput.value) && (rePasswordInput.value == passwordInput.value))
//         {
//             submitBtn.removeAttribute('disabled')
//         } 
//     }
    
//     nameInput.onkeyup = function()
//     {
//         enableBtn()
//         if(rejexForName.test(nameInput.value))  
//         {
//             nameInput.classList.add('is-valid');
//             nameInput.classList.remove('is-invalid');
//             nameAlert.classList.add('d-none');
            
//         }
//         else                                        
//         {
//             nameInput.classList.add('is-invalid');
//             nameInput.classList.remove('is-valid');
//             nameAlert.classList.remove('d-none');
            
//         }
//     }
    
//     emailInput.onkeyup = function()
//     {
//         enableBtn()
//         if(rejexForEmail.test(emailInput.value))  
//         {
//             emailInput.classList.add('is-valid');
//             emailInput.classList.remove('is-invalid');
//             emailAlert.classList.add('d-none');
            
//         }
//         else                                        
//         {
//             emailInput.classList.add('is-invalid');
//             emailInput.classList.remove('is-valid');
//             emailAlert.classList.remove('d-none');
            
//         }
//     }
    
//     numberInput.onkeyup = function()
//     {
//         enableBtn()
//         if(rejexForNumber.test(numberInput.value))  
//         {
//             numberInput.classList.add('is-valid');
//             numberInput.classList.remove('is-invalid');
//             numberAlert.classList.add('d-none');
            
//         }
//         else                                        
//         {
//             numberInput.classList.add('is-invalid');
//             numberInput.classList.remove('is-valid');
//             numberAlert.classList.remove('d-none');
            
//         }
//     }  
    
//     ageInput.onkeyup = function()
//     {
//         enableBtn()
//         if(rejexForAge.test(ageInput.value))  
//         {
//             ageInput.classList.add('is-valid');
//             ageInput.classList.remove('is-invalid');
//             ageAlert.classList.add('d-none');
            
//         }
//         else                                        
//         {
//             ageInput.classList.add('is-invalid');
//             ageInput.classList.remove('is-valid');
//             ageAlert.classList.remove('d-none');
            
//         }
//     }

//     passwordInput.onkeyup = function()
//     {
//         enableBtn()
//         if(rejexForPassword.test(passwordInput.value))  
//         {
//             passwordInput.classList.add('is-valid');
//             passwordInput.classList.remove('is-invalid');
//             passwordAlert.classList.add('d-none');
            
//         }
//         else                                        
//         {
//             passwordInput.classList.add('is-invalid');
//             passwordInput.classList.remove('is-valid');
//             passwordAlert.classList.remove('d-none');
            
//         }
//     }

//     rePasswordInput.onkeyup = function()
//     {
//         enableBtn()
//         if(rePasswordInput.value == passwordInput.value)  
//         {
//             rePasswordInput.classList.add('is-valid');
//             rePasswordInput.classList.remove('is-invalid');
//             rePasswordAlert.classList.add('d-none');
            
//         }
//         else                                        
//         {
//             rePasswordInput.classList.add('is-invalid');
//             rePasswordInput.classList.remove('is-valid');
//             rePasswordAlert.classList.remove('d-none');
            
//         }
//     }
// })

