
const canvas = document.getElementById('canvas');

const ctx = canvas.getContext("2d");
/** @type {CanvasRenderingContext2D} */


ctx.canvas.width = 1000;
ctx.canvas.height = 600;
canvas.width = 1000;
canvas.height = 600;
if(window.innerWidth < 800){
  ctx.canvas.width = 400;
  ctx.canvas.width = 600;
}


class TheSnake{
  constructor(){
    this.score = 0;
    this.size = 20;
    this.len = 5;
    this.body = [];
    this.speed = 180;
    this.Direction = "LEFT";
    this.DirectionAxis = {UP:"UP", RIGHT:"RIGHT", DOWN:"DOWN", LEFT:"LEFT"};
    this.food = {
      pos:{x:0, y:0},
      showFood:false,
    };
    this.GameOn = true;

    this.Animate();
    window.requestAnimationFrame(this.DrawSnake);

    window.addEventListener("keypress",(e)=>{
      
      if(e.key == "W" || e.key == "w"){
        if(this.Direction == "DOWN"){
          return;
        }
        this.Direction = this.DirectionAxis.UP;
      }else if(e.key == "D" || e.key == "d"){
        if(this.Direction == "LEFT"){
          return;
        }
        this.Direction = this.DirectionAxis.RIGHT;
      }else if(e.key == "S" || e.key == "s"){
        if(this.Direction == "UP"){
          return;
        }
        this.Direction = this.DirectionAxis.DOWN;
      }else if(e.key == "A" || e.key == "a"){
        if(this.Direction == "RIGHT"){
          return;
        }
        this.Direction = this.DirectionAxis.LEFT;
      }else{
        return
      };
    });

    this.ShowScore = document.getElementById("score");
    


  };

  InitSnake = ()=>{
    let prop = {x:(((ctx.canvas.width / this.size) / 2) * this.size), y:(((ctx.canvas.height / this.size) / 2) * this.size)};
    for(let i = 0; i < this.len; i++){
      this.body.push({x:prop.x, y:prop.y});
      prop.x += this.size;
    };
  };

  Animate =()=>{
    this.InitSnake();
    let timer = setInterval(()=>{
      this.CheckBodyTouch();
      if(!this.GameOn){
        clearInterval(timer);
        
        if(confirm("Do you want to restart the game !")){
          window.location.reload();
        };
        return;
      }
      this.DrawFood();
      this.Update();
      this.EatFood();
    }, this.speed);
  };

  Update = ()=>{
    let Axis = {x:this.body[0].x, y:this.body[0].y};
    switch(this.Direction){
      case "UP":
        if(Axis.y <= 0){
          Axis.y = ctx.canvas.height - this.size;
          break;
        };
        Axis.y -= this.size;
        break;
      case "RIGHT":
        if(Axis.x >= ctx.canvas.width - this.size){
          Axis.x = 0;
          break;
        };
        Axis.x += this.size;
        break;
      case "DOWN":
        if(Axis.y >= ctx.canvas.height - this.size){
          Axis.y = 0;
          break;
        };
        Axis.y += this.size;
        break;
      case "LEFT":
        if(Axis.x <= 0){
          Axis.x = ctx.canvas.width - this.size;
          break;
        };
        Axis.x -= this.size;
        break;
      default:
        Axis.x -= this.size;
        break;
    };
    this.body.unshift({x:Axis.x, y:Axis.y});
    this.body.pop();
  };

  DrawFood = ()=>{
    if(this.food.showFood == false){
      this.food.pos.x = Math.floor(Math.random() * (ctx.canvas.width / this.size)) * this.size;
      this.food.pos.y = Math.floor(Math.random() * (ctx.canvas.height / this.size)) * this.size;
      this.food.showFood = true;
    };
  };

  DrawSnake = ()=>{
    ctx.fillStyle = "rgba(0, 204, 102, 0.4)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    for(let j =0; j < this.len; j++){
      ctx.fillRect(this.body[j].x, this.body[j].y, this.size, this.size);
    };
    if(this.food.showFood){
      ctx.fillStyle = "red";
      ctx.fillRect(this.food.pos.x, this.food.pos.y, this.size, this.size);
    };

    window.requestAnimationFrame(this.DrawSnake);
  }

  EatFood = () =>{
    if((this.body[0].x >= this.food.pos.x && this.body[0].x <= this.food.pos.x) && (this.body[0].y >= this.food.pos.y && this.body[0].y <= this.food.pos.y)){
      this.len += 1;
      this.score +=1;
      if(this.speed >= 30){
        this.speed -= 0.3;
      };
      this.ShowScore.innerText = "Score : " + this.score;
      this.food.showFood = false;
      this.InitSnake();
    };
  };

  CheckBodyTouch = ()=>{
    for(let m = 1; m < this.len; m++){
      if((this.body[0].x >= this.body[m].x && this.body[0].x <= this.body[m].x) && (this.body[0].y >= this.body[m].y && this.body[0].y <= this.body[m].y)){
        this.GameOn = false;
      };
    };
  };



}

let mm = new TheSnake;


