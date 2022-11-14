import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    // Para ver informacion de los decoradores y de la metadata
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get('roles', context.getHandler() );

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if ( !user )
      throw new BadRequestException('User not found');

    console.log({ userRoles: user.roles });

    for (const role of user.roles) {
      if ( validRoles.includes( role ) ) {
        return true;
      }
    }

    throw new ForbiddenException(
      `User ${ user.fullName } need a valid role: [${ validRoles }]`
    );
  }
}
