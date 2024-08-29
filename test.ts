import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class InsecureService {
  constructor(private cookieService: CookieService) {}

  storeSensitiveData(data1: any, data2: any, data3: any, data4: any, data5: any, data6: any, data7: any) {
    // NOT OK - Storing passwords directly in cache or template cache is not recommended
    localStorage.setItem('cachePassword', data1.password);
    sessionStorage.setItem('templateCachePassword', data2.password);

    // NOT OK - Storing passwords directly in cookies is not secure
    this.cookieService.set('cookiePassword', data3.password);
    this.cookieService.set('cookiePasswordObject', JSON.stringify(data4.password));

    // OK - Storing passwords in other variables is acceptable
    let otherPassword = data5.password;
    let anotherPassword = data6.password;

    // OK - Storing passwords as keys (not values) in cookies is acceptable
    this.cookieService.set(data7.password, 'someValue');
  }
}
