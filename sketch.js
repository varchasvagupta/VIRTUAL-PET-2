var dog,dogImg,happyDog,database,foodS,foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
   dogImg=loadImage("images/dogImg.png");
   happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000, 700);

  foodObj = new Food();

  dog=createSprite(800,220,150,150);
  dog.addImage(dogImg)
  dog.scale=0.15

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46,139,87);

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255);
  txtSize(20);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + "PM", 350, 30);
 }else if(lastFed == 0){
   text("Last Fed : 12 AM" ,350,30);
 }else{
   text("Last Fed : " + lastFes +"AM",350,30);
 }

 foodObj.display();
 drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
  Food: foodObj.getFoodStock(),
    feedTime: hour()
  })
}

function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
}



