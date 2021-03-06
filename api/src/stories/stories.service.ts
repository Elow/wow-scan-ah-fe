import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './story.entity';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private readonly storiesRepository: Repository<Story>,
  ) {}

  create(createStoryDto: CreateStoryDto): Promise<Story> {
    const story = new Story();
    story.animal = createStoryDto.animal;
    story.description = createStoryDto.description;

    return this.storiesRepository.save(story);
  }

  async findAll(): Promise<Story[]> {
    return this.storiesRepository.find();
  }

  findOne(id: string): Promise<Story> {
    return this.storiesRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.storiesRepository.delete(id);
  }
}
