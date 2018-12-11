// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";

import {createConnection} from "typeorm/browser";
var driver = require( "nativescript-sqlite" );

import Company from './models/Company';
import Account from './models/Account';
import CompanyTable from './models/CompanyTable';
import Product from './models/Product';
import ProductReference from './models/ProductReference';
import User from './models/User';

(async () => {
    try {
        const connection = await createConnection({
            database: 'database.db',
            type: 'nativescript',
            driver,
            entities: [
                Account, Company, CompanyTable, Product, ProductReference, User
            ],
            logging: true
        })

        console.log("Connection Created")

        // setting true will drop tables and recreate
        await connection.synchronize(false) 

        console.log("Synchronized")


    } catch (err) {
        console.error(err)
    }
})();

platformNativeScriptDynamic().bootstrapModule(AppModule);
