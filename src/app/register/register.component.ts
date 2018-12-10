import { Component, OnInit, ViewChild } from "@angular/core";
import { localize } from "nativescript-localize";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { RegisterService } from "./register.service";
import { RouterExtensions } from "nativescript-angular/router";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "register", loadChildren: "./register/register.module#RegisterModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Register",
    moduleId: module.id,
    templateUrl: "./register.component.html",
    providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
    
    @ViewChild("myForm") dataFormComp: RadDataFormComponent;
    public register: Register;
    public registerMetadata = {
        "isReadOnly": false,
        "commitMode": "Immediate",
        "validationMode": "Immediate",
        "propertyAnnotations": [
            {
                "name": "name",
                "displayName": localize("username"),
                "index": 0,
                "editor": "Text",
                "validators": [
                    { "name": "NonEmpty" }, 
                    { "name": "MaximumLength", "params": { "length": 191 } }
                ]
            },
            {
                "name": "phone",
                "displayName": localize("phone"),
                "index": 1,
                "editor": "Phone",
                "validators": [
                    { "name": "NonEmpty" },
                    { "name": "PhoneValidator" },
                    { "name": "MaximumLength", "params": { "length": 191 } }
                ]
            },
            {
                "name": "email",
                "displayName": localize("uid"),
                "index": 2,
                "editor": "Email",
                "validators": [
                    { "name": "NonEmpty" },
                    { "name": "EmailValidator" },
                    { "name": "MaximumLength", "params": { "length": 191 } }
                ]
            },
            {
                "name": "password",
                "displayName": localize("password"),
                "index": 3,
                "editor": "Password",
                "validators": [
                    { "name": "NonEmpty" },
                    { "name": "MinimumLength", "params": { "length": 6 } }
                ]
            }
        ]
    };

    constructor(private registerService:RegisterService, private routerExtensions:RouterExtensions) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        this.register = new Register('', '','','');
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    async onSignupButtonTap(){
        this.dataFormComp.dataForm.isReadOnly= true;
        const isValid = await this.dataFormComp.dataForm.validateAndCommitAll();

        if(isValid){
            this.registerService.register(this.register).then( (response) => {
                console.dir(response);
                this.routerExtensions.navigate(["/auth"]);
            }).catch((error)=>{
                console.error(error);
                this.dataFormComp.dataForm.isReadOnly= false;
            });
        }else{
            this.dataFormComp.dataForm.isReadOnly= false;
        }
    }
}

export class Register {
    public name: string;
    public phone: string;
    public email: string;
    public password: string;

    constructor(name:string, phone:string, email: string, password: string) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}
