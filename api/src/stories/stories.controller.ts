import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './story.entity';
import { StoriesService } from './stories.service';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  create(@Body() createUserDto: CreateStoryDto): Promise<Story> {
    return this.storiesService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<Story[]> {
    return this.storiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Story> {
    return this.storiesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.storiesService.remove(id);
  }
}
