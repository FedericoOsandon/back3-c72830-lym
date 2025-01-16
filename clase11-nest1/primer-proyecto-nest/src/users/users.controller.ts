import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// http://localhost:3000/  users/ :id
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
// (req, res)
  @Post('/:param')
  probarRequest(@Request() req){
    console.log(req.query);
    console.log(req.params);
    console.log(req.body);
    
    return 'Todo en uno'
  }

  @Post() // crear un usuario
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.first_name || !createUserDto.email || !createUserDto.password) throw new HttpException('Incomplete values', HttpStatus.BAD_REQUEST)
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll(@Query() query) {
  //   const { limit } = query
  //   console.log(limit)
  //   const users = this.usersService.findAll();
  //   return { status: 'success', users }
  // }
  @Get()
  findAll(@Query('limit') limit) {
   
    console.log(limit)
    const users = this.usersService.findAll();
    return { status: 'success', users }
  }

  @Get(':id') // un usuario id
  findOne(@Param('id') id: string) {

    if(isNaN(+id)) throw new HttpException('Invalid param', HttpStatus.BAD_REQUEST)

    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
