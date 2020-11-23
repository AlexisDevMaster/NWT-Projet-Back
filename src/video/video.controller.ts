import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { VideoInterceptor } from './interceptors/video.interceptor';
import { VideoService } from './video.service';
import { VideoEntity } from './entities/video.entity';
import { HandlerParams } from './validators/handler-params';
import { Observable } from 'rxjs';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { HandlerParamsUrl } from './validators/handler-params-url';

@ApiTags('video')
@Controller('video')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(VideoInterceptor)
export class VideoController {
  /**
   * Class constructor
   * @param _videoService
   */
  constructor(private readonly _videoService: VideoService) {
  }

  /**
   * Handler to answer to GET /video route
   *
   * @returns Observable<VideoEntity[] | void>
   */
  @ApiOkResponse({ description: 'Returns an array of video', type: VideoEntity, isArray: true })
  @ApiNoContentResponse({ description: 'No video exists in database' })
  @Get()
  findAll(): Observable<VideoEntity[] | void> {
    return this._videoService.findAll();
  }

  /**
   * Handler to answer to GET /video/random route
   *
   * @returns Observable<VideoEntity | void>
   */
  @ApiOkResponse({ description: 'Returns one video randomly', type: VideoEntity })
  @ApiNoContentResponse({ description: 'No video exists in database' })
  @Get('random')
  findRandom(): Observable<VideoEntity | void> {
    return this._videoService.findRandom();
  }

  /**
   * Handler to answer to GET /video/:id route
   *
   * @param {HandlerParams} params list of route params to take video id
   *
   * @returns Observable<VideoEntity>
   */
  @ApiOkResponse({ description: 'Returns the video for the given "url"', type: VideoEntity })
  @ApiNotFoundResponse({ description: 'Video with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'url',
    description: 'Unique url identifier of the video in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get('/url/:url')
  findOneByUrl(@Param() params: HandlerParamsUrl): Observable<VideoEntity> {
    return this._videoService.findOneByUrl(params.url);
  }

  /**
   * Handler to answer to GET /video/:id route
   *
   * @param {HandlerParams} params list of route params to take video id
   *
   * @returns Observable<VideoEntity>
   */
  @ApiOkResponse({ description: 'Returns the video for the given "id"', type: VideoEntity })
  @ApiNotFoundResponse({ description: 'Video with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the video in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<VideoEntity> {
    return this._videoService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /video route
   *
   * @param createVideoDto data to create
   *
   * @returns Observable<VideoEntity>
   */
  @ApiCreatedResponse({ description: 'The video has been successfully created', type: VideoEntity })
  @ApiConflictResponse({ description: 'The video already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiBody({ description: 'Payload to create a new video', type: CreateVideoDto })
  @Post()
  create(@Body() createVideoDto: CreateVideoDto): Observable<VideoEntity> {
    return this._videoService.create(createVideoDto);
  }

  /**
   * Handler to answer to PUT /video/:id route
   *
   * @param {HandlerParams} params list of route params to take video id
   * @param updateVideoDto data to update
   *
   * @returns Observable<VideoEntity>
   */
  @ApiOkResponse({ description: 'The video has been successfully updated', type: VideoEntity })
  @ApiNotFoundResponse({ description: 'Video with the given "id" doesn\'t exist in the database' })
  @ApiConflictResponse({ description: 'The video already exists in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the video in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a video', type: UpdateVideoDto })
  @Put(':id')
  update(@Param() params: HandlerParams, @Body() updateVideoDto: UpdateVideoDto): Observable<VideoEntity> {
    return this._videoService.update(params.id, updateVideoDto);
  }

  /**
   * Handler to answer to DELETE /video/:id route
   *
   * @param {HandlerParams} params list of route params to take video id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({ description: 'The video has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Video with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the video in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._videoService.delete(params.id);
  }



}
