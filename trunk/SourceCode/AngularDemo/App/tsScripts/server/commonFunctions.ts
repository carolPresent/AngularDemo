//This is common function component

import { Injectable } from '@angular/core'; 

import { AppSettings } from '../appSettings';
import { ServerService } from '../servers.service';

@Injectable()
export class CommonFunctionService {
    constructor(private serverService: ServerService) { }

    //Public method to get patient list. Saves code redundancy.
    public getPatientList(callback) {
        this.serverService.getRequest(AppSettings.API_END_POINT + AppSettings.Patient).subscribe(
            (response) => {
                var body = response.json();
                if (body.status === AppSettings.SuccessStatus) {
                    callback(JSON.parse(body.data));
                } else {
                    alert(`${AppSettings.Patient, AppSettings.ListCouldNotLoad}`);
                    callback([]);
                }
            },
            (error) => {
                alert(AppSettings.SomeErrorOccured)
                callback([]);
            }
        )
    }

    //Public method to get insurance list. Saves code redundancy.
    public getInsuranceList(callback) {
        this.serverService.getRequest(AppSettings.API_END_POINT + AppSettings.Insurance).subscribe(
            (response) => {
                var body = response.json();
                if (body.status === AppSettings.SuccessStatus) {
                    callback(JSON.parse(body.data));
                } else {
                    alert(`${AppSettings.Insurance, AppSettings.ListCouldNotLoad}`);
                    callback([]);
                }
            },
            (error) => {
                alert(AppSettings.SomeErrorOccured)
                callback([]);
            }
        )
    }
}