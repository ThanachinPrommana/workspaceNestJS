import { Injectable, Logger } from "@nestjs/common";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

@Injectable()
export class JwtConfig implements JwtOptionsFactory{
    createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {

        const secret = process.env.SECRET_KEY;
        
        Logger.debug(secret);

        return {
            secret:secret,
            signOptions:{
                expiresIn:'1d'
            }
        }
    }
    
}