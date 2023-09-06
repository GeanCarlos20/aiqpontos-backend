import { Body, Controller, Post, HttpCode, HttpStatus, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from '../dto/singup.dto';
import {
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login realizado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Credenciais inválidas',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
  })
  @ApiBody({
    description: 'Login payload',
    type: LoginDto,
    required: true,
  })
  singIn(@Body() loginDto: LoginDto) {
    return this.authService.singIn(
      loginDto
    );
  }

  @Post('singup')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Credenciais inválidas',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
  })
  @ApiBody({
    description: 'SingUp payload',
    type: SingUpDto,
    required: true,
  })
  create(@Body() createCadastroDto: SingUpDto) {
    return this.authService.singUp(createCadastroDto);
  }

  @Get('profile:email')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna o perfil do entregador',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Credenciais inválidas',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
  })
  @ApiParam({
    name: 'email',
    description: 'E-mail do entregador',
    type: String,
    required: true,
    example: 'teste@gmail.com',
  })
  getProfile(@Param('email') email: string): Promise<AuthResponseDto> {
    return this.authService.getProfile(email);
  }
}
