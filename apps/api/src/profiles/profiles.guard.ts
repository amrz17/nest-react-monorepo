import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ProfilesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
    // const request = context.switchToHttp().getRequest();
    // return AuthenticatorResponse(request);
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
