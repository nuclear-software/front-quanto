import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
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
