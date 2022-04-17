import { Component } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculator';
  newEquation:Boolean = false;
  result:string = "0";

  operations:string[] = ['+','-','*','/'];


  numClicked(num:string){

    if(this.result === '0'|| (this.newEquation&& !this.operations.includes(num))){
      this.result= "";
    }

    if(num ==='.' && !this.validateDot()){
      return;
    }else{
     
      this.result = this.result.concat(num);
    }
    this.newEquation = false;
  }

  private  validateDot():Boolean{

    var arr = ['\\\+','\\\-','\\\*','/'];
    var reg = new RegExp(arr.join('|'),'g');
    var equationParts = this.result.split(reg);
    var lastSegment = equationParts[equationParts.length-1];
    console.log(lastSegment);
    
    if(lastSegment.includes('.')){
      return false
    }
    
    return true;
  }

  clearScreen():void{
    this.result = '0';
  }

  performCalculation():void {
    this.result = eval(this.result).toString();
    this.newEquation = true;
  }

  isDotDisabled():Boolean{
    return !this.validateDot();
  }
}
