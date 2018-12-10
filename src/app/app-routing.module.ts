import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/auth", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
    { path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule" },
    { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },
    { path: "register", loadChildren: "./register/register.module#RegisterModule" },
    { path: "products", loadChildren: "./products/products.module#ProductsModule" },
    { path: "tables", loadChildren: "./tables/tables.module#TablesModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
