import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { TablesRoutingModule } from "./tables-routing.module";
import { TablesComponent } from "./tables.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
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
