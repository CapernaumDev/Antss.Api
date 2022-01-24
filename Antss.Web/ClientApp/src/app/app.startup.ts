import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { AppStoreService } from "./app.store.service";

@Injectable({
  providedIn: 'root'
})
export class AppStartup {
  constructor(private http: HttpClient, private apiService: ApiService, private appStoreService: AppStoreService) {

  }

  getStartupData() {
    
  }
}
