import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
@Injectable()


export class AuthGuard implements CanActivate {



    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const url = request.url;

        Logger.debug(`มีการเข้าถึง URL: ${url}`);

        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic',[context.getHandler(),context.getClass()])

        if(isPublic){
            return true;
        }

        return true;

    }
}
