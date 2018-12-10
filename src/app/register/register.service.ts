import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Config } from "~/app.config";

@Injectable()
export class RegisterService {
    private serverUrl = Config.apiUrl;

    constructor(private http: HttpClient) { }

    register(input: any): Promise<any> {
        const options = this.createRequestOptions();
        console.log('DATA');
        console.dir(input);
        return this.http.post(this.serverUrl+"users", input, { headers: options }).toPromise();
    }

    private createRequestOptions() {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        return headers;
    }
}