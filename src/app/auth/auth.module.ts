import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { AuthGuard } from "~/guards/auth.guard";
import { LogoutGuard } from "~/guards/logout.guard";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AuthRoutingModule,
        NativeScriptUIDataFormModule,
        NativeScriptLocalizeModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AuthComponent
    ],
    providers:[
        AuthGuard, LogoutGuard
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthModule { }
