import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { EvaluationRequestDto, EvaluationDto } from '@test2/shared';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('evaluations')
  @ApiOperation({ summary: 'Получение результата' })
  @ApiOkResponse({ type: EvaluationDto })
  @HttpCode(200)
  async getEvaluations(): Promise<EvaluationRequestDto[]> {
    return this.appService.getEvaluations();
  }

  @Post('evaluations')
  @ApiOperation({ summary: 'Отправка данных' })
  @HttpCode(201)
  async postEvaluations(@Body() data: EvaluationRequestDto) {
    await this.appService.postEvaluations(data);
  }
}
