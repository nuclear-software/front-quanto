import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import User from '~/models/User';
import Company from '~/models/Company';
import CompanyTable from '~/models/CompanyTable';
import { getString } from "tns-core-modules/application-settings";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { SearchBar } from "tns-core-modules/ui/search-bar";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "tables", loadChildren: "./tables/tables.module#TablesModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Tables",
    moduleId: module.id,
    templateUrl: "./tables.component.html"
})
export class TablesComponent implements OnInit {
    @ViewChild("myForm") dataFormComp: RadDataFormComponent;
    public user: User;
    public company: Company;
    public companyTables: Array<CompanyTable>;
    public companyTable: CompanyTable;
    public mode:string;
    public searchPhrase: string;
    public companyTableMetadata= {
        "isReadOnly": false,
        "commitMode": "Immediate",
        "validationMode": "Immediate",
        "propertyAnnotations":
        [
            {
                "name": "name",
                "displayName": "Nombre",
                "index": 0,
                "editor": "Text",
                "validators": [
                    { "name": "NonEmpty" }, 
                    { "name": "MaximumLength", "params": { "length": 191 } }
                ]
            },
            {
                "name": "identifier",
                "displayName": "Identificador",
                "index": 0,
                "editor": "Text",
                "validators": [
                    { "name": "NonEmpty" }, 
                    { "name": "MaximumLength", "params": { "length": 191 } }
                ]
            },
            {
                "name": "id",
                "hidden":true
            },
            {
                "name": "company",
                "hidden":true
            },
            {
                "name": "available",
                "hidden":true
            }
        ]
    };

    constructor() {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    async ngOnInit(){
        // Init your component properties here.
        this.mode='retrive';
        this.companyTable = new CompanyTable();
        this.companyTable.name='';
        this.companyTable.identifier='';
        this.companyTable.available=true;
        //this.companyTable.company= this.company;

        // let companyTables= await CompanyTable.createQueryBuilder("companyTable")
        // .where("companyTable.name like :name", { name: "%"+searchBar.text+"%" })
        // .orWhere("companyTable.price like :price", { price: "%"+searchBar.text+"%" })
        // .getMany();

        //console.log();
        await User.findOne({
            where:{
                id: JSON.parse(getString('current_user')).id
            }, 
            relations: ["company"]
        }).then((user)=>{
            this.user= user;
            console.dir(user);
        }).catch((error)=>{
            console.error(error);
        });

        await Company.findOne({
            where:{
                id: this.user.company.id
            }, 
            relations: ["companyTables"]
        }).then((company)=>{
            this.company= company
            console.dir(company);
        }).catch((error)=>{
            console.error(error);
        });

        this.refresh();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }    

    async refresh() {

        await Company.findOne({
            where:{
                id: this.user.company.id
            }, 
            relations: ["companyTables"]
        }).then((company)=>{
            this.company= company;
            this.companyTables= company.companyTables
            console.dir(company);
        }).catch((error)=>{
            console.error(error);
        });

        //this.companyTables= await this.company.companyTables;
        // CompanyTable.find().then((companyTables) => {           
        //     this.companyTables = companyTables;
        // }).catch(console.error)
    }

    add() {
        this.companyTable = new CompanyTable();
        this.companyTable.name='';
        this.companyTable.identifier='';
        this.companyTable.available=true;
        this.companyTable.company= this.company;
        this.changeMode('create');
    }

    edit(companyTable:CompanyTable){
        this.companyTable= companyTable;
        this.changeMode('update');
    }

    remove(companyTable:CompanyTable){
        dialogs.confirm({
            title: "Confirmación de borrado",
            message: "Seguro desea borrar el registro del companyTableo: "+companyTable.name ,
            okButtonText: "Si",
            cancelButtonText: "No",
        }).then(result => {
            console.log("Dialog result: " + result);
            if(result){
                companyTable.remove().then((companyTables) => {
                    this.refresh();
                }).catch(console.error)
            }
        });
    }

    async onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        console.log("You are searching for " + searchBar.text);
        let companyTables= await CompanyTable.createQueryBuilder("companyTable")
        .where("companyTable.name like :name", { name: "%"+searchBar.text+"%" })
        .orWhere("companyTable.identifier like :identifier", { identifier: "%"+searchBar.text+"%" })
        .getMany();
        this.companyTables= companyTables;
        console.dir(companyTables);
    }

    onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        console.log("SearchBar text changed! New value: " + searchBar.text);

        if(searchBar.text==''){
            this.refresh();
        }
    }

    changeMode(mode){
        this.mode= mode;
    }

    public async checkErrors() {
        const isValid = await this.dataFormComp.dataForm.validateAndCommitAll();
        console.log('Is Valid =>'+isValid);
        if(isValid){
            this.companyTable.save().then(() =>{ 
                this.refresh();
                this.companyTable = new CompanyTable();
                this.companyTable.name='';
                this.companyTable.identifier='';
                this.companyTable.available=true;
    
                this.companyTable.company= this.company;
                this.mode= 'retrive';
            }).catch(console.error)
        }
    }
}
