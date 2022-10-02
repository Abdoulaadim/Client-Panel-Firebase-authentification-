import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router){}
  canActivate(): Observable<boolean> {

    return this.afAuth.authState.pipe(map(auth=>{
      if(!auth){
        this.router.navigate(['/login']);
        return false;
      }else{
        return true;
      }
    }))
  
  }
  
}
