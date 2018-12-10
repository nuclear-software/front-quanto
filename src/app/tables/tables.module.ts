import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

import { TablesRoutingModule } from "./tables-routing.module";
import { TablesComponent } from "./tables.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIDataFormModule,
        TablesRoutingModule
    ],
    declarations: [
        TablesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TablesModule { }
