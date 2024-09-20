import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector, Inject, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { isPlatformBrowser } from "@angular/common";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly LIMS_API: string = 'https://limsapi.nirnayanhealthcare.com/';
    private readonly LIMS_DEV_API: string = 'https://limsapi-dev.nirnayanhealthcare.com/';
    private readonly LIMS_DEV_LOCAl: string = 'http://192.168.1.14:4001/';

    constructor(
        private _authService: AuthService,
        private inject: Injector,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Create a clone of the request
        let clonedRequest = req;

        if (isPlatformBrowser(this.platformId)) {
            // Browser-specific logic
            const userId = localStorage.getItem('USER_ID') || '';
            const token = this._authService.getToken();

            // Determine if request URL matches API
            if (req.url.startsWith(this.LIMS_API) || req.url.startsWith(this.LIMS_DEV_API) || req.url.startsWith(this.LIMS_DEV_LOCAl)) {
                clonedRequest = req.clone({
                    setHeaders: {
                        User_id: userId,
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                clonedRequest = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        }

        return next.handle(clonedRequest);
    }
}
