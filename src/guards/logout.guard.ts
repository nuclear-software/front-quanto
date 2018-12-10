import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
import { remove } from "tns-core-modules/application-settings";

@Injectable()
export class LogoutGuard implements CanActivate {

	constructor(private routerExtensions: RouterExtensions) {}

  	canActivate() {
        remove("current_user");
    	return true;
  	}
}