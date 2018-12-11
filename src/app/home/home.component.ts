import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import User from '~/models/User';
import Company from '~/models/Company';
import Account from '~/models/Account';
import { getString } from "tns-core-modules/application-settings";
import * as dialogs from "tns-core-modules/ui/dialogs";
import CompanyTable from '~/models/CompanyTable';
import Product from '~/models/Product';
import ProductReference from '~/models/ProductReference';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    @ViewChild("myForm") dataFormComp: RadDataFormComponent;
    public products: Array<Product>;
    public user: User;
    public company: Company;
    public companyTables: Array<CompanyTable>;
    public accounts: Array<Account>;
    public account: Account;
    public productReferences: Array<ProductReference>;
    public mode:string;
    public barTitle:string;
    public showAdd:boolean;
    public recibido:number;

    constructor() {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    async ngOnInit(){

        this.mode='retrive';
        this.barTitle='Cuentas';
        this.showAdd= true;
        //this.recibido=0;
        this.productReferences=[];
        this.products = await Product.find();
        this.refresh();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }    

    async refresh() {

        await User.findOne({
            where:{
                id: JSON.parse(getString('current_user')).id
            }, 
            relations: [
                "company",
                "company.companyTables",
                "company.companyTables.accounts",
                "company.companyTables.accounts.productReferences",
                "company.companyTables.accounts.companyTable",
                "company.companyTables.accounts.productReferences.product",
            ]
        }).then((user)=>{
            this.user= user;
            this.companyTables= user.company.companyTables;
            this.accounts=[];
            this.companyTables=[];
            user.company.companyTables.forEach((companyTable)=>{
                if(companyTable.available){
                    this.companyTables.push(companyTable);
                }
                companyTable.accounts.forEach((account)=>{
                    this.accounts.push(account);
                });
            });
            console.dir(user);
            console.log(this.accounts);
        }).catch((error)=>{
            console.error(error);
        });
    }

    add() {
        this.changeMode('create');
    }

    async edit(account:Account){
        this.barTitle= account.companyTable.name;
        this.showAdd= false;
        this.account= account;
        this.productReferences= account.productReferences;
        this.changeMode('update');
    }

    remove(account:Account){

        console.dir(account);
        dialogs.confirm({
            title: "Confirmación de borrado",
            message: "Seguro desea borrar el registro del la cuenta en la mesa: "+ account.companyTable.name ,
            okButtonText: "Si",
            cancelButtonText: "No",
        }).then(async result => {
            console.log("Dialog result: " + result);
            if(result){
                let companyTable= account.companyTable;
                companyTable.available= true;
                await companyTable.save();

                account.remove().then((account) => {
                    this.refresh();
                }).catch(console.error)
            }
        });
    }

    changeMode(mode){
        this.mode= mode;
        if(mode!='update'){
            this.barTitle="Cuentas";
            this.showAdd=true;
        }
    }

    async onTableTap(companyTable:CompanyTable){
        console.dir(companyTable);
        let account = new Account();
        account.companyTable= companyTable;

        companyTable.available= false;
        await companyTable.save();

        await account.save().then(() =>{ 
            this.refresh();
            this.mode= 'retrive';
        }).catch(console.error)
    }

    calcularTotal(account){
        let productReferences= account.productReferences;
        let total=0;
        for (let index = 0; index < productReferences.length; index++) {
            total += productReferences[index]['quantity'] * productReferences[index]['product']['price'];
            
        }
        return total;
    }

    async onProductTap(product:Product){
        let productReference= new ProductReference();
        productReference.product= product;
        productReference.quantity= 1;
        productReference.account= this.account;

        await productReference.save();

        this.productReferences.push(productReference);
        console.dir(product);
    }

    async plus(productReference:ProductReference){
        productReference.quantity +=1;
        await productReference.save();
    }

    async minus(productReference:ProductReference){
        if(productReference.quantity>1){
            productReference.quantity -=1;
            await productReference.save();
        }        
    }

    async delete(productReference:ProductReference){

        dialogs.confirm({
            title: "Confirmación de borrado",
            message: "Seguro desea borrar la referencia del producto: "+ productReference.product.name ,
            okButtonText: "Si",
            cancelButtonText: "No",
        }).then(async result => {
            console.log("Dialog result: " + result);
            if(result){
                await productReference.remove().then(async() => {
                    await Account.findOne({
                        where:{
                            id: this.account.id
                        }, 
                        relations: [                            
                            "productReferences",
                            "productReferences.product",
                        ]
                    }).then((account)=>{
                        this.account= account;
                    }).catch((error)=>{
                        console.error(error);
                    });
                    this.productReferences= this.account.productReferences;
                    this.refresh();
                }).catch(console.error)
            }
        });        
    }

    calcularCambio(account:Account){
        //console.dir(value.text);
        let total= this.recibido - this.calcularTotal(account);
        return total;
    }

    async close(account:Account){
        console.dir(account);
        dialogs.confirm({
            title: "Confirmación de cerrado",
            message: "Seguro desea cerrar y cobrar la cuenta en la mesa: "+ account.companyTable.name ,
            okButtonText: "Si",
            cancelButtonText: "No",
        }).then(async result => {
            console.log("Dialog result: " + result);
            if(result){
                let companyTable= account.companyTable;
                companyTable.available= true;
                await companyTable.save();

                account.remove().then((account) => {
                    this.refresh();
                    this.changeMode('retrive');
                }).catch(console.error)
            }
        });
    }
}