import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "~/app.config";

@Injectable()
export class AuthService {
    private serverUrl = Config.apiUrl;

    constructor(private http: HttpClient) { }

    login(input: any): Promise<any> {
        const options = this.createRequestOptions();
        let data= {
            "grant_type" : Config.grant_type,
            "client_id" : Config.client_oauth_id,
            "client_secret" : Config.client_oauth_secret,
            "username" : input.email,
            "password" : input.password,
            "scope" : ""
        };

        console.log('DATA');
        console.dir(data);
        return this.http.post(this.serverUrl+"token", data, { headers: options }).toPromise();
    }

    private createRequestOptions() {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return headers;
    }
}