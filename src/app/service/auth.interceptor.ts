import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly LIMS_API: string = 'https://limsapi.nirnayanhealthcare.com/';
    private readonly LIMS_DEV_API: string = 'https://limsapi-dev.nirnayanhealthcare.com/';

    constructor(private inject: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authService = this.inject.get(AuthService);

        if (req.url.startsWith(this.LIMS_API)) {
            let jwtToken2 = req.clone({
                setHeaders: {
                    User_id: localStorage.getItem('USER_ID') || '',
                    Authorization: 'Bearer ' + authService.getToken()
                }
            });
            return next.handle(jwtToken2);
        } else if(req.url.startsWith(this.LIMS_DEV_API)) {
            let jwtToken2 = req.clone({
                setHeaders: {
                    User_id: localStorage.getItem('USER_ID') || '',
                    Authorization: 'Bearer ' + authService.getToken()
                }
            });
            return next.handle(jwtToken2);
        }
        else {
            let jwtToken = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + authService.getToken()
                }
            });
            return next.handle(jwtToken);
        }
    }
}
