import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
import { getString } from "tns-core-modules/application-settings";

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private routerExtensions: RouterExtensions) {}

  	canActivate() {  		
        let current_user= getString('current_user',null);
        console.dir(JSON.parse(current_user));
  		if (current_user) {
  			this.routerExtensions.navigate(["/home"]);
  		}
    	//this.routerExtensions.navigate(["/login"]);
    	return true;
  	}
}