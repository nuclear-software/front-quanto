import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import Product from '~/models/Product';
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import User from '~/models/User';
import { getString } from "tns-core-modules/application-settings";
import Company from '~/models/Company';
import * as imagepicker from "nativescript-imagepicker";
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "products", loadChildren: "./products/products.module#ProductsModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Products",
    moduleId: module.id,
    templateUrl: "./products.component.html"
})
export class ProductsComponent implements OnInit {

    @ViewChild("myForm") dataFormComp: RadDataFormComponent;
    public user: User;
    public company: Company;
    public products: Array<Product>;
    public product: Product;
    public mode:string;
    public searchPhrase: string;
    public productMetadata= {
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
                "name": "price",
                "displayName": "Precio",
                "index": 1,
                "editor": "Number",
                "validators": [
                    { "name": "NonEmpty" }
                ]
            },
            {
                "name": "image",
                "displayName": "Imagen",
                "index": 2,
                "editor": "Text",
                "validators": [
                    { "name": "NonEmpty" }, 
                    { "name": "MaximumLength", "params": { "length": 191 } }
                ],
                "hidden":true
            },
            {
                "name": "id",
                "hidden":true
            },
            {
                "name": "company",
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
        this.product = new Product();
        this.product.name='';
        this.product.price=0;
        this.product.image='';
        //this.product.company= this.company;

        // let products= await Product.createQueryBuilder("product")
        // .where("product.name like :name", { name: "%"+searchBar.text+"%" })
        // .orWhere("product.price like :price", { price: "%"+searchBar.text+"%" })
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
            relations: ["products"]
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
            relations: ["products"]
        }).then((company)=>{
            this.company= company;
            this.products= company.products
            console.dir(company);
        }).catch((error)=>{
            console.error(error);
        });

        //this.products= await this.company.products;
        // Product.find().then((products) => {           
        //     this.products = products;
        // }).catch(console.error)
    }

    add() {
        this.product = new Product();
        this.product.name='';
        this.product.price=0;
        this.product.image='';
        this.product.company= this.company;
        this.changeMode('create');
    }

    edit(product:Product){
        this.imageSrc= product.image;
        this.product= product;
        this.changeMode('update');
    }

    remove(product:Product){
        dialogs.confirm({
            title: "Confirmación de borrado",
            message: "Seguro desea borrar el registro del producto: "+product.name ,
            okButtonText: "Si",
            cancelButtonText: "No",
        }).then(result => {
            console.log("Dialog result: " + result);
            if(result){
                product.remove().then((products) => {
                    this.refresh();
                }).catch(console.error)
            }
        });
    }

    async onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        console.log("You are searching for " + searchBar.text);
        let products= await Product.createQueryBuilder("product")
        .where("product.name like :name", { name: "%"+searchBar.text+"%" })
        .orWhere("product.price like :price", { price: "%"+searchBar.text+"%" })
        .getMany();
        this.products= products;
        console.dir(products);
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
        if(mode=='retive'){
            this.product.image= this.imageSrc;
        }
    }

    public async checkErrors() {
        const isValid = await this.dataFormComp.dataForm.validateAndCommitAll();
        console.log('Is Valid =>'+isValid);
        if(isValid){
            this.product.save().then(() =>{ 
                this.refresh();
                this.product = new Product();
                this.product.name='';
                this.product.price=0;
                this.product.image='';
                this.product.company= this.company;
                this.mode= 'retrive';
            }).catch(console.error)
        }
    }

    imageAssets = [];
    imageSrc: any;
    isSingleMode: boolean = true;
    thumbSize: number = 80;
    previewSize: number = 300;

    public onSelectMultipleTap() {
        this.isSingleMode = false;

        let context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    }

    public onSelectSingleTap() {
        this.isSingleMode = true;

        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    private startSelection(context) {
        let that = this;

        context
        .authorize()
        .then(() => {
            that.imageAssets = [];
            that.imageSrc = null;
            return context.present();
        })
        .then((selection) => {
            console.log("Selection done: " + JSON.stringify(selection));
            console.log(selection[0]['_android']);
            this.product.image= selection[0]['_android'];
            that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

            // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
            selection.forEach(function (element) {
                element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
            });

            that.imageAssets = selection;
        }).catch(function (e) {
            console.log(e);
        });
    }
}
