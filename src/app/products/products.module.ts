import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIDataFormModule,
        ProductsRoutingModule
    ],
    declarations: [
        ProductsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProductsModule { }
