import { Component, OnInit, ViewChild } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { localize } from "nativescript-localize";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { setString } from "tns-core-modules/application-settings";
import { AuthService } from "./auth.service";
import { RouterExtensions } from "nativescript-angular/router";
import User from '~/models/User';

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "auth", loadChildren: "./auth/auth.module#AuthModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Auth",
    moduleId: module.id,
    templateUrl: "./auth.component.html",
    providers: [AuthService]
})
export class AuthComponent implements OnInit {
    
    @ViewChild("myForm") dataFormComp: RadDataFormComponent;
    public login: Login;
    public loginMetadata = {
        "isReadOnly": false,
        "commitMode": "Immediate",
        "validationMode": "Immediate",
        "propertyAnnotations": [
            {
                "name": "email",
                "displayName": localize("uid"),
                "index": 0,
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
                "index": 1,
                "editor": "Password",
                "validators": [
                    { "name": "NonEmpty" },
                    { "name": "MinimumLength", "params": { "length": 6 } }
                ]
            }
        ]
    };

    constructor(private page: Page, private authService:AuthService, private routerExtensions: RouterExtensions) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.login = new Login('', '');
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }

    async onSigninButtonTap(){
        this.dataFormComp.dataForm.isReadOnly= true;
        const isValid = await this.dataFormComp.dataForm.validateAndCommitAll();

        if(isValid){
            let user = await User.findOneOrFail({ where: { email: this.login.email, password: this.login.password } }).then((response)=>{
                console.dir(response);
                setString('current_user', JSON.stringify(response));
                this.routerExtensions.navigate(["/home"]);
            }).catch((error)=>{
                console.error(error);
                this.dataFormComp.dataForm.isReadOnly= false;
            });
            // this.authService.login(this.login).then( (response) => {
            //     console.dir(response);
            //     setString('current_user', JSON.stringify(response));
            //     this.routerExtensions.navigate(["/home"]);
            // }).catch((error)=>{
            //     console.error(error);
            //     this.dataFormComp.dataForm.isReadOnly= false;
            // });
        }else{
            this.dataFormComp.dataForm.isReadOnly= false;
        }
    }

    onForgotPasswordTap(): void {

    }
}

export class Login {
    public email: string;
    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
