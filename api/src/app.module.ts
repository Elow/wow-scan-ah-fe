import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoriesController } from './stories/stories.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController, StoriesController],
  providers: [AppService],
})
export class AppModule {}
