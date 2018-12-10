import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AuthComponent } from "./auth.component";
import { AuthGuard } from "~/guards/auth.guard";
import { LogoutGuard } from "~/guards/logout.guard";

const routes: Routes = [
    { path: "", component: AuthComponent, canActivate:[AuthGuard]},
    { path: "logout", component: AuthComponent, canActivate: [LogoutGuard] },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AuthRoutingModule { }
