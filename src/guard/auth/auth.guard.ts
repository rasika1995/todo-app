import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = this.getRequest(context);
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Verify the JWT token
      const payload = this.jwtService.verify(token, {
        algorithms: ['HS256'], // Ensure you specify the algorithm
      });

      request['user'] = payload; // Attach payload to request if needed
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest<Request>();
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    return authHeader.split(' ')[1];
  }
}
