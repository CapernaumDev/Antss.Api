import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { AppStoreService } from "./app.store";

@Injectable({
  providedIn: 'root'
})
export class AppStartup {
  constructor(private http: HttpClient, private apiService: ApiService, private appStoreService: AppStoreService) {

  }

  getStartupData() {
    this.apiService.getAppData().subscribe(
      res => {
        this.appStoreService.setOffices(res.offices);
        this.appStoreService.setUserTypes(res.userTypes);
      },
      err => {
        console.log(err);
      });;
  }
}
